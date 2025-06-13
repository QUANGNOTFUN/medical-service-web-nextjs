'use client';

import { useQuery } from '@apollo/client';
import { GET_DOCTORS } from '@/libs/graphqls/doctors';
import Link from 'next/link';

function DoctorPage() {
    const { loading, error, data } = useQuery(GET_DOCTORS, {
        fetchPolicy: 'no-cache',
    });

    if (loading) return <p>Đang tải...</p>;
    if (error) return <p>Lỗi: {error.message}</p>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            {data?.doctors.map((doctor: any, index: number)  => {
                const user = doctor.user;
                const avatarSrc =
                    user?.avatar?.startsWith('http') ? user.avatar : '/doctor-placeholder.jpg';

                return (
                    <div
                        key={doctor.id || index}
                        className="bg-white rounded-xl shadow-lg hover:scale-105 transition overflow-hidden group"
                    >

                        {/* Ảnh và nút chồng lên nhau */}
                        <div className="relative w-full h-72">
                            <img
                                src={avatarSrc}
                                alt={user?.full_name || 'Bác sĩ'}
                                className="w-full h-full object-cover"
                            />

                            {/* Nút hiện gần dưới ảnh khi hover */}
                            <div
                                className="absolute inset-0 flex items-end justify-center  bg-opacity-30
                                     opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0
                                     transition-all duration-300"
                            >
                                <Link
                                    href={`/booking/${user?.id}`}
                                className="mb-4 bg-gradient-to-r from-blue-400 to-sky-300 text-white font-semibold
                                   text-sm px-5 py-2 rounded-full shadow-md hover:from-blue-600 hover:to-sky-500
                                   hover:scale-105 transition-transform duration-300"
                                >
                                    🩺 Hẹn khám với bác sĩ này
                                </Link>
                            </div>

                        </div>


                        {/* Nội dung dưới ảnh */}
                        <div className="p-4 text-center">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Dr. {user?.full_name || 'Không rõ'}
                            </h3>
                            <p className="text-sm text-gray-500">
                                {doctor.hospital || 'Không rõ'}
                            </p>
                        </div>
                    </div>

                );
            })}
        </div>
    );
}

export default DoctorPage;
