import type { GetManagedRestaurantResponse } from "@/api/get-managed-restaurant";
import { http, HttpResponse, type StrictResponse } from "msw";

export const getManagedRestaurantMock = http.get<
	never,
	never,
	GetManagedRestaurantResponse
>(
	"http://localhost:3333/managed-restaurant",
	(): StrictResponse<GetManagedRestaurantResponse> => {
		return HttpResponse.json({
			id: "custom-user-id",
			name: "Pizza shop",
			description: "Custom restaurant description",
			managerId: "custom-user-id",
			updatedAt: new Date(),
			createdAt: new Date(),
		});
	},
);
