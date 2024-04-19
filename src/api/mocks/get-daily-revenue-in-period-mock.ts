import type { GetDailyRevenueInPeriodResponse } from "@/api/get-daily-revenue-in-period";
import { http, HttpResponse, type StrictResponse } from "msw";

export const getDailyRevenueInPeriodMock = http.get<
	never,
	never,
	GetDailyRevenueInPeriodResponse
>(
	"http://localhost:3333/metrics/daily-receipt-in-period",
	(): StrictResponse<GetDailyRevenueInPeriodResponse> => {
		return HttpResponse.json([
			{
				date: "01/04/2024",
				receipt: 2000,
			},
			{
				date: "02/04/2024",
				receipt: 8000,
			},
			{
				date: "03/04/2024",
				receipt: 4000,
			},

			{
				date: "04/04/2024",
				receipt: 1500,
			},
			{
				date: "05/04/2024",
				receipt: 760,
			},
			{
				date: "06/04/2024",
				receipt: 4500,
			},
			{
				date: "07/04/2024",
				receipt: 5500,
			},
		]);
	},
);
