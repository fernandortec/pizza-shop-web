import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createFileRoute } from "@tanstack/react-router";
import { Helmet } from "react-helmet-async";

export const Route = createFileRoute("/auth/sign-in")({
	component: () => (
		<>
			<Helmet title="Login" />
			<SignInPage />
		</>
	),
});

function SignInPage(): JSX.Element {
	return (
		<main className="p-8">
			<div className="w-[22rem] flex flex-col justify-center gap-6">
				<header className="flex flex-col gap-2 text-center">
					<h1 className="text-3xl font-semibold tracking-tight">Acessar painel</h1>
					<p className="text-sm text-muted-foreground">Acompanhe suas vendas pelo painel do parceiro</p>
				</header>

				<form className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="email"> Seu e-mail</Label>
						<Input id="email" type="email" />
					</div>

					<Button className="w-full" type="submit">Acessar painel</Button>
				</form>
			</div>
		</main>
	);
}
