import type { GetMonthRevenueResponse } from "@/api/get-month-revenue";
import { http, HttpResponse, type StrictResponse } from "msw";

export const getMonthRevenueMock = http.get<
	never,
	never,
	GetMonthRevenueResponse
>(
	"http://localhost:3333/metrics/month-receipt",
	(): StrictResponse<GetMonthRevenueResponse> => {
		return HttpResponse.json({ receipt: 29000, diffFromLastMonth: 10 });
	},
);
