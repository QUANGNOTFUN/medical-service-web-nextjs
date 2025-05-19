"use client"; // Đánh dấu là Client Component để dùng usePathname

import React from "react";
import { usePathname } from "next/navigation";

interface Placeholder {
	name: string;
}

const PlaceholderItems: Placeholder[] = [
	{ name: "Nhập tên bác sĩ" },         // Index 0: /doctor
	{ name: "Nhập tên bệnh nhân" },      // Index 1: /doctor/patients
	{ name: "Nhập tên viết tắt của đơn thuốc" }, // Index 2: /doctor/dashboard
	{ name: "Đơn hàng" },                // Index 3: Route khác (nếu có)
];

export default function AdminSearch() {
	const pathname = usePathname();

	// Ánh xạ route với placeholder
	const getPlaceholder = () => {
		switch (true) {
			case pathname === "/management/doctor":
				return PlaceholderItems[0].name;
			case pathname === "/management/patient":
				return PlaceholderItems[1].name;
			case pathname === "/management/medication":
				return PlaceholderItems[2].name;
			default:
				return PlaceholderItems[3].name; // Giá trị mặc định
		}
	};

	const placeholder = getPlaceholder();

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
				className="block py-3 ps-10 text-base text-gray-900 border border-gray-300 rounded-lg w-90 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				placeholder={placeholder}
			/>
		</div>
	);
}