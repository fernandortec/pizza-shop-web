import { env } from "@/env";
import axios from "axios";

export const api = axios.create({
	baseURL: "http://localhost:3333",
	withCredentials: true,
});

if (env.ENABLE_API_DELAY) {
	api.interceptors.request.use(async (config) => {
		await new Promise((resolve) => setTimeout(resolve, 2000));

		return config;
	});
}
