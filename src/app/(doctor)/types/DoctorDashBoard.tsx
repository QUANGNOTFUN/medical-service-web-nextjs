
export interface SideBarDoctor {
    label: string;
    href: string;
    icon: string;
}

export interface HeaderPatientTable {
    checkbox: boolean;
    label: string;
    key: string;
    type?: "text" | "number" | "date" | "boolean" | "icon";
}

export interface BlogTable {
    label: string;
    key: string;
    type?: "text" | "number" | "date" | "boolean" ;
}

export interface ActionDoctorTable {
    type:  "view" | "create" | "update" | "delete"; // action for a type of table
    onClick?: (item: unknown) => void; // callback for action when click button
}