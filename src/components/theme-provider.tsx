"use client";

import { Laptop, Loader2, Moon, Sun } from "lucide-react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import type React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "./ui/button";

export function ThemeProvider({
	children,
	...props
}: React.ComponentProps<typeof NextThemesProvider>) {
	return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export function ThemeButton() {
	const [visible, setVisible] = useState(false);
	const { theme, setTheme } = useTheme();

	const toggleTheme = useCallback(() => {
		switch (theme) {
			case "light":
				setTheme("dark");
				break;
			case "dark":
				setTheme("system");
				break;
			case "system":
				setTheme("light");
				break;
		}
	}, [theme, setTheme]);

	const renderIcon = useMemo(() => {
		switch (theme) {
			case "light":
				return <Sun />;
			case "dark":
				return <Moon />;
			default:
				return <Laptop />;
		}
	}, [theme]);

	useEffect(() => {
		setVisible(true);
	}, []);

	if (!visible) {
		return (
			<Button variant="ghost" className="flex-shrink-0" size="icon" disabled>
				<Loader2 className="animate-spin" />
			</Button>
		);
	}

	return (
		<Button variant="ghost" className="flex-shrink-0" size={"icon"} onClick={toggleTheme}>
			{renderIcon}
		</Button>
	);
}
