import type { UpdateProfileBody } from "@/api/update-profile";
import { http, HttpResponse } from "msw";

export const updateProfileMock = http.put<never, UpdateProfileBody>(
	"http://localhost:3333/profile",
	async ({ request }): Promise<HttpResponse> => {
		const { name } = await request.json();

		if (name === "Rocket Pizza") {
			return new HttpResponse(null, { status: 204 });
		}

		return new HttpResponse(null, { status: 400 });
	},
);
