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
import { describe, it } from "bun:test";
import { link } from "fs";

describe("Nav Link", () => {
	it("should highlight when the nav link when is the current page link", async () => {
		const rootRoute = createRootRoute();

		const indexRoute = createRoute({
			path: "/",
			getParentRoute: () => rootRoute,
			beforeLoad: () => {
				throw redirect({
					to: "/about",
				});
			},
		});

		const aboutRoute = createRoute({
			path: "/about",
			getParentRoute: () => rootRoute,
			component: () => {
				return "About";
			},
		});

		const router = createRouter({
			history: createMemoryHistory({
				initialEntries: ["/"],
			}),
			routeTree: rootRoute.addChildren([indexRoute, aboutRoute]),
		});

		// Mock server mode
		router.isServer = true;

		await router.load();

		const link = render(<NavLink to="/about">about</NavLink>, {
			wrapper: () => <RouterProvider router={router} />,
		});
		
		link.debug();
	});
});
