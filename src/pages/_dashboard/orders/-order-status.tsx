type AllOrdersStatus =
	| "pending"
	| "canceled"
	| "processing"
	| "delivering"
	| "delivered";

interface OrderStatusProps {
	status: AllOrdersStatus;
}

const orderStatusMap: { [key in AllOrdersStatus]: string } = {
	pending: "Pendente",
	canceled: "Cancelado",
	delivered: "Entregue",
	delivering: "Em entrega",
	processing: "Em preparo",
};

const orderStatusColorMap: { [key in AllOrdersStatus]: string } = {
	canceled: "bg-rose-500",
	delivered: "bg-green-500",
	delivering: "bg-emerald-500",
	pending: "bg-slate-400",
	processing: "bg-amber-500",
};

export function OrderStatus({ status }: OrderStatusProps): JSX.Element {
	return (
		<div className="flex items-center gap-2">
			<span
				className={`h-2 w-2 rounded-full ${orderStatusColorMap[status]} `}
			/>
			<span className="font-medium text-muted-foreground">
				{orderStatusMap[status]}
			</span>
		</div>
	);
}
