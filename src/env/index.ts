import { z } from "zod";

const envSchema = z.object({
	MODE: z.enum(["production", "test", "development"]),
	API_URL: z.string(),
	ENABLE_API_DELAY: z
		.enum(["true", "false"])
		.transform((value) => value === "true"),
});

const envSafeParseData = envSchema.parse(process.env);
export const env = envSafeParseData;
