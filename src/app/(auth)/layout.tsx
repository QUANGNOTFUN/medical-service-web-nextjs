import PublicLayout from "@/app/(auth)/publicLayout";
import {ReactNode} from "react";

const AppLayout = ({ children }: { children: ReactNode }) => {
    return(
    <PublicLayout>{children}</PublicLayout>
    )
}

export default AppLayout;