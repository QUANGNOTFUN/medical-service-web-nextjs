"use client"

import AdminTable from "@/components/tables/AdminTable";
import AdminSearch from "@/components/searchs/AdminSearch";
import DropdownIcon from "@/components/dropdowns/DropdownIcon";
import {CircleEllipsis, Loader} from "lucide-react";
import {useMedications} from "@/libs/hooks/medications/useMedications";
import {DropdownItem} from "@/components/dropdowns/types/dropdown";
import {useSearchMedications} from "@/libs/hooks/medications/useSearchMedications";
import {useState} from "react";

export default function MedicationPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { medications: medications, loading: initLoading, error: errorMedications } = useMedications();
  const { medications: searchMedications, loading: searchLoading, } = useSearchMedications(searchTerm);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  }

  const displayedMedications = (searchTerm && searchMedications.length > 0) ? searchMedications : medications;
  const loading = initLoading || searchLoading;
  const error = errorMedications ;

  const headers = [
    { label: "ID", key: "id" },
    { label: "Tên viết tắt", key: "acronym" },
    { label: "Tên thuốc", key: "name" },
    { label: "Số lượng", key: "available_quantity" },
    { label: "Giá bán", key: "price" },
  ];

  type Action = {
    type: "add" | "update" | "delete";
    label: string;
    onClick: () => void;
  };

  const actions: Action[] = [

    { type: "delete", label: "Thêm", onClick: () => console.log("Added") },
    ];

  const dropdownItems: DropdownItem[] = [
    { icon: CircleEllipsis, label: "Thêm", onClick: () => console.log("ChevronDown clicked") },
    { icon: CircleEllipsis, label: "Cập nhật", onClick: () => console.log("ChevronDown clicked") },
    { icon: CircleEllipsis, label: "Xóa", onClick: () => console.log("ád") },
  ];

  if (loading) return <Loader />;
  if (error)
    return (
      <div>
        {error.name}: {error.message}
      </div>
    )

  return (
    <div className={"flex flex-col"}>
      <div className={"flex justify-between mb-4"}>
        <AdminSearch onSearch={handleSearch}/>
        <DropdownIcon icon={CircleEllipsis} items={dropdownItems} />
      </div>
      <AdminTable headers={headers} items={displayedMedications} actions={actions}/>
    </div>
  );
}