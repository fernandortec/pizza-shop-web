import { Header } from "@/components/header";
import type { ReactNode } from "react";

interface AppLayoutProps {
	children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps): JSX.Element {
		return (
			<div className="flex min-h-screen flex-col antialiased">
				<Header />

				<div className="flex flex-1 flex-col gap-4 p-8 py-6">
					{children}
				</div>
			</div>
		);
	}
