import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "./global.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import { routeTree } from "@/@types/route-tree.gen";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

export function App(): JSX.Element {
	return (
		<HelmetProvider>
			<ThemeProvider storageKey="pizzashop-theme" defaultTheme="dark">
				<Toaster richColors closeButton />
				<Helmet titleTemplate="%s | pizza.shop" />
				<QueryClientProvider client={queryClient}>
					<RouterProvider router={router} />
				</QueryClientProvider>
			</ThemeProvider>
		</HelmetProvider>
	);
}
