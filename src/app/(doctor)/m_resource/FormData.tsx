import { DoctorTable, HeaderPatientTable} from "@/app/(doctor)/types/DoctorDashBoard";
import {LayoutTable} from "@/app/(doctor)/_components/manage/LayoutTable";
import {SideBarDoctor} from "@/app/(doctor)/_components/sidebar/SideBar";

export const SIDEBAR_TABLE: SideBarDoctor[] = [
    {label:"DashBoard", href:"/dash-board", icon:"dashboard"},
    {label:"Appionment", href:"/appointment-manage", icon:"dashboard"},
    {label:"Blog", href:"/blog", icon:"dashboard"},
    {label:"Patient", href:"/patient", icon:"patient"},
    {label:"Calendar", href:"/", icon:"dashboard"},
    {label:"Message", href:"/", icon:"dashboard"},
    {label:"Payment", href:"/", icon:"dashboard"},
    {label:"Help", href:"/", icon:"dashboard"},
    {label:"Setting", href:"/", icon:"dashboard"},
    {label:"Logout", href:"/", icon:"dashboard"},
]

export const PATIENT_TABLE: HeaderPatientTable[] = [
    { checkbox: true, label: 'Chọn', key: 'checkbox', type: 'text' },
    { checkbox: false, label: 'Tên', key: 'name', type: 'text' },
    { checkbox: false, label: 'Tuổi', key: 'age', type: 'number' },
    { checkbox: false, label: 'Giới tính', key: 'gender', type: 'text' },
    { checkbox: false, label: 'Lần khám gần nhất', key: 'lastVisit', type: 'date' },
]

export const TOPNAV_TABLE: SideBarDoctor[] = [
    {label:"Time", href:"/", icon:"dashboard"},
    {label:"Search", href:"/", icon:"dashboard"},
    {label:"Notification", href:"/", icon:"dashboard"},
    {label:"Avatar", href:"/", icon:"dashboard"},
]

export const BLOG_TABLE: DoctorTable[] = [
    {label:"ID", key: "id", type: 'text'},
    {label:"Title", key: 'title', type: 'text' },
    {label:"Description", key: 'content', type: 'text' },
    {label:"Loại", key: "category", type: 'text' },
    {label:"Ngày tạo bài viết", key: 'published_at', type: 'date' },
    {label:"Ngày đăng bài", key: 'create_at', type: 'date' },
    {label:"Ngày update", key: 'updated_at', type: 'date' },
]



export const APPOINMENTS_TABLE: DoctorFormProps<UpdateAppoitmentInput> = {
    title: "Danh sách lịch hẹn",
    fields: [
        { label: "Chọn", key: "checkbox", type: "checkbox" }, // ✅ Thêm cột checkbox
        { label: "ID", key: "id", type: "text" },
        { label: "Người hẹn", key: "patient_id", type: "text" },
        { label: "Ca", key: "schedule_id", type: "text" },
        { label: "Loại lịch hẹn", key: "appointment_type", type: "text" },
        { label: "Giờ hẹn", key: "appointment_date", type: "text" },
        { label: "Trạng thái", key: "status", type: "text" },
        { label: "Thao tác", key: "action", type: "action" } // ✅ Thêm cột thao tác
    ],
}

export const APPOINTS_TABLE: LayoutTable[] = [
    { checkbox: true, label: 'Chọn', key: 'checkbox', type: 'text' },
    { checkbox: false, label: 'Tên', key: 'name', type: 'text' },
    { checkbox: false, label: 'Tuổi', key: 'age', type: 'number' },
    { checkbox: false, label: 'Giới tính', key: 'gender', type: 'text' },
    { checkbox: false, label: 'Lần khám gần nhất', key: 'lastVisit', type: 'date' },
];
