import type { GetMonthCanceledOrdersAmountResponse } from "@/api/get-month-canceled-orders-amount";
import { http, HttpResponse, type StrictResponse } from "msw";

export const getMonthCanceledOrdersAmountMock = http.get<
	never,
	never,
	GetMonthCanceledOrdersAmountResponse
>(
	"http://localhost:3333/metrics/month-canceled-orders-amount",
	(): StrictResponse<GetMonthCanceledOrdersAmountResponse> => {
		return HttpResponse.json({ amount: 10, diffFromLastMonth: 2 });
	},
);
