import { NavLink } from "@/components/nav-link";
import {
	Outlet,
	RouterProvider,
	createMemoryHistory,
	createRootRoute,
	createRoute,
	createRouter
} from "@tanstack/react-router";
import { render } from "@testing-library/react";
import { describe, it } from "bun:test";

describe("Nav Link", () => {
	it.skip("should highlight when the nav link when is the current page link", async () => {
		function createTestRouter(component: () => JSX.Element) {
			const rootRoute = createRootRoute({
				component: () => <Outlet />,
			});

			const componentRoute = createRoute({
				getParentRoute: () => rootRoute,
				path: "/",
				component,
			});

			const router = createRouter({
				routeTree: rootRoute.addChildren([componentRoute]),
				history: createMemoryHistory({ initialEntries: ["/"] }),
			});

			return router;
		}

		const router = createTestRouter(() => <NavLink to="/">about</NavLink>);
		const link = render(<NavLink to="/">about</NavLink>, {
			wrapper: ({ children }) => (
				<RouterProvider
					router={router}
					InnerWrap={({ children: routeChild }) => (
						<div>
							{children}
							{routeChild}
						</div>
					)}
				/>
			),
		});
		link.debug();
	});
});

