import { AppLayout } from "@/layouts/app";
import { createFileRoute } from "@tanstack/react-router";
import { Helmet } from "react-helmet-async";

export const Route = createFileRoute("/")({
	component: () => (
		<>
			<Helmet title="Dashboard" />
			<AppLayout />
			<Page />
		</>
	),
});

function Page(): JSX.Element {
	return <p>page</p>;
}
