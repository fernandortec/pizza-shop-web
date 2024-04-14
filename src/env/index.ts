import { z } from "zod";

const envSchema = z.object({
	BASE_URL: z.string().url(),
});

const envSafeParseData = envSchema.parse(process.env);
export const env = envSafeParseData;
