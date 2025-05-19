import {FC} from "react";

interface Medication {
	id: number;
	acronym: string;
	name: string;
	price: number;
	quantity: number;
}

interface MedicationTableProps {
	medications: Medication[];
}

const MedicationTable: FC<MedicationTableProps> = ({medications}) => {
	return (
		<div className="container mx-auto overflow-auto border-gray-600 rounded-xl shadow-xl">
			<table className="min-w-full rounded-lg shadow-md">
				<thead className="bg-violet-500 text-white ">
					<tr>
						<th className={"py-3 px-4 text-center text-base sm:text-lg font-semibold"}>ID</th>
						<th className={"py-3 px-4 text-center text-base sm:text-lg font-semibold"}>Tên viết tắt</th>
						<th className={"py-3 px-4 text-center text-base sm:text-lg font-semibold"}>Tên thuốc</th>
						<th className={"py-3 px-4 text-center text-base sm:text-lg font-semibold"}>Số lượng</th>
						<th className={"py-3 px-4 text-center text-base sm:text-lg font-semibold"}>Giá bán</th>
						<th className={"py-3 px-4 text-center text-base sm:text-lg font-semibold"}>Cập nhật</th>
					</tr>
				</thead>
				<tbody>
				{medications.map((medications) => (
					<tr key={medications.id} className="hover:bg-violet-200 border-b border-gray-200">
						<td className={"py-3 px-4 hover:bg-violet-300 text-center text-xs md:text-base"}>{medications.id}</td>
						<td className={"py-3 px-4 hover:bg-violet-300 text-center text-xs md:text-base"}>{medications.acronym}</td>
						<td className={"py-3 px-4 hover:bg-violet-300 text-center text-xs md:text-base"}>{medications.name}</td>
						<td className={"py-3 px-4 hover:bg-violet-300 text-center text-xs md:text-base"}>{medications.quantity}</td>
						<td className={"py-3 px-4 hover:bg-violet-300 text-center text-xs md:text-base"}>{medications.price}</td>
						<td className={"py-3 px-4 text-center text-xs md:text-base"}>
							<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
								Cập nhật
							</button>
						</td>
					</tr>
				))}
				</tbody>
			</table>
		</div>
	)
}

export default MedicationTable;