import React from 'react';

interface DoctorCardProps {
    avatar?: string;
    fullName: string;
    qualifications?: string;
    specialty?: string;
    hospital?: string;
    workSeniority?: number;
}

const DoctorCard: React.FC<DoctorCardProps> = ({
                                                   avatar,
                                                   fullName,
                                                   qualifications,
                                                   specialty,
                                                   hospital,
                                                   workSeniority,
                                               }) => {
    return (
        <div className="flex flex-col gap-6">
            {/* Thông tin bác sĩ chính */}
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                    <img
                        src={avatar || '/default-doctor.jpg'}
                        alt={fullName}
                        className="w-48 h-48 rounded-lg object-cover shadow-md"
                    />
                </div>
                <div>
                    <h1 className="text-3xl font-bold mb-2">
                        {qualifications ? qualifications + ' ' : ''}
                        {fullName}
                    </h1>
                    <p className="text-blue-600 font-semibold mb-1">
                        Chuyên khoa: {specialty || 'HIV/AIDS - Truyền nhiễm'}
                    </p>
                    <p className="mb-1">{hospital || 'Bệnh viện Bệnh Nhiệt Đới Trung Ương'}</p>
                    <p className="mb-1 text-gray-700">
                        {workSeniority
                            ? `Gần ${workSeniority} năm kinh nghiệm trong điều trị HIV/AIDS`
                            : 'Chưa có thông tin kinh nghiệm'}
                    </p>
                </div>
            </div>

            {/* Divider */}
            <hr className="my-8" />

            {/* Thông tin thêm */}
            <div className="space-y-4 text-gray-700">
                <h2 className="text-2xl font-semibold">Thông tin thêm</h2>

                <div>
                    <h3 className="font-semibold mb-1">Quy trình thăm khám</h3>
                    <ul className="list-disc list-inside">
                        <li>Đăng ký khám, tư vấn ban đầu về nguy cơ phơi nhiễm</li>
                        <li>Xét nghiệm sàng lọc HIV, HCV, HBV và bệnh lây qua đường tình dục</li>
                        <li>Đánh giá miễn dịch và tải lượng virus HIV</li>
                        <li>Điều trị bằng thuốc kháng virus (ARV) theo phác đồ quốc gia</li>
                        <li>Hỗ trợ tâm lý và theo dõi điều trị lâu dài</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-1">Các dịch vụ khám</h3>
                    <ul className="list-disc list-inside">
                        <li>Tư vấn và điều trị HIV/AIDS</li>
                        <li>Điều trị dự phòng trước phơi nhiễm (PrEP)</li>
                        <li>Điều trị dự phòng sau phơi nhiễm (PEP)</li>
                        <li>Khám và điều trị bệnh lây truyền qua đường tình dục</li>
                        <li>Tư vấn điều trị đồng nhiễm lao và viêm gan</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-1">Đánh giá từ người bệnh</h3>
                    <p>Thái độ phục vụ: ⭐⭐⭐⭐⭐</p>
                    <p>Thời gian chờ đợi: ⭐⭐⭐⭐⭐</p>
                    <p>Hỗ trợ tâm lý và bảo mật thông tin: ⭐⭐⭐⭐⭐</p>
                    <p>Được giới thiệu: 92% (1,240 lượt đánh giá)</p>
                </div>

                <div>
                    <h3 className="font-semibold mb-1">Địa chỉ liên hệ</h3>
                    <p>{hospital || 'Bệnh viện Nhiệt Đới - Khoa HIV/AIDS'}</p>
                    <p>78 Giải Phóng, Phương Mai, Đống Đa, Hà Nội</p>
                    <p>
                        Hotline:{' '}
                        <a href="tel:0941298865" className="text-blue-600 underline">
                            0941 298 865
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DoctorCard;
