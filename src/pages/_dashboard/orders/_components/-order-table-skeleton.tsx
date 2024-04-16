import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";
import { Search } from "lucide-react";

export function OrderTableSkeleton(): JSX.Element[] {
	return Array.from({ length: 10 }).map((_, i) => (
		// biome-ignore lint/suspicious/noArrayIndexKey:
		<TableRow key={i}>
			<TableCell>
				<Button disabled variant="outline" size="xs">
					<Search className="h-3 w-3" />
					<span className="sr-only">Detalhes do pedido</span>
				</Button>
			</TableCell>
			<TableCell>
				<Skeleton className="h-4 w-[10.75rem]" />
			</TableCell>
			<TableCell>
				<Skeleton className="h-4 w-[5.5rem]" />
			</TableCell>
			<TableCell>
				<Skeleton className="h-4 w-[7.25rem]" />
			</TableCell>
			<TableCell>
				<Skeleton className="h-4 w-[12.5rem]" />
			</TableCell>

			<TableCell>
				<Skeleton className="h-4 w-[4rem]" />
			</TableCell>

			<TableCell>
				<Skeleton className="h-4 w-[5.75rem]" />
			</TableCell>

			<TableCell>
				<Skeleton className="h-4 w-[5.75rem]" />
			</TableCell>
		</TableRow>
	));
}
