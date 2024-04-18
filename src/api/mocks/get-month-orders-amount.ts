import type { GetMonthOrdersAmountResponse } from "@/api/get-month-orders-amount";
import { http, HttpResponse, type StrictResponse } from "msw";

export const getMonthOrdersAmountMock = http.get<
	never,
	never,
	GetMonthOrdersAmountResponse
>(
	"http://localhost:3333/metrics/month-orders-amount",
	(): StrictResponse<GetMonthOrdersAmountResponse> => {
		return HttpResponse.json({ amount: 200, diffFromLastMonth: -2 });
	},
);
