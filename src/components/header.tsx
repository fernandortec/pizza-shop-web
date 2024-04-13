import { NavLink } from "@/components/nav-link";
import { Separator } from "@/components/ui/separator";
import { Home, Pizza, UtensilsCrossed } from "lucide-react";

export function Header(): JSX.Element {
	return (
		<header className="border-b">
			<div className="flex h-16 items-center gap-6 px-6">
				<Pizza className="w-6 h-6" />

				<Separator orientation="vertical" className="h-6" />

				<nav className="flex items-center space-x-4 lg:space-x-6">
					<NavLink to="/">
						<Home className="w-4 h-4" />
						Início
					</NavLink>
					<NavLink to="/sign-up">
						<UtensilsCrossed className="w-4 h-4" />
						Pedidos
					</NavLink>
				</nav>
			</div>
		</header>
	);
}
