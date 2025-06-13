"use client";

import { useState } from "react";
import DoctorTableLayout from "@/app/(doctor)/_components/Layout/DoctorTableLayout";
import ConfirmationDialog from "@/app/(admin)/_components/dialog/ConfirmationDialog";
import {BadgePlus, Loader, Pencil, Trash2, View} from "lucide-react";
import {HEADER_APPOINMENTS_TABLE} from "@/app/(doctor)/appointment-manage/m_resource/constants";
import {useGetAppointments} from "@/libs/hooks/appoiment/useGetAppointment";
import { useUpdateAppointment } from "@/libs/hooks/appoiment/useUpdateAppointment";
import {useDeleteAppointment} from "@/libs/hooks/appoiment/useDeleteAppointment";

export default function AppointmentManage() {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [selectedAction, setSelectedAction] = useState<"view" | "create" | "update" | "delete">("view");
    const { appointments, loading: initLoading, error: errorAppointments, refetch: refetchAppointments } = useGetAppointments();
    const { update: updateAppointment, loading: updateLoading, error: errorUpdate } = useUpdateAppointment();
    const { delete: deleteAppointment, loading: deleteLoading, error: errorDelete } = useDeleteAppointment();

    const displayedAppointments =  appointments;

    const loading = initLoading || updateLoading || deleteLoading ;
    const error = errorAppointments || errorUpdate || errorDelete ;

    function handleAction(action: "view" | "create" | "update" | "delete", id?: string) {
        setSelectedAction(action);
        setSelectedId(id || null);
    }

    function handleSelectedId(id: string | null) {
        if (id !== null) {
            setSelectedId(id);
        }
    }


    async function handleDeleteSubmit() {
        if (selectedId === null) return;
        try {
            await deleteAppointment(selectedId);
            await refetchAppointments();
            handleAction("view");
        } catch (error) {
            console.error("Delete doctor error:", error);
        }
    }

    // Render cột hành động
    const renderActions = (appointment: any) => (
        <div className="flex space-x-2">
            <button
                className="p-1 text-blue-500 hover:text-blue-700"
                onClick={() => handleAction("view", appointment.id)}
                title="Xem"
            >
                <View className="w-5 h-5" />
            </button>
            <button
                className="p-1 text-green-500 hover:text-green-700"
                onClick={() => handleAction("create")}
                title="Thêm"
            >
                <BadgePlus className="w-5 h-5" />
            </button>
            <button
                className="p-1 text-yellow-500 hover:text-yellow-700"
                onClick={() => handleAction("update", appointment.id)}
                title="Sửa"
            >
                <Pencil className="w-5 h-5" />
            </button>
            <button
                className="p-1 text-red-500 hover:text-red-700"
                onClick={() => handleAction("delete", appointment.id)}
                title="Xóa"
            >
                <Trash2 className="w-5 h-5" />
            </button>
        </div>
    );
    // Chuẩn bị dữ liệu cho bảng
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
        // Thêm hàng dữ liệu cuối
        {
            id: "--",
            patient_id: "--",
            schedule_id: "--",
            appointment_type: "--",
            appointment_date: "--",
            status: "--",
        }
    ];

    const renderForm = () => {
        switch (selectedAction) {
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
        // if (error)
        //     return (
        //         <div className="text-red-500 text-center mt-10">
        //             {error.name}: {error.message}
        //         </div>
        //     );

    return (
        <div className="container mx-auto p-6">
            {renderForm()}
            <DoctorTableLayout
                tableProps={{
                headers: HEADER_APPOINMENTS_TABLE,
                items: tableItems,
                action: {type: selectedAction, onClick: (item) => handleSelectedId(item as string)},
            }}
                paginationProps={undefined}
            />
        </div>
    );
}