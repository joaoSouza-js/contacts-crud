import z from "zod";
import { convertZodObjectToSchema } from "../../utils/zod-swagger-type";

export const contactQueryParamsSchema = z.object({
    contactId: z.string().uuid(),
});

export const swaggerContactContactQueryParamsSchema = convertZodObjectToSchema(
    contactQueryParamsSchema
);
