import { NavLink } from "@/components/nav-link";
import {
	Outlet,
	RouterProvider,
	createMemoryHistory,
	createRootRoute,
	createRoute,
	createRouter,
	redirect,
} from "@tanstack/react-router";
import { render } from "@testing-library/react";
import { it } from "bun:test";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

it("should highlight when the nav link when is the current page link", async () => {
	const rootRoute = createRootRoute({ component: () => <Outlet /> });

	const indexRoute = createRoute({
		path: "/",
		getParentRoute: () => rootRoute,
		beforeLoad: () => {
			// throw redirect({ to: "/about" as any });
		},
		component: () => <NavLink to='/about'>index to about</NavLink>,
	});

	const aboutRoute = createRoute({
		path: "about",
		getParentRoute: () => rootRoute,
		component: () => {
			return <NavLink to='/'>about to index</NavLink>;
		},
	});

	const routeTree = rootRoute.addChildren([aboutRoute, indexRoute]);

	const router = createRouter({
		history: createMemoryHistory({
			initialEntries: ["/"],
		}),
		routeTree,
	});

	// Mock server mode
	// @ts-expect-error
	router.isServer = true;

	await router.load();

	console.log(router.state);

	const link = render(<RouterProvider router={router} />);

	link.debug();
});
