import {DoctorTable} from "@/app/(doctor)/types/DoctorDashBoard";
import {UpdateAppointmentInput} from "@/types/appoitment";
import {Eye, Pencil, Trash2} from "lucide-react";

export const BLOG_TABLE: DoctorTable[] = [
    {label:"ID", key: "id", type: 'text'},
    {label:"Title", key: 'title', type: 'text' },
    {label:"Description", key: 'content', type: 'text' },
    {label:"Loại", key: "category", type: 'text' },
    {label:"Ngày tạo bài viết", key: 'published_at', type: 'date' },
    {label:"Ngày đăng bài", key: 'create_at', type: 'date' },
    {label:"Ngày update", key: 'updated_at', type: 'date' },
    {
        label: "Hành động",
        key: "action",
        action: {
            data: {} as UpdateAppointmentInput,
            actions: [
                { icon: <Eye className="w-4 h-4" /> , action: "view" },
                { icon: <Pencil className="w-4 h-4" />, action: "edit" },
                { icon: <Trash2 className="w-4 h-4" /> ,  action: "delete"},
            ],
            onAction: () => {},
        },
    },
]