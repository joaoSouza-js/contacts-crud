import { z, type ZodSchema, type ZodObject, type ZodRawShape } from "zod";

type SchemaResult = Record<string, { type: string }>;

export const convertZodObjectToSchema = <T extends ZodRawShape>(
    zodSchema: ZodObject<T>
): SchemaResult => {
    const shape = zodSchema.shape;
    const result: SchemaResult = {};

    for (const key in shape) {
        const field: ZodSchema = shape[key];

        if (field instanceof z.ZodString) {
            result[key] = { type: "string" };
        } else if (field instanceof z.ZodNumber) {
            result[key] = { type: "number" };
        } else if (field instanceof z.ZodBoolean) {
            result[key] = { type: "boolean" };
        } else if (field instanceof z.ZodDate) {
            result[key] = { type: "date" };
        } else if (field instanceof z.ZodArray) {
            const arrayType =
                field.element instanceof z.ZodString
                    ? "string"
                    : field.element instanceof z.ZodNumber
                    ? "number"
                    : field.element instanceof z.ZodBoolean
                    ? "boolean"
                    : field.element instanceof z.ZodDate
                    ? "date"
                    : "unknown";
            result[key] = { type: `array of ${arrayType}` };
        }
        // You can extend this to other types as needed
    }

    return result;
};
