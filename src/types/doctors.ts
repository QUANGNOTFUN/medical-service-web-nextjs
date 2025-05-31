export interface Doctor {
    id: string;
    user_id: string;
    qualifications?: string | null;
    work_seniority?: number | null;
    specialty?: string | null;
    hospital?: string | null;
    created_at: string;
    updated_at?: string | null;
}

export interface DoctorCardProps {
    doctor: Doctor;
}