import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AuthLayout } from "@/layouts/auth";
import { type SignUpFormSchema, signUpFormSchema } from "@/schemas/sign-up";

import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const Route = createFileRoute("/_auth/sign-up")({
	component: () => (
		<>
			<Helmet title="Cadastro" />
			<SignUpPage />
		</>
	),
});

function SignUpPage(): JSX.Element {
	const form = useForm<SignUpFormSchema>({
		resolver: zodResolver(signUpFormSchema),
	});

	async function handleSignUp(data: SignUpFormSchema): Promise<void> {
		await new Promise((resolve) => setTimeout(resolve, 2000));

		toast.success("Enviamos um link de autenticação para seu e-mail");
	}

	const isFormSubmitting = form.formState.isSubmitting;

	return (
		<main className="p-8">
			<div className="w-[22rem] flex flex-col justify-center gap-6">
				<header className="flex flex-col gap-2 text-center">
					<h1 className="text-3xl font-semibold tracking-tight">
						Criar conta grátis
					</h1>
					<p className="text-sm text-muted-foreground">
						Seja um parceiro e começe suas vendas!
					</p>
				</header>

				<Form {...form}>
					<form
						className="space-y-4"
						onSubmit={form.handleSubmit(handleSignUp)}
					>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor="email"> Seu e-mail</FormLabel>
									<FormControl>
										<Input
											id="email"
											type="email"
											placeholder="Digite seu e-mail"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button
							className="w-full"
							type="submit"
							disabled={isFormSubmitting}
						>
							Finalizar cadastro
						</Button>
					</form>
				</Form>
			</div>
		</main>
	);
}
