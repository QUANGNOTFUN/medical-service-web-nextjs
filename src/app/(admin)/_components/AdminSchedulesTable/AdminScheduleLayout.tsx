import AdminSchedulesTable from "@/app/(admin)/_components/AdminSchedulesTable/AdminSchedulesTable";
import {HEADER_SCHEDULE_TABLE} from "@/app/(admin)/schedule-manage/_values/constants";
import DoctorScheduleFilter from "@/app/(admin)/_components/AdminSchedulesTable/DoctorScheduleFilter";

interface AdminSchedulesLayoutProps {

}

export default function AdminScheduleLayout(

) {
	return (
		<div className={""}>
			<div className={""}>
				<DoctorScheduleFilter />
			
			</div>
			
			<AdminSchedulesTable headers={HEADER_SCHEDULE_TABLE} initialItems={[
				{ key: "morning", label: "1"},
				{ key: "morning", label: "2"},
				{ key: "morning", label: "3"},
				
				{ key: "morning", label: "4"},
				
				{ key: "afternoon", label: "2"},
			]} />
		</div>
	)
}