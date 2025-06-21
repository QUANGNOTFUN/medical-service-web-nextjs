import {HeaderDoctorTable} from "@/app/(doctor)/_components/Layout/DoctorTable";

export interface PatientTable {
    name: string;
    label: string;
    type: "text" | "select" | "date";
    options?: string[];
}

export const INIT_PATIENT_TABLE: HeaderDoctorTable[] = [
    {label:"ID", key: "id", type: 'text'},
    {label:"Tên", key: 'name', type: 'text' },
    {label:"Tuổi", key: 'gender', type: 'text' },
    {label:"Giới tính", key: "category", type: 'text' },
    {label:"Làn khám gần nhất", key: 'update_at', type: 'date' },
    {label:"Kế hoạch điều trị", key: 'plan_id', type: 'text' },
    {label:"Notes", key: 'Note', type: 'text' },
    {label:"Hành động", key: 'action', type: 'text' },
]



