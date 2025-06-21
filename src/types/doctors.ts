import {User} from "@/types/user";

export interface Doctor {
    id: string | null;
    user: User;
    qualifications?: string | null;
    work_seniority?: number | null;
    gender?: string | null;
    specialty?: string | null;
    hospital?: string | null;
}

export interface CreateDoctorInput{
    qualifications?: string | null;
    work_seniority?: number | null;
    specialty?: string | null;
    hospital?: string | null;
}

export interface UpdateDoctorInput {
    full_name?: string | null;
    email?: string | null;
    gender?: "MALE" | "FEMALE" | "OTHER" | null;
    qualifications?: string | null;
    work_seniority?: number | null;
    specialty?: string | null;
    hospital?: string | null;
}


export interface DeleteDoctorInput{
    id: string;
}