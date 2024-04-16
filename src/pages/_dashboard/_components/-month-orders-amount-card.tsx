import { getMonthOrdersAmount } from "@/api/get-month-orders-amount";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCardSkeleton } from "@/pages/_dashboard/_components/-metric-card-skeleton";
import { useQuery } from "@tanstack/react-query";
import { Utensils } from "lucide-react";

export function MonthOrdersAmount(): JSX.Element {
	const { data: monthOrdersAmount } = useQuery({
		queryFn: getMonthOrdersAmount,
		queryKey: ["metrics", "month-orders-amount"],
	});

	return (
		<Card>
			<CardHeader className="flex flex-row space-y-0 items-center justify-between pb-2">
				<CardTitle className="text-base">Pedidos (mês)</CardTitle>
				<Utensils className="w-4 g-4 text-muted-foreground" />
			</CardHeader>
			<CardContent className="space-y-1">
				{monthOrdersAmount ? (
					<>
						<span className="text-2xl font-bold tracking-tight">
							{monthOrdersAmount.amount}
						</span>
						<p className="text-xs text-muted-foreground">
							{monthOrdersAmount.diffFromLastMonth >= 0 ? (
								<span className="text-emerald-500 dark:text-emerald-400">
									+{monthOrdersAmount.diffFromLastMonth}%
								</span>
							) : (
								<span className="text-rose-500 dark:text-rose-400">
									{monthOrdersAmount.diffFromLastMonth}%
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
