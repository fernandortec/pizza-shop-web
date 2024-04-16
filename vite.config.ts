import { resolve } from "node:path";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import { type UserConfig, loadEnv, defineConfig } from "vite";

import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/

export default defineConfig(({ mode }): UserConfig => {
	const env = loadEnv(mode, process.cwd(), "");

	return {
		plugins: [
			react(),
			TanStackRouterVite({
				routesDirectory: "./src/pages",
				routeFileIgnorePrefix: "-",
				generatedRouteTree: "./src/@types/route-tree.gen.ts",
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
