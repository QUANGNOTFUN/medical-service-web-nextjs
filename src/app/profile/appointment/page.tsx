"use client";

import React from "react";
import {
    CalendarCheck,
    Clock,
    User,
    Stethoscope,
    XCircle,
    Eye
} from "lucide-react";

export default function AppointmentsPage() {
    const appointments = [
        {
            id: 1,
            date: "2025-06-05",
            time: "14:00",
            doctor: "BS. Nguyễn Văn A",
            status: "Đang chờ"
        },
        {
            id: 2,
            date: "2025-06-01",
            time: "09:30",
            doctor: "BS. Trần Thị B",
            status: "Đã hoàn thành"
        },
        {
            id: 3,
            date: "2025-06-10",
            time: "11:00",
            doctor: "BS. Lê Văn C",
            status: "Đã hủy"
        }
    ];

    const statusColor = {
        "Đang chờ": "bg-yellow-100 text-yellow-800",
        "Đã hoàn thành": "bg-green-100 text-green-800",
        "Đã hủy": "bg-red-100 text-red-800"
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <CalendarCheck size={24} /> Quản lý lịch hẹn
            </h1>

            <div className="bg-white rounded shadow p-4 space-y-4">
                {appointments.map((appt) => (
                    <div
                        key={appt.id}
                        className="flex justify-between items-center border rounded p-4 hover:bg-gray-50 transition"
                    >
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-gray-800 font-medium">
                                <Clock size={16} /> {appt.date} lúc {appt.time}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Stethoscope size={16} /> {appt.doctor}
                            </div>
                            <div
                                className={`inline-block px-2 py-1 text-xs rounded ${statusColor[appt.status]}`}
                            >
                                {appt.status}
                            </div>
                        </div>

                        <div className="flex gap-3">
                            {appt.status === "Đang chờ" && (
                                <button className="flex items-center gap-1 text-sm text-red-600 hover:text-red-800">
                                    <XCircle size={16} /> Hủy
                                </button>
                            )}
                            <button className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800">
                                <Eye size={16} /> Chi tiết
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
