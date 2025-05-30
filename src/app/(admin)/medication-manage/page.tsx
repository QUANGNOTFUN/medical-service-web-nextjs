"use client"

import {Loader} from "lucide-react";
import {useGetMedications} from "@/app/(admin)/medication-manage/lib/hooks/useGetMedications";
import {useSearchMedications} from "@/app/(admin)/medication-manage/lib/hooks/useSearchMedications";
import {useState} from "react";
import {
  HEADER_TABLE_MEDICATION,
  INIT_CREATE_MEDICATION_FORM,
  INIT_UPDATE_MEDICATION_FORM
} from "@/app/(admin)/medication-manage/values/constants";
import AdminTableLayout from "@/app/(admin)/_components/Search&ActionTable/AdminTableLayout";
import {ActionAdminTable} from "@/app/(admin)/_components/Search&ActionTable/AdminTable";
import {CreateMedicationInput, UpdateMedicationInput} from "@/types/medications";
import AdminForm from "@/app/(admin)/_components/Create&UpdateForm/AdminForm";
import {useCreateMedication} from "@/app/(admin)/medication-manage/lib/hooks/useCreateMedication";
import {useUpdateMedication} from "@/app/(admin)/medication-manage/lib/hooks/useUpdateMedication";
import {useDeleteMedication} from "@/app/(admin)/medication-manage/lib/hooks/useDeleteMedication";

export default function MedicationPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedAction, setSelectedAction] = useState<ActionAdminTable["type"]>('view');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { medications: medications, loading: initLoading, error: errorMedications, refetch: refetchMedications } = useGetMedications();
  const { medications: searchMedications, loading: searchLoading, } = useSearchMedications(searchTerm);
  const { create: createMedication, loading: createLoading, error: errorCreate } = useCreateMedication();
  const { update: updateMedication, loading: updateLoading, error: errorUpdate } = useUpdateMedication();
  const { delete: deleteMedication, loading: deleteLoading, error: errorDelete } = useDeleteMedication();

  const displayedMedications = (searchTerm && searchMedications.length > 0) ? searchMedications : medications;
  const loading = initLoading || searchLoading || createLoading || updateLoading || deleteLoading;
  const error = errorMedications || errorCreate || errorUpdate || errorDelete;

  function handleAction(action: ActionAdminTable['type']) {
    setSelectedAction(action);
    setSelectedId(null); // clear selected item
  }
  function handleSelectedId(id: number | null) {
    if (id !== null && id >= 0) {
      setSelectedId(id);

      // handle action if type is deletion
      if (selectedAction === "delete") {
        handleDeleteSubmit().then(() => {});
      }
    }
  }

  async function handleCreateSubmit(data: CreateMedicationInput) {
    try {
      await createMedication(data)
      await refetchMedications()
      handleAction("view") // clear form after creation
    } catch (error) {
      console.error("Create medication error:", error);
    }
  }

  async function handleUpdateSubmit(data: UpdateMedicationInput) {
    if (selectedId === null) return;
    try {
      await updateMedication(selectedId, data)
      await refetchMedications()
      handleAction("update") // clear form and selectedId after update
    } catch (error) {
      console.error("Create medication error:", error);
    }
  }

  async function handleDeleteSubmit() {
    if (selectedId === null) return;
    try {
      if (window.confirm("Bạn có chắc chắn muốn xóa thuốc này không?")) {
        await deleteMedication(parseInt(String(selectedId)))
        await refetchMedications()
        handleAction("view") // clear form and selectedId after update
      }
    } catch (error) {
      console.error("Create medication error:", error);
    }
  }

  const renderForm = () => {
    switch (selectedAction) {
      case "create":
        return <AdminForm
          { ...INIT_CREATE_MEDICATION_FORM }
          onClose={() => handleAction("view")}
          onSubmit={handleCreateSubmit}
        />
      case "update":
        if (selectedId === null) return null;
        return <AdminForm
          { ...INIT_UPDATE_MEDICATION_FORM }
          initialData={displayedMedications.find(medication => medication.id === selectedId)}
          onClose={() => handleAction("update")}
          onSubmit={handleUpdateSubmit}
        />
      default:
        return null;
    }
  }

  if (loading) return <Loader/>;
  if (error)
    return (
      <div>
        {error.name}: {error.message}
      </div>
    )

  return (
    <>
      {renderForm()}

      <AdminTableLayout
        searchProps={{placeholder: "Tìm kiếm thuốc", onSearch: (term) => {setSearchTerm(term)}}}
        dropdownProps={{ onItemSelected: (type) => { handleAction(type) } }}
        tableProps={{
          headers: HEADER_TABLE_MEDICATION,
          items: displayedMedications,
          action: { type: selectedAction, onClick: (item) => handleSelectedId(item as number) }
          }}
      />
    </>
  );
}