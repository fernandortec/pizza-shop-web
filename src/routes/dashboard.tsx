import { AppLayout } from "@/layouts/app";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
	component: () => (
		<>
			<AppLayout />
			<Outlet />
		</>
	),
});
