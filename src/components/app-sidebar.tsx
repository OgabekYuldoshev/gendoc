import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import { $session } from "@/app/auth/actions";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { redirect } from "next/navigation";
import Profile from "./profile";
import { ThemeButton } from "./theme-provider";
import { buttonVariants } from "./ui/button";

// Menu items.
const items = [
	{
		title: "Home",
		url: "#",
		icon: Home,
	},
	{
		title: "Inbox",
		url: "#",
		icon: Inbox,
	},
	{
		title: "Calendar",
		url: "#",
		icon: Calendar,
	},
	{
		title: "Search",
		url: "#",
		icon: Search,
	},
	{
		title: "Settings",
		url: "#",
		icon: Settings,
	},
];

export async function AppSidebar() {
	const result = await $session();

	if (!result.success) {
		redirect("/auth");
	}

	return (
		<Sidebar>
			<SidebarHeader className="flex items-center justify-between flex-row">
				<Link
					href="/"
					className={buttonVariants({
						variant: "ghost",
						className: "font-semibold text-xl w-full !justify-start",
					})}
				>
					GenDoc.
				</Link>
				<ThemeButton />
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Application</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<a href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<Profile profile={result.data} />
			</SidebarFooter>
		</Sidebar>
	);
}
