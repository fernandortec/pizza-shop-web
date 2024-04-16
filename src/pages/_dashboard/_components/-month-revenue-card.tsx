import { getMonthRevenue } from "@/api/get-month-revenue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { priceFormatter } from "@/helpers/formatter";
import { MetricCardSkeleton } from "@/pages/_dashboard/_components/-metric-card-skeleton";
import { useQuery } from "@tanstack/react-query";
import { DollarSign } from "lucide-react";

export function MonthRevenueCard(): JSX.Element {
	const { data: monthRevenue } = useQuery({
		queryFn: getMonthRevenue,
		queryKey: ["metrics", "month-canceled-orders-amount"],
	});

	return (
		<Card>
			<CardHeader className="flex flex-row space-y-0 items-center justify-between pb-2">
				<CardTitle className="text-base">Receita total (mês)</CardTitle>
				<DollarSign className="w-4 g-4 text-muted-foreground" />
			</CardHeader>
			<CardContent className="space-y-1">
				{monthRevenue ? (
					<>
						<span className="text-2xl font-bold tracking-tight">
							{priceFormatter.format(monthRevenue.receipt / 100)}
						</span>
						<p className="text-xs text-muted-foreground">
							{monthRevenue.diffFromLastMonth >= 0 ? (
								<span className="text-emerald-500 dark:text-emerald-400">
									+{monthRevenue.diffFromLastMonth}%
								</span>
							) : (
								<span className="text-rose-500 dark:text-rose-400">
									{monthRevenue.diffFromLastMonth}%
								</span>
							)}{" "}
							em relação ao mês passado
						</p>
					</>
				) : (
					<MetricCardSkeleton />
				)}
			</CardContent>
		</Card>
	);
}
