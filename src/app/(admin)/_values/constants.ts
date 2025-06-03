import {SidebarItem} from "@/app/(admin)/_components/sidebar/AdminSidebar";
import {BookMarked, CalendarCog, ChartBar, Pill, UserRound, Users, Wrench} from "lucide-react";

export const ADMIN_SIDEBAR_ITEMS: SidebarItem[] = [
	{ title: 'Dashboard', href: '/admin-dashboard', icon: ChartBar },
	{ title: 'Thời gian biểu', href: '/schedule-manage', icon: CalendarCog },
	{ title: 'Danh sách bác sĩ', href: '/doctor-manage', icon: UserRound},
	{ title: 'Danh sách bệnh nhân', href: '/patient-manage', icon: Users },
	{ title: 'Danh sách thuốc', href: '/medication-manage', icon: Pill },
	{ title: 'Danh sách tài liệu', href: '/management/documents', icon: BookMarked },
	{ title: 'Cài đặt', href: '/management/settings', icon: Wrench },
];