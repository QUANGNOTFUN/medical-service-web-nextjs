"use client";

import { useState } from "react";
import ConfirmationDialog from "@/app/(admin)/_components/dialog/ConfirmationDialog";
import {INIT_PATIENT_TABLE} from "@/app/(doctor)/patient/m_resource/constants";

export default function PatientPage() {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [selectedAction, setSelectedAction] = useState<"view" | "create" | "update" | "delete">("view");

    function handleAction(action: "view" | "create" | "update" | "delete", id?: string) {
        setSelectedAction(action);
        setSelectedId(id || null);
    }

    function handleSelectedId(id: string | null) {
        if (id !== null) {
            setSelectedId(id);
        }
    }

    async function handleUpdate() {
        setSelectedId(null);

    }


    async function handleDeleteSubmit() {
        if (selectedId === null) return;
        try {
            setPatients(prev => prev.filter(patient => patient.id !== selectedId));
            handleAction("view");
        } catch (error) {
            console.error("Delete patient error:", error);
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

    return (
        <div className="p-6 space-y-6">
            <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                <h2 className="text-2xl font-semibold leading-tight mb-4">
                    Bệnh Nhân Chờ Khám
                </h2>
                {renderForm()}
                <table className="min-w-full border border-gray-300 rounded-md">
                    <thead className="bg-blue-200">
                    <tr>
                        {INIT_PATIENT_TABLE.map(header => (
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
                    {mockPatients.map((item, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className="hover:bg-gray-50"
                            onClick={() => typeof item.id === "string" && handleSelectedId(item.id)}
                        >
                            {INIT_PATIENT_TABLE.map(header => (
                                <td
                                    key={header.key}
                                    className="px-4 py-2 border-b text-sm text-gray-600"
                                >
                                    {item[header.key] === "--" && header.key !== "checkbox" && header.key !== "action" ? (
                                        <span className="text-gray-400">{item[header.key]}</span>
                                    ) : (
                                        item[header.key]
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