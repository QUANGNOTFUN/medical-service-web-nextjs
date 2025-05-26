"use client"

import AdminTable from "@/components/tables/AdminTable";
import AdminSearch from "@/components/searchs/AdminSearch";
import DropdownIcon from "@/components/dropdowns/DropdownIcon";
import {CircleEllipsis} from "lucide-react";

const headers = [
	{ label: "ID", key: "id" },
	{ label: "Tên Viết Tắt", key: "acronym" },
	{ label: "Tên Thuốc", key: "name" },
	{ label: "Số Lượng", key: "available_quantity" },
	{ label: "Giá Bán", key: "price" },
	{ label: "Cập Nhật", key: "action" },
];

export default function DoctorPage() {

	return (
		<div className={"flex flex-col"}>
			<div className={"flex justify-between mb-4"}>
				<AdminSearch />

				<DropdownIcon icon={CircleEllipsis} items={[
					{ icon: CircleEllipsis, label: "Thêm", onClick: () => console.log("ChevronDown clicked")},
					{ icon: CircleEllipsis, label: "Cập nhật", onClick: () => console.log("ChevronDown clicked")},
					{ icon: CircleEllipsis, label: "Xóa", onClick: () => console.log("ChevronDown clicked")},
				]} />
			</div>

			<AdminTable headers={headers} items={[
				{ "Thêm": "12" },
				{ "Cập nhât": "12" },
				{ "Xóa": "12" },
			]} />
		</div>
	)
}