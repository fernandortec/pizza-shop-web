import type { GetDayOrdersAmountResponse } from "@/api/get-day-orders-amount";
import { http, HttpResponse, type StrictResponse } from "msw";

export const getDayOrdersAmountMock = http.get<
	never,
	never,
	GetDayOrdersAmountResponse
>(
	"http://localhost:3333/metrics/day-orders-amount",
	(): StrictResponse<GetDayOrdersAmountResponse> => {
		return HttpResponse.json({ amount: 20, diffFromYesterday: -5 });
	},
);
