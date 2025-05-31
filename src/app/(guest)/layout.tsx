
import PosterCarousel from "@/components/silders/Poster";
import Header from "@/components/header/Header";
import React from "react";

// src/app/(guest)/layout.tsx
export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <PosterCarousel />
            <main className="flex-grow">{children}</main>
        </>
    );
}

