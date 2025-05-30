import {useEffect, useState} from "react";

export interface HeaderAdminTable {
	label: string;
	key: string;
}

export interface ActionAdminTable {
	type:  "view" | "create" | "update" | "delete";
	onClick?: (item: unknown) => void;
}

export interface AdminTableProps<T> {
	headers: HeaderAdminTable[];
	items: T[];
	action: ActionAdminTable;
}

const AdminTable = <T,>(
	{ headers, items, action }: AdminTableProps<T>
) => {
	const [isUpdate, setIsUpdate] = useState(false);
	const [isDelete, setIsDelete] = useState(false);

	useEffect(() => {
		setIsUpdate(action.type === "update");
		setIsDelete(action.type === "delete");
	}, [action]);

	return (
		<div className={"container mx-auto overflow-auto  dark:outline dark:outline-white shadow-lg rounded-xl"}>
			<table className={
				"table-auto border-collapse min-w-full rounded-lg shadow-md " +
				"text-xs md:text-sm lg:text-base font-medium text-zinc-950 dark:text-gray-200 "
			}>
				<thead className={"bg-violet-300 text-gray-900 dark:bg-gray-900 dark:text-gray-300"}>
					<tr>
						{headers.map((header) => (
							<th
								key={header.label}
								className="border-1 border-violet-200 w-fit py-3 px-2 text-center"
							>
								{header.label}
							</th>
						))}
						{ (isUpdate || isDelete) && (
							<th className={"w-fit py-3 px-4 text-center"}>
								Hành động
							</th>
						)}
					</tr>
				</thead>
				<tbody>
					{items.map((item, index) =>  (
						<tr
							key={index}
							className={"bg-white hover:bg-violet-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200" }
						>
							{headers.map((header) => (
								<td
									key={header.key}
									className="py-2 px-4 border border-gray-300 text-center text-xs md:text-base hover:bg-violet-200 dark:hover:bg-gray-600 dark:hover:text-white"
								>
									{ String(item[header.key as keyof T] ?? "N/A") }
								</td>
							))}

							{/*{ button for action}*/}
							{ (isUpdate || isDelete) && (
								<td className={"max-w-20 border border-gray-300 py-1 px-4 text-center text-xs md:text-base hover:bg-violet-200 dark:hover:bg-gray-600 dark:hover:text-white"}>
									<button
										onClick={() => action.onClick && action.onClick(item[headers[0].key as keyof T])}
										className={"container p-2 rounded-xl shadow-md outline outline-violet-500 bg-zinc-50 hover:bg-violet-300  hover:text-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:text-gray-100"}
									>
										{ isUpdate ? "Cập nhật" : "Xóa" }
									</button>
								</td>
							)}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default AdminTable;