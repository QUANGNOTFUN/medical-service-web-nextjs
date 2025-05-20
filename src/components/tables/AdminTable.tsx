interface Header {
	label: string;
	key: string;
}
interface TableProps<T> {
	headers: Header[];
	items: T[];
}

const AdminTable = <T extends Record<string, unknown>>({ headers, items }: TableProps<T>) => {
	return (
		<div className="container mx-auto overflow-auto border-gray-600 rounded-xl shadow-xl">
			<table className="min-w-full rounded-lg shadow-md">
				<thead className="bg-violet-500 text-white ">
					<tr>
						{headers.map((header) => (
							<th key={header.label}
							    className="py-3 px-4 text-center text-xs md:text-base">
								{header.label}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
				{items.map((item, index) =>  (
					<tr key={index}
					    className="hover:bg-violet-200 border-b border-gray-200">
						{headers.map((header) => (
							<td
								key={header.key}
								className="py-1 px-4 hover:bg-violet-300 text-center text-xs md:text-base"
							>
								{header.key === "action" ? (
									<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl">
										Cập nhật
									</button>
								) : (
									String(item[header.key as keyof T] ?? "N/A")
								)}
							</td>
						))}
					</tr>
				))}
				</tbody>
			</table>
		</div>
	)
}

export default AdminTable;