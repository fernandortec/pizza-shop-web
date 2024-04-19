import { Header } from "@/components/header";
import { api } from "@/lib/axios";
import { useNavigate } from "@tanstack/react-router";
import { isAxiosError } from "axios";
import { useEffect, type ReactNode } from "react";

interface AppLayoutProps {
	children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps): JSX.Element {
	const navigate = useNavigate();

	useEffect(() => {
		const interceptorId = api.interceptors.response.use(
			(response) => response,
			(error) => {
				if (isAxiosError(error)) {
					const status = error.response?.status;
					const code = error.response?.data.code;
					console.log(error, "<>");
					if (status === 401 && code === "UNAUTHORIZED") {
						navigate({ to: "/sign-in", replace: true });
					} else {
						throw error;
					}
				}
			},
		);

		return () => {
			api.interceptors.response.eject(interceptorId);
		};
	}, [navigate]);

	return (
		<div className="flex min-h-screen flex-col antialiased">
			<Header />

			<div className="flex flex-1 flex-col gap-4 p-8 py-6">{children}</div>
		</div>
	);
}
