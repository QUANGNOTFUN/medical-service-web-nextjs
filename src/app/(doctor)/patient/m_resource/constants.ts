import {HeaderDoctorTable} from "@/app/(doctor)/_components/Layout/DoctorTable";

export const INIT_PATIENT_TABLE: HeaderDoctorTable[] = [
    {label:"ID", key: "id", type: 'text'},
    {label:"Tên", key: 'name', type: 'text' },
    {label:"Tuổi", key: 'gender', type: 'text' },
    {label:"Giới tính", key: "category", type: 'text' },
    {label:"Làn khám gần nhất", key: 'published_at', type: 'date' },
    {label:"Hành động", key: 'action', type: 'text' },
]