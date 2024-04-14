import {
	Pagination,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

interface PaginationProps {
	pageIndex: number;
	totalCount: number;
	perPage: number;
}

export function TablePagination({
	pageIndex,
	perPage,
	totalCount,
}: PaginationProps): JSX.Element {
	const pages = Math.ceil(totalCount / perPage) ?? 1;

	return (
		<Pagination className="flex items-center justify-between">
			<span className="text-sm text-muted-foreground">
				Total de {totalCount} item(s)
			</span>

			<div className="flex items-center gap-6 lg:gap-8">
				<p className="flex text-sm font-medium">
					Página {pageIndex + 1} de {pages}
				</p>

				<div className="flex items-center gap-2">
					<PaginationLink className="h-8 w-8 p-0">
						<ChevronsLeft />
						<span className="sr-only">Primeira página</span>
					</PaginationLink>

					<PaginationPrevious className="h-8 w-8 p-0" />
					<PaginationNext className="h-8 w-8 p-0" />

					<PaginationLink className="h-8 w-8 p-0">
						<ChevronsRight />
						<span className="sr-only">Ùltima página</span>
					</PaginationLink>
				</div>
			</div>
		</Pagination>
	);
}
