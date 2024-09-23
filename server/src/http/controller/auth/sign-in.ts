import type { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { sigInBodySchema } from "../../validation/sign-in-body-schema";
import { confirmUserCredentials } from "../../../functions/confirm-user-credential";

export async function signInRestController(
    request: FastifyRequest,
    reply: FastifyReply,
    app: FastifyInstance
) {
    const { cpf, password } = sigInBodySchema.parse(request.body);
    const { user } = await confirmUserCredentials({
        cpf,
        password,
    });
    const token = app.jwt.sign(
        { name: user.name },
        { sub: user.id, expiresIn: 60 * 60 * 2 }
    ); // 2 hours
    reply.status(201).send({ token, user });
}
