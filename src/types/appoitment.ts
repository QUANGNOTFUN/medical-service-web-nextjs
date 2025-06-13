export interface Appointment {
    id: number;
    patient_id: number;
    doctor_id: number;
    schedule_id: number;
    appointment_type: string;
    appointment_date: string;
    status: string;
    is_anonymous: boolean;

}

export interface CreateAppointmentInput {
    doctor_id: string;
    schedule_id: string;
    appointment_id: string;
    appointment_type: string;
    is_anonymous: boolean;
}

export interface UpdateAppointmentInput {
    id: string;
    patient_id: string;
    schedule_id: string;
    appointment_type: string;
    appointment_date: string;
    status: string;
}

export interface _UpdateAppointmentInput {
    status: string;
}

