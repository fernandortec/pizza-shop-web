import { test, expect } from "@playwright/test";

test("sign up sucessfully", async ({ page }) => {
	await page.goto("/sign-up", { waitUntil: "networkidle" });

	await page.getByPlaceholder("Digite aqui o nome").fill("Pizza Shop");
	await page.getByLabel("Seu nome").fill("John Doe");
	await page.getByLabel("Seu e-mail").fill("johndoe@example.com");
	await page.getByPlaceholder("Digite seu telefone").fill("1239871239812132");

	await page.getByRole("button", { name: "Finalizar cadastro" }).click();

	const toast = page.getByText("Cadastro feito com sucesso");

	await expect(toast).toBeVisible();
});

test("sign up with error", async ({ page }) => {
	await page.goto("/sign-up", { waitUntil: "networkidle" });

	await page.getByPlaceholder("Digite aqui o nome").fill("Invalid Name");
	await page.getByLabel("Seu nome").fill("John Doe");
	await page.getByLabel("Seu e-mail").fill("johndoe@example.com");
	await page.getByPlaceholder("Digite seu telefone").fill("123412341234");

	await page.getByRole("button", { name: "Finalizar cadastro" }).click();

	const toast = page.getByText("Erro ao realizar cadastro");

	await expect(toast).toBeVisible();
});

test("navigate to login page", async ({ page }) => {
	await page.goto("/sign-up", { waitUntil: "networkidle" });

	await page.getByRole("link", { name: "Fazer login" }).click();

	expect(page.url()).toContain("/sign-in");
});
