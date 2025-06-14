"use client";

import { useState } from "react";
import { Loader, View, BadgePlus, Pencil, Trash2 } from "lucide-react";
import ConfirmationDialog from "@/app/(admin)/_components/dialog/ConfirmationDialog";
import {INIT_PATIENT_TABLE} from "@/app/(doctor)/patient/m_resource/constants";

// Dữ liệu mẫu
const mockPatients = [
    {
        id: "1",
        name: "Nguyễn Văn A",
        gender: "Nam",
        phone: "0901234567",
        address: "123 Đường Láng, Hà Nội",
    },
    {
        id: "2",
        name: "Trần Thị B",
        gender: "Nữ",
        phone: "0912345678",
        address: "456 Nguyễn Trãi, TP.HCM",
    },
    {
        id: "3",
        name: "Lê Văn C",
        gender: "Nam",
        phone: "0923456789",
        address: "789 Lê Lợi, Đà Nẵng",
    },
];

export default function PatientPage() {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [selectedAction, setSelectedAction] = useState<"view" | "create" | "update" | "delete">("view");
    const [patients, setPatients] = useState(mockPatients);
    const [formData, setFormData] = useState({
        name: "",
        gender: "",
        phone: "",
        address: "",
    });
    const [checkedPatients, setCheckedPatients] = useState<string[]>([]);

    function handleAction(action: "view" | "create" | "update" | "delete", id?: string) {
        setSelectedAction(action);
        setSelectedId(id || null);
        if (action === "update" && id) {
            const selectedPatient = patients.find(patient => patient.id === id);
            if (selectedPatient) {
                setFormData({
                    name: selectedPatient.name,
                    gender: selectedPatient.gender,
                    phone: selectedPatient.phone,
                    address: selectedPatient.address,
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

    function handleCheckboxChange(id: string) {
        setCheckedPatients(prev =>
            prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
        );
    }

    async function handleCreateSubmit() {
        if (!formData.name || !formData.gender || !formData.phone || !formData.address) {
            alert("Vui lòng điền đầy đủ thông tin!");
            return;
        }
        try {
            setPatients(prev => [
                ...prev,
                {
                    id: String(prev.length + 1),
                    name: formData.name,
                    gender: formData.gender,
                    phone: formData.phone,
                    address: formData.address,
                },
            ]);
            setFormData({ name: "", gender: "", phone: "", address: "" });
        } catch (error) {
            console.error("Create patient error:", error);
        }
    }

    async function handleUpdateSubmit() {
        if (selectedId === null) return;
        try {
            setPatients(prev =>
                prev.map(patient =>
                    patient.id === selectedId
                        ? { ...patient, ...formData }
                        : patient
                )
            );
            handleAction("view");
            setFormData({ name: "", gender: "", phone: "", address: "" });
        } catch (error) {
            console.error("Update patient error:", error);
        }
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

    const renderActions = (patient: any) => (
        <div className="flex space-x-2">
            <button
                className="p-1 text-blue-500 hover:text-blue-700"
                onClick={() => handleAction("view", patient.id)}
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
                onClick={() => handleAction("update", patient.id)}
                title="Sửa"
            >
                <Pencil className="w-5 h-5" />
            </button>
            <button
                className="p-1 text-red-500 hover:text-red-700"
                onClick={() => handleAction("delete", patient.id)}
                title="Xóa"
            >
                <Trash2 className="w-5 h-5" />
            </button>
        </div>
    );

    const tableItems = [
        ...patients.map(patient => ({
            id: patient.id,
            name: patient.name || "N/A",
            gender: patient.gender || "N/A",
            phone: patient.phone || "N/A",
            address: patient.address || "N/A",
            checkbox: (
                <input
                    type="checkbox"
                    checked={checkedPatients.includes(patient.id)}
                    onChange={() => handleCheckboxChange(patient.id)}
                />
            ),
            action: renderActions(patient),
        })),
        {
            id: "--",
            name: "--",
            gender: "--",
            phone: "--",
            address: "--",
            checkbox: <input type="checkbox" disabled />,
            action: "--",
        },
    ];

    const renderForm = () => {
        switch (selectedAction) {
            case "delete":
                if (selectedId === null) return null;
                return (
                    <ConfirmationDialog
                        isOpen={selectedAction === "delete"}
                        message={"Bạn có chắc chắn muốn xóa bệnh nhân này không?"}
                        onClose={() => handleAction("view")}
                        onConfirm={handleDeleteSubmit}
                        title={"Xác nhận xóa bệnh nhân"}
                        confirmText="Chắc chắn"
                        cancelText="Hủy"
                    />
                );
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
            <div className="bg-white shadow-lg rounded-xl p-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">📝 Thêm bệnh nhân mới</h2>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-gray-700">Tên</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Nhập tên"
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
                            placeholder="Nhập số điện thoại"
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
                            placeholder="Nhập địa chỉ"
                            className="p-2 border border-gray-300 rounded-lg w-full"
                        />
                    </div>
                </div>
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={handleCreateSubmit}
                        className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700"
                    >
                        Thêm bệnh nhân
                    </button>
                </div>
            </div>

            {/* Bảng danh sách bệnh nhân */}
            <div className="bg-white shadow-lg rounded-xl overflow-hidden">
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
                    {tableItems.map((item, rowIndex) => (
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