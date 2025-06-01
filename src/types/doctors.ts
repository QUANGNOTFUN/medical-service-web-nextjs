import {User} from "@/types/user";

export interface Doctor {
    id: string;
    user: User;
    qualifications?: string | null;
    work_seniority?: number | null;
    specialty?: string | null;
    hospital?: string | null;
}

export interface DoctorCardProps {
    doctor: Doctor;
}