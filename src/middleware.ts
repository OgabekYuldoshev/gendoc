import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
	const url = new URL(request.url);
	const token = request.cookies.get("token");
	const isAuthPage = url.pathname === "/auth";

	const res = await fetch(
		`${url.origin}/api/auth/check-token?token=${token?.value}`,
	);

	const result = (await res.json()) as { success: boolean };

	if (!result.success) {
		request.cookies.delete("token");
		return isAuthPage
			? NextResponse.next()
			: NextResponse.redirect(new URL("/auth", request.url));
	}

	return isAuthPage
		? NextResponse.redirect(new URL("/", request.url))
		: NextResponse.next();
}

export const config = {
	matcher: [
		"/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
	],
};
