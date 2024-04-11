import { RouterProvider, createRouter } from "@tanstack/react-router";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "./global.css";
import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

export function App(): JSX.Element {
	return (
		<HelmetProvider>
			<Helmet titleTemplate="%s | pizza.shop" />
			<RouterProvider router={router} />
		</HelmetProvider>
	);
}
