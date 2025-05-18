"use client";

import { FC, useState } from 'react';

const BookingPage: FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        date: '',
        doctor: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Placeholder: Sẽ gửi dữ liệu khi có backend
        console.log('Form submitted:', formData);
        alert('Đặt lịch thành công! (Chưa có backend, dữ liệu chỉ được log.)');
    };

    return (
        <section className="pt-20 pb-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">Đặt Lịch Khám</h1>
                <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
                                Họ và tên
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                placeholder="Nhập họ và tên"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-gray-700 font-medium mb-1">
                                Số điện thoại
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                placeholder="Nhập số điện thoại"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="date" className="block text-gray-700 font-medium mb-1">
                                Ngày khám
                            </label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="doctor" className="block text-gray-700 font-medium mb-1">
                                Chọn bác sĩ
                            </label>
                            <select
                                id="doctor"
                                name="doctor"
                                value={formData.doctor}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                required
                            >
                                <option value="">Chọn bác sĩ</option>
                                <option value="BS. Nguyễn Văn Hùng">BS. Nguyễn Văn Hùng (Nội tổng quát)</option>
                                <option value="BS. Trần Thị Mai">BS. Trần Thị Mai (Nhi khoa)</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transform hover:scale-105 transition-transform"
                        >
                            Đặt lịch ngay
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};



export default BookingPage;