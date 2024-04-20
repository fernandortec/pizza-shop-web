import type { DispatchOrderParams } from "@/api/dispatch-order";
import { HttpResponse, http } from "msw";

export const dispatchOrderMock = http.patch<DispatchOrderParams, never, never>(
	"http://localhost:3333/orders/:orderId/dispatch",
	async ({ params }) => {
		if (params.orderId === "error-order-id") {
			return new HttpResponse(null, { status: 400 });
		}

		return new HttpResponse(null, { status: 200 });
	},
);
