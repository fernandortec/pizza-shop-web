import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatDistanceToNow, priceFormatter } from "@/helpers/formatter";
import { OrderDetails } from "@/pages/_dashboard/orders/_components/-order-details";
import { OrderStatus } from "@/pages/_dashboard/orders/_components/-order-status";
import { ArrowRight, Search, X } from "lucide-react";

import { approveOrder } from "@/api/approve-order";
import { cancelOrder } from "@/api/cancel-order";
import { deliverOrder } from "@/api/deliver-order";
import { dispatchOrder } from "@/api/dispatch-order";
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
	const queryClient = useQueryClient();
	const [isDetailsOpen, setIsDetailsOpen] = useState(false);

	function updateOrderStatusOnCache(orderId: string, status: string): void {
		const ordersListCached = queryClient.getQueriesData<GetOrdersResponse>({
			queryKey: ["orders"],
		});

		for (const [cacheKey, cachedData] of ordersListCached) {
			if (!cachedData) return;

			queryClient.setQueryData(cacheKey, {
				...cachedData,
				orders: cachedData.orders.map((order) =>
					order.orderId === orderId ? { ...order, status } : order,
				),
			});
		}
	}

	const { mutateAsync: cancelOrderFn, isPending: isCancellingOrder } =
		useMutation({
			mutationFn: cancelOrder,
			onSuccess: (_, { orderId }): void => {
				updateOrderStatusOnCache(orderId, "canceled");
			},
		});

	const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } =
		useMutation({
			mutationFn: approveOrder,
			onSuccess: (_, { orderId }): void => {
				updateOrderStatusOnCache(orderId, "processing");
			},
		});

	const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } =
		useMutation({
			mutationFn: deliverOrder,
			onSuccess: (_, { orderId }): void => {
				updateOrderStatusOnCache(orderId, "delivered");
			},
		});

	const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder } =
		useMutation({
			mutationFn: dispatchOrder,
			onSuccess: (_, { orderId }): void => {
				updateOrderStatusOnCache(orderId, "delivering");
			},
		});
	const isOrderAllowedToBeCanceled =
		!["pending", "processing"].includes(order.status) || isCancellingOrder;

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
				{order.status === "pending" && (
					<Button
						variant="outline"
						size="xs"
						onClick={() => approveOrderFn({ orderId: order.orderId })}
						disabled={isApprovingOrder}
					>
						<ArrowRight className="h-3 w-3 mr-2" />
						Aprovar
					</Button>
				)}
				{order.status === "processing" && (
					<Button
						variant="outline"
						size="xs"
						onClick={() => dispatchOrderFn({ orderId: order.orderId })}
						disabled={isDispatchingOrder}
					>
						<ArrowRight className="h-3 w-3 mr-2" />
						Em entrega
					</Button>
				)}

				{order.status === "delivering" && (
					<Button
						variant="outline"
						size="xs"
						onClick={() => deliverOrderFn({ orderId: order.orderId })}
						disabled={isDeliveringOrder}
					>
						<ArrowRight className="h-3 w-3 mr-2" />
						Entrega
					</Button>
				)}
			</TableCell>
			<TableCell>
				<Button
					disabled={isOrderAllowedToBeCanceled}
					onClick={() => cancelOrderFn({ orderId: order.orderId })}
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
