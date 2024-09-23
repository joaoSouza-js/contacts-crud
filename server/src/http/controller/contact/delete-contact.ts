import type { FastifyRequest, FastifyReply } from "fastify";
import { deleteUserContact } from "../../../functions/delete-user-contact";
import { contactQueryParamsSchema } from "../../validation/contact-query-params-schema";

export async function deleteContactRestController(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const { contactId } = contactQueryParamsSchema.parse(request.params);
    const userId = request.user.sub;
    await deleteUserContact({ contactId: contactId, userId: userId });

    reply.status(204).send(contactId);
}
