import z from "zod";
import { convertZodObjectToSchema } from "../../utils/zod-swagger-type";

export const sigInBodySchema = z.object({
    cpf: z.string(),
    password: z.string(),
});

export const swaggerSignInBodySchema =
    convertZodObjectToSchema(sigInBodySchema);
