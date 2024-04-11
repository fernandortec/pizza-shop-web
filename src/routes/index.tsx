import { AppLayout } from "@/layouts/app";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: () => (
		<>
			<AppLayout />
			<Page />
		</>
	),
});

function Page(): JSX.Element {
  return (
    <p>page</p>
  )
}
