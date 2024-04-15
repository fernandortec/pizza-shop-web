import { z } from "zod";

export const updateStoreProfileSchema = z.object({
	name: z.string(),
	description: z.string().nullable(),
});

export type UpdateStoreProfileSchema = z.infer<typeof updateStoreProfileSchema>;
