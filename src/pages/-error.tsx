import { Link, type ErrorComponentProps } from "@tanstack/react-router";

export function ErrorComponent({ error }: ErrorComponentProps): JSX.Element {
	return (
		<div className="flex h-screen flex-col items-center justify-center gap-2">
			<h1 className="text-4xl font-bold">Whoops, algo aconteceu...</h1>
			<p className="text-accent-foreground">
				Um erro aconteceu, na aplicação, abaixo você encontra mais detalhes;
			</p>
			<pre>{Object(error)?.message || JSON.stringify(error)}</pre>
			<p className="text-accent-foreground mt-4">
				Voltar para o{" "}
				<Link to="/" className="text-sky-500 dark;text-sky-400">
					Dashboard
				</Link>
			</p>
		</div>
	);
}
