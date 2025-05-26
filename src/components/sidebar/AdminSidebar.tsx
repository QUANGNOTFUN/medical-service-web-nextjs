import React from 'react';
import Link from 'next/link';
import { 
  DashboardIcon, 
  MoviesIcon, 
  UsersIcon, 
  BookingsIcon, 
  SettingsIcon 
} from '@/components/icons/AdminIcons';

interface SidebarItem {
  title: string;
  href: string;
  icon?: React.ReactNode;
}

interface AdminSidebarProps {
  className?: string;
}

const sidebarItems: SidebarItem[] = [
  { title: 'Dashboard', href: '/management', icon: <DashboardIcon /> },
  { title: 'Danh sách bác sĩ', href: '/management/doctors', icon: <MoviesIcon /> },
  { title: 'Danh sách bệnh nhân', href: '/management/patients', icon: <UsersIcon /> },
  { title: 'Danh sách thuốc', href: '/management/medications', icon: <BookingsIcon /> },
  { title: 'Danh sách tài liệu', href: '/management/documents', icon: <BookingsIcon /> },
  { title: 'Cài đặt', href: '/management/settings', icon: <SettingsIcon /> },
];

const AdminSidebar: React.FC<AdminSidebarProps> = ({ className = '' }) => {
  return (
    <aside className={`w-64 h-screen bg-gray-50 dark:bg-gray-800 text-black dark:text-white ${className}`}>
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold">Admin Panel</h2>
      </div>
      <nav className="mt-4">
        <ul>
          {sidebarItems.map((item, index) => (
            <li key={index} className="mb-2">
              <Link href={item.href} className="flex items-center p-3 hover:bg-gray-700 rounded-md transition-colors">
                {item.icon && <span className="mr-3">{item.icon}</span>}
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
