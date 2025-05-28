"use client"

import {Loader} from "lucide-react";
import {useGetMedications} from "@/app/(admin)/medication-manage/lib/hooks/useGetMedications";
import {useSearchMedications} from "@/app/(admin)/medication-manage/lib/hooks/useSearchMedications";
import {useState} from "react";
import {HEADER_TABLE_MEDICATION} from "@/app/(admin)/medication-manage/values/constants";
import AdminTableLayout from "@/app/(admin)/_components/Search&ActionTable/AdminTableLayout";
import {FindMedicationActionByType} from "@/app/(admin)/medication-manage/utils/FindMedicationActionByType";
import {ActionAdminTable} from "@/app/(admin)/_components/Search&ActionTable/AdminTable";

export default function MedicationPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedAction, setSelectedAction] = useState<ActionAdminTable["type"] | null>(null);
  const {medications: medications, loading: initLoading, error: errorMedications} = useGetMedications();
  const {medications: searchMedications, loading: searchLoading,} = useSearchMedications(searchTerm);

  const displayedMedications = (searchTerm && searchMedications.length > 0) ? searchMedications : medications;
  const loading = initLoading || searchLoading;
  const error = errorMedications;

  function handleAction(action: ActionAdminTable['type']) {
    setSelectedAction(action);
  }

  if (loading) return <Loader/>;
  if (error)
    return (
      <div>
        {error.name}: {error.message}
      </div>
    )

  return (
    <AdminTableLayout
      searchProps={{placeholder: "Tìm kiếm thuốc", onSearch: (term) => {setSearchTerm(term)}}}
      dropdownProps={{ onItemSelected: (type) => { handleAction(type) } }}
      tableProps={{headers: HEADER_TABLE_MEDICATION, items: displayedMedications, action: FindMedicationActionByType(selectedAction) || { type: "view" }}}
    />
  );
}