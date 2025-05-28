"use client";

import { FC } from 'react';
import { useQuery } from '@apollo/client';
import {Doctor} from "@/types/doctors";
import {GET_DOCTORS} from "@/libs/graphqls/doctors";
import DoctorCard from "@/components/cards/DoctorCard";


const DoctorsPage: FC = () => {
  const { loading, error, data } = useQuery<{ doctors: Doctor[] }>(GET_DOCTORS);

  return (
    <section className="pt-20 pb-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">Danh Sách Bác Sĩ</h1>

        {loading && <p className="text-center text-gray-600">Đang tải...</p>}
        {error && <p className="text-center text-red-600">Lỗi: {error.message}</p>}

        {!loading && !error && (!data?.doctors || data.doctors.length === 0) && (
          <p className="text-center text-gray-600">Không có bác sĩ nào.</p>
        )}

        {data?.doctors && data.doctors.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.doctors.map((doctor) => (
              doctor && <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default DoctorsPage;
