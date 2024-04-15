import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { violet } from "tailwindcss/colors";

import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { getDailyRevenueInPeriod } from "@/api/get-daily-revenue-in-period";
import { Label } from "@/components/ui/label";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { useMemo, useState } from "react";
import type { DateRange } from "react-day-picker";
import dayjs from "dayjs";

export function RevenueChart(): JSX.Element {
	const [dateRange, setDateRange] = useState<DateRange | undefined>({
		to: new Date(),
		from: dayjs(new Date()).subtract(7, "days").toDate(),
	});

	const { data: dailyRevenueInPeriod } = useQuery({
		queryKey: ["metrics", "daily-revenue-in-period", dateRange],
		queryFn: () =>
			getDailyRevenueInPeriod({ from: dateRange?.from, to: dateRange?.to }),
	});

	const chartData = useMemo(() => {
		return dailyRevenueInPeriod?.map(chartItem => ({
			date: chartItem.date,
			receipt: chartItem.receipt / 100
		}))
	}, [dailyRevenueInPeriod]);

	return (
		<Card className="col-span-6">
			<CardHeader className="flex-row items-center justify-between pb-8">
				<div className="space-y-1">
					<CardTitle className="text-base font-medium">
						Receita no período
					</CardTitle>
					<CardDescription>Receita diaria do período</CardDescription>
				</div>

				<div className="flex items-center gap-3">
					<Label>Período</Label>
					<DateRangePicker date={dateRange} onDateChange={setDateRange} />
				</div>
			</CardHeader>
			<CardContent>
				{dailyRevenueInPeriod && (
					<ResponsiveContainer width="100%" height={240}>
						<LineChart style={{ fontSize: 12 }} data={chartData}>
							<XAxis dataKey="date" tickLine={false} axisLine={false} dy={16} />
							<YAxis
								stroke="#888"
								axisLine={false}
								tickLine={false}
								width={80}
								tickFormatter={(value: number) =>
									value.toLocaleString("pt-BR", {
										style: "currency",
										currency: "BRL",
									})
								}
							/>
							<CartesianGrid vertical={false} className="stroke-muted " />
							<Line
								type="linear"
								strokeWidth={2}
								dataKey="receipt"
								stroke={violet["500"]}
							/>
						</LineChart>
					</ResponsiveContainer>
				)}
			</CardContent>
		</Card>
	);
}
