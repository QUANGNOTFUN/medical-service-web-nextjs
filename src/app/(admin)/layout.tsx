import React from 'react';
import '../globals.css';
import {Geist, Geist_Mono} from "next/font/google";
import type {Metadata} from "next";
import AdminClientWrapper from "@/app/(admin)/_components/AdminClientWrapper/AdminClientWrapper";
import {ToastContainer} from "react-toastify";

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
  <body>
      <AdminClientWrapper>
        {children}
        <ToastContainer
          position={"top-right"}
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme={"light"}
        />
      </AdminClientWrapper>
    </body>
  </html>
  );
}