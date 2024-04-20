import type {
	GetOrderDetailsParams,
	GetOrderDetailsResponse,
} from "@/api/get-order-details";
import { HttpResponse, http, type StrictResponse } from "msw";

export const getOrderDetailsMock = http.get<
	GetOrderDetailsParams,
	never,
	GetOrderDetailsResponse
>(
	"http://localhost:3333/orders/:orderId",
	({ params }): StrictResponse<GetOrderDetailsResponse> => {
		const totalInCents = Math.floor(Math.random() * 2500) + 1;

		return HttpResponse.json({
			id: params.orderId,
			customer: {
				name: "John doe",
				email: "johndoe@example.com",
				phone: "12367831042",
			},
			status: "pending",
			createdAt: new Date().toISOString(),
			totalInCents: totalInCents,
			orderItems: [
				{
					id: "order-item-1",
					priceInCents: totalInCents / 2,
					product: { name: "Pizza Muzzarela" },
					quantity: 1,
				},
				{
					id: "order-item-2",
					priceInCents: totalInCents / 4,
					product: { name: "Pizza Pepperoni" },
					quantity: 2,
				},
			],
		});
	},
);
