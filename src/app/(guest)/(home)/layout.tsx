import React from "react";

import PosterCarousel from "@/components/silders/Poster";

// src/app/(guest)/layout.tsx
export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <PosterCarousel/>
            <main className="flex-grow">{children}</main>
        </>
    );
}

