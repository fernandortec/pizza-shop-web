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

const data = [
	{ date: "10/04", revenue: 120 },
	{ date: "11/04", revenue: 100 },
	{ date: "12/04", revenue: 320 },
	{ date: "13/04", revenue: 98 },
	{ date: "14/04", revenue: 180 },
	{ date: "15/04", revenue: 200 },
	{ date: "16/04", revenue: 220 },
	{ date: "17/04", revenue: 69 },
];

export function RevenueChart(): JSX.Element {
	return (
		<Card className="col-span-6">
			<CardHeader className="flex-row items-center justify-between pb-8">
				<div className="space-y-1">
					<CardTitle className="text-base font-medium">
						Receita no período
					</CardTitle>
					<CardDescription>Receita diaria do período</CardDescription>
				</div>
			</CardHeader>
			<CardContent>
				<ResponsiveContainer width="100%" height={240}>
					<LineChart style={{ fontSize: 12 }} data={data}>
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
							dataKey="revenue"
							stroke={violet["500"]}
						/>
					</LineChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	);
}
