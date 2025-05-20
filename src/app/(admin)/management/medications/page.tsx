import AdminTable from "@/components/tables/AdminTable";
import {Medication} from "@/types/medications";
import {getMedications} from "@/libs/graphqls/medications";

const headers = [
    { label: "ID", key: "id" },
    { label: "Tên Viết Tắt", key: "acronym" },
    { label: "Tên Thuốc", key: "name" },
    { label: "Số Lượng", key: "available_quantity" },
    { label: "Giá Bán", key: "price" },
    { label: "Cập Nhật", key: "action" },
];

export default async function MedicationPage() {
    const medications: Medication[] = await getMedications();
  return (
      <div>
        <AdminTable headers={headers} items={medications as unknown as Record<string, unknown>[]}/>
      </div>
  );
}