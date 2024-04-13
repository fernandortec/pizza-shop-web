import { z } from "zod";

export const signUpFormSchema = z.object({
	email: z.string().email(),
	restaurantName: z.string(),
	managerName: z.string(),
	phone: z.string(),
});
export type SignUpFormSchema = z.infer<typeof signUpFormSchema>;
