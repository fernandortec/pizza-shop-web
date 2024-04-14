import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { OrderDetails } from "@/pages/_dashboard/orders/-order-details";
import { ArrowRight, Search, X } from "lucide-react";

export function OrderTableRow(): JSX.Element {
	return (
		<TableRow>
			<TableCell>
				<Dialog>
					<DialogTrigger asChild>
						<Button variant="outline" size="xs">
							<Search className="h-3 w-3" />
							<span className="sr-only">Detalhes do pedido</span>
						</Button>
					</DialogTrigger>

				<OrderDetails />
				</Dialog>
			</TableCell>
			<TableCell className="font-mono text-xs font-medium">
				d982hd-ih12-bdasasdas-13981hdcha
			</TableCell>
			<TableCell className="text-muted-foreground">Há 15 minutos</TableCell>

			<TableCell>
				<div className="flex items-center gap-2">
					<span className="h-2 w-2 rounded-full bg-slate-400" />
					<span className="font-medium text-muted-foreground">Pendente</span>
				</div>
			</TableCell>
			<TableCell className="font-medium">Fernando Rodrigues</TableCell>
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
	);
}
