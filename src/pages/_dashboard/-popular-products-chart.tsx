import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	amber,
	emerald,
	indigo,
	orange,
	rose,
	sky,
	teal,
	violet,
} from "tailwindcss/colors";

import { getPopularProducts } from "@/api/get-popular-products";
import { useQuery } from "@tanstack/react-query";
import { BarChart } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

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
	const { data: popularProducts } = useQuery({
		queryKey: ["metrics", "popular-products"],
		queryFn: getPopularProducts,
	});

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
				{popularProducts && (
					<ResponsiveContainer width="100%" height={240}>
						<PieChart style={{ fontSize: 12 }}>
							<Pie
								data={popularProducts}
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
											{popularProducts[index].product.length > 15
												? popularProducts[index].product
														.substring(0, 12)
														.concat("...")
												: popularProducts[index].product}{" "}
											({value})
										</text>
									);
								}}
							>
								{popularProducts.map((_, idx) => (
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
				)}
			</CardContent>
		</Card>
	);
}
