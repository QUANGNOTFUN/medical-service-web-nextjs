import {GET_DOCTOR_SCHEDULES_BY_WEEK_DATE} from "@/libs/graphqls/doctorSchedule";
import {DoctorSchedule} from "@/types/doctorSchedule";
import {useQuery} from "@apollo/client";

export const useGetDoctorSchedulesByWeekDate = (

) => {
	const { data, loading, error, refetch } = useQuery<{ doctorSchedules: DoctorSchedule[] }>(GET_DOCTOR_SCHEDULES_BY_WEEK_DATE);
	
	return {
		data: data || [],
		loading,
		error,
		refetch,
	};
}