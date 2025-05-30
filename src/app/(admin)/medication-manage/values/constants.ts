import {ActionAdminTable, HeaderAdminTable} from "@/app/(admin)/_components/Search&ActionTable/AdminTable";
import {useCreateMedication} from "@/app/(admin)/medication-manage/lib/hooks/useCreateMedication";
import {useUpdateMedication} from "@/app/(admin)/medication-manage/lib/hooks/useUpdateMedication";
import {useDeleteMedication} from "@/app/(admin)/medication-manage/lib/hooks/useDeleteMedication";
import {CreateMedicationInput, UpdateMedicationInput} from "@/types/medications";
import {AdminFormProps} from "@/app/(admin)/_components/Create&UpdateForm/AdminForm";

export const HEADER_TABLE_MEDICATION: HeaderAdminTable[] = [
	{ label: "ID", key: "id" },
	{ label: "Tên Viết Tắt", key: "acronym" },
	{ label: "Tên Thuốc", key: "name" },
	{ label: "Số Lượng", key: "available_quantity" },
	{ label: "Giá Bán", key: "price" },
]

export const INIT_CREATE_MEDICATION_FORM: AdminFormProps<CreateMedicationInput> = {
	title: "Thêm mới thuốc",
	fields: [
		{ label: "Tên viết tắt", key: "acronym",  type: "text"},
		{ label: "Tên thuốc", key: "name", type: "text"},
		{ label: "Giá bán", key: "price",  type: "number"},
		{ label: "Số lượng hiện có", key: "available_quantity", type: "number"}
	],
	submitLabel: "Tạo"
}

export const INIT_UPDATE_MEDICATION_FORM: AdminFormProps<UpdateMedicationInput> = {
	title: "Cập nhật thuốc",
	fields: [
		{ label: "Tên viết tắt", key: "acronym",  type: "text"},
		{ label: "Tên thuốc", key: "name", type: "text"},
		{ label: "Giá bán", key: "price",  type: "number"},
		{ label: "Số lượng hiện có", key: "available_quantity", type: "number"}
	],
	submitLabel: "Cập nhật"
}