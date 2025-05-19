"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

export default function ClientHeaderFooter() {
    const pathname = usePathname();
    const isManagementRoute = pathname.startsWith("/management");

    if (isManagementRoute) {
        return null; // Không hiển thị Header/Footer cho /management
    }

    return (
        <>
            <Header />
            <Footer />
        </>
    );
}