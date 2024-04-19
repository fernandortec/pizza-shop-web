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
	onPageChange: (pageIndex: number) => Promise<void> | void;
}

export function TablePagination({
	pageIndex,
	perPage,
	totalCount,
	onPageChange,
}: PaginationProps): JSX.Element {
	const pages = Math.ceil(totalCount / perPage) ?? 1;

	function handleSelectFirstPage(): void {
		onPageChange(0);
	}

	function handleSelectPreviousPage(): void {
		onPageChange(pageIndex - 1);
	}

	function handleSelectNextPage(): void {
		onPageChange(pageIndex + 1);
	}

	function handleSelectLastPage(): void {
		onPageChange(pages - 1);
	}

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
					<PaginationLink
						data-testid="first"
						onClick={handleSelectFirstPage}
						className="h-8 w-8 p-0"
						disabled={pageIndex === 0}
					>
						<ChevronsLeft />
						<span className="sr-only">Primeira página</span>
					</PaginationLink>

					<PaginationPrevious
						onClick={handleSelectPreviousPage}
						className="h-8 w-8 p-0"
						disabled={pageIndex === 0}
					/>
					<PaginationNext
						onClick={handleSelectNextPage}
						className="h-8 w-8 p-0"
						disabled={pages <= pageIndex + 1}
					/>

					<PaginationLink
						data-testid="last"
						onClick={handleSelectLastPage}
						className="h-8 w-8 p-0"
						disabled={pages <= pageIndex + 1}
					>
						<ChevronsRight />
						<span className="sr-only">Ùltima página</span>
					</PaginationLink>
				</div>
			</div>
		</Pagination>
	);
}
