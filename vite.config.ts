import { resolve } from "node:path";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");

	return {
		plugins: [
			react(),
			TanStackRouterVite({
				routesDirectory: "./src/pages",
				routeFileIgnorePrefix: "-",
				generatedRouteTree: "./src/@types/route-tree.gen.ts"
			}),
		],
		resolve: {
			alias: {
				"@": resolve(__dirname, "./src"),
			},
		},
		define: {
			"process.env": env,
		},
	};
});
