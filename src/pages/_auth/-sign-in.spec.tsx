import { queryClient } from "@/lib/react-query";
import { SignInPage } from "@/pages/_auth/sign-in";
import { CustomRouterProvider } from "@/test/custom-router-provider";
import { QueryClientProvider } from "@tanstack/react-query";

import { describe, expect, it } from "bun:test";

describe("Sign IN", () => {
	it("should set default email input value if email is present on search params", async () => {
		const { wrapper } = await CustomRouterProvider({
			path: "/sign-in",
			element: (
				<QueryClientProvider client={queryClient}>
					<SignInPage />
				</QueryClientProvider>
			),
			initialEntries: "/sign-in?email=johndoe@example.com",
		});

		const emailInput = wrapper.getByLabelText("Seu e-mail") as HTMLInputElement;

		expect(emailInput.value).toEqual("johndoe@example.com");
	});
});
