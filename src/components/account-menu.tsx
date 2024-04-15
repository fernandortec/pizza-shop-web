import { GetManagedRestaurant } from "@/api/get-managed-restaurant";
import { getProfile } from "@/api/get-profile";
import { StoreProfileDialog } from "@/components/store-profile-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { Building, ChevronDown, LogOut } from "lucide-react";

export function AccountMenu(): JSX.Element {
	const { data: profile, isLoading: isLoadingProfile } = useQuery({
		queryFn: getProfile,
		queryKey: ["profile"],
	});

	const { data: managedRestaurant, isLoading: isLoadingManagedRestaurant } =
		useQuery({
			queryFn: GetManagedRestaurant,
			queryKey: ["managed-restaurant"],
			staleTime: Number.POSITIVE_INFINITY,
		});

	return (
		<Dialog>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="outline"
						className="flex items-center gap-2 select-none"
					>
						{isLoadingManagedRestaurant ? (
							<Skeleton className="h-4 w-40" />
						) : (
							managedRestaurant?.name
						)}
						<ChevronDown className="w-4 h-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-56">
					<DropdownMenuLabel className="flex flex-col">
						{isLoadingProfile ? (
							<div className="space-y-1.5">
								<Skeleton className="h-4 w-32" />
								<Skeleton className="h-3 w-24" />
							</div>
						) : (
							<>
								<span>{profile?.name}</span>
								<span className="text-xs font-normal text-muted-foreground">
									{profile?.email}
								</span>
							</>
						)}
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DialogTrigger asChild>
						<DropdownMenuItem>
							<Building className="w-4 h-4 mr-2" />
							<span>Perfil da loja</span>
						</DropdownMenuItem>
					</DialogTrigger>
					<DropdownMenuItem className="text-rose-500 dark:text-rose-400">
						<LogOut className="w-4 h-4 mr-2" />
						<span>Sair</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<StoreProfileDialog />
		</Dialog>
	);
}
