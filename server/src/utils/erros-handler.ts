import type { FastifyInstance } from "fastify";
import { ZodError } from "zod";
import { BadRequest } from "../.error/BadRequest";
import { AuthErrorRequest } from "../.error/AuthRequest";
import { FastifyJWT } from "@fastify/jwt";

type FastifyErrorHandler = FastifyInstance["errorHandler"];

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
    const isValidationError = error instanceof ZodError;

    if (isValidationError) {
        return reply.status(400).send({
            message: "Error durring validation",
            error: error.flatten().fieldErrors,
        });
    }

    const isBadRequestError = error instanceof BadRequest;

    if (isBadRequestError) {
        reply.status(400).send({
            message: error.message,
        });
    }

    const IsFastifyJwtError = error instanceof AuthErrorRequest;

    if (IsFastifyJwtError) {
        return error.callError();
    }

    return reply
        .status(500)
        .send({
            message: error.message ?? "Internal server error",
            code: error.code ?? 500,
        });
};
