"use server";

import hash from "@/lib/hash";
import { prisma } from "@/lib/prisma";
import type { User } from "@prisma/client";
import naction from "naction";
import { cookies, headers } from "next/headers";
import { z } from "zod";

export const $login = naction
	.schema(
		z.object({
			username: z.string().min(4),
			password: z.string().min(6),
		}),
	)
	.action(async ({ password, username }) => {
		const headerStore = await headers();
		const cookieStore = await cookies();

		const user = await prisma.user.findUnique({
			where: {
				username,
			},
		});

		if (!user) {
			throw new Error("username or password is incorrect!");
		}

		const isPasswordCorrect = await hash.passwordVerify(
			password,
			user.password,
		);

		if (!isPasswordCorrect) {
			throw new Error("username or password is incorrect!");
		}

		const token = crypto.randomUUID();

		const newSession = await prisma.session.create({
			data: {
				expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24),
				token,
				userId: user.id,
				ipAddr: headerStore.get("x-forwarded-for") || "Unknown IP",
				userAgent: headerStore.get("user-agent") || "Unknown User Agent",
			},
		});

		cookieStore.set("token", newSession.token, {
			httpOnly: true,
			path: "/",
		});

		return { token: newSession.token };
	});

export const $session = naction.action(async () => {
	const headersStore = await headers();
	const cookieStore = await cookies();
	const token = cookieStore.get("token");

	const url = new URL(headersStore.get("referer") || "http://localhost:5000");

	const res = await fetch(
		`${url.origin}/api/auth/check-token?token=${token?.value}`,
	);
	const result = await res.json();

	if (!result.success) {
		throw new Error(result.message);
	}

	return result.data as Omit<User, "password">;
});

export const $revokeSession = naction.action(async () => {
	const cookieStore = await cookies();

	cookieStore.delete("token");

	return "ok";
});
