import { getDayOrdersAmount } from "@/api/get-day-orders-amount";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Utensils } from "lucide-react";

export function DayOrdersAmountCard(): JSX.Element {
	const { data: dayOrdersAmount } = useQuery({
		queryFn: getDayOrdersAmount,
		queryKey: ["metrics", "day-orders-amount"],
	});

	return (
		<Card>
			<CardHeader className="flex flex-row space-y-0 items-center justify-between pb-2">
				<CardTitle className="text-base">Pedidos (dia)</CardTitle>
				<Utensils className="w-4 g-4 text-muted-foreground" />
			</CardHeader>
			<CardContent className="space-y-1">
				{dayOrdersAmount && (
					<>
						<span className="text-2xl font-bold tracking-tight">
							{dayOrdersAmount.amount.toLocaleString("pt-BR")}
						</span>
						<p className="text-xs text-muted-foreground">
							{dayOrdersAmount.diffFromYesterday >= 0 ? (
								<span className="text-emerald-500 dark:text-emerald-400">
									+{dayOrdersAmount.diffFromYesterday}%
								</span>
							) : (
								<span className="text-rose-500 dark:text-rose-400">
									{dayOrdersAmount.diffFromYesterday}%
								</span>
							)}{" "}
							em relação ao dia passado
						</p>
					</>
				)}
			</CardContent>
		</Card>
	);
}
