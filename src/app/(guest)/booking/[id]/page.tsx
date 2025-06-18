'use client';

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useSession } from 'next-auth/react';
import { useLoading } from '@/app/context/loadingContext';

import { GET_DOCTOR } from '@/libs/graphqls/doctors';
import { CREATE_APPOINTMENT } from '@/libs/graphqls/mutations/appointments';
import { GET_SCHEDULE_DATES, GET_SCHEDULES_BY_DATE } from '@/libs/graphqls/queries/doctor-schedules';
import { GET_SLOTS_BY_SCHEDULE } from '@/libs/graphqls/queries/appointment-slot';

import DoctorCard from './components/DoctorCard';
import DateSelector from './components/DateSelector';
import TimeSlotSelector from './components/TimeSlotSelector';
import PatientForm from './components/PatientForm';

interface Slot {
    id: number;
    start_time: string;
    end_time: string;
    max_patients: number;
    booked_count: number;
}

interface Doctor {
    id: string;
    qualifications: string;
    specialty: string;
    hospital: string;
    work_seniority: number;
    user: {
        full_name: string;
        avatar: string;
    };
}

export default function BookingPage() {
    const { id } = useParams();
    const { data: session } = useSession();
    const { setLoading } = useLoading();

    const [form, setForm] = useState({
        fullName: session.user.email,
        gender: '',
        dob: '',
        phone: '',
        province: '',
        district: '',
        ward: '',
        symptoms: '',
    });

    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(null);
    const [slots, setSlots] = useState<Slot[]>([]);
    const [selectedSlotId, setSelectedSlotId] = useState<number | null>(null);

    const { loading, error, data } = useQuery<{ doctor: Doctor }>(GET_DOCTOR, {
        variables: { id },
        fetchPolicy: 'no-cache',
    });

    const { data: scheduleDatesData } = useQuery(GET_SCHEDULE_DATES, {
        variables: { doctor_id: id },
    });

    const { data: schedulesByDate } = useQuery(GET_SCHEDULES_BY_DATE, {
        variables: { doctor_id: id, date: selectedDate },
        skip: !selectedDate,
    });

    const { data: slotData } = useQuery(GET_SLOTS_BY_SCHEDULE, {
        variables: { id: selectedScheduleId },
        skip: !selectedScheduleId,
    });

    const [createAppointment, { loading: mutationLoading, error: mutationError }] = useMutation(CREATE_APPOINTMENT, {
        onCompleted: () => {
            alert('Đặt lịch thành công!');
            setForm({
                fullName: '',
                gender: '',
                dob: '',
                phone: '',
                province: '',
                district: '',
                ward: '',
                symptoms: '',
            });
            setSelectedScheduleId(null);
            setSlots([]);
        },
    });

    useEffect(() => {
        setLoading(loading || mutationLoading);
    }, [loading, mutationLoading]);

    useEffect(() => {
        if (schedulesByDate?.getDoctorSchedulesIdByDate?.length > 0) {
            const firstScheduleId = schedulesByDate.getDoctorSchedulesIdByDate[0].id;
            setSelectedScheduleId(firstScheduleId);
            setSelectedSlotId(null);
        }
    }, [schedulesByDate]);


    useEffect(() => {
        if (slotData?.getAppointmentSlotByScheduleId) {
            setSlots(slotData.getAppointmentSlotByScheduleId);
        } else {
            setSlots([]);
        }
    }, [slotData]);

    const handleDateChange = (date: string) => {
        setSelectedDate(date);
        setSelectedScheduleId(null);
        setSelectedSlotId(null);  // reset slot khi chọn ngày khác
        setSlots([]);
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedSlotId || !selectedScheduleId || !session?.user?.id) return;

        const selectedSlot = slots.find((s) => s.id === selectedSlotId);
        if (!selectedSlot) return;

        await createAppointment({
            variables: {
                input: {
                    patient_id: session.user.id,
                    doctor_id: id as string,
                    schedule_id: selectedScheduleId,
                    appointment_date: new Date(selectedSlot.start_time).toISOString(),
                    appointment_type: 'consultation',
                    is_anonymous: false,
                    notes: JSON.stringify(form),
                },
            },
        });

    };

    if (error) return <p className="text-red-500">Lỗi: {error.message}</p>;
    if (loading) return <p>Đang tải...</p>;

    const doctor = data?.doctor;
    if (!doctor) return <p>Không tìm thấy bác sĩ.</p>;

    const availableDates = scheduleDatesData?.getAvailableScheduleDates || [];

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg my-8">
            <DoctorCard
                avatar={doctor.user.avatar}
                fullName={doctor.user.full_name}
                qualifications={doctor.qualifications}
                specialty={doctor.specialty}
                hospital={doctor.hospital}
                workSeniority={doctor.work_seniority}
            />

            <hr className="my-8" />

            <div className="flex flex-col md:flex-row gap-8">
                <div className="bg-blue-50 border border-blue-300 p-4 rounded-md w-full md:w-1/2">
                    <h2 className="text-lg font-semibold mb-4">Ngày khám</h2>
                    <DateSelector
                        doctorId={id as string}
                        selectedDate={selectedDate}
                        onDateChange={handleDateChange}
                        availableDates={availableDates}
                    />

                    <h2 className="text-lg font-semibold mb-4">Giờ khám</h2>
                    <TimeSlotSelector
                        slots={slots.map((slot) => ({
                            id: slot.id,
                            time: slot.start_time.slice(11, 16),
                            max_patients: slot.max_patients,
                            booked_count: slot.booked_count,
                        }))}
                        selectedSlotId={selectedSlotId}
                        onSelect={setSelectedSlotId}
                    />

                </div>

                <div className="w-full md:w-1/2">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <h2 className="text-2xl font-bold mb-4">Thông tin bệnh nhân</h2>
                        {mutationError && <p className="text-red-500">Lỗi: {mutationError.message}</p>}
                        <PatientForm form={form} onChange={handleChange} />
                        <button
                            type="submit"
                            disabled={mutationLoading}
                            className={`w-full bg-blue-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-700 transition ${
                                mutationLoading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        >
                            {mutationLoading ? 'Đang xử lý...' : 'Đặt lịch'}
                        </button>
                    </form>
                </div>
            </div>

            <hr className="my-8" />

            <div className="space-y-4 text-gray-700">
                <h2 className="text-2xl font-semibold">Thông tin thêm</h2>
                <ul className="list-disc list-inside">
                    <li>Đăng ký khám và nhận tư vấn ban đầu</li>
                    <li>Bác sĩ khám lâm sàng và chỉ định cần thiết</li>
                    <li>Bác sĩ đưa kết luận và kê đơn thuốc sau khi tổng hợp kết quả</li>
                </ul>
                <p>Hotline: <a href="tel:0941298865" className="text-blue-600 underline">0941 298 865</a></p>
            </div>
        </div>
    );
}
