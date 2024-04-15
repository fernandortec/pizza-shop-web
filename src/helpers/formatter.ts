import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import relativeTime from "dayjs/plugin/relativeTime";

export const dateFormattter = new Intl.DateTimeFormat("pt-BR");
export const priceFormatter = new Intl.NumberFormat("pt-BR", {
	style: "currency",
	currency: "BRL",
});

export function formatDistanceToNow(date: Date) {
	dayjs.extend(advancedFormat);
	dayjs.extend(relativeTime);

	const targetDate = dayjs(date, { locale: "pt-br" });
	return `Há ${targetDate.fromNow(true)}`;
}