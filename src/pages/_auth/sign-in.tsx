import { signIn } from "@/api/sign-in";
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
import { signInFormSchema, type SignInFormSchema } from "@/schemas/sign-in";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const signInParamsSchema = z.object({ email: z.string().optional() });
type SignInParams = z.infer<typeof signInParamsSchema>;

export const Route = createFileRoute("/_auth/sign-in")({
	component: () => (
		<>
			<Helmet title="Login" />
			<SignInPage />
		</>
	),
	validateSearch: (data: SignInParams) => signInParamsSchema.parse(data),
});

export function SignInPage(): JSX.Element {
	const { email } = Route.useSearch();

	const form = useForm<SignInFormSchema>({
		resolver: zodResolver(signInFormSchema),
		defaultValues: { email },
	});

	const { mutateAsync: authenticate } = useMutation({ mutationFn: signIn });

	async function handleSignIn(data: SignInFormSchema): Promise<void> {
		try {
			await authenticate({ email: data.email });
			toast.success("Enviamos um link de autenticação para seu e-mail");

		} catch (error) {
			toast.error(
				"Credenciais inválidas",
			);
		}
	}

	const isFormSubmitting = form.formState.isSubmitting;

	return (
		<main className="p-8">
			<Button asChild className="absolute right-8 top-8" variant="ghost">
				<Link to="/sign-up">Novo estabelecimento</Link>
			</Button>

			<div className="w-[22rem] flex flex-col justify-center gap-6">
				<header className="flex flex-col gap-2 text-center">
					<h1 className="text-3xl font-semibold tracking-tight">
						Acessar painel
					</h1>
					<p className="text-sm text-muted-foreground">
						Acompanhe suas vendas pelo painel do parceiro
					</p>
				</header>

				<Form {...form}>
					<form
						className="space-y-4"
						onSubmit={form.handleSubmit(handleSignIn)}
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
							Acessar painel
						</Button>
					</form>
				</Form>
			</div>
		</main>
	);
}
