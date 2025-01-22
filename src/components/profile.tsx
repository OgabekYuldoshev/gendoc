"use client";

import { $revokeSession } from "@/app/auth/actions";
import type { User } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { Loader2, LogOut, UserIcon } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";

const Profile = ({ profile }: { profile: Omit<User, "password"> }) => {
	const { mutate, isPending } = useMutation({
		mutationKey: ["logout"],
		mutationFn: $revokeSession,
	});
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
				onClick={() => mutate()}
				disabled={isPending}
			>
				{isPending ? <Loader2 className="animate-spin" /> : <LogOut />}
			</Button>
		</div>
	);
};

export default Profile;
