"use client";

import { useState } from "react";
import { Pencil, Trash2, Plus, Loader } from "lucide-react";
import dayjs from "dayjs";
import { INIT_PATIENT_TABLE } from "@/app/(doctor)/patient/m_resource/constants";
import MedicalExaminationForm from "@/app/(doctor)/patient/m_resource/MedicalExaminationForm";
import { MedicalExaminationInput } from "@/types/examination_report";
import {useGetAppointments} from "@/libs/hooks/appoiment/useGetAppointment";
import {useCreateExamination} from "@/libs/hooks/a/useCreateExaminationReport";

export default function PatientPage() {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [selectedAction, setSelectedAction] = useState<"view" | "create" | "update" | "delete" | null>(null);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(5);

    // const {
    //     appointments,
    //     total,
    //     loading: initLoading,
    //     error: errorAppointments,
    //     refetch: refetchAppointments,
    // } = useGetAppointments({ doctor_id: doctorId, page, pageSize });

    // const{create,loading:loadingCreate, error: errorCreate} = useCreateExamination()
    //
    // const loading =  loadingCreate;
    // const error =  errorCreate;

    const appointments = [
        {
            id: "1",
            name: "Nguyễn Văn A",
            gender: "Nam",
            category: "Nội tổng quát",
            update_at: dayjs().subtract(1, "day").format("YYYY-MM-DD"),
            plan_id: "KH-001",
            text: "✔",
            appointment_id: "1",
        },
        {
            id: "2",
            name: "Trần Thị B",
            gender: "Nữ",
            category: "Nhi khoa",
            update_at: dayjs().format("YYYY-MM-DD"),
            plan_id: "KH-002",
            text: "✘",
            appointment_id: "2",
        },
        {
            id: "3",
            name: "Lê Văn C",
            gender: "Nam",
            category: "Ngoại tổng hợp",
            update_at: dayjs().subtract(2, "day").format("YYYY-MM-DD"),
            plan_id: "KH-003",
            text: "✔",
            appointment_id: "3",
        },
    ];

    function handleAction(action: "create" | "update" | "delete", id?: string) {
        setSelectedAction(action);
        setSelectedId(id || null);
    }

    const handleCreate = async (input: MedicalExaminationInput) => {
        console.log("Tạo phiếu khám:", input);
        setSelectedAction(null);
    };

    const renderForm = () => {
        if (selectedAction === "create" && selectedId) {
            return (
                <MedicalExaminationForm
                    appointmentId={selectedId}
                    onSubmit={handleCreate}
                    onClose={() => setSelectedAction(null)}
                />
            );
        }
        return null;
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

    // if (loading) return <Loader className="w-8 h-8 animate-spin mx-auto mt-10" />;
    // if (error)
    //     return (
    //         <div className="text-red-500 text-center mt-10">
    //             {error.name}: {error.message}
    //         </div>
    //     );

    return (
        <div className="min-h-screen flex flex-col gap-6 p-6 bg-gray-100">
            <div className="container mx-auto p-6">
                <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                    {renderForm()}
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
                                        {header.key === "action"
                                            ? renderActions(item.id)
                                            : item[header.key] || "--"}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex justify-between items-center mt-4">
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
    );
}
