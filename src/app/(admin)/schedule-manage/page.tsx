import {AdminSchedulesTable} from "@/app/(admin)/_components/AdminSchedulesTable/AdminSchedulesTable";
import {HEADER_SCHEDULE_TABLE} from "@/app/(admin)/schedule-manage/_values/constants";

export default function AdminSchedulePage() {
	return (
		<>
			<AdminSchedulesTable headers={HEADER_SCHEDULE_TABLE} items={[
				{ key: "morning", label: "1"},
				{ key: "morning", label: "2"},
				{ key: "morning", label: "3"},
				{ key: "morning", label: "4"},
				{ key: "morning", label: "5"},
				{ key: "morning", label: "6"},
				{ key: "morning", label: "7"},
				]} />
		</>
	);
}