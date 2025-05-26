"use client";

import DropdownIcon from "@/components/dropdowns/DropdownIcon";
import { DropdownItem } from "@/components/dropdowns/types/dropdown";
import * as Icons from "lucide-react";
import {CircleEllipsis} from "lucide-react";


export default function ManagementPage() {
    // Danh sách items cho dropdown
    const items: DropdownItem[] = [
        {
            icon: Icons.Settings,
            label: "Settings",
            onClick: () => console.log("Settings clicked"),
        },
        {
            icon: Icons.ChevronDown,
            label: "ChevronDown",
            onClick: () => console.log("ChevronDown clicked"),
        },
    ];

    return (
        <div className="p-4">
            <div className="flex justify-end mb-4">
                <DropdownIcon icon={CircleEllipsis} items={items} />
            </div>
            <h1 className="text-2xl font-bold">Management Dashboard</h1>
            {/* Nội dung trang */}
        </div>
    );
}