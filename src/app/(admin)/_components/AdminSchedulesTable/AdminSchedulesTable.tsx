import {UserPlus} from "lucide-react";

export interface AdminSchedulesTableProps {
	headers: { key: string, label: string; }[];
	items: { key: string, label: string }[];
}
interface ShiftProps {
	key: string;
	name: string;
}

export function AdminSchedulesTable(
	{ headers, items }: AdminSchedulesTableProps
) {
	const shifts: ShiftProps[] = [
		{ key: "morning", name: "Sáng" },
		{ key: "afternoon", name: "Chiều" },
		{ key: "3", name: "Ngoài giờ" },
	]
	
	const rowsShift = (shift: ShiftProps, items: AdminSchedulesTableProps["items"]) => (
		<tr
			key={shift.key}
			className={"h-98 w-32 bg-white hover:bg-violet-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200"}
		>
			<td
				className="py-2 w-32 px-4 border border-gray-300 text-center text-xs md:text-base hover:bg-violet-200 dark:hover:bg-gray-600 dark:hover:text-white"
			>
				{shift.name}
			</td>
			{items.map((item) => (
				<td
					key={item.key}
					className={"py-2 mx px-4 border border-gray-300 text-center text-xs md:text-base hover:bg-violet-200 dark:hover:bg-gray-600 dark:hover:text-white"}
				>
					<div className="flex flex-col h-full w-full">
						{/* Nút Add ở trên cùng, chiều cao cố định */}
						<div className="h-8">
							<button
								className=""
							>
								<UserPlus className="mx-auto" size={16} />
							</button>
						</div>
						{/* Tên bác sĩ (nếu có) chiếm phần còn lại */}
						<div className="flex-1 flex items-center justify-center">
							{item.key === shift.key && (
								<span className="text-xs md:text-base">{item.label}</span>
							)}
						</div>
					</div>
				</td>
			))}
		</tr>
		
	)
	
	return (
		<div className={"container mx-auto overflow-auto  dark:outline dark:outline-white shadow-lg rounded-xl"}>
			<table className={
				"table-auto border-collapse min-w-full rounded-lg shadow-md " +
				"text-xs md:text-sm lg:text-base font-medium text-zinc-950 dark:text-gray-200 "
			}>
				<thead className={"bg-violet-300 text-gray-900 dark:bg-gray-900 dark:text-gray-300"}>
					<tr>
						<th key="shift" className="border-1 border-violet-200 w-fit py-3 px-2 text-center">Ca làm</th>
						{headers.map((header) => (
							<th
								key={header.key}
								className="border-1 border-violet-200 w-fit py-3 px-2 text-center"
							>
								{header.label}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{ shifts.map((shift) => (
						rowsShift(shift, items)
					)) }
				</tbody>
			</table>
		</div>
	);
}