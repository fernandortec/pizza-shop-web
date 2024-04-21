import { test, expect } from "@playwright/test";

test("sign up sucessfully", async ({ page }) => {
	await page.goto("/", { waitUntil: "networkidle" });

	await page.getByRole("button", { name: "Pizza shop" }).click();
	await page.getByRole("menuitem", { name: "Perfil da loja" }).click();

	await page.getByPlaceholder("Nome do restaurante").fill("Rocket Pizza");
	await page.getByPlaceholder("Descreva um pouco seu").fill("Restaurant desc");

	await page.getByRole("button", { name: "Salvar" }).click();
	await page.waitForLoadState("networkidle");

	const toast = page.getByText("Perfil atualizado com sucesso");
	await expect(toast).toBeVisible();

	await page.getByRole("button", { name: "Cancelar" }).click();

	await expect(page.getByRole("button", { name: "Rocket Pizza" })).toBeVisible();
});
