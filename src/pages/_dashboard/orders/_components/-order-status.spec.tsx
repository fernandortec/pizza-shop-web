import "@testing-library/jest-dom/jest-globals";

import { it, expect, describe } from "bun:test";
import { render } from "@testing-library/react";
import { OrderStatus } from "@/pages/_dashboard/orders/_components/-order-status";

describe("Order status", () => {
	it("should display the right text based on order status", () => {
		const wrapper = render(<OrderStatus status="pending" />);
		console.log(wrapper.debug());

		expect(wrapper.getByText("Pendente")).toBeInTheDocument();
	});
});
