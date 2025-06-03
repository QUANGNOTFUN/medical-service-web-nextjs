export interface RegisterDoctorInput {
	full_name: string;
	email: string;
	password: string;
	gender: "MALE" | "FEMALE" | "OTHER";
	role: "DOCTOR";

	qualifications?: string | null;
	work_seniority?: number | null;
	specialty?: string | null;
	hospital?: string | null;
}
