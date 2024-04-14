import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Utensils } from "lucide-react";

export function DayOrdersAmountCard(): JSX.Element {
	return (
		<Card>
			<CardHeader className="flex flex-row space-y-0 items-center justify-between pb-2">
				<CardTitle className="text-base">Pedidos</CardTitle>
				<Utensils className="w-4 g-4 text-muted-foreground" />
			</CardHeader>
			<CardContent className="space-y-1">
				<span className="text-2xl font-bold tracking-tight">12</span>
				<p className="text-xs text-muted-foreground">
					<span className="text-rose-500 dark:text-rose-400">- 4% </span>
					em relação á ontem
				</p>
			</CardContent>
		</Card>
	);
}
