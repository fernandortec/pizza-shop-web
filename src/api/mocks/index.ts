import { getDailyRevenueInPeriodMock } from "@/api/mocks/get-daily-revenue-in-period-mock";
import { getDayOrdersAmountMock } from "@/api/mocks/get-day-orders-amount";
import { getMonthCanceledOrdersAmountMock } from "@/api/mocks/get-month-cancelled-orders-amount";
import { getMonthOrdersAmountMock } from "@/api/mocks/get-month-orders-amount";
import { getMonthRevenueMock } from "@/api/mocks/get-month-revenue-mock";
import { getPopularProductsMock } from "@/api/mocks/get-popular-products-mock";
import { registerResturantMock } from "@/api/mocks/register-restaurant-mock";
import { signInMock } from "@/api/mocks/sign-in-mock";
import { env } from "@/env";
import { setupWorker } from "msw/browser";

export const worker = setupWorker(
	signInMock,
	registerResturantMock,
	getDayOrdersAmountMock,
	getMonthOrdersAmountMock,
	getMonthCanceledOrdersAmountMock,
	getMonthRevenueMock,
	getPopularProductsMock,
	getDailyRevenueInPeriodMock,
);

export async function enableMSW(): Promise<void> {
	if (env.MODE !== "test") return;

	await worker.start();
}
