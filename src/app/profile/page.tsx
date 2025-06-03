"use client";

import React from "react";

export default function ProfilePage() {
    return (
        <div className="min-h-screen flex bg-gray-50">

            {/* Main Content */}
            <main className="flex-1 p-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Hồ sơ khám</h1>

                <div className="bg-white p-6 rounded shadow space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Họ và tên</label>
                            <input
                                type="text"
                                defaultValue="Nguyễn Văn A"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                defaultValue="example@gmail.com"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                            <input
                                type="tel"
                                defaultValue="0123456789"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Ngày sinh</label>
                            <input
                                type="date"
                                defaultValue="1995-01-01"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                    </div>

                    <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Lưu thay đổi
                    </button>
                </div>
            </main>
        </div>
    );
}
