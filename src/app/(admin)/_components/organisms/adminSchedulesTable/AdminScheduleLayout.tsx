'use client'
import AdminSchedulesTable from "@/app/(admin)/_components/organisms/adminSchedulesTable/AdminSchedulesTable";
import DoctorScheduleFilter from "@/app/(admin)/_components/organisms/adminSchedulesTable/DoctorScheduleFilter";
import {ScheduleDatePicker} from "@/app/(admin)/_components/organisms/adminSchedulesTable/ScheduleDatePicker";
import {DoctorDisplay} from "@/types/doctors";
import {useState} from "react";
import {CreateDoctorScheduleData, DoctorSchedule} from "@/types/doctorSchedule";

export type AdminScheduleLayoutProps = {
	doctors: DoctorDisplay[];
	schedules?: DoctorSchedule[];
	onCreateButton: ( isOpen: boolean, createData: CreateDoctorScheduleData) => void;
}

export default function AdminScheduleLayout(
	{ doctors, schedules, onCreateButton }: AdminScheduleLayoutProps
) {
	const [selectedDoctors, setSelectedDoctors] = useState<DoctorDisplay>()
	const [selectedDate, setSelectedDate] = useState<Date>()
	
	return (
		<div className={"flex flex-col"}>
			<div className={"w-full mb-4 flex justify-between items-center"}>
				<DoctorScheduleFilter doctors={doctors} onSelected={(doctor) => setSelectedDoctors(doctor)} />
				<ScheduleDatePicker onSelected={(date) => setSelectedDate(date)} />
			</div>
			
			<AdminSchedulesTable
				selectedDate={selectedDate}
				onCreateButton={onCreateButton}
				initialItems={schedules} />
		</div>
	)
}