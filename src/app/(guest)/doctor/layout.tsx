"use client";

import {ReactNode} from "react";
import {ApolloProvider} from "@apollo/client";
import {apolloClient} from "@/libs/apollo/client";

interface DoctorsLayoutProps {
    children: ReactNode;
}

export default function DoctorsLayout({ children }: DoctorsLayoutProps) {
    return (
        <ApolloProvider client={apolloClient}>
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold text-left text-gray-800 mb-6">Khu vực bác sĩ</h1>
                {children}
            </div>
        </ApolloProvider>
    );
}
