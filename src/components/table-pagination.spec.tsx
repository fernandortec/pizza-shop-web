import { TablePagination } from "@/components/table-pagination";
import { render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { it, expect, describe, mock, beforeEach } from "bun:test";

describe("Pagination", () => {
	const onPageChangeCallback = mock();

	beforeEach(() => {
		onPageChangeCallback.mockClear();
	});

	it("should display the right amount of pages and results", () => {
		const wrapper = render(
			<TablePagination
				pageIndex={0}
				totalCount={200}
				perPage={10}
				onPageChange={() => {}}
			/>,
		);

		expect(wrapper.getByText("Página 1 de 20")).toBeInTheDocument();
		expect(wrapper.getByText("Total de 200 item(s)")).toBeInTheDocument();
	});

	it("should be able to navigate to the next page", async () => {
		const user = userEvent.setup();

		const wrapper = render(
			<TablePagination
				pageIndex={0}
				totalCount={200}
				perPage={10}
				onPageChange={onPageChangeCallback}
			/>,
		);

		const nextPageButton = wrapper.getByTestId("next");
		await user.click(nextPageButton);

		expect(onPageChangeCallback).toHaveBeenCalledWith(1);
	});

	it("should be able to navigate to the previous page", async () => {
		const user = userEvent.setup();

		const wrapper = render(
			<TablePagination
				pageIndex={5}
				totalCount={200}
				perPage={10}
				onPageChange={onPageChangeCallback}
			/>,
		);
		
		const nextPageButton = wrapper.getByTestId("previous");
		await user.click(nextPageButton);

		expect(onPageChangeCallback).toHaveBeenCalledWith(4);
	});

	it("should be able to navigate to the first page", async () => {
		const user = userEvent.setup();

		const wrapper = render(
			<TablePagination
				pageIndex={5}
				totalCount={200}
				perPage={10}
				onPageChange={onPageChangeCallback}
			/>,
		);

		const firstPageButton = wrapper.getByTestId("first");
		await user.click(firstPageButton);

		expect(onPageChangeCallback).toHaveBeenCalledWith(0);
	});

	it("should be able to navigate to the last page", async () => {
		const user = userEvent.setup();

		const wrapper = render(
			<TablePagination
				pageIndex={0}
				totalCount={200}
				perPage={10}
				onPageChange={onPageChangeCallback}
			/>,
		);

		const lastPageButton = wrapper.getByTestId("last");
		await user.click(lastPageButton);

		expect(onPageChangeCallback).toHaveBeenCalledWith(19);
	});
});
