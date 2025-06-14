"use client";

import { useState } from "react";
import ConfirmationDialog from "@/app/(admin)/_components/dialog/ConfirmationDialog";
import { BadgePlus, Check, Loader, Pencil, Trash2, View, X } from "lucide-react";
import { HEADER_APPOINMENTS_TABLE } from "@/app/(doctor)/appointment-manage/m_resource/constants";
import { useUpdateAppointment } from "@/libs/hooks/appoiment/useUpdateAppointment";
import { useDeleteAppointment } from "@/libs/hooks/appoiment/useDeleteAppointment";
import ActionIconMenu from "@/app/(doctor)/_components/setting/ActionIconMenu";

const mockAppointments = [
    {
        id: "1",
        patient_id: "PAT001",
        schedule_id: "SCH001",
        appointment_type: "Khám tổng quát",
        appointment_date: "2025-06-15T10:00:00Z",
        status: "Chờ xác nhận",
    },
    {
        id: "2",
        patient_id: "PAT002",
        schedule_id: "SCH002",
        appointment_type: "Tái khám",
        appointment_date: "2025-06-16T14:30:00Z",
        status: "Đã xác nhận",
    },
    {
        id: "3",
        patient_id: "PAT003",
        schedule_id: "SCH003",
        appointment_type: "Khám chuyên khoa",
        appointment_date: "2025-06-17T09:00:00Z",
        status: "Hủy",
    },
];

export default function AppointmentManage() {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [selectedAction, setSelectedAction] = useState<"view" | "create" | "update" | "delete">("view");
    const [formData, setFormData] = useState({
        status: "",
        appointment_type: "",
        appointment_date: "",
    });

    // Sử dụng dữ liệu mẫu
    const appointments = mockAppointments;
    const initLoading = false;
    const errorAppointments = null;
    const refetchAppointments = async () => console.log("Mock refetch");

    const { update: updateAppointment, loading: updateLoading, error: errorUpdate } = useUpdateAppointment();
    const { delete: deleteAppointment, loading: deleteLoading, error: errorDelete } = useDeleteAppointment();

    const displayedAppointments = appointments;
    const loading = initLoading || updateLoading || deleteLoading;
    const error = errorAppointments || errorUpdate || errorDelete;

    function handleAction(action: "view" | "create" | "update" | "delete", id?: string) {
        setSelectedAction(action);
        setSelectedId(id || null);

        // Khi chọn update, điền dữ liệu của dòng vào form
        if (action === "update" && id) {
            const selectedAppointment = appointments.find(app => app.id === id);
            if (selectedAppointment) {
                setFormData({
                    status: selectedAppointment.status || "",
                    appointment_type: selectedAppointment.appointment_type || "",
                    appointment_date: selectedAppointment.appointment_date || "",
                });
            }
        }
    }

    function handleSelectedId(id: string | null) {
        if (id !== null) {
            setSelectedId(id);
        }
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    async function handleUpdateSubmit() {
        if (selectedId === null) return;
        try {
            await updateAppointment({
                id: selectedId,
                status: formData.status,
                appointment_type: formData.appointment_type,
                appointment_date: formData.appointment_date,
            });
            await refetchAppointments();
            handleAction("view");
            setFormData({ status: "", appointment_type: "", appointment_date: "" }); // Reset form
        } catch (error) {
            console.error("Update appointment error:", error);
        }
    }

    async function handleDeleteSubmit() {
        if (selectedId === null) return;
        try {
            await deleteAppointment(selectedId);
            await refetchAppointments();
            handleAction("view");
        } catch (error) {
            console.error("Delete appointment error:", error);
        }
    }

    const renderActions = (appointment: any) => (
        <div className="flex space-x-2">
            <button
                className="p-1 text-blue-500 hover:text-blue-700"
                onClick={() => handleAction("update", appointment.id)}
                title="Đồng ý"
            >
                <Check className="w-5 h-5" />
            </button>
            <button
                className="p-1 text-green-500 hover:text-green-700"
                onClick={() => handleAction("update",appointment.id)}
                title="Từ chối"
            >
                <X className="w-5 h-5" />
            </button>
        </div>
    );

    // Chuẩn bị dữ liệu cho bảng
    const tableItems = [
        ...displayedAppointments.map(appointment => ({
            id: appointment.id,
            patient_id: appointment.patient_id || "N/A",
            schedule_id: appointment.schedule_id || "N/A",
            appointment_type: appointment.appointment_type || "N/A",
            appointment_date: appointment.appointment_date
                ? new Date(appointment.appointment_date).toLocaleString()
                : "N/A",
            status: appointment.status || "N/A",
            action: renderActions(appointment),
        })),
        {
            id: "--",
            patient_id: "--",
            schedule_id: "--",
            appointment_type: "--",
            appointment_date: "--",
            status: "--",
            action: "--",
        },
    ];

    const renderForm = () => {
        switch (selectedAction) {
            case "update":
                if (selectedId === null) return null;
                return (
                    <ConfirmationDialog
                        isOpen={selectedAction === "update"}
                        message={"Bạn chắc chứ?"}
                        onClose={() => handleAction("view")}
                        onConfirm={handleUpdateSubmit}
                        title={"Bạn chắc chứ"}
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

    return (
        <div className="container mx-auto p-6">
            {renderForm()}
            <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                <table className="w-full">
                    <thead>
                    <tr className="bg-blue-200 text-gray-700">
                        {HEADER_APPOINMENTS_TABLE.map((header, index) => (
                            <th key={index} className="p-4 text-left font-medium">
                                {header.label}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {tableItems.map((item, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className="border-t hover:bg-gray-50"
                            onClick={() => typeof item.id === "string" && handleSelectedId(item.id)}
                        >
                            {HEADER_APPOINMENTS_TABLE.map((header, colIndex) => (
                                <td key={colIndex} className="p-4 text-gray-600">
                                    {item[header.key] === "--" && colIndex === 0 ? (
                                        <span className="text-gray-400">{item[header.key]}</span>
                                    ) : header.key === "action" ? (
                                        item[header.key]
                                    ) : (
                                        <span>{item[header.key]}</span>
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}