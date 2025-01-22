"use client";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Fragment, type PropsWithChildren, type ReactNode } from "react";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";
type Props = PropsWithChildren<{
	right?: ReactNode;
	breadcrumbs: Array<string | { label: string; href: string }>;
}>;
export default function PageWrapper({ children, breadcrumbs, right }: Props) {
	return (
		<div className="flex flex-col w-full min-h-screen h-full">
			{/* Header */}
			<div className="p-4 h-14 border-b w-full flex-shrink-0 items-center flex gap-2 justify-between">
				<div className="flex items-center gap-2">
					<SidebarTrigger />
					<Separator orientation="vertical" className="h-4" />
					<Breadcrumb className="ml-2">
						<BreadcrumbList>
							{breadcrumbs.map((item, index) => {
								const hasSeperator =
									index < breadcrumbs.length - 1 ? (
										<BreadcrumbSeparator />
									) : null;

								if (typeof item === "string") {
									return (
										<Fragment key={item}>
											<BreadcrumbItem>
												<BreadcrumbPage>{item}</BreadcrumbPage>
											</BreadcrumbItem>
											{hasSeperator}
										</Fragment>
									);
								}

								return (
									<Fragment key={item.href}>
										<BreadcrumbItem key={item.href}>
											<BreadcrumbLink asChild>
												<Link href={item.href}>{item.label}</Link>
											</BreadcrumbLink>
										</BreadcrumbItem>
										{hasSeperator}
									</Fragment>
								);
							})}
						</BreadcrumbList>
					</Breadcrumb>
				</div>
				{/* Right section */}
				{right}
			</div>
			{/* Main section */}
			{children && <div className="p-4">children</div>}
		</div>
	);
}
