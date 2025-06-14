'use client'

import { useState } from "react";
import { Check, X, Loader } from "lucide-react";

// Dữ liệu mẫu
const mockOverview = {
    totalPatients: 12,
    confirmed: 8,
    pending: 4,
    nextAppointment: {
        time: "09:00",
        patient: "Trần Thị B",
    },
};

const mockAppointments = [
    {
        id: "1",
        time: "08:00 - 08:30",
        patient: "Nguyễn Văn A",
        status: "Đã xác nhận",
    },
    {
        id: "2",
        time: "09:00 - 09:30",
        patient: "Trần Thị B",
        status: "Chưa xác nhận",
    },
    {
        id: "3",
        time: "10:00 - 10:30",
        patient: "Lê Văn C",
        status: "Đã khám",
    },
    {
        id: "4",
        time: "11:00 - 11:30",
        patient: "Phạm Thị D",
        status: "Chưa xác nhận",
    },
];

export default function DoctorDashboardPage() {
    const [appointments, setAppointments] = useState(mockAppointments);
    const [loading, setLoading] = useState(false);

    const handleConfirmAppointment = (id: string) => {
        setLoading(true);
        setTimeout(() => {
            setAppointments(prev =>
                prev.map(app =>
                    app.id === id ? { ...app, status: "Đã xác nhận" } : app
                )
            );
            setLoading(false);
        }, 500); // Giả lập API delay
    };

    const handleCancelAppointment = (id: string) => {
        setLoading(true);
        setTimeout(() => {
            setAppointments(prev =>
                prev.map(app =>
                    app.id === id ? { ...app, status: "Hủy" } : app
                )
            );
            setLoading(false);
        }, 500); // Giả lập API delay
    };

    return (
        <div className="h-screen flex flex-col p-6 bg-gray-100">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Bảng điều khiển bác sĩ</h1>
            <div className="flex flex-1 space-x-6">
                {/* Tổng quan hôm nay */}
                <div className="w-1/2 p-4 bg-gray-50 rounded-xl shadow">
                    <h2 className="text-lg font-semibold mb-4">Tổng quan hôm nay</h2>
                    <div className="space-y-3">
                        <div className="bg-white p-4 rounded-md shadow flex justify-between">
                            <span>Bệnh nhân hôm nay</span>
                            <span className="font-bold text-blue-600">{mockOverview.totalPatients}</span>
                        </div>
                        <div className="bg-white p-4 rounded-md shadow flex justify-between">
                            <span>Đã xác nhận</span>
                            <span className="font-bold text-green-600">{mockOverview.confirmed}</span>
                        </div>
                        <div className="bg-white p-4 rounded-md shadow flex justify-between">
                            <span>Chờ xác nhận</span>
                            <span className="font-bold text-yellow-600">{mockOverview.pending}</span>
                        </div>
                        <div className="bg-white p-4 rounded-md shadow">
                            <p className="text-sm text-gray-600 mb-1">Cuộc hẹn kế tiếp:</p>
                            <p className="font-medium text-gray-800">
                                {mockOverview.nextAppointment.time} - {mockOverview.nextAppointment.patient}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Lịch hẹn hôm nay */}
                <div className="w-1/2 p-4 bg-white rounded-xl shadow overflow-y-auto">
                    <h2 className="text-lg font-semibold mb-4">Lịch hẹn hôm nay</h2>
                    {loading && <Loader className="w-6 h-6 animate-spin mx-auto" />}
                    <ul className="space-y-3">
                        {appointments.map((item, index) => (
                            <li
                                key={index}
                                className="border border-gray-200 rounded-md p-3 shadow-sm hover:bg-gray-50 flex justify-between items-center"
                            >
                                <div>
                                    <div className="text-sm font-medium text-gray-800">{item.time}</div>
                                    <div className="text-sm text-gray-600">{item.patient}</div>
                                    <div
                                        className={`text-xs mt-1 ${
                                            item.status === "Đã xác nhận"
                                                ? "text-green-600"
                                                : item.status === "Chưa xác nhận"
                                                    ? "text-yellow-600"
                                                    : item.status === "Đã khám"
                                                        ? "text-blue-600"
                                                        : "text-red-600"
                                        }`}
                                    >
                                        {item.status}
                                    </div>
                                </div>
                                {item.status === "Chưa xác nhận" && (
                                    <div className="flex space-x-2">
                                        <button
                                            className="p-1 text-green-500 hover:text-green-700"
                                            onClick={() => handleConfirmAppointment(item.id)}
                                            title="Xác nhận"
                                        >
                                            <Check className="w-5 h-5" />
                                        </button>
                                        <button
                                            className="p-1 text-red-500 hover:text-red-700"
                                            onClick={() => handleCancelAppointment(item.id)}
                                            title="Hủy"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Thông báo hoặc thống kê thay cho bảng bệnh nhân */}
            <div className="mt-6 p-4 bg-white rounded-xl shadow">
                <h2 className="text-lg font-semibold mb-4">Thông báo gần đây</h2>
                <ul className="space-y-2">
                    {[
                        { message: "Bệnh nhân Nguyễn Văn A đã đặt lịch hẹn mới.", time: "08:30" },
                        { message: "Cuộc hẹn của Trần Thị B đã được xác nhận.", time: "09:00" },
                        { message: "Hệ thống đã cập nhật hồ sơ bệnh nhân.", time: "10:15" },
                    ].map((item, index) => (
                        <li key={index} className="text-sm text-gray-600">
                            <span className="font-medium">{item.time}</span> - {item.message}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}