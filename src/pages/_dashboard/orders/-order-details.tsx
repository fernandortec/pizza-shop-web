import { getOrderDetails } from "@/api/get-order-details";
import {
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { formatDistanceToNow, priceFormatter } from "@/helpers/formatter";
import { OrderStatus } from "@/pages/_dashboard/orders/-order-status";
import { useQuery } from "@tanstack/react-query";

interface OrderDetailsProps {
	orderId: string;
	open: boolean;
}

export function OrderDetails({
	orderId,
	open,
}: OrderDetailsProps): JSX.Element {
	const { data: order } = useQuery({
		queryKey: ["orders", orderId],
		queryFn: () => getOrderDetails({ orderId }),
		enabled: open,
	});

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Pedido: {orderId}</DialogTitle>
				<DialogDescription>Detalhes do pedido</DialogDescription>
			</DialogHeader>

			{order && (
				<div className="space-y-6">
					<Table>
						<TableBody>
							<TableRow>
								<TableCell className="text-muted-foreground">
									<OrderStatus status={order.status} />
								</TableCell>
								<TableCell className="flex justify-end">
									<div className="flex items-center gap-2">
										<span className="h-2 w-2 rounded-full bg-slate-400" />
										<span className="font-medium text-muted-foreground">
											Pendente
										</span>
									</div>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="text-muted-foreground">Cliente</TableCell>
								<TableCell className="flex justify-end">
									{order.customer.name}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="text-muted-foreground">
									Telefone
								</TableCell>
								<TableCell className="flex justify-end">
									{order.customer.phone ?? "Não informado"}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="text-muted-foreground">E-mail</TableCell>
								<TableCell className="flex justify-end">
									{order.customer.email}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="text-muted-foreground">
									Realizado há
								</TableCell>
								<TableCell className="flex justify-end">
									{formatDistanceToNow(new Date(order.createdAt))}
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>

					<Separator />

					<Table>
						<TableHeader>
							<TableRow>
								<TableHead> Produto </TableHead>
								<TableHead className="text-right"> Qtd. </TableHead>
								<TableHead className="text-right"> Preço </TableHead>
								<TableHead className="text-right"> Subtotal </TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{order.orderItems.map((item) => (
								<TableRow key={item.id}>
									<TableCell>{item.product.name}</TableCell>
									<TableCell className="text-center">{item.quantity}</TableCell>
									<TableCell className="text-right">
										{priceFormatter.format(+item.priceInCents / 100)}
									</TableCell>
									<TableCell className="text-right">
										{priceFormatter.format(
											(+item.priceInCents / 100) * item.quantity,
										)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
						<TableFooter>
							<TableRow>
								<TableCell colSpan={3} className="font-semibold">
									Total do pedido
								</TableCell>
								<TableCell className="text-right font-semibold">
									{priceFormatter.format(order.totalInCents / 100)}
								</TableCell>
							</TableRow>
						</TableFooter>
					</Table>
				</div>
			)}
		</DialogContent>
	);
}
