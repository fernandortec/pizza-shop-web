import { ErrorComponent } from "@/pages/-error";
import { NotFound } from "@/pages/-not-found";
import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
	component: () => <Outlet />,
	notFoundComponent: () => <NotFound />,
	errorComponent: (error) => <ErrorComponent {...error} />,
});
