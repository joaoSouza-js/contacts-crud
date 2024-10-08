import { z } from "zod";

const envSchema = z.object({
    BASE_API_URL: z.string().url(),
});

console.log("your env", import.meta.env);

export const env = envSchema.parse(process.env);
