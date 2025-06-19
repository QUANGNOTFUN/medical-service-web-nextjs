'use client';

import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';
import { GET_USER_BY_ID } from '@/libs/graphqls/queries/profile';

export default function ProfilePage() {
    const { data: session, status } = useSession();

    const { data, loading, error } = useQuery(GET_USER_BY_ID, {
        variables: {
            input: { id: session?.user?.id }, // dùng optional chaining
        },
        skip: !session?.user?.id, // bỏ qua nếu chưa có id
    });

    const user = data?.getUserById;

    if (loading) return <p className="p-4">Đang tải thông tin...</p>;
    if (error) return <p className="text-red-500 p-4">Lỗi: {error.message}</p>;
    if (!user) return <p className="p-4">Không tìm thấy người dùng.</p>;

    return (
        <div className="min-h-screen flex bg-gray-50">
            <main className="flex-1 p-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Hồ sơ khám</h1>

                <div className="bg-white p-6 rounded shadow space-y-4">

                    {/* Avatar nếu có */}
                    {user.avatar && (
                        <div className="mt-6">
                            <label className="block text-sm font-medium text-gray-700">Ảnh đại diện</label>
                            <img
                                src={user.avatar}
                                alt="Avatar"
                                className="mt-2 w-32 h-32 object-cover rounded-full border"
                            />
                        </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Họ và tên</label>
                            <input
                                type="text"
                                value={user.full_name || ''}
                                readOnly
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                value={user.email || ''}
                                readOnly
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                            <input
                                type="tel"
                                value={user.phone || ''}
                                readOnly
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Ngày sinh</label>
                            <input
                                type="date"
                                value={user.date_of_birth?.slice(0, 10) || ''}
                                readOnly
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100"
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Địa chỉ</label>
                            <input
                                type="text"
                                value={user.address || ''}
                                readOnly
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100"
                            />
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
