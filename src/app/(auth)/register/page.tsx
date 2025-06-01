"use client";

import { useForm } from "react-hook-form";
import { getErrorMessage } from "@/app/utils/common";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useLoading } from "@/app/context/loadingContext";
import { useMutation } from "@apollo/client";
import React from "react";
import REGISTER_MUTATION from "@/libs/graphqls/mutations/registerMutations";

const Register = () => {
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const { setLoading } = useLoading();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [registerUser] = useMutation(REGISTER_MUTATION);

    const onSubmit = async (data: any) => {
        setLoading(true);
        try {
            const userData = {
                ...data,
                date_of_birth: data.date_of_birth || null,
            };
            console.log("Sending userData:", userData);

            await registerUser({ variables: { userData } });

            enqueueSnackbar("Đăng ký thành công!", { variant: "success" });
            router.push("/login");
        } catch (error) {
            enqueueSnackbar("Đăng ký thất bại!", { variant: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-md bg-white p-6 rounded shadow space-y-4"
            >
                <h2 className="text-2xl font-semibold text-center">Đăng ký</h2>

                <input
                    {...register("full_name", { required: "Họ tên không được để trống" })}
                    placeholder="Họ và tên"
                    className="w-full border px-4 py-2 rounded"
                />
                {errors.full_name && (
                    <p className="text-sm text-red-500">{getErrorMessage(errors.full_name)}</p>
                )}

                <input
                    {...register("email", {
                        required: "Email là bắt buộc",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Email không hợp lệ",
                        },
                    })}
                    placeholder="Email"
                    type="email"
                    className="w-full border px-4 py-2 rounded"
                />
                {errors.email && (
                    <p className="text-sm text-red-500">{getErrorMessage(errors.email)}</p>
                )}

                <input
                    {...register("password", {
                        required: "Mật khẩu là bắt buộc",
                        minLength: { value: 6, message: "Ít nhất 6 ký tự" },
                    })}
                    placeholder="Mật khẩu"
                    type="password"
                    className="w-full border px-4 py-2 rounded"
                />
                {errors.password && (
                    <p className="text-sm text-red-500">{getErrorMessage(errors.password)}</p>
                )}

                <input
                    {...register("phone", {
                        pattern: {
                            value: /^[0-9]{9,11}$/,
                            message: "Số điện thoại không hợp lệ",
                        },
                    })}
                    placeholder="Số điện thoại"
                    className="w-full border px-4 py-2 rounded"
                />
                {errors.phone && (
                    <p className="text-sm text-red-500">{getErrorMessage(errors.phone)}</p>
                )}

                <input
                    {...register("address")}
                    placeholder="Địa chỉ"
                    className="w-full border px-4 py-2 rounded"
                />

                <select
                    {...register("gender", { required: "Vui lòng chọn giới tính" })}
                    className="w-full border px-4 py-2 rounded"
                >
                    <option value="">-- Chọn giới tính --</option>
                    <option value="MALE">Nam</option>
                    <option value="FEMALE">Nữ</option>
                    <option value="OTHER">Khác</option>
                </select>
                {errors.gender && (
                    <p className="text-sm text-red-500">{getErrorMessage(errors.gender)}</p>
                )}

                <input
                    {...register("date_of_birth")}
                    type="date"
                    className="w-full border px-4 py-2 rounded"
                />

                <select
                    {...register("role", { required: "Vai trò là bắt buộc" })}
                    className="w-full border px-4 py-2 rounded"
                >
                    <option value="USER">Người dùng</option>
                    <option value="DOCTOR">Bác sĩ</option>
                    <option value="ADMIN">Quản trị</option>
                </select>
                {errors.role && (
                    <p className="text-sm text-red-500">{getErrorMessage(errors.role)}</p>
                )}

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500"
                >
                    Đăng ký
                </button>

                <p className="text-center text-sm">
                    Đã có tài khoản?{" "}
                    <a href="/login" className="text-blue-600 hover:underline">
                        Đăng nhập
                    </a>
                </p>
            </form>
        </div>
    );
};

export default Register;
