import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatDistanceToNow, priceFormatter } from "@/helpers/formatter";
import { OrderDetails } from "@/pages/_dashboard/orders/-order-details";
import { OrderStatus } from "@/pages/_dashboard/orders/-order-status";
import { ArrowRight, Search, X } from "lucide-react";

import { cancelOrder } from "@/api/cancel-order";
import type { GetOrdersResponse } from "@/api/get-orders";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import "dayjs/locale/pt-br";
import { useState } from "react";

interface OrderTableRowProps {
	order: {
		orderId: string;
		createdAt: string;
		status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
		customerName: string;
		total: number;
	};
}

export function OrderTableRow({ order }: OrderTableRowProps): JSX.Element {
	const [isDetailsOpen, setIsDetailsOpen] = useState(false);
	const queryClient = useQueryClient();

	const isOrderAllowedToBeCanceled = !["pending", "processing"].includes(
		order.status,
	);

	const { mutateAsync: cancelOrderFn } = useMutation({
		mutationFn: cancelOrder,
		onSuccess: (_, { orderId }): void => {
			const ordersListCached = queryClient.getQueriesData<GetOrdersResponse>({
				queryKey: ["orders"],
			});

			for (const [cacheKey, cachedData] of ordersListCached) {
				if (!cachedData) break;

				const updatedOrders = cachedData.orders.map((order) =>
					order.orderId === orderId ? { ...order, status: "canceled" } : order,
				);

				queryClient.setQueryData(cacheKey, {
					...cachedData,
					orders: updatedOrders,
				});
			}
		},
	});

	function handleCancelOrder() {
		cancelOrderFn({ orderId: order.orderId });
	}

	return (
		<TableRow>
			<TableCell>
				<Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
					<DialogTrigger asChild>
						<Button variant="outline" size="xs">
							<Search className="h-3 w-3" />
							<span className="sr-only">Detalhes do pedido</span>
						</Button>
					</DialogTrigger>

					<OrderDetails orderId={order.orderId} open={isDetailsOpen} />
				</Dialog>
			</TableCell>
			<TableCell className="font-mono text-xs font-medium">
				{order.orderId}
			</TableCell>
			<TableCell className="text-muted-foreground">
				{formatDistanceToNow(new Date(order.createdAt))}
			</TableCell>

			<TableCell>
				<OrderStatus status={order.status} />
			</TableCell>
			<TableCell className="font-medium">{order.customerName}</TableCell>
			<TableCell className="font-medium">
				{priceFormatter.format(order.total / 100)}
			</TableCell>
			<TableCell>
				<Button variant="outline" size="xs">
					<ArrowRight className="h-3 w-3 mr-2" />
					Aprovar
				</Button>
			</TableCell>
			<TableCell>
				<Button
					disabled={isOrderAllowedToBeCanceled}
					onClick={handleCancelOrder}
					variant="ghost"
					size="xs"
				>
					<X className="h-3 w-3 mr-2" />
					Cancelar
				</Button>
			</TableCell>
		</TableRow>
	);
}
