
import React from 'react'
import SidebarDoctor from "@/app/(doctor)/_components/sidebar/SideBar";
import TopbarDoctor from "@/app/(doctor)/_components/topbar/TopBar";

export default function DoctorLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen">
            <SidebarDoctor />
            <div className="flex flex-col flex-1">
                <TopbarDoctor />
                <main className="p-6 bg-gray-50 flex-1">{children}</main>
            </div>
        </div>
    )
}
