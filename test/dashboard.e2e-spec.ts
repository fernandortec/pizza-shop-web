import { test, expect } from "@playwright/test";

test("should display month cancelled orders amount metric", async ({
	page,
}) => {
	await page.goto("/", { waitUntil: "networkidle" });

	await expect(page.getByText("10", { exact: true })).toBeVisible();
	await expect(page.getByText("+2% em relação ao mês passado")).toBeVisible();
});

test("should display day orders amount metric", async ({ page }) => {
	await page.goto("/", { waitUntil: "networkidle" });

	await expect(page.getByText("20", { exact: true })).toBeVisible();
	await expect(page.getByText("-5% em relação ao dia passado")).toBeVisible();
});

test("should display month orders amount metric", async ({ page }) => {
	await page.goto("/", { waitUntil: "networkidle" });

	await expect(page.getByText("200", { exact: true })).toBeVisible();
	await expect(page.getByText("-2% em relação ao mês passado")).toBeVisible();

});

test("should display month receipt metric", async ({ page }) => {
	await page.goto("/", { waitUntil: "networkidle" });

	await expect(page.getByText("R$ 290,00", { exact: true })).toBeVisible();
	await expect(page.getByText("+10% em relação ao mês passado")).toBeVisible();
});
