import {DoctorFormProps} from "@/app/(doctor)/types/DoctorDashBoard";
import { UpdateAppointmentInput} from "@/types/appoitment";
import {HeaderDoctorTable} from "@/app/(doctor)/_components/Layout/DoctorTable";

export const HEADER_APPOINMENTS_TABLE: HeaderDoctorTable[] = [
    { label: "ID", key: "id", type: "text" },
    { label: "Người hẹn", key: "patient_id", type: "text" },
    { label: "Ca", key: "schedule_id", type: "text" },
    { label: "Loại lịch hẹn", key: "appointment_type", type: "text" },
    { label: "Giờ hẹn", key: "appointment_date", type: "date" },
    { label: "Trạng thái", key: "status", type: "text" },
    { label: "Hành động", key: "action", type: "text" },

];

export const INIT_UPDATE_APPOINMENTS_FORM: DoctorFormProps<UpdateAppointmentInput> = {
    title: "Danh sách lịch hẹn",
    fields: [
        { label: "ID", key: "id", type: "text" },
        { label: "Người hẹn", key: "patient_id", type: "text" },
        { label: "Ca", key: "schedule_id", type: "text" },
        { label: "Loại lịch hẹn", key: "appointment_type", type: "text" },
        { label: "Giờ hẹn", key: "appointment_date", type: "text" },
        { label: "Trạng thái", key: "status", type: "text" },
    ],
    submitLabel:"Cập nhật"
}