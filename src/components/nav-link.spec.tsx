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
	const componentRoute = createRoute({
		path: "/",
		getParentRoute: () => rootRoute,
		component: () => <NavLink to='/about'>index to about</NavLink>,
	});
	const router = createRouter({
		history: createMemoryHistory({
			initialEntries: ["/"],
		}),
		routeTree: rootRoute.addChildren([componentRoute]),
	});

	// Mock server mode
	// @ts-expect-error
	router.isServer = true;

	await router.load();

	const link = render(<RouterProvider router={router} />);

	link.debug();
});
