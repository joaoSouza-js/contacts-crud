import z from "zod";

const envSchema = z.object({
    DATABASE_URL: z.string(),
    JWT_SECRET: z.string().default("your-secret-key"),
    PORT: z.coerce.number().default(3000),
});

const envParsed = envSchema.parse(process.env);

export const env = envParsed;
