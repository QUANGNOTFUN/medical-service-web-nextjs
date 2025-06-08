"use client"
import { PATIENT_TABLE } from "@/app/(doctor)/m_resource/FormData";
import ActionIconMenu from "../_components/setting/ActionIconMenu";

const settings = [
    {
        title: "update bệnh nhân",
        icon: "PlusCircle",
        action: () => alert("Chỉnh sửa bệnh nhân"),
    },
    {
        title: "Xóa bệnh nhân",
        icon: "Trash",
        action: () => alert("Xóa bệnh nhân"),
    },
];

export default function PatientPage() {
    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold text-gray-800">Danh sách bệnh nhân</h1>
                <ActionIconMenu settings={settings} />
            </div>

            <table className="min-w-full border border-gray-300 rounded-md">
                <thead className="bg-blue-200">
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
                                <input type="checkbox" />
                            ) : (
                                "--"
                            )}
                        </td>
                    ))}
                </tr>
                </tbody>
            </table>
        </div>
    );
}
