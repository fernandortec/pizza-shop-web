import { registerRestaurant } from "@/api/register-restaurant";
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
import { type SignUpFormSchema, signUpFormSchema } from "@/schemas/sign-up";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
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
	const navigate = useNavigate();

	const form = useForm<SignUpFormSchema>({
		resolver: zodResolver(signUpFormSchema),
	});

	const { mutateAsync: signUpRestaurant } = useMutation({
		mutationFn: registerRestaurant,
	});

	async function handleSignUp(data: SignUpFormSchema): Promise<void> {
		try {
		const { email, managerName, phone, restaurantName } = data;
		await signUpRestaurant({ email, managerName, phone, restaurantName });

		toast.success("Cadastro feito com sucesso", {
			action: {
				label: "Login",
				onClick: () =>
					navigate({
						from: "/sign-up",
						to: "/sign-in",
						search: { email: email },
					}),
			},
		});
		} catch {
			toast.error("Erro ao realizar cadastro")
		}	
	}

	const isFormSubmitting = form.formState.isSubmitting;

	return (
		<main className="p-8">
			<Button asChild className="absolute right-8 top-8" variant="ghost">
				<Link to="/sign-in">Fazer Login</Link>
			</Button>

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
							name="restaurantName"
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor="restaurantName">
										Nome do estabelecimento
									</FormLabel>
									<FormControl>
										<Input
											id="restaurantName"
											placeholder="Digite aqui o nome"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="managerName"
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor="managerName"> Seu nome</FormLabel>
									<FormControl>
										<Input
											id="managerName"
											placeholder="Digite seu e-mail"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

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

						<FormField
							control={form.control}
							name="phone"
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor="phone"> Seu telefone</FormLabel>
									<FormControl>
										<Input
											id="phone"
											type="tel"
											placeholder="Digite seu telefone"
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

						<p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
							Ao continuar, você concorda com nossos{" "}
							<Link to="/" className="underline underline-offset-4">
								Termos de serviço
							</Link>{" "}
							e{" "}
							<Link to="/" className="underline underline-offset-4">
								políticas de privacidade
							</Link>
						</p>
					</form>
				</Form>
			</div>
		</main>
	);
}
