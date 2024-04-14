import { DayOrdersAmountCard } from "@/pages/_dashboard/-day-orders-amount-card";
import { MonthCanceledOrdersAmountCard } from "@/pages/_dashboard/-month-canceled-orders-amount-card";
import { MonthOrdersAmount } from "@/pages/_dashboard/-month-orders-amount-card";
import { MonthRevenueCard } from "@/pages/_dashboard/-month-revenue-card";
import { PopularProductsChart } from "@/pages/_dashboard/-popular-products-chart";
import { RevenueChart } from "@/pages/_dashboard/-revenue-chart";
import { createFileRoute } from "@tanstack/react-router";
import { Helmet } from "react-helmet-async";

export const Route = createFileRoute("/_dashboard/")({
	component: () => (
		<>
			<Helmet title="Dashboard" />
			<DashboardPage />
		</>
	),
});

function DashboardPage(): JSX.Element {
	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

			<div className="grid grid-cols-4 gap-4">
				<MonthRevenueCard />
				<MonthOrdersAmount />
				<DayOrdersAmountCard />
				<MonthCanceledOrdersAmountCard />
			</div>

			<main className="grid grid-cols-9 gap-4">
				<RevenueChart />
				<PopularProductsChart />
			</main>
		</div>
	);
}
