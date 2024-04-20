import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	orderFiltersSchema,
	type OrderFiltersSchema,
} from "@/schemas/order-filters";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { useForm } from "react-hook-form";

export function OrderTableFilters(): JSX.Element {
	const navigate = useNavigate({ from: "/orders" });
	const { customerName, orderId, status } = useSearch({
		from: "/_dashboard/orders/",
	});

	const form = useForm<OrderFiltersSchema>({
		resolver: zodResolver(orderFiltersSchema),
		defaultValues: {
			customerName: customerName ?? "",
			orderId: orderId ?? "",
			status: status ?? "all",
		},
	});

	function handleAddFilters({
		customerName,
		orderId,
		status,
	}: OrderFiltersSchema): void {
		navigate({
			to: "/orders",
			search: { customerName, orderId, status, page: 1 },
		});
	}

	function handleRemoveFilters(): void {
		navigate({ to: "/orders", search: { page: 1 } });

		form.reset({ customerName: "", orderId: "", status: "all" });
	}

	return (
		<Form {...form}>
			<form
				className="flex items-center gap-2"
				onSubmit={form.handleSubmit(handleAddFilters)}
			>
				<span className="text-sm font-semibold">Filtros: </span>
				<FormField
					name="orderId"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									placeholder="ID do pedido"
									className="h-8 w-auto"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name="customerName"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									placeholder="Nome do cliente"
									className="h-8 w-[20rem]"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					name="status"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Select value={field.value} onValueChange={field.onChange}>
									<SelectTrigger
										className="h-8 w-[11.25rem]"
										data-testid="select"
									>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="all">Todos status</SelectItem>
										<SelectItem value="pending">Pendente</SelectItem>
										<SelectItem value="canceled">Cancelado</SelectItem>
										<SelectItem value="progress">Em preparo</SelectItem>
										<SelectItem value="delivering">Em entrega</SelectItem>
										<SelectItem value="delivered">Entregue</SelectItem>
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" variant="secondary" size="xs">
					<Search className="w-4 h-4 mr-2" /> Filtrar resultados
				</Button>

				<Button
					type="button"
					variant="outline"
					size="xs"
					onClick={handleRemoveFilters}
				>
					<X className="w-4 h-4 mr-2" /> Remover filtros
				</Button>
			</form>
		</Form>
	);
}
