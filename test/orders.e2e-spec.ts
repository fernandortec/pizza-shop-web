import { test, expect } from "@playwright/test";

test("should list orders", async ({ page }) => {
	await page.goto("/orders", { waitUntil: "networkidle" });

	await expect(
		page.getByRole("cell", { name: "Customer 1", exact: true }),
	).toBeVisible();
	await expect(page.getByRole("cell", { name: "Customer 10" })).toBeVisible();
});

test("paginate orders", async ({ page }) => {
	await page.goto("/orders", { waitUntil: "networkidle" });

	await page.getByTestId("next").click();

	await expect(
		page.getByRole("cell", { name: "Customer 11", exact: true }),
	).toBeVisible();
	await expect(page.getByRole("cell", { name: "Customer 20" })).toBeVisible();

	await page.getByTestId("last").click();

	await expect(
		page.getByRole("cell", { name: "Customer 51", exact: true }),
	).toBeVisible();
	await expect(page.getByRole("cell", { name: "Customer 60" })).toBeVisible();

	await page.getByTestId("previous").click();

	await expect(
		page.getByRole("cell", { name: "Customer 41", exact: true }),
	).toBeVisible();
	await expect(page.getByRole("cell", { name: "Customer 50" })).toBeVisible();

	await page.getByTestId("first").click();

	await expect(
		page.getByRole("cell", { name: "Customer 1", exact: true }),
	).toBeVisible();
	await expect(page.getByRole("cell", { name: "Customer 10" })).toBeVisible();
});

test("filter by order id", async ({ page }) => {
	await page.goto("/orders", { waitUntil: "networkidle" });

	await page.getByPlaceholder("ID do pedido").fill("order-id-11");
	await page.getByRole("button", { name: "Filtrar resultados" }).click();
	await expect(
		page.getByRole("cell", { name: "order-id-11", exact: true }),
	).toBeVisible();
});

test("filter by customer name", async ({ page }) => {
	await page.goto("/orders", { waitUntil: "networkidle" });

	await page.getByPlaceholder("Nome do cliente").fill("Customer 11");
	await page.getByRole("button", { name: "Filtrar resultados" }).click();

	await expect(
		page.getByRole("cell", { name: "Customer 11", exact: true }),
	).toBeVisible();
});

test("filter by status", async ({ page }) => {
	await page.goto("/orders", { waitUntil: "networkidle" });

	await page.getByRole("combobox").click();
	await page.getByLabel("Pendente").click();

	await page.getByRole("button", { name: "Filtrar resultados" }).click();

	await expect(page.getByRole("cell", { name: "Pendente" })).toHaveCount(10);
});
