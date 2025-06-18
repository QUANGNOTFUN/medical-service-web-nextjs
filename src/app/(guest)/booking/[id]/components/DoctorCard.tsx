// booking/[id]/components/DoctorCard.tsx

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
                    {qualifications ? qualifications + ' ' : ''}{fullName}
                </h1>
                <p className="text-blue-600 font-semibold mb-1">
                    Chuyên khoa: {specialty || 'Chưa xác định'}
                </p>
                <p className="mb-1">{hospital || 'Chưa xác định'}</p>
                <p className="mb-1 text-gray-700">
                    {workSeniority
                        ? `Gần ${workSeniority} năm kinh nghiệm`
                        : 'Chưa có thông tin kinh nghiệm'}
                </p>
            </div>
        </div>
    );
};

export default DoctorCard;
