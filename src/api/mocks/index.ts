import { getDailyRevenueInPeriodMock } from "@/api/mocks/get-daily-revenue-in-period-mock";
import { getDayOrdersAmountMock } from "@/api/mocks/get-day-orders-amount";
import { getManagedRestaurantMock } from "@/api/mocks/get-managed-restaurant-mock";
import { getMonthCanceledOrdersAmountMock } from "@/api/mocks/get-month-cancelled-orders-amount";
import { getMonthOrdersAmountMock } from "@/api/mocks/get-month-orders-amount";
import { getMonthRevenueMock } from "@/api/mocks/get-month-revenue-mock";
import { getPopularProductsMock } from "@/api/mocks/get-popular-products-mock";
import { getProfileMock } from "@/api/mocks/get-profile-mock";
import { registerResturantMock } from "@/api/mocks/register-restaurant-mock";
import { signInMock } from "@/api/mocks/sign-in-mock";
import { updateProfileMock } from "@/api/mocks/update-profile-mock";
import { env } from "@/env";
import { setupWorker } from "msw/browser";

export const worker = setupWorker(
	getMonthCanceledOrdersAmountMock,
	signInMock,
	registerResturantMock,
	getDayOrdersAmountMock,
	getMonthOrdersAmountMock,
	getMonthRevenueMock,
	getPopularProductsMock,
	getDailyRevenueInPeriodMock,
	getProfileMock,
	getManagedRestaurantMock,
	updateProfileMock,
);

export async function enableMSW(): Promise<void> {
	if (env.MODE !== "test") return;

	await worker.start();
}
