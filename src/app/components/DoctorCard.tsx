import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface DoctorCardProps {
    image: string;
    name: string;
    specialty: string;
    description: string;
}

const DoctorCard: FC<DoctorCardProps> = ({ image, name, specialty, description }) => {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center transform hover:scale-105 transition-transform">
            <div className="md:w-1/3">
                <Image
                    src={image}
                    alt={name}
                    width={150}
                    height={150}
                    className="w-full h-40 object-cover rounded-lg"
                />
            </div>
            <div className="md:w-2/3 md:pl-6 mt-4 md:mt-0 text-center md:text-left">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{name}</h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">{specialty}</p>
                <p className="text-gray-600 dark:text-gray-400">{description}</p>
                <Link href="/booking" className="inline-block mt-4 text-blue-600 dark:text-blue-400 hover:underline">
                    Đặt lịch với bác sĩ
                </Link>
            </div>
        </div>
    );
};

export default DoctorCard;