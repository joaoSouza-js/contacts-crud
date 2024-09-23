import z from "zod";
import { convertZodObjectToSchema } from "../../utils/zod-swagger-type";

export const signUpBodySchema = z.object({
    cpf: z.string(),
    password: z.string(),
    name: z.string(),
});

export const swaggerSignUpBodySchema =
    convertZodObjectToSchema(signUpBodySchema);
