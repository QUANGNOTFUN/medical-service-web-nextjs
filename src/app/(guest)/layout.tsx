import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css"
import Header from "@/components/header/Header";
import Footer from "../../components/footer/Footer";
import PosterCarousel from "@/components/silders/Poster";
import { FC, ReactNode } from "react";
import IconMessage from "@/components/icons/IconMessage";
const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Y Tế Thông Minh - Chăm sóc sức khỏe toàn diện",
    description: "Nền tảng quản lý sức khỏe, hỗ trợ đặt lịch khám và theo dõi bệnh án dễ dàng.",
};

interface RootLayoutProps {
    children: ReactNode;
}

const HomeLayout: FC<RootLayoutProps> = ({ children }) => {
    return (
        <html lang="vi" className={`${geistSans.variable} ${geistMono.variable}`}>
        <body className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <PosterCarousel />
            <main className="flex-grow">{children}</main>
            <Footer />
            <IconMessage isVisible={true} />
        </body>
        </html>
    );
};

export default HomeLayout;