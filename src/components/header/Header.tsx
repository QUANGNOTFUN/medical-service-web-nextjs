'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, UserCircle, X } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';


export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const { data: session } = useSession();

    const navLinks = [
        { label: 'Trang Chủ', href: '/' },
        { label: 'Bác Sĩ', href: '/doctor' },
        { label: 'Đặt Lịch', href: '/booking' },
        { label: 'Liên Hệ', href: '/contact' }
    ];
    return (
        <header className="bg-white shadow-md fixed w-full top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold text-blue-700">
                    🏥 Y Tế
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden md:flex space-x-6 items-center">
                    {navLinks.map(link => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-gray-700 hover:text-blue-600 font-medium"
                        >
                            {link.label}
                        </Link>
                    ))}

                    {!session?.user ? (
                        <Link
                            href="/login"
                            className="text-gray-700 hover:text-blue-600 font-medium"
                        >
                            Đăng nhập
                        </Link>
                    ) : (
                        <div className="relative group">
                            {/* Trigger */}
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-100 cursor-pointer">
                                <UserCircle className="w-5 h-5 text-gray-600" />
                                {session.user.email}
                            </div>

                            {/* Dropdown - MUST be direct child and not hidden with `display: none` */}
                            <div
                                className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black/5 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-150"
                                onMouseEnter={() => setIsOpen(true)}
                                onMouseLeave={() => setIsOpen(false)}
                            >
                                <Link
                                    href="/profile"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Hồ sơ khám
                                </Link>
                                <Link
                                    href="/booking"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Lịch hẹn của tôi
                                </Link>
                                <button
                                    onClick={() => signOut()}
                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                >
                                    Đăng xuất
                                </button>
                            </div>
                        </div>


                    )}
                </nav>

                {/* Mobile Toggle */}
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
                    {navLinks.map(link => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="block text-gray-700 hover:text-blue-600 font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}

                    {!session?.user ? (
                        <Link
                            href="/login"
                            className="block text-gray-700 hover:text-blue-600 font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            Đăng nhập
                        </Link>
                    ) : (
                        <>
                            <Link
                                href="/account"
                                className="block text-gray-700 hover:text-blue-600 font-medium"
                                onClick={() => setIsOpen(false)}
                            >
                                Tài khoản
                            </Link>
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    signOut()
                                }}
                                className="w-full text-left text-gray-700 hover:text-blue-600 font-medium"
                            >
                                Đăng xuất
                            </button>
                        </>
                    )}
                </div>
            )}
        </header>
    );
}
