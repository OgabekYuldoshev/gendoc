"use client";

import { $revokeSession } from "@/app/auth/actions";
import type { User } from "@prisma/client";
import { LogOut, UserIcon } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";

const Profile = ({ profile }: { profile: Omit<User, "password"> }) => {
	return (
		<div className="flex items-center flex-row">
			<Link
				href={"#"}
				className={buttonVariants({
					className: "w-full !justify-start",
					variant: "ghost",
				})}
			>
				<UserIcon />
				{profile.name}
			</Link>
			<Button
				size="icon"
				className="flex-shrink-0"
				variant="ghost"
				onClick={() => $revokeSession()}
			>
				<LogOut />
			</Button>
		</div>
	);
};

export default Profile;
