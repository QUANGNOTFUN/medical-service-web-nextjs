"use client";
import React from "react";
import AdminSidebar from "@/app/(admin)/_components/sidebar/AdminSidebar";
import {ADMIN_SIDEBAR_ITEMS} from "@/app/(admin)/_values/constants";
import ApolloWrapper from "@/components/apollo/ApolloWrapper";

interface AdminClientWrapperProps {
	children: React.ReactNode;
}

export default function AdminClientWrapper({ children }: AdminClientWrapperProps) {
	return (
		<div className={"min-h-screen flex flex-row"}>
			<div className="fixed top-0 left-0 min-h-screen outline outline-black/20 ">
				<AdminSidebar title={"Quản lí phòng khám"} items={ADMIN_SIDEBAR_ITEMS} />
			</div>

			<main className="flex-1 lg:ml-64 outline outline-black/20 bg-zinc-700/5 dark:bg-zinc-900">
				<div className="container mx-auto p-8">
					<ApolloWrapper>
						{children}
					</ApolloWrapper>
				</div>
			</main>
		</div>
	);
}