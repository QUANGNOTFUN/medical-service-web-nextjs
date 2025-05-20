import React from 'react';
import AdminSidebar from '@/components/sidebar/AdminSidebar';
import '../globals.css';
import {Geist, Geist_Mono} from "next/font/google";
import type {Metadata} from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quản lí phòng khám",
  description: "Nền tảng quản lý sức khỏe, hỗ trợ đặt lịch khám và theo dõi bệnh án dễ dàng.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
  <html lang="vi" className={`${geistSans.variable} ${geistMono.variable}`}>
  <body className="bg-gray-50">
    <div className="min-h-screen flex flex-row">
      <AdminSidebar />

      <main className="flex-1 p-6 overflow-auto bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
        <div className="container mx-auto">
          {children}
        </div>
      </main>
    </div>
    </body>
  </html>
  );
}