'use client'
import AdminScheduleLayout from "@/app/(admin)/_components/organisms/adminSchedulesTable/AdminScheduleLayout";
import {useGetDoctors} from "@/libs/hooks/doctors/useGetDoctors";
import {CreateDoctorScheduleData, WeekDateInput} from "@/types/doctorSchedule";
import {useState} from "react";
import AdminForm from "@/app/(admin)/_components/organisms/create&UpdateForm/AdminForm";
import {CREATE_DOCTOR_SCHEDULE_INPUT} from "@/app/(admin)/schedule-manage/constant";
import {useCreateDoctorSchedule} from "@/libs/hooks/doctorSchedules/useCreateDoctorSchedule";
import {toast} from "react-toastify";
import {useGetDoctorSchedulesByWeekDate} from "@/libs/hooks/doctorSchedules/useGetDoctorSchedulesByWeekDate";
import {getWeekDates} from "@/libs/function/getWeekDates";

export default function AdminSchedulePage() {
	// INIT for data
	const { doctors } = useGetDoctors()
	const [selectedDate, setSelectedDate] = useState<Date>(new Date())
	const [weekDateInput, setWeekDateInput] = useState<WeekDateInput>(
		{
			start_week: getWeekDates()[0].toISOString(),
			end_week: getWeekDates()[6].toISOString(),
		}
	)
	const { data: schedules, loading: getLoading, error, refetch } = useGetDoctorSchedulesByWeekDate(weekDateInput)
	const { create: createSchedule, loading } = useCreateDoctorSchedule()
	
	// INIT for components
	const [createScheduleData, setCreateScheduleData] = useState<CreateDoctorScheduleData | null>(null);
	const [isCreating, setIsCreating] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const createInput = CREATE_DOCTOR_SCHEDULE_INPUT(doctors)
	
	const handSelectedDate = async (date: Date) => {
		setSelectedDate(date)
		setWeekDateInput({
			start_week: getWeekDates(selectedDate)[0].toISOString(),
			end_week: getWeekDates(selectedDate)[6].toISOString(),
		})
		await refetch()
	}
	
	const handleCreateSubmit = async () => {
		try {
			await createSchedule(createScheduleData)
			await refetch()
			toast.success("Tạo lịch thành công", {toastId: "create-schedule-success"} )
			setIsCreating(false)
			setCreateScheduleData(null)
			setIsSubmitting(false)
		} catch (error: unknown) {
			toast.error(`Tạo lịch thất bại: ${error instanceof Error ? error.message : String(error)}`, {toastId: "create-schedule-error"})
		}
	}
	if (isSubmitting) {
		 handleCreateSubmit()
	}
	
	if (loading) return <div>Loading...</div>;
	if (getLoading) return <div>Loading...</div>;
	
	return (
		<>
			{/*{ weekDateInput.start_week }*/}
			{isCreating && (
				<AdminForm
					fields={createInput.fields}
					submitLabel={ createInput.submitLabel }
					title={createInput.title + " - " + new Date(createScheduleData.date).toLocaleDateString() }
					onSubmit={(input) => {
						setCreateScheduleData({...createScheduleData, doctor_id: input.doctor_id, week_count: input.week_count})
						setIsSubmitting(true)
					}
				}
					onClose={() => {
						setIsCreating(false)
						setCreateScheduleData(null)
					} }
				/>
			)}
			{createScheduleData?.week_count}
			<AdminScheduleLayout
				doctors={doctors}
				schedules={schedules}
				dateProps={{
					date: selectedDate,
					onSelected: handSelectedDate,
				}}
				onCreateButton={(isOpen , createData) => {
					setIsCreating(isOpen);
					setCreateScheduleData(createData);
				}}
			/>
		</>
	);
}