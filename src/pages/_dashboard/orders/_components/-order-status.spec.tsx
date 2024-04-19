import { it, expect, describe } from "bun:test";
import { render } from "@testing-library/react";
import { OrderStatus } from "@/pages/_dashboard/orders/_components/-order-status";

describe("Order status", () => {
	it("should display the right text when order status is pending", () => {
		const wrapper = render(<OrderStatus status="pending" />);
		const badgeElement = wrapper.getByTestId("badge");

		expect(wrapper.getByText("Pendente")).toBeInTheDocument();
		expect(badgeElement).toHaveClass("bg-slate-400");
	});

	it("should display the right text when order status is canceled", () => {
		const wrapper = render(<OrderStatus status="canceled" />);
		const badgeElement = wrapper.getByTestId("badge");

		expect(wrapper.getByText("Cancelado")).toBeInTheDocument();
		expect(badgeElement).toHaveClass("bg-rose-500");
	});

	it("should display the right text when order status is canceled", () => {
		const wrapper = render(<OrderStatus status="processing" />);
		const badgeElement = wrapper.getByTestId("badge");

		expect(wrapper.getByText("Em preparo")).toBeInTheDocument();
		expect(badgeElement).toHaveClass("bg-amber-500");
	});

	it("should display the right text when order status is canceled", () => {
		const wrapper = render(<OrderStatus status="delivering" />);
		const badgeElement = wrapper.getByTestId("badge");

		expect(wrapper.getByText("Em entrega")).toBeInTheDocument();
		expect(badgeElement).toHaveClass("bg-emerald-500");
	});

	it("should display the right text when order status is canceled", () => {
		const wrapper = render(<OrderStatus status="delivered" />);
		const badgeElement = wrapper.getByTestId("badge");

		expect(wrapper.getByText("Entregue")).toBeInTheDocument();
		expect(badgeElement).toHaveClass("bg-green-500");
	});
});
