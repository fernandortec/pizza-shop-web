import type { GetPopularProductsResponse } from "@/api/get-popular-products";
import { http, HttpResponse, type StrictResponse } from "msw";

export const getPopularProductsMock = http.get<
	never,
	never,
	GetPopularProductsResponse
>(
	"http://localhost:3333/metrics/popular-products",
	(): StrictResponse<GetPopularProductsResponse> => {
		return HttpResponse.json([
			{
				product: "Pizza 1",
				amount: 20,
			},
			{
				product: "Pizza 2",
				amount: 7,
			},
			{
				product: "Pizza 3",
				amount: 22,
			},
			{
				product: "Pizza 4",
				amount: 32,
			},
			{
				product: "Pizza 5",
				amount: 10,
			},
			{
				product: "Pizza 6",
				amount: 6,
			},
			{
				product: "Pizza 7",
				amount: 5,
			},
		]);
	},
);
