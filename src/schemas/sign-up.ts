import { z } from "zod";

export const signUpFormSchema = z.object({ email: z.string().email() });
export type SignUpFormSchema = z.infer<typeof signUpFormSchema>;
