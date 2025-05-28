import { useState, useEffect } from "react";

export interface HeaderAdminTable {
	label: string;
	key: string;
}

export interface ActionAdminTable {
	type:  "view" | "create" | "update" | "delete";
	onClick?: () => void;
}

export interface AdminTableProps<T> {
	headers: HeaderAdminTable[];
	items: T[];
	action: ActionAdminTable;
}

const AdminTable = <T,>(
	{ headers, items, action }: AdminTableProps<T>
) => {
	const [isAdd, setIsAdd] = useState(false);
	const [isUpdate, setIsUpdate] = useState(false);
	const [isDelete, setIsDelete] = useState(false);
	const [newItem, setNewItem] = useState<{ [key: string]: string }>({});

	useEffect(() => {
		setIsAdd(action.type === "create");
		setIsUpdate(action.type === "update");
		setIsDelete(action.type === "delete");
	}, [action]);

	const handleInputChange = (key: string, value: string) => {
		setNewItem((prev) => ({...prev, [key]: value}));
	}

	const handleAdd = () => {
		const addAction = action as AdminTableProps<T>["action"];
		if (addAction?.type === "create") { addAction.onClick?.(); }
		setNewItem({});
		setIsAdd(false);
	}

	return (
		<div className="container mx-auto overflow-auto shadow-lg rounded-xl ">
			<table className="min-w-full rounded-lg shadow-md">
				<thead
					className="bg-violet-300 text-gray-900
						dark:bg-gray-900 dark:text-gray-300"
				>
					<tr>
						{headers.map((header) => (
							<th key={header.label}
							    className="py-3 px-4 text-center text-xs md:text-base">
								{header.label}
							</th>
						))}
						{ (isAdd || isUpdate || isDelete) && (
							<th className={"py-3 px-4 text-center text-xs md:text-base"}>
								Hành động
							</th>
						)}
					</tr>
				</thead>
				<tbody>
				{/* hàng input khi Add*/}
				{isAdd && (
					<tr className={"bg-white hover:bg-violet-100" +
						"dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200"}
					>
						{headers.map((header) => (
							<td key={header.key}
								className={"py-1 px-4 text-center text-xs md:text-base hover:bg-violet-200 dark:hover:bg-gray-600 dark:hover:text-white"}
							>
								<input
									type="text"
									value={newItem[header.key] || ""}
									onChange={(e) => handleInputChange(header.key, e.target.value)}
									className={"w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"}
								/>
							</td>
						))}
						<td className={"py-1 px-4 text-center text-xs md:text-base hover:bg-violet-200 dark:hover:bg-gray-600 dark:hover:text-white"}>
							<button
								className="py-2 px-4 rounded-xl  font-bold bg-violet-400 hover:bg-violet-500 text-gray-600 hover:text-gray-900
									dark:bg-gray-900 dark:hover:bg-gray-700 dark:text-gray-100"
								onClick={handleAdd}
							>
								Thêm
							</button>
						</td>
					</tr>
				)}
				{/* hàng input khi Update*/}
				{items.map((item, index) =>  (
					<tr
						key={index}
						className="bg-white hover:bg-violet-100
					    dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200"
					>
						{headers.map((header) => (
							<td
								key={header.key}
								className="py-1 px-4 text-center text-xs md:text-base hover:bg-violet-200 dark:hover:bg-gray-600 dark:hover:text-white"
							>
								{ isUpdate ? (
									<input
										type="text"
										value={String(item[header.key as keyof T] ?? "N/A")}
										onChange={(e) => {
											const newItems = [...items];
											newItems[index] = {...items[index], [header.key]: e.target.value};
										}}
										className={"w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"}
									/>
								) : (
									String(item[header.key as keyof T] ?? "N/A")
								)}
							</td>
						))}
						{ (isUpdate || isDelete) && (
							<td className={"py-1 px-4 text-center text-xs md:text-base hover:bg-violet-200 dark:hover:bg-gray-600 dark:hover:text-white"}>
								{ isUpdate && (
									<button
										onClick={action.onClick}
										className="py-2 px-4 rounded-xl  font-bold bg-violet-400 hover:bg-violet-500 text-gray-600 hover:text-gray-900
											dark:bg-gray-900 dark:hover:bg-gray-700 dark:text-gray-100"
									>
										Cập nhật
									</button>
								)}
								{ isDelete && (
									<button
										className="py-2 px-4 rounded-xl  font-bold bg-violet-400 hover:bg-violet-500 text-gray-600 hover:text-gray-900
											dark:bg-gray-900 dark:hover:bg-gray-700 dark:text-gray-100"
									>
										Xóa
									</button>
								)}
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