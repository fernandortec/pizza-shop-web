import { z } from "zod";

const envSchema = z.object({
	MODE: z.enum(["production", "test", "development"]),
	API_URL: z.string().url(),
	ENABLE_API_DELAY: z.coerce.boolean().optional(),
});

const envSafeParseData = envSchema.parse(process.env);
export const env = envSafeParseData;
