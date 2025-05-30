"use client";
import React, {ComponentType, useEffect, useState} from 'react';
import Link from 'next/link';
import { LucideProps } from 'lucide-react';

export interface SidebarItem {
  title: string;
  href: string;
  icon?: ComponentType<LucideProps>;
}

interface AdminSidebarProps {
  title: string;
  items: SidebarItem[];
}

export function AdminSidebar({ title, items }: AdminSidebarProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  }

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    if (windowWidth >= 1024) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }

    return () => window.removeEventListener('resize', handleResize);
  }, [windowWidth]);

  return (
    <>
      {isOpen && (
        <aside className={`w-64 h-screen bg-gray-50 dark:bg-gray-800 text-black dark:text-white ${title}`}>
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-xl font-bold">Admin Panel</h2>
          </div>
          <nav className="mt-4">
            <ul>
              {items.map((item, index) => (
                <li key={index} className="mb-2">
                  <Link href={item.href} className="flex items-center p-3 hover:bg-gray-700 rounded-md transition-colors">
                    {item.icon && <item.icon className="w-6 h-6 mr-2" /> }
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      )}
    </>
  );
}

export default AdminSidebar;
