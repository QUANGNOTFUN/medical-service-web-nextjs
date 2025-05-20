import AdminSearch from "@/components/searchs/AdminSearch";
import React from "react";

export default function ManagementLayout({
    children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main>
			<div className="flex flex-row justify-between mb-6">
				<AdminSearch />
			</div>

			<div className="mx-auto">
				{children}
			</div>
		</main>
	);
}