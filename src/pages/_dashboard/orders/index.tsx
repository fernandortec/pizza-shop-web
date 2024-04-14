import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { OrderTableFilters } from "@/pages/_dashboard/orders/-order-table-filters";
import { OrderTableRow } from "@/pages/_dashboard/orders/-order-table-row";
import { createFileRoute } from "@tanstack/react-router";
import { Helmet } from "react-helmet-async";

export const Route = createFileRoute("/_dashboard/orders/")({
	component: () => (
		<>
			<Helmet title="Pedidos" />
			<OrdersPage />
		</>
	),
});

function OrdersPage(): JSX.Element {
	return (
		<main className="flex flex-col gap-4">
			<h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>

			<section className="space-y-2.5">
				<OrderTableFilters />

				<div className="border rounded-md">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[4rem]" />
								<TableHead className="w-[20.75rem]">Identificador</TableHead>
								<TableHead className="w-[11.25rem]">Realizado há</TableHead>
								<TableHead className="w-[8.75rem]">Status</TableHead>
								<TableHead>Cliente</TableHead>
								<TableHead className="w-[8.75rem]">Total do Pedido</TableHead>
								<TableHead className="w-[10.25rem]" />
								<TableHead className="w-[8.25rem]" />
							</TableRow>
						</TableHeader>
						<TableBody>
							{Array.from({ length: 10 }).map((_, i) => (
								// biome-ignore lint/suspicious/noArrayIndexKey:
								<OrderTableRow key={i} />
							))}
						</TableBody>
					</Table>
				</div>
			</section>
		</main>
	);
}
