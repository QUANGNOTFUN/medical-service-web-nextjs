import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Y Tế Thông Minh - Chào Mừng",
    description: "Nền tảng quản lý sức khỏe, hỗ trợ đặt lịch khám và theo dõi bệnh án dễ dàng.",
};

export default function RootPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 space-y-6">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 sm:text-5xl text-center">
                Chào Mừng Đến Với Bộ Y Tế Bình Dương
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 text-center px-4">
                Đăng nhập để trải nghiệm các dịch vụ y tế thông minh, đặt lịch dễ dàng và nhanh chóng.
            </p>
            <Link href="/home">
                <button className="bg-blue-600 text-white font-bold py-3 px-6 rounded-md hover:bg-blue-700 transform hover:scale-105 transition-transform">
                    Mời Vào
                </button>
            </Link>
        </div>
    );
}