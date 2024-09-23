import type { FastifyRequest, FastifyReply } from "fastify";
import { createNewContact } from "../../../functions/create-new-contact";
import { newContactBodySchema } from "../../validation/create-contact-body-schema";

export async function createContactRestController(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const contact = newContactBodySchema.parse(request.body);
    const userId = request.user.sub;

    const { contactCreated } = await createNewContact({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        photoUrl: null,
        userId: userId,
        cpf: contact.cpf,
    });

    return reply.status(201).send({
        contact: contactCreated,
    });
}
