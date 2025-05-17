
export default function HomePage() {
    return (
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
    );
}
