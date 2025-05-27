"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Optional: dùng icon đẹp

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { label: "Trang Chủ", href: "/" },
        { label: "Bác Sĩ", href: "/doctor" },
        { label: "Đặt Lịch", href: "/booking" },
        { label: "Liên Hệ", href: "/contact" },
    ];

    return (
        <header className="bg-white shadow-md fixed w-full top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                <Link href="/public" className="text-2xl font-bold text-blue-700">
                    🏥 Y Tế
                </Link>

                <nav className="hidden md:flex space-x-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-gray-700 hover:text-blue-600 font-medium"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-gray-700"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden px-4 pb-4 space-y-2 bg-white border-t">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="block text-gray-700 hover:text-blue-600 font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            )}
        </header>
    );
}
