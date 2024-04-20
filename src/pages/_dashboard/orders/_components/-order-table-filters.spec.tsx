import { OrderTableFilters } from "@/pages/_dashboard/orders/_components/-order-table-filters";
import { CustomRouterProvider } from "@/test/custom-router-provider";
import type { Router } from "@tanstack/react-router";
import type queries from "@testing-library/dom/types/queries";
import type { RenderResult } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it,mock } from "bun:test";

window.HTMLElement.prototype.hasPointerCapture = mock();

describe("Order table filter", async () => {
	let router: Router;
	let wrapper: RenderResult<typeof queries, HTMLElement, HTMLElement>;

	beforeEach(async () => {
		const { wrapper: customWrapper, router: customRouter } =
			await CustomRouterProvider({
				element: <OrderTableFilters />,
				path: "/_dashboard/orders/",
			});

		router = customRouter;
		wrapper = customWrapper;
	});

	it("should add order id to params when filtered", async () => {
		const user = userEvent.setup();

		const inputID = wrapper.getByPlaceholderText("ID do pedido");
		await user.type(inputID, "id-209083401");

		const filterButton = wrapper.getByText("Filtrar resultados");

		await user.click(filterButton);
		expect(router.latestLocation.href).toContain("orderId=id-209083401");
	});

	it("should add customerName to params when filtered", async () => {
		const user = userEvent.setup();

		const customerInput = wrapper.getByPlaceholderText("Nome do cliente");
		await user.type(customerInput, "John Doe");

		const filterButton = wrapper.getByText("Filtrar resultados");

		await user.click(filterButton);
		expect(router.latestLocation.href).toContain("customerName=John%20Doe");
	});

});
