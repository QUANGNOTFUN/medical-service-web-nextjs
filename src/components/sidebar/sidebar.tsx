"use client";
import { Bell, Bookmark, Calendar, FileText, HelpCircle, LogOut } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
    return (
        <aside className="w-64 bg-white border-r p-4 flex flex-col justify-between">
            <div>
                <div className="text-lg font-bold mb-4">Trang cá nhân</div>
                <nav className="flex flex-col space-y-2">
                    <Link href="/profile" className="flex items-center gap-3 px-3 py-2 rounded text-blue-700 font-medium bg-blue-200 hover:bg-blue-300">
                        <FileText size={18} /> Hồ sơ khám
                    </Link>
                    <Link href="/profile/bookmarks" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-100">
                        <Bookmark size={18} /> Ghi nhớ
                    </Link>
                    <Link href="/profile/appointment" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-100">
                        <Calendar size={18} /> Quản lý lịch hẹn
                    </Link>
                    <Link href="/profile/notifications" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-100">
                        <Bell size={18} /> Thông báo
                    </Link>
                </nav>
            </div>

            <div className="mt-6 pt-4 border-t space-y-2">
                <button className="flex items-center gap-3 px-3 py-2 rounded text-gray-500 hover:bg-blue-100">
                    <HelpCircle size={18} /> Trợ giúp
                </button>
                <button className="flex items-center gap-3 px-3 py-2 rounded text-red-500 hover:bg-blue-100">
                    <LogOut size={18} /> Đăng xuất
                </button>
            </div>
        </aside>
    );
}
