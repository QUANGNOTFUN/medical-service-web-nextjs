"use client"

import {Loader} from "lucide-react";
import {useSearchMedications} from "@/libs/hooks/medications/useSearchMedications";
import {useState} from "react";
import AdminTableLayout from "@/app/(admin)/_components/Search&ActionTable/AdminTableLayout";
import {ActionAdminTable} from "@/app/(admin)/_components/Search&ActionTable/AdminTable";
import {UpdateMedicationInput} from "@/types/medications";
import AdminForm from "@/app/(admin)/_components/Create&UpdateForm/AdminForm";
import {useUpdateMedication} from "@/libs/hooks/medications/useUpdateMedication";
import {useDeleteMedication} from "@/libs/hooks/medications/useDeleteMedication";
import ConfirmationDialog from "@/app/(admin)/_components/dialog/ConfirmationDialog";
import {HEADER_TABLE_DOCTOR, INIT_CREATE_DOCTOR_FORM} from "@/app/(admin)/doctor-manage/values/constants";
import {useGetDoctors} from "@/libs/hooks/doctors/useGetDoctors";
import {useRegisterDoctor} from "@/libs/hooks/doctors/useCreateDoctor";
import {RegisterDoctorInput} from "@/types/register";

export default function MedicationPage() {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [selectedAction, setSelectedAction] = useState<ActionAdminTable["type"]>('view');
	const [selectedId, setSelectedId] = useState<number | null>(null);
	const { doctors: doctors, loading: initLoading, error: errorMedications, refetch: refetchDoctors } = useGetDoctors();
	const { medications: searchMedications, loading: searchLoading, } = useSearchMedications(searchTerm);
	const { register: registerDoctor, loading: createLoading, error: errorCreate } = useRegisterDoctor();
	const { update: updateMedication, loading: updateLoading, error: errorUpdate } = useUpdateMedication();
	const { delete: deleteMedication, loading: deleteLoading, error: errorDelete } = useDeleteMedication();
	
	const displayedDoctor = (searchTerm && searchMedications.length > 0) ? searchMedications : doctors;
	const loading = initLoading || searchLoading || createLoading || updateLoading || deleteLoading;
	const error = errorMedications || errorCreate || errorUpdate || errorDelete;
	
	function handleAction(action: ActionAdminTable['type']) {
		setSelectedAction(action);
		setSelectedId(null); // clear selected item
	}
	function handleSelectedId(id: number | null) {
		if (id !== null && id >= 0) {
			setSelectedId(id);
		}
	}
	
	async function handleCreateSubmit(data: RegisterDoctorInput) {
		try {
			await registerDoctor(data)
			await refetchDoctors()
			handleAction("view") // clear form after creation
		} catch (error) {
			console.error("Create medication error:", error);
		}
	}
	
	async function handleUpdateSubmit(data: UpdateMedicationInput) {
		if (selectedId === null) return;
		try {
			await updateMedication(selectedId, data)
			await refetchDoctors()
			handleAction("update") // clear form and selectedId after update
		} catch (error) {
			console.error("Create medication error:", error);
		}
	}
	
	async function handleDeleteSubmit() {
		if (selectedId === null) return;
		try {
			await deleteMedication(selectedId)
			await refetchDoctors()
			handleAction("delete") // clear form and selectedId after update
		} catch (error) {
			console.error("Create medication error:", error);
		}
	}
	
	const renderForm = () => {
		switch (selectedAction) {
			case "create":
				return <AdminForm
					{ ...INIT_CREATE_DOCTOR_FORM }
					onClose={() => handleAction("view")}
					onSubmit={handleCreateSubmit}
				/>
			
			// case "update":
			// 	if (selectedId === null) return null;
			// 	return <AdminForm
			// 		{ ...INIT_UPDATE_MEDICATION_FORM }
			// 		initialData={displayedMedications.find(medication => medication.id === selectedId)}
			// 		onClose={() => handleAction("update")}
			// 		onSubmit={handleUpdateSubmit}
			// 	/>
			
			case "delete":
				if (selectedId === null) return null;
				return <ConfirmationDialog
					isOpen={selectedAction === "delete"}
					message={"Bạn có chắc chắn muốn xóa thuốc này không?"}
					onClose={() => handleAction("delete")}
					onConfirm={handleDeleteSubmit}
					title={"Xác nhận xóa thuốc"}
				/>
			
			default:
				return null;
		}
	}
	
	if (loading) return <Loader/>;
	if (error)
		return (
			<div>
				{error.name}: {error.message}
			</div>
		)
	
	return (
		<>
			{renderForm()}
			
			<AdminTableLayout
				searchProps={{placeholder: "Tìm kiếm thuốc", onSearch: (term) => {setSearchTerm(term)}}}
				dropdownProps={{ onItemSelected: (type) => { handleAction(type) } }}
				tableProps={{
					headers: HEADER_TABLE_DOCTOR,
					items: displayedDoctor,
					action: { type: selectedAction, onClick: (item) => handleSelectedId(item as number) }
				}}
			/>
		</>
	);
}