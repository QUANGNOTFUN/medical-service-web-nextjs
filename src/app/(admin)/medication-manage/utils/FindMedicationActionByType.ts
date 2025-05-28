import {ActionAdminTable} from "@/app/(admin)/_components/Search&ActionTable/AdminTable";
import {ACTIONS_TABLE_MEDICATION} from "@/app/(admin)/medication-manage/values/constants";

export function FindMedicationActionByType(selectedAction: ActionAdminTable["type"] | null ): ActionAdminTable | undefined{
	switch (selectedAction) {
		case "create":
			return ACTIONS_TABLE_MEDICATION.find((action) => action.type === "create")
		case "update":
			return ACTIONS_TABLE_MEDICATION.find((action) => action.type === "update")
		case "delete":
			return ACTIONS_TABLE_MEDICATION.find((action) => action.type === "delete")
		default:
			return ;
	}
}