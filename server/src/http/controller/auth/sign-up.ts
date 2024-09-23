import type { FastifyRequest, FastifyReply } from "fastify";
import { createAccount } from "../../../functions/create-account";
import { signUpBodySchema } from "../../validation/sign-up-body-schema";

export async function signUpRestController(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const { cpf, password, name } = signUpBodySchema.parse(request.body);

    await createAccount({ cpf, password, name });
    reply.status(201);
}
