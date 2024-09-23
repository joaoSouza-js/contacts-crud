import z from "zod";
import { convertZodObjectToSchema } from "../../utils/zod-swagger-type";

export const updateContactBodySchema = z.object({
    name: z.string(),
    email: z.string().email("Email inválido"),
    phone: z.string(),
    cpf: z.coerce.string(),
});

export const swaggerUpdateContactBodySchema = convertZodObjectToSchema(
    updateContactBodySchema
);
