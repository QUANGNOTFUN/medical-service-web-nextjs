import {BlogTable, HeaderPatientTable, SideBarDoctor} from "@/app/(doctor)/types/DoctorDashBoard";

export const SIDEBAR_TABLE: SideBarDoctor[] = [
    {label:"DashBoard", href:"/dash-board", icon:"dashboard"},
    {label:"Appionment", href:"/", icon:"dashboard"},
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

export const BLOG_TABLE: BlogTable[] = [
    {label:"ID", key: "id", type: 'text'},
    {label:"Title", key: 'title', type: 'text' },
    {label:"Description", key: 'content', type: 'text' },
    {label:"Loại", key: "category", type: 'text' },
    {label:"Ngày tạo bài viết", key: 'published_at', type: 'date' },
    {label:"Ngày đăng bài", key: 'create_at', type: 'date' },
    {label:"Ngày update", key: 'updated_at', type: 'date' },
]