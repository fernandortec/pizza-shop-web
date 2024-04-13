import { AppLayout } from "@/layouts/app";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard")({
	component: () => (
		<>
			<AppLayout>
				<Outlet />
			</AppLayout>
		</>
	),
});
