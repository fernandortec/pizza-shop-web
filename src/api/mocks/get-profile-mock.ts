import type { GetProfileResponse } from "@/api/get-profile";
import { http, HttpResponse, type StrictResponse } from "msw";

export const getProfileMock = http.get<never, never, GetProfileResponse>(
	"http://localhost:3333/me",
	(): StrictResponse<GetProfileResponse> => {
		return HttpResponse.json({
			id: "custom-user-id",
			email: "johndoe@example.com",
			name: "John Doe",
			phone: "31987463212",
			role: "manager",
			updatedAt: new Date(),
			createdAt: new Date(),
		});
	},
);
