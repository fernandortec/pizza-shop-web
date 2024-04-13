import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Search, X } from "lucide-react";
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
				<form className="flex items-center gap-2">
					<span className="text-sm font-semibold">Filtros: </span>
					<Input placeholder="Nome do cliente" className="h-8 w-[20rem]" />
				</form>

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
								<TableRow key={i}>
									<TableCell>
										<Button variant="outline" size="xs">
											<Search className="h-3 w-3" />
											<span className="sr-only">Detalhes do pedido</span>
										</Button>
									</TableCell>
									<TableCell className="font-mono text-xs font-medium">
										d982hd-ih12-bdasasdas-13981hdcha
									</TableCell>
									<TableCell className="text-muted-foreground">
										Há 15 minutos
									</TableCell>

									<TableCell>
										<div className="flex items-center gap-2">
											<span className="h-2 w-2 rounded-full bg-slate-400" />
											<span className="font-medium text-muted-foreground">
												Pendente
											</span>
										</div>
									</TableCell>
									<TableCell className="font-medium">
										Fernando Rodrigues
									</TableCell>
									<TableCell className="font-medium">R$ 159,90</TableCell>
									<TableCell>
										<Button variant="outline" size="xs">
											<ArrowRight className="h-3 w-3 mr-2" />
											Aprovar
										</Button>
									</TableCell>
									<TableCell>
										<Button variant="ghost" size="xs">
											<X className="h-3 w-3 mr-2" />
											Cancelar
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</section>
		</main>
	);
}
