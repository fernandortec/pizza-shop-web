import { test, expect } from "@playwright/test";

test("Sign in sucessfully", async ({ page }) => {
	await page.goto("/sign-in", { waitUntil: "networkidle" });

	await page.getByPlaceholder("Digite seu e-mail").fill("johndoe@example.com");
	await page.getByRole("button", { name: "Acessar painel" }).click();

	const toast = page.getByText(
		"Enviamos um link de autenticação para seu e-mail",
	);

	await expect(toast).toBeVisible();
});

test("Sign in with wrong credentials", async ({ page }) => {
	await page.goto("/sign-in", { waitUntil: "networkidle" });

	await page.getByPlaceholder("Digite seu e-mail").fill("wrong@example.com");
	await page.getByRole("button", { name: "Acessar painel" }).click();

	const toast = page.getByText("Credenciais inválidas");

	await expect(toast).toBeVisible();
});


test("navigate to new restaurant page", async ({ page }) => {
	await page.goto("/sign-in", { waitUntil: "networkidle" });

	await page.getByRole("link", { name: "Novo estabelecimento" }).click()

	expect(page.url()).toContain("/sign-up")
});