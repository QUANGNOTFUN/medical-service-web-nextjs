'use client'

import Link from 'next/link'
import { Calendar, Users, MessageSquare, Home, LayoutDashboard, CreditCard, HelpCircle, Settings, LogOut } from 'lucide-react'
import {SIDEBAR_TABLE} from "@/app/(doctor)/m_resource/FormData";

export interface DoctorSidebar {
    title: string
    href: string
    icon?: string
}

// Hàm ánh xạ chuỗi icon thành thành phần biểu tượng
const getIconComponent = (icon: string) => {
    switch (icon) {
        case 'dashboard':
            return <LayoutDashboard className="w-5 h-5" />;
        case 'calendar':
            return <Calendar className="w-5 h-5" />;
        case 'users':
            return <Users className="w-5 h-5" />;
        case 'message':
            return <MessageSquare className="w-5 h-5" />;
        case 'payment':
            return <CreditCard className="w-5 h-5" />;
        case 'help':
            return <HelpCircle className="w-5 h-5" />;
        case 'settings':
            return <Settings className="w-5 h-5" />;
        case 'logout':
            return <LogOut className="w-5 h-5" />;
        default:
            return <Home className="w-5 h-5" />;
    }
};

export default function SidebarDoctor() {
    return (
        <aside className="w-64 bg-white border-r shadow-sm p-4">
            <h2 className="text-xl font-bold mb-6">Doctor Panel</h2>
            <nav className="space-y-3">
                {SIDEBAR_TABLE.map((item) => (
                    <Link key={item.label} href={item.href}>
                        <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded cursor-pointer">
                            {getIconComponent(item.icon)}
                            <span>{item.label}</span>
                        </div>
                    </Link>
                ))}
            </nav>
        </aside>
    )
}
