import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Building, ChevronDown, LogOut } from "lucide-react";

export function AccountMenu(): JSX.Element {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					className="flex items-center gap-2 select-none"
				>
					Pizza Shop
					<ChevronDown className="w-4 h-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-56">
				<DropdownMenuLabel className="flex flex-col">
					<span>Fernando Rodrigues</span>
					<span className="text-xs font-normal text-muted-foreground">
						fernandor@gmail.com
					</span>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<Building className="w-4 h-4 mr-2" />
					<span>Perfil da loja</span>
				</DropdownMenuItem>
				<DropdownMenuItem className="text-rose-500 dark:text-rose-400">
					<LogOut className="w-4 h-4 mr-2" />
					<span>Sair</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
