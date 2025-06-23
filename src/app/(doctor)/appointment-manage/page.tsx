"use client";

import { useState } from "react";
import ConfirmationDialog from "@/app/(admin)/_components/dialog/ConfirmationDialog";
import { Check, Loader, X } from "lucide-react";
import { HEADER_APPOINMENTS_TABLE } from "@/app/(doctor)/appointment-manage/m_resource/constants";
import { useUpdateAppointment } from "@/libs/hooks/appoiment/useUpdateAppointment";
import { useGetAppointments } from "@/libs/hooks/appoiment/useGetAppointment";

export default function AppointmentManage() {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [selectedAction, setSelectedAction] = useState<"view" | "create" | "update" | "delete" | "detail">("view");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const doctorId = "6eaa03f7-dc9c-415b-8066-cb72d936d1d2";

    const {
        appointments,
        total,
        loading: initLoading,
        error: errorAppointments,
        refetch: refetchAppointments,
    } = useGetAppointments({ doctor_id: doctorId, page, pageSize });

    const {
        update: updateAppointment,
        loading: updateLoading,
        error: errorUpdate,
    } = useUpdateAppointment();

    const loading = initLoading || updateLoading;
    const error = errorAppointments || errorUpdate;

    function handleAction(action: "view" | "create" | "update" | "delete" | "detail", id?: number) {
        setSelectedAction(action);
        setSelectedId(id || null);
    }

    async function handleUpdateStatus(status: "CONFIRMED" | "CANCELLED") {
        if (selectedId === null) return;

        try {
            await updateAppointment({
                appointment_id: selectedId,
                status,
            });
            await refetchAppointments();
            setSelectedAction("view");
            setSelectedId(null);
        } catch (error) {
            console.error("Update status failed:", error);
        }
    }

    const renderActions = (appointment_id: number) => {
        const appointment = appointments.find(app => app.appointment_id === appointment_id);
        const status = appointment?.status;

        return (
            <div className="flex space-x-2 justify-center">
                <button
                    className="p-1 text-blue-500 hover:text-blue-700"
                    onClick={() => handleAction("detail", appointment_id)}
                    title="Xem chi tiết"
                >
                    👁
                </button>
                {status === "pending" && (
                    <>
                        <button
                            className="p-1 text-green-600 hover:text-green-800"
                            onClick={() => handleAction("update", appointment_id)}
                            title="Đồng ý"
                        >
                            <Check className="w-5 h-5" />
                        </button>
                        <button
                            className="p-1 text-red-500 hover:text-red-700"
                            onClick={() => handleAction("delete", appointment_id)}
                            title="Từ chối"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </>
                )}
            </div>
        );
    };

    const renderForm = () => {
        if (selectedId === null) return null;
        const appointment = appointments.find(app => app.appointment_id === selectedId);
        if (!appointment) return null;

        switch (selectedAction) {
            case "update":
                return (
                    <ConfirmationDialog
                        isOpen={true}
                        title="Xác nhận lịch hẹn"
                        message="Bạn chắc chắn muốn xác nhận lịch hẹn này?"
                        onClose={() => handleAction("view")}
                        onConfirm={() => handleUpdateStatus("CONFIRMED")}
                        confirmText="Đồng ý"
                        cancelText="Hủy"
                    />
                );
            case "delete":
                return (
                    <ConfirmationDialog
                        isOpen={true}
                        title="Hủy lịch hẹn"
                        message="Bạn chắc chắn muốn hủy lịch hẹn này?"
                        onClose={() => handleAction("view")}
                        onConfirm={() => handleUpdateStatus("CANCELLED")}
                        confirmText="Từ chối"
                        cancelText="Hủy"
                    />
                );
            case "detail":
                return (
                    <ConfirmationDialog
                        isOpen={true}
                        title="Chi tiết lịch hẹn"
                        message={
                            <div className="space-y-2">
                                <div><strong>Loại hẹn:</strong> {appointment.appointment_type}</div>
                                <div><strong>Ngày hẹn:</strong> {new Date(appointment.appointment_date).toLocaleString()}</div>
                                <div><strong>Trạng thái:</strong> {appointment.status}</div>
                                <div><strong>Ghi chú:</strong> {appointment.notes || "Không có"}</div>
                            </div>
                        }
                        onClose={() => handleAction("view")}
                        confirmText="Đóng"
                        hideCancel
                    />
                );
            default:
                return null;
        }
    };

    const tableItems = appointments.map(app => ({
        appointment_id: app.appointment_id,
        patient_id: app.patient_id || "N/A",
        schedule_id: app.slot_id || "N/A",
        appointment_type: app.appointment_type || "N/A",
        appointment_date: app.appointment_date
            ? new Date(app.appointment_date).toLocaleString()
            : "N/A",
        status: app.status || "N/A",
        action: renderActions(app.appointment_id),
    }));

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
                        <tr key={rowIndex} className="border-t hover:bg-gray-50">
                            {HEADER_APPOINMENTS_TABLE.map((header, colIndex) => (
                                <td key={colIndex} className="p-4 text-gray-600">
                                    {header.key === "action"
                                        ? item[header.key]
                                        : <span>{item[header.key]}</span>}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="flex justify-between items-center mt-4 px-2">
                    <div>
                        Trang {page} / {Math.ceil(total / pageSize)}
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setPage(p => Math.max(p - 1, 1))}
                            disabled={page === 1}
                            className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
                        >
                            Trước
                        </button>
                        <button
                            onClick={() => setPage(p => (p < Math.ceil(total / pageSize) ? p + 1 : p))}
                            disabled={page >= Math.ceil(total / pageSize)}
                            className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
                        >
                            Sau
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
