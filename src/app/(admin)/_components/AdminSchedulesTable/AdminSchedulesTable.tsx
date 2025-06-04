"use client";
import React, {useState} from "react";
import {ColumnDef, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {UserMinus, UserPlus} from "lucide-react";

export interface AdminSchedulesTableProps {
	headers: { key: string; label: string }[];
	initialItems: { key: string; label: string }[];
}

interface ShiftProps {
	key: string;
	name: string;
}

interface ScheduleItem {
	shiftKey: string;
	dayKey: string;
	doctor: string | null;
}

export default function AdminSchedulesTable(
	{ headers, initialItems, }: AdminSchedulesTableProps
) {
	const shifts: ShiftProps[] = [
		{ key: "morning", name: "Sáng" },
		{ key: "afternoon", name: "Chiều" },
		{ key: "3", name: "Ngoài giờ" },
	];
	
	// Khởi tạo state cho dữ liệu bảng
	const [scheduleData, setScheduleData] = useState<ScheduleItem[]>(() => {
		const data: ScheduleItem[] = [];
		shifts.forEach((shift) => {
			headers.forEach((header) => {
				const matchingItem = initialItems.find(
					(item) => item.key === shift.key
				);
				data.push({
					shiftKey: shift.key,
					dayKey: header.key,
					doctor: matchingItem?.label || null,
				});
			});
		});
		return data;
	});
	
	// Định nghĩa các cột
	const columns: ColumnDef<ScheduleItem, unknown>[] = [
		{
			header: "Ca làm",
			accessorKey: "shiftKey",
			cell: (info) => {
				const shift = shifts.find((s) => s.key === info.getValue<string>());
				return shift?.name || "";
			},
		},
		...headers.map((header) => ({
			header: header.label,
			accessorKey: header.key,
			cell: (info) => {
				const row = info.row.original;
				const item = scheduleData.find(
					(d) =>
						d.shiftKey === row.shiftKey && d.dayKey === info.getValue()
				);
				return item?.doctor || null;
			},
		})),
	];
	
	// Cấu hình bảng
	const table = useReactTable({
		data: scheduleData,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});
	
	// Hàm thêm bác sĩ
	const handleAddDoctor = (shiftKey: string, dayKey: string) => {
		setScheduleData((prev) =>
			prev.map((item) =>
				item.shiftKey === shiftKey && item.dayKey === dayKey
					? { ...item, doctor: "New Doctor" } // Thay bằng logic thực tế
					: item
			)
		);
	};
	
	// Hàm xóa bác sĩ
	const handleRemoveDoctor = (shiftKey: string, dayKey: string) => {
		setScheduleData((prev) =>
			prev.map((item) =>
				item.shiftKey === shiftKey && item.dayKey === dayKey
					? { ...item, doctor: null }
					: item
			)
		);
	};
	
	return (
		<div className="container mx-auto overflow-auto dark:outline dark:outline-white shadow-lg rounded-xl">
			<table
				className={
					"table-auto border-collapse min-w-full rounded-lg shadow-md " +
					"text-xs md:text-sm lg:text-base font-medium text-zinc-950 dark:text-gray-200"
				}
			>
				<thead className="bg-violet-300 text-gray-900 dark:bg-gray-900 dark:text-gray-300">
				{table.getHeaderGroups().map((headerGroup) => (
					<tr key={headerGroup.id}>
						{headerGroup.headers.map((header) => (
							<th
								key={header.id}
								className="border-1 border-violet-200 w-fit py-3 px-2 text-center"
							>
								{header.column.columnDef.header as string}
							</th>
						))}
					</tr>
				))}
				</thead>
				<tbody>
				{table.getRowModel().rows.map((row) => (
					<tr
						key={row.id}
						className="h-32 w-32 bg-white hover:bg-violet-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200"
					>
						{row.getVisibleCells().map((cell) => (
							<td
								key={cell.id}
								className="py-2 px-4 border border-gray-300 text-center text-xs md:text-base hover:bg-violet-200 dark:hover:bg-gray-600 dark:hover:text-white"
							>
								<div className="flex flex-col h-full w-full">
									<div className="h-8 w-full flex items-center justify-center">
										<button
											onClick={() => {}
												// handleAddDoctor(
												// 	row.original.shiftKey,
												// 	cell.column.columnDef.accessorKey
												// )
											}
											className="mx-1 p-1 hover:bg-green-200 rounded-full"
										>
											<UserPlus size={16} />
										</button>
										<button
											onClick={() => {}
												// handleRemoveDoctor(
												// 	row.original.shiftKey,
												// 	cell.column.columnDef.accessorKey as string
												// )
											}
											className="mx-1 p-1 hover:bg-red-200 rounded-full"
										>
											<UserMinus size={16} />
										</button>
									</div>
									<div className="flex-1 flex items-center justify-center">
										{cell.getValue() as string}
									</div>
								</div>
							</td>
						))}
					</tr>
				))}
				</tbody>
			</table>
		</div>
	);
};