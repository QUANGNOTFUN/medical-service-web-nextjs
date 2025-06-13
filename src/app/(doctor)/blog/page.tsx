"use client";

import { BLOG_TABLE } from "@/app/(doctor)/m_resource/FormData";
import ActionIconMenu from "@/app/(doctor)/_components/setting/ActionIconMenu";
import DoctorTableLayout from "@/app/(doctor)/_components/Layout/DoctorTableLayout";
import {HEADER_APPOINMENTS_TABLE} from "@/app/(doctor)/appointment-manage/m_resource/constants";
import {useState} from "react";
import {useGetAppointments} from "@/libs/hooks/appoiment/useGetAppointment";
import {useUpdateAppointment} from "@/libs/hooks/appoiment/useUpdateAppointment";
import {useDeleteAppointment} from "@/libs/hooks/appoiment/useDeleteAppointment";
import {BadgePlus, Pencil, Trash2, View} from "lucide-react";

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
const settings =[
    {
        title: "Chỉnh sửa",
        icon:"Edit",
        action: () => alert("Chỉnh sửa")
    },
    {
        title: "Xóa",
        icon:"Trash",
        action: () => alert("Xóa")
    }
]


export default function BlogPage() {
    return (
        <div className="min-h-screen flex flex-col gap-6 p-6 bg-gray-100">
            <div className="bg-white shadow-lg rounded-xl p-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                    📝 Tạo bài viết mới
                </h2>


                <div className="grid grid-cols-3 gap-3 bg-gray-100 p-3 rounded-lg font-medium text-gray-700">
                    <p>Tiêu đề</p>
                    <p>Mô tả</p>
                    <p>Thuộc loại</p>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-3 items-center">
                    <input
                        type="text"
                        placeholder="Nhập tiêu đề"
                        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="text"
                        placeholder="Nhập mô tả"
                        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <select className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
                        <option>-- Chọn loại --</option>
                        <option>Chính trị</option>
                        <option>Khoa học</option>
                        <option>Giáo dục</option>
                    </select>
                </div>

                <div className="mt-6 flex justify-end">
                    <button className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition-all duration-200">
                        Tạo bài viết
                    </button>
                </div>
            </div>

            {/* Danh sách bài viết */}
            <div className="container mx-auto p-6">
                <DoctorTableLayout
                    tableProps={{
                        headers: HEADER_APPOINMENTS_TABLE,
                        items: tableItems,
                        action: {type: selectedAction, onClick: (item) => handleSelectedId(item as string)},
                    }}
                    paginationProps={undefined}
                />
            </div>
        </div>
    );
}
