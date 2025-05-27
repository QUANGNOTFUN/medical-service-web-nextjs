"use client";

import React, {ChangeEvent} from "react";
import { usePathname } from "next/navigation";

const placeholderMap: Record<string, string> = {
	"management/users": "Tìm kiếm người dùng",
	"management/doctors": "Tìm kiếm bác sĩ",
	"management/movies": "Tìm kiếm phim",
	"management/bookings": "Tìm kiếm lịch khám",
	"management/reservations": "Tìm kiếm đặt phòng",
	"management/reports": "Tìm kiếm báo cáo",
	"management/settings": "Tìm kiếm cài đặt",
}

export interface AdminSearchProps {
	placeholder?: string;
	onSearch?: (term: string) => void;
}

export default function AdminSearch({ placeholder: customPlaceholder, onSearch }: AdminSearchProps) {
	const pathname = usePathname();
	const placeholder = customPlaceholder || placeholderMap[pathname] || "Tìm kiếm";

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (onSearch) onSearch(e.target.value)
	}

	return (
		<div className="relative">
			<div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
				<svg
					className="w-4 h-4 text-gray-500 dark:text-gray-400"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 20 20"
				>
					<path
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
					/>
				</svg>
			</div>
			<input
				type="text"
				id="table-search-users"
				className="block py-3 ps-10 text-base text-gray-900 border border-gray-300 rounded-lg w-90
					bg-gray-50 shadow-xl hover:border-gray-800 focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500
					dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				placeholder={placeholder}
				onChange={handleChange}
			/>
		</div>
	);
}