import { FC } from 'react';
import Image from 'next/image';

interface Doctor {
    id: number;
    name: string;
    specialty: string;
    image: string;
    description: string;
}

const doctors: Doctor[] = [
    {
        id: 1,
        name: 'BS. Nguyễn Văn Hùng',
        specialty: 'Nội tổng quát',
        image: '/image/doctor1.jpg',
        description: 'Chuyên gia với hơn 15 năm kinh nghiệm trong khám và điều trị nội khoa.',
    },
    {
        id: 2,
        name: 'BS. Trần Thị Mai',
        specialty: 'Nhi khoa',
        image: '/image/doctor2.jpg',
        description: 'Bác sĩ tận tâm, chuyên chăm sóc sức khỏe trẻ em.',
    },
];

const DoctorsPage: FC = () => {
    return (
        <section className="pt-20 pb-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">Danh Sách Bác Sĩ</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {doctors.map((doctor) => (
                        <div key={doctor.id} className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center transform hover:scale-105 transition-transform">
                            <div className="md:w-1/3">
                                <Image
                                    src={doctor.image}
                                    alt={doctor.name}
                                    width={150}
                                    height={150}
                                    className="w-full h-40 object-cover rounded-lg"
                                />
                            </div>
                            <div className="md:w-2/3 md:pl-6 mt-4 md:mt-0 text-center md:text-left">
                                <h3 className="text-xl font-semibold text-gray-800">{doctor.name}</h3>
                                <p className="text-blue-600 font-medium mb-2">{doctor.specialty}</p>
                                <p className="text-gray-600">{doctor.description}</p>
                                <a href="/booking" className="inline-block mt-4 text-blue-600 hover:underline">
                                    Đặt lịch với bác sĩ
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export const metadata = {
    title: "Danh Sách Bác Sĩ - Y Tế Thông Minh",
    description: "Xem thông tin bác sĩ và đặt lịch khám dễ dàng.",
};

export default DoctorsPage;