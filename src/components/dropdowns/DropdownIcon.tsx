"use client"

import type DropdownIconsProps from "@/components/dropdowns/types/dropdown";
import {useState} from "react";
import {CircleEllipsis} from "lucide-react";

export default function DropdownIcon(
	{ items}: DropdownIconsProps
) {
	const [isOpen, setIsOpen] = useState(false);

	const handleToggle = () => {
		setIsOpen(!isOpen)
	}

	return (
		<div className={"relative"}>
			<button
				onClick={handleToggle}
				className={"flex items-center justify-center w-12 h-12 rounded-lg shadow-lg " +
					"bg-gray-50 hover:bg-violet-200 focus:bg-violet-200 text-gray-700  hover:text-violet-500 focus:text-violet-500  " +
					"dark:bg-gray-800 dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:text-gray-500 dark:hover:text-white dark:focus:text-white"}>
					<CircleEllipsis className={"w-8 h-8"} />
			</button>
			{isOpen && (
				<div
					className={"absolute right-0 w-48 p-2 mt-2 shadow-lg rounded-md " +
					"bg-gray-50 dark:bg-gray-700 dark:text-gray-200 "}
				>
					{items.map((item, index) => (
						<div
							key={index}
							onClickCapture={handleToggle}
							className={"flex flex-row mt-2 px-4 py-2 cursor-pointer shadow-lg rounded-lg " +
								"bg-white hover:bg-violet-200 text-gray-700 hover:text-violet-500 " +
					      "dark:bg-gray-800 dark:hover:bg-gray-600 dark:text-gray-300 dark:hover:text-white"}
							onClick={item.onClick}
						>
							{ item.icon && <item.icon className={"mr-2"} /> }
							{ item.label }
						</div>
					))}
				</div>
			)}
		</div>
	);
}