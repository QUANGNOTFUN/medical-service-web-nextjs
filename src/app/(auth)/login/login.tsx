'use client';
import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";


export default function LoginPage() {
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const {setLoading} = useLoading();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data: any) => {
        console.log("data form=> ", data)
        setLoading(true)
        const res = await signIn('credentials', {
            redirect: false,
            email: data.email,
            password: data.password
        })

        if (res?.error) {
            console.log("err=> ", res.error)
            setLoading(false);
            enqueueSnackbar("Incorrect email or password!", { variant: 'error' })
        } else {
            router.push('/')
            setLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Đăng nhập</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 mt-1 border rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 mt-1 border rounded-md"
                            required
                            minLength={6}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                        disabled={loading}
                    >
                        {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                    </button>
                    {error && (
                        <p className="text-red-600 text-sm">
                            Đăng nhập thất bại: {error.message}
                        </p>
                    )}
                </form>
                <p className="text-sm mt-4 text-center">
                    Chưa có tài khoản? <a href="/register" className="text-blue-600 hover:underline">Đăng ký</a>
                </p>

            </div>
        </div>
    );
}
