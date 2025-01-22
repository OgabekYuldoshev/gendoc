import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import type { PropsWithChildren } from "react";

export default function AppLayout({ children }: PropsWithChildren) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main>{children}</main>
		</SidebarProvider>
	);
}
