'use client'

import {PATIENT_TABLE} from "@/app/(doctor)/m_resource/FormData";

export default function DoctorDashboardPage() {
    return (
        <div className= " h-screen flex-rol flex-2">
            <div className="flex flex-1">
                <div className="w-1/2 p-4 bg-gray-50">
                    <h2 className="text-lg font-semibold mb-4">Tổng quan hôm nay</h2>

                    <div className="space-y-3">
                        <div className="bg-white p-4 rounded-md shadow flex justify-between">
                            <span>Bệnh nhân hôm nay</span>
                            <span className="font-bold text-blue-600">12</span>
                        </div>
                        <div className="bg-white p-4 rounded-md shadow flex justify-between">
                            <span>Đã xác nhận</span>
                            <span className="font-bold text-green-600">8</span>
                        </div>
                        <div className="bg-white p-4 rounded-md shadow flex justify-between">
                            <span>Chờ xác nhận</span>
                            <span className="font-bold text-yellow-600">4</span>
                        </div>
                        <div className="bg-white p-4 rounded-md shadow">
                            <p className="text-sm text-gray-600 mb-1">Cuộc hẹn kế tiếp:</p>
                            <p className="font-medium text-gray-800">09:00 - Trần Thị B</p>
                        </div>
                    </div>
                </div>

                <div className="w-1/2 p-4 overflow-y-auto bg-white">
                    <h2 className="text-lg font-semibold mb-4">Lịch hẹn hôm nay</h2>
                    <ul className="space-y-3">
                        {[
                            { time: '08:00 - 08:30', patient: 'Nguyễn Văn A', status: 'Đã xác nhận' },
                            { time: '09:00 - 09:30', patient: 'Trần Thị B', status: 'Chưa xác nhận' },
                            { time: '10:00 - 10:30', patient: 'Lê Văn C', status: 'Đã khám' },
                        ].map((item, index) => (
                            <li key={index} className="border border-gray-200 rounded-md p-3 shadow-sm hover:bg-gray-50">
                                <div className="text-sm font-medium text-gray-800">{item.time}</div>
                                <div className="text-sm text-gray-600">{item.patient}</div>
                                <div className={`text-xs mt-1 ${
                                    item.status === 'Đã xác nhận'
                                        ? 'text-green-600'
                                        : item.status === 'Chưa xác nhận'
                                            ? 'text-yellow-600'
                                            : 'text-blue-600'
                                }`}>
                                    {item.status}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>


            </div>
            <div className="flex-1 bg-yellow-200 p-4">
                <h1 className="text-xl font-bold mb-4">Danh sách bệnh nhân</h1>
                <table className="min-w-full border border-gray-300 rounded-md">
                    <thead className="bg-gray-100">
                    <tr>
                        {PATIENT_TABLE.map((header) => (
                            <th
                                key={header.key}
                                className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700"
                            >
                                {header.label}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="hover:bg-gray-50">
                        {PATIENT_TABLE.map((header) => (
                            <td
                                key={header.key}
                                className="px-4 py-2 border-b text-sm text-gray-600"
                            >
                                {header.key === "checkbox" ? (
                                    <input type="checkbox"/>
                                ) : (
                                    "--"
                                )}
                            </td>
                        ))}
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}