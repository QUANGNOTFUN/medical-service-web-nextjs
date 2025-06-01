import type {Metadata} from "next";
import ServiceCard from "@/components/cards/ServiceCard";
import { useSession } from "next-auth/react";

export const metadata: Metadata = {
    title: "Trang Chủ - Y Tế Thông Minh",
    description: "Khám phá các dịch vụ y tế chất lượng cao, đặt lịch dễ dàng.",
};

const services = [
    { icon: '🩺', title: 'Khám tổng quát', description: 'Kiểm tra sức khỏe toàn diện với bác sĩ chuyên khoa.' },
    { icon: '🧪', title: 'Xét nghiệm', description: 'Phân tích mẫu nhanh chóng, chính xác với thiết bị hiện đại.' },
    { icon: '💻', title: 'Tư vấn online', description: 'Kết nối với bác sĩ mọi lúc, mọi nơi.' },
];

export default function HomePage() {
    return (
        <div className="flex flex-col">
            {/* Services Section */}
            <section className="py-12 bg-white dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 text-center mb-8">Dịch Vụ Của Chúng Tôi</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <ServiceCard
                                key={index}
                                icon={service.icon}
                                title={service.title}
                                description={service.description}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-12 bg-gray-50 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 text-center mb-8">Bác Sĩ Nổi Bật</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    </div>
                </div>
            </section>


            {/* Call to Action Section */}
            <section className="bg-blue-600 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-4">Sẵn sàng chăm sóc sức khỏe của bạn?</h2>
                    <p className="text-lg mb-6">Đặt lịch ngay hôm nay để nhận tư vấn từ các bác sĩ hàng đầu!</p>
                    <a
                        href="/booking"
                        className="inline-block bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transform hover:scale-105 transition-transform"
                    >
                        Đặt lịch ngay
                    </a>
                </div>
            </section>
        </div>
    );
}