import { getMonthCanceledOrdersAmount } from "@/api/get-month-canceled-orders-amount";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MetricCardSkeleton } from "@/pages/_dashboard/_components/-metric-card-skeleton";
import { useQuery } from "@tanstack/react-query";
import { DollarSign } from "lucide-react";

export function MonthCanceledOrdersAmountCard(): JSX.Element {
	const { data: monthCanceledOrdersAmount } = useQuery({
		queryFn: getMonthCanceledOrdersAmount,
		queryKey: ["metrics", "month-canceled-orders-amount"],
	});

	return (
		<Card>
			<CardHeader className="flex flex-row space-y-0 items-center justify-between pb-2">
				<CardTitle className="text-base">Cancelamentos (mês)</CardTitle>
				<DollarSign className="w-4 g-4 text-muted-foreground" />
			</CardHeader>
			<CardContent className="space-y-1">
				{monthCanceledOrdersAmount ? (
					<>
						<span className="text-2xl font-bold tracking-tight">
							{monthCanceledOrdersAmount.amount}
						</span>
						<p className="text-xs text-muted-foreground">
							{monthCanceledOrdersAmount.diffFromLastMonth >= 0 ? (
								<span className="text-rose-500 dark:text-rose-400">
									+{monthCanceledOrdersAmount.diffFromLastMonth}%
								</span>
							) : (
								<span className="text-emerald-500 dark:text-emerald-400">
									{monthCanceledOrdersAmount.diffFromLastMonth}%
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
