import {
	GetManagedRestaurant,
	type GetManagedRestaurantResponse,
} from "@/api/get-managed-restaurant";
import { updateProfile } from "@/api/update-profile";
import { Button } from "@/components/ui/button";
import {
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	updateStoreProfileSchema,
	type UpdateStoreProfileSchema,
} from "@/schemas/store-profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function StoreProfileDialog() {
	const queryClient = useQueryClient();

	const { data: managedRestaurant } = useQuery({
		queryFn: GetManagedRestaurant,
		queryKey: ["managed-restaurant"],
		staleTime: Number.POSITIVE_INFINITY,
	});

	const form = useForm<UpdateStoreProfileSchema>({
		resolver: zodResolver(updateStoreProfileSchema),
		values: {
			description: managedRestaurant?.description ?? "",
			name: managedRestaurant?.name ?? "",
		},
	});

	type UpdateManagedRestaurantContext = {
		cached: GetManagedRestaurantResponse | null;
	};

	function updateManagedRestaurantCache({
		description,
		name,
	}: UpdateStoreProfileSchema): UpdateManagedRestaurantContext {
		const cached = queryClient.getQueryData<GetManagedRestaurantResponse>([
			"managed-restaurant",
		]);
		if (!cached) return { cached: null };

		queryClient.setQueryData<GetManagedRestaurantResponse>(
			["managed-restaurant"],
			{
				...cached,
				description,
				name,
			},
		);

		return { cached };
	}

	const { mutateAsync: updateProfileFn } = useMutation({
		mutationFn: updateProfile,
		onMutate({ description, name }): UpdateManagedRestaurantContext {
			const { cached } = updateManagedRestaurantCache({ description, name });

			return { cached };
		},
		onError(_, __, context): void {
			if (!context?.cached) return;

			updateManagedRestaurantCache(context.cached);
		},
	});

	async function handleUpdateProfile(
		data: UpdateStoreProfileSchema,
	): Promise<void> {
		const { description, name } = data;

		try {
			await updateProfileFn({ description, name });

			toast.success("Perfil atualizado com sucesso");
		} catch {
			toast.error("Erro ao atualizar perfil, tente novamente");
		}
	}

	const isFormSubmitting = form.formState.isSubmitting;

	return (
		<DialogContent className="pb-0">
			<DialogHeader>
				<DialogTitle>Perfil da loja</DialogTitle>
				<DialogDescription>
					Atualize as informações do seu estabelecimento visíveis ao seu cliente
				</DialogDescription>
			</DialogHeader>

			<Form {...form}>
				<form
					className="space-y-4 py-4"
					onSubmit={form.handleSubmit(handleUpdateProfile)}
				>
					<FormField
						name="name"
						control={form.control}
						render={({ field }) => (
							<FormItem className="grid grid-cols-4 items-center gap-4">
								<FormLabel className="text-right" htmlFor="name">
									Nome
								</FormLabel>
								<FormControl>
									<Input
										id="name"
										placeholder="Nome do restaurante"
										className="col-span-3"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						name="description"
						control={form.control}
						render={({ field }) => (
							<FormItem className="grid grid-cols-4 items-center gap-4">
								<FormLabel className="text-right" htmlFor="description">
									Descrição
								</FormLabel>
								<FormControl>
									<Textarea
										id="description"
										placeholder="Descreva um pouco seu estabelecimento"
										className="col-span-3"
										value={field.value ?? ""}
										onChange={field.onChange}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<DialogFooter className="pt-10">
						<DialogClose asChild>
							<Button variant="ghost">Cancelar</Button>
						</DialogClose>

						<Button variant="success" disabled={isFormSubmitting}>
							Salvar
						</Button>
					</DialogFooter>
				</form>
			</Form>
		</DialogContent>
	);
}
