import { prisma } from "@/lib/prisma";
import { omit } from "radash";
export async function GET(request: Request) {
	try {
		const url = new URL(request.url);
		const token = url.searchParams.get("token");

		if (!token) {
			return Response.json({
				success: false,
				message: "Unauthorized",
			});
		}

		const session = await prisma.session.findUnique({
			where: {
				token,
			},
		});

		if (!session) {
			return Response.json({
				success: false,
				message: "Unauthorized",
			});
		}

		const now = new Date();

		const isTokenExpired = session.expiryDate < now;

		if (isTokenExpired) {
			return Response.json({
				success: false,
				message: "Unauthorized",
			});
		}

		const user = await prisma.user.findUnique({
			where: {
				id: session.userId,
			},
		});

		if (!user) {
			return Response.json({
				success: false,
				message: "Unauthorized",
			});
		}

		return Response.json({
			success: true,
			data: omit(user, ["password"]),
		});
	} catch (error) {
		return Response.json({
			success: false,
			message: (error as Error).message || "INTERNAL_ERROR",
		});
	}
}
