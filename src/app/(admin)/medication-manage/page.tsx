"use client"

import {Loader} from "lucide-react";
import {useGetMedications} from "@/libs/hooks/medications/useGetMedications";
import {useSearchMedications} from "@/libs/hooks/medications/useSearchMedications";
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
import {useCreateMedication} from "@/libs/hooks/medications/useCreateMedication";
import {useUpdateMedication} from "@/libs/hooks/medications/useUpdateMedication";
import {useDeleteMedication} from "@/libs/hooks/medications/useDeleteMedication";
import ConfirmationDialog from "@/app/(admin)/_components/dialog/ConfirmationDialog";

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
      await deleteMedication(selectedId)
      await refetchMedications()
      handleAction("delete") // clear form and selectedId after update
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

      case "delete":
        if (selectedId === null) return null;
        return <ConfirmationDialog
          isOpen={selectedAction === "delete"}
          message={"Bạn có chắc chắn muốn xóa thuốc này không?"}
          onClose={() => handleAction("delete")}
          onConfirm={handleDeleteSubmit}
          title={"Xác nhận xóa thuốc"}
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