"use server";

import naction from "naction";
import { z } from "zod";

export const $login = naction
	.schema(
		z.object({
			username: z.string().min(4),
			password: z.string().min(6),
		}),
	)
	.action(async ({ password, username }) => {
		console.log(password, username)
		return { id: "" };
	});
