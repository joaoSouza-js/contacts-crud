import z from "zod";
import { convertZodObjectToSchema } from "../../utils/zod-swagger-type";

export const newContactBodySchema = z.object({
    name: z.string(),
    email: z.string().email("Email inválido"),
    phone: z.string(),
    cpf: z.coerce.string(),
});

export const swaggerContactRestControllerBodySchema =
    convertZodObjectToSchema(newContactBodySchema);
