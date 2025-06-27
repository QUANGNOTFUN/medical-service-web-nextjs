export type DoctorSchedule = {
	doctor_id: string;
	day: 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';
	shift: 'MORNING' | 'AFTERNOON' | 'OVERTIME';
	start_time: string;
	end_time: string;
	is_available: boolean;
	user: {
		full_name: string;
	}
}

export type CreateDoctorScheduleInput = {
	doctor_id: string;
	week_count: number;
}

export type CreateDoctorScheduleData = {
	doctor_id: string;
	day: 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';
	shift: 'MORNING' | 'AFTERNOON' | 'OVERTIME';
	is_available: boolean;
	date: string;
	week_count: number;
}

export type UpdateScheduleInput = {
	doctor_id: string;
	day: 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';
	shift: 'MORNING' | 'AFTERNOON' | 'OVERTIME';
}