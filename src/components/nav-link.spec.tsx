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

import { describe, it, expect } from "bun:test";

describe("Nav Link", () => {
	it("should highlight when the nav link when is the current page link", async () => {
		const rootRoute = createRootRoute({ component: () => <Outlet /> });
		const aboutRoute = createRoute({
			path: "/about",
			getParentRoute: () => rootRoute,
			component: () => (
				<>
					<NavLink to="/about">About</NavLink>
					<NavLink to="/home">Home</NavLink>
				</>
			),
		});

		const router = createRouter({
			history: createMemoryHistory({
				initialEntries: ["/about"],
			}),
			routeTree: rootRoute.addChildren([aboutRoute]),
		});

		router.isServer = true;

		await router.load();

		const wrapper = render(<RouterProvider router={router} />);

		expect(wrapper.getByText("About").dataset.current).toEqual("true");
		expect(wrapper.getByText("Home").dataset.current).toEqual("false");
	});
});
