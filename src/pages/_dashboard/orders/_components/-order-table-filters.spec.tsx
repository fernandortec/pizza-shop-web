import { describe } from "bun:test";
import { CustomRouterProvider } from "@/test/custom-router-provider";
import { OrderTableFilters } from "@/pages/_dashboard/orders/_components/-order-table-filters";

describe("Order table filter", async () => {
	const wrapper = await CustomRouterProvider({
		element: <OrderTableFilters />,
		path: "/_dashboard/orders/",
	});
});
