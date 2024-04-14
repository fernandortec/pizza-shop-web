import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	emerald,
	sky,
	amber,
	violet,
	rose,
	indigo,
	orange,
	teal,
} from "tailwindcss/colors";

import { BarChart } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const data = [
	{ product: "Pepperoni", amount: 20 },
	{ product: "Muzzarela", amount: 36 },
	{ product: "Marguerita", amount: 50 },
	{ product: "4 Quejos", amount: 12 },
	{ product: "Lombo canadense", amount: 90 },
	{ product: "Agricode Amora", amount: 20 },
	{ product: "Frango com requeijão", amount: 33 },
	{ product: "Frango com chedar", amount: 11 },
];

const COLORS: string[] = [
	sky[500],
	amber["500"],
	violet[500],
	emerald[500],
	rose[500],
	indigo[500],
	orange[700],
	teal[500],
];

export function PopularProductsChart(): JSX.Element {
	return (
		<Card className="col-span-3">
			<CardHeader className="pb-8">
				<div className="flex items-center justify-between">
					<CardTitle className="text-base font-medium">
						Produtos populares
					</CardTitle>
					<BarChart />
				</div>
			</CardHeader>
			<CardContent>
				<ResponsiveContainer width="100%" height={240}>
					<PieChart style={{ fontSize: 12 }}>
						<Pie
							data={data}
							dataKey="amount"
							nameKey="product"
							cx="50%"
							cy="50%"
							outerRadius={86}
							innerRadius={64}
							strokeWidth="8"
							labelLine={false}
							label={({
								cx,
								cy,
								midAngle,
								innerRadius,
								outerRadius,
								value,
								index,
							}) => {
								const RADIAN = Math.PI / 180;
								const radius = 12 + innerRadius + (outerRadius - innerRadius);
								const x = cx + radius * Math.cos(-midAngle * RADIAN);
								const y = cy + radius * Math.sin(-midAngle * RADIAN);

								return (
									<text
										x={x}
										y={y}
										className="fill-muted-foreground text-xs"
										textAnchor={x > cx ? "start" : "end"}
										dominantBaseline="central"
									>
										{data[index].product.length > 15
											? data[index].product.substring(0, 12).concat("...")
											: data[index].product}{" "}
										({value})
									</text>
								);
							}}
						>
							{data.map((_, idx) => (
								<Cell
									key={`cell-${
										// biome-ignore lint/suspicious/noArrayIndexKey:
										idx
									}`}
									fill={COLORS[idx]}
									className="stroke-background hover:opacity-80"
								/>
							))}
						</Pie>
					</PieChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	);
}
