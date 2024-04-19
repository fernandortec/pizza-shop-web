import { NavLink } from "@/components/nav-link";
import {
	Outlet,
	RouterProvider,
	createMemoryHistory,
	createRootRoute,
	createRoute,
	createRouter,
} from "@tanstack/react-router";
import { render } from "@testing-library/react";

import { describe, it } from "bun:test";

describe("NavLink", () => {
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
});
