import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	validateSearch: ({ a }: { a: number }): { page: number } => ({ page: a }),
	component: Index,
});

function Index(): JSX.Element {
	const { page } = Route.useSearch();
	return <p>{page}asssss</p>;
}
