import AdminTable from "@/components/tables/AdminTable";

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
		<div>
			<AdminTable headers={headers} items={[{"adade": "12"}]} />
		</div>
	)
}