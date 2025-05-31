"use client";

import { ReactNode } from "react";
import useAuthenticated from "@/libs/hooks/auth/useAuthenticated";

const PublicLayout = ({ children }: { children: ReactNode }) => {
    const { session, status } = useAuthenticated();
    if (status === "loading") {
        return <div></div>
    }
    if (session) {
        return null;
    }
    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen">
            {children}
        </div>
    )
}

export default PublicLayout;