// src/app/providers.tsx
'use client';
import { ApolloProvider } from '@apollo/client';
import {client} from "@/libs/apollo-client";
import React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
