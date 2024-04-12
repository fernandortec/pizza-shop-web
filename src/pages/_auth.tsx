import { AuthLayout } from "@/layouts/auth";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
	component: () => (
		<>
			<AuthLayout>
				<Outlet />
			</AuthLayout>
		</>
	),
});
