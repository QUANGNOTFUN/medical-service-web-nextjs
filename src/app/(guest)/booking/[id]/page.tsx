'use client';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { GET_DOCTOR } from '@/libs/graphqls/doctors';
import { useQuery } from '@apollo/client';
import { useLoading } from '@/app/context/loadingContext';

export default function BookingPage() {
    const params = useParams();
    const { id } = params;
    const { setLoading } = useLoading();
    // Truy vấn GraphQL
    const { loading, error, data } = useQuery(GET_DOCTOR, {
        variables: { id: id },
        fetchPolicy: 'no-cache',
        onCompleted: (result) => {
            console.log('Doctor Data:', result);
        },
        onError: (err) => {
            console.error('Error fetching doctor:', err);
        },
    });

    // State cho form đặt lịch
    const [form, setForm] = useState({
        fullName: '',
        gender: '',
        dob: '',
        phone: '',
        province: '',
        district: '',
        ward: '',
        symptoms: '',
    });

    // Xử lý loading state
    useEffect(() => {
        setLoading(loading);
    }, [loading, setLoading]);

    // Xử lý thay đổi form
    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // Xử lý submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Đặt lịch thành công! Thư ký y khoa sẽ liên hệ bạn sớm.');
        // TODO: Gửi dữ liệu form lên server
    };

    // Nếu có lỗi
    if (error) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <p className="text-red-500">Lỗi khi tải thông tin bác sĩ: {error.message}</p>
            </div>
        );
    }

    // Nếu đang loading
    if (loading) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <p>Đang tải thông tin bác sĩ...</p>
            </div>
        );
    }

    // Dữ liệu bác sĩ
    const doctor = data?.doctor;

    // Nếu không tìm thấy bác sĩ
    if (!doctor) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <p className="text-red-500">Không tìm thấy bác sĩ với ID này.</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg my-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row gap-6">
                {/* Avatar và info */}
                <div className="flex-shrink-0">
                    <img
                        src={data.doctor.user.avatar || '/default-doctor.jpg'} // Thêm avatar từ user hoặc mặc định
                        alt={data.doctor.full_name || 'Bác sĩ'}
                        className="w-48 h-48 rounded-lg object-cover shadow-md"
                    />
                </div>

                <div>
                    <h1 className="text-3xl font-bold mb-2">
                        {doctor.qualifications || ''} {data.doctor.user.full_name || 'Bác sĩ'}
                    </h1>
                    <p className="text-blue-600 font-semibold mb-1">
                        Chuyên khoa: {doctor.specialty || 'Chưa xác định'}
                    </p>
                    <p className="mb-1">{doctor.hospital || 'Chưa xác định'}</p>
                    <p className="mb-1 text-gray-700">
                        {doctor.work_seniority
                            ? `Gần ${doctor.work_seniority} năm kinh nghiệm`
                            : 'Chưa có thông tin kinh nghiệm'}
                    </p>

                    <div className="mt-4">
                        <h2 className="font-semibold text-lg mb-1">Lịch khám</h2>
                        {doctor.schedule ? (
                            <ul className="list-disc list-inside text-gray-700">
                                {/* Giả sử schedule có trường days và time */}
                                <li>
                                    {doctor.schedule.days || 'Thứ 2 – Thứ 6'}: {doctor.schedule.time || 'Sáng 8h00 – 12h00, Chiều 13h00 – 17h00'}
                                </li>
                                {/* Thêm logic nếu schedule có nhiều khung giờ */}
                            </ul>
                        ) : (
                            <p>Chưa có thông tin lịch khám.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Divider */}
            <hr className="my-8" />

            {/* Đặt lịch form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-2xl font-bold mb-4">Đặt lịch khám</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block font-semibold mb-1" htmlFor="fullName">
                            Họ và tên <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={form.fullName}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Nhập họ và tên"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1" htmlFor="gender">
                            Giới tính <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="gender"
                            name="gender"
                            value={form.gender}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Chọn giới tính</option>
                            <option value="male">Nam</option>
                            <option value="female">Nữ</option>
                            <option value="other">Khác</option>
                        </select>
                    </div>

                    <div>
                        <label className="block font-semibold mb-1" htmlFor="dob">
                            Ngày sinh <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            id="dob"
                            name="dob"
                            value={form.dob}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1" htmlFor="phone">
                            Số điện thoại <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Nhập số điện thoại"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1" htmlFor="province">
                            Tỉnh/Thành phố
                        </label>
                        <input
                            type="text"
                            id="province"
                            name="province"
                            value={form.province}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Ví dụ: TP.HCM"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1" htmlFor="district">
                            Quận/Huyện
                        </label>
                        <input
                            type="text"
                            id="district"
                            name="district"
                            value={form.district}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Ví dụ: Quận 7"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1" htmlFor="ward">
                            Phường/Xã
                        </label>
                        <input
                            type="text"
                            id="ward"
                            name="ward"
                            value={form.ward}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Ví dụ: Tân Phú"
                        />
                    </div>
                </div>

                <div>
                    <label className="block font-semibold mb-1" htmlFor="symptoms">
                        Mô tả triệu chứng (nếu có)
                    </label>
                    <textarea
                        id="symptoms"
                        name="symptoms"
                        value={form.symptoms}
                        onChange={handleChange}
                        rows={4}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Mô tả triệu chứng..."
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-700 transition"
                >
                    Đặt lịch
                </button>
            </form>

            {/* Divider */}
            <hr className="my-8" />

            {/* Thông tin thêm */}
            <div className="space-y-4 text-gray-700">
                <h2 className="text-2xl font-semibold">Thông tin thêm</h2>

                <div>
                    <h3 className="font-semibold mb-1">Quy trình thăm khám</h3>
                    <ul className="list-disc list-inside">
                        <li>Đăng ký khám và nhận tư vấn ban đầu</li>
                        <li>Bác sĩ khám lâm sàng và chỉ định cần thiết</li>
                        <li>Bác sĩ đưa kết luận và kê đơn thuốc sau khi tổng hợp kết quả</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-1">Các dịch vụ khám</h3>
                    <ul className="list-disc list-inside">
                        <li>Chẩn đoán sớm ung thư dạ dày</li>
                        <li>Nội soi tiêu hóa</li>
                        <li>Nội soi mật tụy ngược dòng (ERCP)</li>
                        <li>Siêu âm nội soi (EUS)</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-1">Đánh giá từ người bệnh</h3>
                    <p>Thái độ phục vụ: ⭐⭐⭐⭐⭐</p>
                    <p>Thời gian chờ đợi: ⭐⭐⭐⭐⭐</p>
                    <p>Vệ sinh, sạch sẽ: ⭐⭐⭐⭐⭐</p>
                    <p>Được giới thiệu: 80% (972 lượt đánh giá)</p>
                </div>

                <div>
                    <h3 className="font-semibold mb-1">Địa chỉ liên hệ</h3>
                    <p>{doctor.hospital || 'Bệnh viện FV – Bệnh viện Pháp Việt'}</p>
                    <p>6 Nguyễn Lương Bằng, Phường Tân Phú, Quận 7, TP.HCM</p>
                    <p>
                        Hotline: <a href="tel:0941298865" className="text-blue-600 underline">0941 298 865</a>
                    </p>
                </div>
            </div>
        </div>
    );
}