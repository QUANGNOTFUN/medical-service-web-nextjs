import {ComponentType} from "react";
import {LucideProps} from "lucide-react";

export interface DropdownItem {
	icon: ComponentType<LucideProps>;
	label: string;
	onClick: () => void;
}

interface DropdownIconsProps {
	icon: ComponentType<LucideProps>;
	items: DropdownItem[];
}

export default DropdownIconsProps;