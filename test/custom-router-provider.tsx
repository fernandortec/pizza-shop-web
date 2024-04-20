import type { ReactNode } from "react";
import {
	Outlet,
	RouterProvider as TanStackRouterProvider,
	createMemoryHistory,
	createRootRoute,
	createRoute,
	createRouter,
} from "@tanstack/react-router";
import React from "react";
import { type RenderResult, render } from "@testing-library/react";
import type queries from "@testing-library/dom/types/queries";
import path from "path";

interface RouterProviderProps {
	path: string;
	element: JSX.Element;
	initialEntries?: string;
}

export async function CustomRouterProvider({
	element,
	path,
	initialEntries,
}: RouterProviderProps): Promise<
	RenderResult<typeof queries, HTMLElement, HTMLElement>
> {
	const rootRoute = createRootRoute({ component: () => <Outlet /> });
	const componentRoute = createRoute({
		path,
		getParentRoute: () => rootRoute,
		component: () => element,
	});

	const router = createRouter({
		history: createMemoryHistory({
			initialEntries: [initialEntries ?? path],
		}),
		routeTree: rootRoute.addChildren([componentRoute]),
	});

	router.isServer = true;

	await router.load();

	const wrapper = render(<TanStackRouterProvider router={router} />);

	return wrapper;
}
