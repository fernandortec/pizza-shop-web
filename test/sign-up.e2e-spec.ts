import { test, expect } from "@playwright/test";

test("sign up sucessfully", async ({ page }) => {
	await page.goto("/sign-up", { waitUntil: "networkidle" });

	await page.getByPlaceholder("Digite aqui o nome").fill("Pizza Shop");
	await page.getByLabel("Seu nome").fill("John Doe");
	await page.getByLabel("Seu e-mail").fill("johndoe@example.com");
	await page.getByLabel("Seu celular").fill("1239871239812132");

	page.getByRole("button", { name: "Finalizar cadastro" });

	const toast = page.getByText("Cadastro feito com sucesso");

	expect(toast).toBeVisible();

	await page.waitForTimeout(2000);
});

test("sign up with error", async ({ page }) => {
	await page.goto("/sign-up", { waitUntil: "networkidle" });

	await page.getByPlaceholder("Digite aqui o nome").fill("Invalid Name");
	await page.getByLabel("Seu nome").fill("John Doe");
	await page.getByLabel("Seu e-mail").fill("johndoe@example.com");
	await page.getByLabel("Seu celular").fill("1239871239812132");

	page.getByRole("button", { name: "Finalizar cadastro" });

	const toast = page.getByText("Erro ao realizar cadastro");

	expect(toast).toBeVisible();

	await page.waitForTimeout(2000);
});

test("navigate to login page", async ({ page }) => {
	await page.goto("/sign-up", { waitUntil: "networkidle" });

	await page.getByRole("link", { name: "Fazer login" }).click();

	expect(page.url()).toContain("/sign-in");
});
