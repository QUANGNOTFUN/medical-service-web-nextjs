"use client";

import { useState } from "react";
import ConfirmationDialog from "@/app/(admin)/_components/dialog/ConfirmationDialog";
import { useCreateExamination } from "@/libs/hooks/a/useCreateExaminationReport";
import { MedicalExaminationInput } from "@/types/examination_report";
import {Loader} from "lucide-react";
import {useGetAppointments} from "@/libs/hooks/appoiment/useGetAppointment";

export default function PatientPage() {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [selectedAction, setSelectedAction] = useState<"view" | "create" | "update" | "delete">("view");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const doctorId = "f131d16a-5fd5-4a5c-ae7d-c7471c7e8c52";
    const [formdata, setFormdata] = useState({
        name: "",
        gender: "",
        age:"",
        phone:"",
        email:"",
        name1: "",
        doctor_id: "",
        risk_assessment: "",
        is_HIV:"false",
        HIV_test_file: "",
        regimen_id: "",
        treatment_plan_id: "",
        case_stage: "",
        regimen_type: "",
        medication_list: "",
        user_guide: "",
        is_default: "",
        name2: "",
        hiv_diagnosis_date: "",
        start_date: "",
        end_date: "",
        notes:"",

    })


    const { create, loading, error } = useCreateExamination();
    const {}
    const {
        appointments,
        total,
        loading: initLoading,
        error: errorAppointments,
        refetch: refetchAppointments,
    } = useGetAppointments({ doctor_id: doctorId, page, pageSize });


    const loading = initLoading || updateLoading;
    const error = errorAppointments || errorUpdate;


    function handleAction(action: "view" | "create" | "update" | "delete", id?: string) {
        setSelectedAction(action);
        setSelectedId(id || null);
    }

    function handleSelectedId(id: string | null) {
        if (id !== null) {
            setSelectedId(id);
        }
    }

    async function handleCreateExamination(input: MedicalExaminationInput) {
        try {
            const result = await create(input);
            if (result) {
                alert("Tạo phiếu khám thành công!");
            } else {
                alert("Tạo phiếu khám thất bại!");
            }
        } catch (error) {
            console.error("Lỗi khi tạo phiếu khám:", error);
            alert("Có lỗi xảy ra!");
        }
    }


    const renderForm = () => {
        switch (selectedAction) {
            case "view":
            case "update":
                if (selectedId === null) return null;
                return (
                    <ConfirmationDialog
                        isOpen={selectedAction === "update"}
                        message={
                            <div className="flex flex-col gap-4">
                                <div>
                                    <label className="block text-gray-700">Tên</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="p-2 border border-gray-300 rounded-lg w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">Giới tính</label>
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleInputChange}
                                        className="p-2 border border-gray-300 rounded-lg w-full"
                                    >
                                        <option value="">Chọn giới tính</option>
                                        <option value="Nam">Nam</option>
                                        <option value="Nữ">Nữ</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-700">Số điện thoại</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="p-2 border border-gray-300 rounded-lg w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">Địa chỉ</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className="p-2 border border-gray-300 rounded-lg w-full"
                                    />
                                </div>
                            </div>
                        }
                        onClose={() => handleAction("view")}
                        onConfirm={handleUpdateSubmit}
                        title={"Cập nhật bệnh nhân"}
                        confirmText="Chắc chắn"
                        cancelText="Hủy"
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
}