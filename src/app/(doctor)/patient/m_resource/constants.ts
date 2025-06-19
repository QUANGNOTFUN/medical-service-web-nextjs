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

export const UPUPDATE_PATIENT_TABLE: PatientTable[] = [
    {name:"Tên", label:"Name", type: "text"},
    {name:"Giới tính", label:"gender", type:"text", options:["Nam","Nữ"]},
    {name: "Tuổi", label:"tuoi", type: "text"},
    {name:"Địa chỉ", label:"address", type: "text"},
    {name:"Sổ điện thoại",label:"phone", type: "text"},
    {name:"Ngày khám",label:"date1",type:"date"},
    {name:"Ngày tái khám",label:"date2",type:"date"},
    {name:"Chuẩn đoán",label:"chuandoan", type: "text"},
    {name:"Ghi chú", label:"Notes", type: "text"},
    {name:"Sơ đồ điều trị",label:"treatment", type:"text"},
    {name:"Tên thuốc",label:"thuoc",type:"text"},

]