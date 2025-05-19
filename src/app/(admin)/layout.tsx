import React from 'react';
import AdminSidebar from '@/components/sidebar/AdminSidebar';
import '../globals.css';
export default function ManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-6 overflow-auto">
        <div className="container mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}