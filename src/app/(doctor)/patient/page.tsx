"use client";

import { useState } from "react";
import {Pencil, Trash2, Plus, Loader} from "lucide-react";
import { INIT_PATIENT_TABLE } from "@/app/(doctor)/patient/m_resource/constants";
import MedicalExaminationForm from "@/app/(doctor)/patient/m_resource/MedicalExaminationForm";
import { MedicalExaminationInput } from "@/types/examination_report";
import {useGetAppointments} from "@/libs/hooks/appoiment/useGetAppointment";
import {useCreateExamination} from "@/libs/hooks/a/useCreateExaminationReport";
import { useGetTreatmentPlan } from "@/libs/hooks/treatmentPlan/useGetTreatmentPlan";
import {useUpdateAppointment} from "@/libs/hooks/appoiment/useUpdateAppointment";

export default function PatientPage() {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [selectedAction, setSelectedAction] = useState<"view" | "create" | "update" | "delete" | null>(null);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(5);
    const doctorId = "6eaa03f7-dc9c-415b-8066-cb72d936d1d2";

    const {appointments, total, loading: loadingAppointments, error: errorAppointments, refetch: refetchAppointments,} = useGetAppointments({ doctor_id: doctorId, page, pageSize });

    const { patient, plan, loading: loadingTreatmentPlan } = useGetTreatmentPlan("patient_id");

    const {update: updateAppointment, loading: loadingUpdate, error: errorUpdate,} = useUpdateAppointment();

    const {create, loading: loadingCreateExam, error: errorCreate,} = useCreateExamination();

    const isLoading = loadingAppointments || loadingCreateExam || loadingTreatmentPlan || loadingUpdate;
    const error = errorAppointments || errorCreate || errorUpdate;

    const dataAppointments = appointments.filter((appointment) => appointment.is_done === true);
    const Appointments = appointments.filter((appointment) => appointment.is_done === false);

    function handleAction(action: "create" | "update" | "delete", id?: string) {
        setSelectedAction(action);
        setSelectedId(id || null);
    }

    const handleCreate = async (input: MedicalExaminationInput) => {
        await create(input);
        setSelectedAction(null);
    };
    
    const renderForm = () => {
        switch (selectedAction) {
            case "create":
                return (
                    <MedicalExaminationForm
                        patient_id={selectedId}
                        doctor_id={doctorId}
                        onSubmit={handleCreate}
                        onClose={() => setSelectedAction(null)}
                    />
                );
            case "update":
                return null
            default:return null

        }
    };

    const renderActions = (id: string) => (
        <div className="flex space-x-2">
            <button onClick={() => handleAction("create", id)} title="Tạo phiếu khám" className="text-green-600 hover:text-green-800">
                <Plus className="w-5 h-5" />
            </button>
            <button onClick={() => handleAction("update", id)} title="Sửa" className="text-yellow-600 hover:text-yellow-800">
                <Pencil className="w-5 h-5" />
            </button>
            <button onClick={() => handleAction("delete", id)} title="Xóa" className="text-red-600 hover:text-red-800">
                <Trash2 className="w-5 h-5" />
            </button>
        </div>
    );

    const pagedAppointments = appointments.slice((page - 1) * pageSize, page * pageSize);
    const pagedDataAppointments = dataAppointments.slice((page - 1) * pageSize, page * pageSize);

    if (isLoading) return <Loader className="w-8 h-8 animate-spin mx-auto mt-10" />;
    if (error)
        return (
            <div className="text-red-500 text-center mt-10">
                {error.name}: {error.message}
            </div>
        );

    return (
        <div className="min-h-screen p-6 bg-gray-100">
            {renderForm()}

            {/* Bảng Chưa khám */}
            <div className="mb-10 bg-white shadow-lg rounded-xl overflow-hidden flex flex-col">
                <h2 className="text-xl font-semibold p-4 border-b bg-gray-50">🕒 Danh sách lịch hẹn (Chưa khám)</h2>
                <div className="overflow-y-auto" style={{ maxHeight: "400px" }}>
                    <table className="w-full">
                        <thead>
                        <tr className="bg-gray-100 text-gray-700">
                            {INIT_PATIENT_TABLE.map((header, index) => (
                                <th key={index} className="p-4 text-left font-medium">
                                    {header.label}
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {pagedAppointments.map((item, rowIndex) => (
                            <tr key={rowIndex} className="border-t hover:bg-gray-50">
                                {INIT_PATIENT_TABLE.map((header, colIndex) => (
                                    <td key={colIndex} className="p-4 text-gray-600">
                                        {header.key === "action" ? renderActions(item.patient_id) : item[header.key] || "--"}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-between items-center p-4 border-t">
                    <button
                        onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                        disabled={page === 1}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                    >
                        ← Trang trước
                    </button>
                    <span>Trang {page}</span>
                    <button
                        onClick={() => setPage((prev) => (prev * pageSize < appointments.length ? prev + 1 : prev))}
                        disabled={page * pageSize >= appointments.length}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                    >
                        Trang sau →
                    </button>
                </div>
            </div>

            {/* Bảng Đã khám */}
            <div className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col">
                <h2 className="text-xl font-semibold p-4 border-b bg-gray-50">✅ Danh sách lịch hẹn (Đã khám)</h2>
                <div className="overflow-y-auto" style={{ maxHeight: "400px" }}>
                    <table className="w-full">
                        <thead>
                        <tr className="bg-gray-100 text-gray-700">
                            {INIT_PATIENT_TABLE.map((header, index) => (
                                <th key={index} className="p-4 text-left font-medium">
                                    {header.label}
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {pagedDataAppointments.map((item, rowIndex) => (
                            <tr key={rowIndex} className="border-t hover:bg-gray-50">
                                {INIT_PATIENT_TABLE.map((header, colIndex) => (
                                    <td key={colIndex} className="p-4 text-gray-600">
                                        {header.key === "action" ? renderActions(item.patient_id) : item[header.key] || "--"}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-between items-center p-4 border-t">
                    <button
                        onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                        disabled={page === 1}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                    >
                        ← Trang trước
                    </button>
                    <span>Trang {page}</span>
                    <button
                        onClick={() => setPage((prev) => (prev * pageSize < appointments.length ? prev + 1 : prev))}
                        disabled={page * pageSize >= appointments.length}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                    >
                        Trang sau →
                    </button>
                </div>
            </div>
        </div>
    );
}
