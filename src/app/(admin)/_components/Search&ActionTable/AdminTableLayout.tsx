import TableSearch, {TableSearchProps} from "@/app/(admin)/_components/Search&ActionTable/TableSearch";
import TableDropdownActions, {
	TableDropdownActionsProps
} from "@/app/(admin)/_components/Search&ActionTable/TableDropdownActions";
import AdminTable, {AdminTableProps} from "@/app/(admin)/_components/Search&ActionTable/AdminTable";
import DarkModeToggle from "@/components/toggles/DarkModeToogle";
import React from "react";

interface AdminTableLayoutProps {
	searchProps: TableSearchProps;
	dropdownProps: TableDropdownActionsProps;
	tableProps: AdminTableProps<unknown>;
}
export default function AdminTableLayout(
	{ searchProps, dropdownProps, tableProps }: AdminTableLayoutProps
){
	return (
			<div className={"flex flex-col"}>
				<div className={"flex justify-between mb-4"}>
					<TableSearch placeholder={searchProps.placeholder} onSearch={searchProps.onSearch} />
					<DarkModeToggle />
					<TableDropdownActions onItemSelected={dropdownProps.onItemSelected} />
				</div>

				<AdminTable headers={tableProps.headers} items={tableProps.items} action={tableProps.action} />
			</div>
	);
}