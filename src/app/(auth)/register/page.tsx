'use client';

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import REGISTER_MUTATION from "@/libs/graphqls/mutations/registerMutations";

export default function RegisterPage() {
    const router = useRouter();
    const [register, { loading, error }] = useMutation(REGISTER_MUTATION);

    const [form, setForm] = useState({
        full_name: '',
        email: '',
        password: '',
        gender: 'OTHER',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const { data } = await register({
                variables: {
                    userData: {
                        ...form,
                    },
                },
            });

            if (data?.register) {
                alert('Đăng ký thành công!');
                router.push('/login');
            }
        } catch (err) {
            console.error('Đăng ký thất bại:', err);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4">
                <h2 className="text-2xl font-bold mb-4 text-center">Đăng ký</h2>

                <input
                    type="text"
                    name="full_name"
                    placeholder="Họ và tên"
                    value={form.full_name}
                    onChange={handleChange}
                    pattern="^[A-Za-zÀ-ỹ\s]+$"
                    className="w-full px-4 py-2 border rounded-md"
                    required
                    minLength={6}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md"
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Mật khẩu"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md"
                    required
                    minLength={6}
                />

                <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md"
                >
                    <option value="MALE">Nam</option>
                    <option value="FEMALE">Nữ</option>
                    <option value="OTHER">Khác</option>
                </select>

                <button
                    type="submit"
                    className="w-full bg-yellow-600 text-white py-2 rounded-md hover:bg-yellow-500"
                    disabled={loading}
                >
                    {loading ? 'Đang đăng ký...' : 'Đăng ký'}
                </button>
                {error && <p className="text-red-600 text-sm">Đăng ký thất bại: {error.message}</p>}
                <p className="text-sm mt-4 text-center">
                    Đã có tài khoản? <a href="/login" className="text-blue-600 hover:underline">Đăng nhập</a>
                </p>
            </form>
        </div>
    );
}
