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

export function OrderDetails(): JSX.Element {
	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Pedido: joad08301hgha18gap</DialogTitle>
				<DialogDescription>Detalhes do pedido</DialogDescription>
			</DialogHeader>

			<div className="space-y-6">
				<Table>
					<TableBody>
						<TableRow>
							<TableCell className="text-muted-foreground">Status</TableCell>
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
								Fernando Rodrigues
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="text-muted-foreground">Telefone</TableCell>
							<TableCell className="flex justify-end">
								(31) 99872-0273
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="text-muted-foreground">E-mail</TableCell>
							<TableCell className="flex justify-end">
								fernandorfigueiredotec@gmail.com
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="text-muted-foreground">
								Realizado há
							</TableCell>
							<TableCell className="flex justify-end">Há 20 minutos</TableCell>
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
						<TableRow>
							<TableCell>Pizza Pepperoni - Família</TableCell>
							<TableCell className="text-center">2</TableCell>
							<TableCell className="text-right">R$ 69,90</TableCell>
							<TableCell className="text-right">R$ 139,80</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Pizza Muzzarela - Pequena</TableCell>
							<TableCell className="text-center">4</TableCell>
							<TableCell className="text-right">R$ 59,90</TableCell>
							<TableCell className="text-right">R$ 239,60</TableCell>
						</TableRow>
					</TableBody>
					<TableFooter>
						<TableRow>
							<TableCell colSpan={3} className="font-semibold">Total do pedido</TableCell>
							<TableCell className="text-right font-semibold">R$ 379,40</TableCell>
						</TableRow>
					</TableFooter>
				</Table>
			</div>
		</DialogContent>
	);
}
