import { getOrders } from "@/api/get-orders";
import { TablePagination } from "@/components/table-pagination";
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { OrderTableFilters } from "@/pages/_dashboard/orders/_components/-order-table-filters";
import { OrderTableRow } from "@/pages/_dashboard/orders/_components/-order-table-row";
import { OrderTableSkeleton } from "@/pages/_dashboard/orders/_components/-order-table-skeleton";
import { orderFiltersSchema } from "@/schemas/order-filters";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Helmet } from "react-helmet-async";
import { z } from "zod";

const searchParamsSchema = orderFiltersSchema.extend({
	page: z.coerce.number().min(1).optional(),
});

export const Route = createFileRoute("/_dashboard/orders/")({
	component: () => (
		<>
			<Helmet title="Pedidos" />
			<OrdersPage />
		</>
	),
	validateSearch: (data) => searchParamsSchema.parse(data),
});

function OrdersPage(): JSX.Element {
	const navigate = useNavigate({ from: Route.fullPath });
	const searchParams = Route.useSearch();

	const page = searchParams.page ?? 1;
	const pageIndex = page - 1;

	const { customerName, orderId, status } = searchParams;

	const statusWithNoAll = status === "all" ? null : status;

	const { data: result, isLoading: isLoadingOrders } = useQuery({
		queryKey: ["orders", pageIndex, customerName, orderId, status],
		queryFn: () =>
			getOrders({ pageIndex, customerName, orderId, status: statusWithNoAll }),
	});

	function handleChangePage(pageIndex: number): void {
		navigate({
			to: "/orders",
			search: (prev) => ({ ...prev, page: pageIndex + 1 }),
		});
	}

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
							{isLoadingOrders && <OrderTableSkeleton />}
							{result?.orders.map((order) => (
								<OrderTableRow key={order.orderId} order={order} />
							))}
						</TableBody>
					</Table>
				</div>
				{result && (
					<TablePagination
						pageIndex={result.meta.pageIndex}
						totalCount={result.meta.totalCount}
						perPage={result.meta.perPage}
						onPageChange={handleChangePage}
					/>
				)}
			</section>
		</main>
	);
}
