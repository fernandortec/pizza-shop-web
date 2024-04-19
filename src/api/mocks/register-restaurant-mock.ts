import type { RegisterRestaurantBody } from "@/api/register-restaurant";
import { http, HttpResponse } from "msw";

export const registerResturantMock = http.post<never, RegisterRestaurantBody>(
	"http://localhost:3333/restaurants",
	async ({ request }): Promise<HttpResponse> => {
		const { restaurantName } = await request.json();

		if (restaurantName === "Pizza Shop") {
			return new HttpResponse(null, { status: 200 });
		}

		return new HttpResponse(null, { status: 400 });
	},
);
