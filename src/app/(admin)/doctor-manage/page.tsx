"use client"

import { Loader } from "lucide-react";
import { useState } from "react";
import AdminTableLayout from "@/app/(admin)/_components/Search&ActionTable/AdminTableLayout";
import { ActionAdminTable } from "@/app/(admin)/_components/Search&ActionTable/AdminTable";
import AdminForm from "@/app/(admin)/_components/Create&UpdateForm/AdminForm";
import ConfirmationDialog from "@/app/(admin)/_components/dialog/ConfirmationDialog";
import { HEADER_TABLE_DOCTOR, INIT_CREATE_DOCTOR_FORM, INIT_UPDATE_DOCTOR_FORM } from "@/app/(admin)/doctor-manage/values/constants";
import { useGetDoctors } from "@/libs/hooks/doctors/useGetDoctors";
import { useRegisterDoctor } from "@/libs/hooks/doctors/useCreateDoctor";
import { useUpdateDoctor } from "@/libs/hooks/doctors/useUpdateDoctor";
import { CreateDoctorInput, UpdateDoctorInput } from "@/types/doctors";
import {useDeleteDoctor} from "@/libs/hooks/doctors/userDeleteDoctor";

export default function DoctorManagePage() {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [selectedAction, setSelectedAction] = useState<ActionAdminTable["type"]>("view");
	const [selectedId, setSelectedId] = useState<string | null>(null);

	const { doctors, loading: initLoading, error: errorDoctors, refetch: refetchDoctors } = useGetDoctors();
	const { register: registerDoctor, loading: createLoading, error: errorCreate } = useRegisterDoctor();
	const { update: updateDoctor, loading: updateLoading, error: errorUpdate } = useUpdateDoctor();
	const { delete: deleteDoctor, loading: deleteLoading, error: errorDelete } = useDeleteDoctor();

	const displayedDoctors = searchTerm
		? doctors.filter(doctor =>
			(doctor.user.full_name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
			(doctor.user.email?.toLowerCase() || "").includes(searchTerm.toLowerCase())
		)
		: doctors;

	const loading = initLoading || createLoading || updateLoading || deleteLoading;
	const error = errorDoctors || errorCreate || errorUpdate || errorDelete;

	function handleAction(action: ActionAdminTable["type"]) {
		setSelectedAction(action);
		setSelectedId(null); // Clear selected item
	}

	function handleSelectedId(id: string | null) {
		if (id !== null) {
			setSelectedId(id);
		}
	}

	async function handleCreateSubmit(data: CreateDoctorInput) {
		try {
			await registerDoctor(data);
			await refetchDoctors();
			handleAction("view"); // Clear form after creation
		} catch (error) {
			console.error("Create doctor error:", error);
		}
	}

	async function handleUpdateSubmit(data: UpdateDoctorInput) {
		if (selectedId === null) return;
		try {
			await updateDoctor(selectedId, data);
			await refetchDoctors();
			handleAction("view"); // Clear form and selectedId after update
		} catch (error) {
			console.error("Update doctor error:", error);
		}
	}

	async function handleDeleteSubmit() {
		if (selectedId === null) return;
		try {
			await deleteDoctor(selectedId);
			await refetchDoctors();
			handleAction("view"); // Clear form and selectedId after delete
		} catch (error) {
			console.error("Delete doctor error:", error);
		}
	}

	const renderForm = () => {
		switch (selectedAction) {
			case "create":
				return (
					<AdminForm
						{...INIT_CREATE_DOCTOR_FORM}
						onClose={() => handleAction("view")}
						onSubmit={handleCreateSubmit}
					/>
				);
			case "update":
				if (selectedId === null) return null;
				const selectedDoctor = displayedDoctors.find(doctor => doctor.id === selectedId);
				if (!selectedDoctor) return null;
				return (
					<AdminForm
						{...INIT_UPDATE_DOCTOR_FORM}
						initialData={{
							qualifications: selectedDoctor.qualifications,
							work_seniority: selectedDoctor.work_seniority,
							specialty: selectedDoctor.specialty,
							hospital: selectedDoctor.hospital,
						}}
						onClose={() => handleAction("view")}
						onSubmit={handleUpdateSubmit}
					/>
				);
			case "delete":
				if (selectedId === null) return null;
				return (
					<ConfirmationDialog
						isOpen={selectedAction === "delete"}
						message={"Bạn có chắc chắn muốn xóa bác sĩ này không?"}
						onClose={() => handleAction("view")}
						onConfirm={handleDeleteSubmit}
						title={"Xác nhận xóa bác sĩ"}
					/>
				);
			default:
				return null;
		}
	};

	if (loading) return <Loader className="w-8 h-8 animate-spin mx-auto mt-10" />;
	if (error)
		return (
			<div className="text-red-500 text-center mt-10">
				{error.name}: {error.message}
			</div>
		);

	return (
		<div className="container mx-auto p-6">
			{renderForm()}
			<AdminTableLayout
				searchProps={{ placeholder: "Tìm kiếm bác sĩ", onSearch: (term) => setSearchTerm(term) }}
				dropdownProps={{ onItemSelected: (type) => handleAction(type) }}
				tableProps={{
					headers: HEADER_TABLE_DOCTOR,
					items: displayedDoctors,
					action: { type: selectedAction, onClick: (item) => handleSelectedId(item as string) },
				}}
			/>
		</div>
	);
}