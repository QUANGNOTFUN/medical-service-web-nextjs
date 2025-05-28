import {ActionAdminTable, HeaderAdminTable} from "@/app/(admin)/_components/Search&ActionTable/AdminTable";
import {useCreateMedication} from "@/app/(admin)/medication-manage/lib/hooks/useCreateMedication";
import {useUpdateMedication} from "@/app/(admin)/medication-manage/lib/hooks/useUpdateMedication";
import {useDeleteMedication} from "@/app/(admin)/medication-manage/lib/hooks/useDeleteMedication";

export const HEADER_TABLE_MEDICATION: HeaderAdminTable[] = [
	{ label: "ID", key: "id" },
	{ label: "Tên Viết Tắt", key: "acronym" },
	{ label: "Tên Thuốc", key: "name" },
	{ label: "Số Lượng", key: "available_quantity" },
	{ label: "Giá Bán", key: "price" },
]

export const ACTIONS_TABLE_MEDICATION: ActionAdminTable[] = [
	{ type: "view", onClick: () => {} },
	{ type: "create", onClick: () => useCreateMedication },
	{ type: "update", onClick: () => useUpdateMedication },
	{ type: "delete", onClick: () => useDeleteMedication },
]