import z from "zod";
import { convertZodObjectToSchema } from "../../utils/zod-swagger-type";

export const contactsQuerySchema = z.object({
    limit: z.coerce.number().default(10),
    page: z.coerce.number().default(1),
    searchName: z.string().default(""),
});

export const swaggerContactsQueryParamsSchema =
    convertZodObjectToSchema(contactsQuerySchema);
