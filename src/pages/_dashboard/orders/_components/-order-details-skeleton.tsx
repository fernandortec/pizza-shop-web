import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export function OrderDetailsSkeleton(): JSX.Element {
	return (
		<div className="space-y-6">
			<Table>
				<TableBody>
					<TableRow>
						<TableCell className="text-muted-foreground">
							Status
						</TableCell>
						<TableCell align="right">
							<Skeleton className="h-5 w-28" />
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className="text-muted-foreground">Cliente</TableCell>
						<TableCell className="flex justify-end">
							<Skeleton className="h-5 w-[10.5rem]" />
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className="text-muted-foreground">Telefone</TableCell>
						<TableCell className="flex justify-end">
							<Skeleton className="h-5 w-[8.75rem]" />
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className="text-muted-foreground">E-mail</TableCell>
						<TableCell className="flex justify-end">
							<Skeleton className="h-5 w-[12.5rem]" />
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className="text-muted-foreground">
							Realizado há
						</TableCell>
						<TableCell className="flex justify-end">
							<Skeleton className="h-5 w-[9rem]" />
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
					{Array.from({ length: 2 }).map((_, i) => (
						// biome-ignore lint/suspicious/noArrayIndexKey:
						<TableRow key={i}>
							<TableCell>
								<Skeleton className="h-4 w-[8.75rem]" />
							</TableCell>
							<TableCell className="text-center">
								<Skeleton className="h-4 w-8 ml-auto" />
							</TableCell>
							<TableCell className="text-right">
								<Skeleton className="h-4 w-12 ml-auto" />
							</TableCell>
							<TableCell className="text-right">
								<Skeleton className="h-4 w-12 ml-auto" />
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
							<Skeleton className="h-4 w-20" />
						</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
		</div>
	);
}
