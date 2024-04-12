import type { ReactNode } from "@tanstack/react-router";
import { Pizza } from "lucide-react";

interface AuthLayoutProps {
	children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps): JSX.Element {
	return (
		<div className="grid min-h-screen grid-cols-2">
			<div className="flex h-full flex-col justify-between border-r border-foreground/5 bg-muted p-10 text-muted-foreground">
				<header className="flex items-center gap-3 text-lg text-foreground">
					<Pizza className="h-5 w-5" />
					<span className="font-semibold">pizza.shop</span>
				</header>

				<footer className="text-sm">
					Painel do parceiro &copy; pizza.shop - {new Date().getFullYear()}
				</footer>
			</div>

			<div className="flex flex-col items-center justify-center relative">
				{children}
			</div>
		</div>
	);
}
