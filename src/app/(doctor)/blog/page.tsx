"use client";

import { BLOG_TABLE } from "@/app/(doctor)/m_resource/FormData";
import ActionIconMenu from "@/app/(doctor)/_components/setting/ActionIconMenu";


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
            {/* Form tạo bài viết */}
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
            <div className="bg-white shadow-lg rounded-xl p-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                    🗂️ Danh sách bài viết đã đăng
                </h2>
                <div className="flex justify-end">
                    <ActionIconMenu settings={settings} />
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300 rounded-md">
                        <thead className="bg-blue-200">
                        <tr>
                            {BLOG_TABLE.map((header) => (
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
                            {BLOG_TABLE.map((header) => (
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
            </div>
        </div>
    );
}
