"use client";

import Image from "next/image";

interface Props {
    loading: boolean;
    error: any;
    user: any;
    patient: any;
    form: {
        full_name: string;
        date_of_birth: string;
        address: string;
        gender: string;
        phone: string;
        avatarFile: File | null;
        avatarPreview: string;
    };
    editMode: boolean;
    updating: boolean;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleEditClick: () => void;
    handleCancelClick: () => void;
    handleSubmit: (e: React.FormEvent) => void;
    translateGender: (g: string) => string;
}

export default function Profile({
                                    loading,
                                    error,
                                    user,
                                    patient,
                                    form,
                                    editMode,
                                    updating,
                                    handleInputChange,
                                    handleAvatarChange,
                                    handleEditClick,
                                    handleCancelClick,
                                    handleSubmit,
                                    translateGender,
                                }: Props) {
    if (loading) return <p className="p-4">Đang tải thông tin...</p>;
    if (error) return <p className="text-red-600 p-4">Lỗi: {error.message}</p>;
    if (!user) return <p className="p-4">Không tìm thấy người dùng.</p>;

    return (
        <div className="min-h-screen  p-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Thông tin bệnh nhân</h1>
                    {!editMode ? (
                        <button onClick={handleEditClick} className="hover:opacity-80">
                            <img src="/icons8-edit.gif" alt="Edit" className="w-6 h-6" />
                        </button>
                    ) : (
                        <div className="space-x-2">
                            <button
                                type="submit"
                                form="edit-form"
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                                disabled={updating}
                            >
                                {updating ? "Đang lưu..." : "Lưu"}
                            </button>
                            <button
                                onClick={handleCancelClick}
                                className="border border-gray-400 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                            >
                                Hủy
                            </button>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow text-center">
                        <div className="relative w-32 h-32 mx-auto">
                            <Image
                                src={form.avatarPreview || user.avatar || "/default-avatar.png"}
                                alt="Avatar"
                                width={128}
                                height={128}
                                className="w-full h-full object-cover rounded-full border"
                            />
                            {editMode && (
                                <>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleAvatarChange}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                    <div className="absolute top-0 right-0 bg-blue-600 text-white rounded-full p-1 text-xs shadow-md">
                                        🖊
                                    </div>
                                </>
                            )}
                        </div>
                        <h2 className="text-xl font-semibold mt-4 text-gray-800">{user.full_name}</h2>
                        <p className="text-blue-600 mt-1">{user.phone}</p>
                        <p className="text-gray-500 text-sm">{user.email}</p>
                    </div>

                    <div className="col-span-2 space-y-6">
                        {editMode ? (
                            <form id="edit-form" onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-4">
                                <h3 className="text-lg font-semibold text-gray-700">Chỉnh sửa thông tin</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input type="text" name="full_name" value={form.full_name} onChange={handleInputChange} placeholder="Họ và tên" className="border p-2 rounded-lg w-full" required />
                                    <input type="date" name="date_of_birth" value={form.date_of_birth} onChange={handleInputChange} className="border p-2 rounded-lg w-full" />
                                    <input type="text" name="address" value={form.address} onChange={handleInputChange} placeholder="Địa chỉ" className="border p-2 rounded-lg w-full" />
                                    <input type="tel" name="phone" value={form.phone} onChange={handleInputChange} placeholder="Số điện thoại" className="border p-2 rounded-lg w-full" />
                                    <select name="gender" value={form.gender} onChange={handleInputChange} className="border p-2 rounded-lg w-full" required>
                                        <option value="">Chọn giới tính</option>
                                        <option value="MALE">Nam</option>
                                        <option value="FEMALE">Nữ</option>
                                        <option value="OTHER">Khác</option>
                                    </select>
                                </div>
                            </form>
                        ) : (
                            <div className="bg-white p-6 rounded-xl shadow space-y-4">
                                <h3 className="text-lg font-semibold text-gray-700">Thông tin cơ bản</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800">
                                    <div>
                                        <span className="text-sm text-gray-500">Ngày sinh</span>
                                        <p>{user.date_of_birth?.slice(0, 10) || "N/A"}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-500">Địa chỉ</span>
                                        <p>{user.address || "N/A"}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-500">Giới tính</span>
                                        <p>{translateGender(patient.gender)}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-500">Số điện thoại</span>
                                        <p>{user.phone || "N/A"}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
