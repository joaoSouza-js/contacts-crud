import type { FastifyRequest, FastifyReply } from "fastify";
import { contactQueryParamsSchema } from "../../validation/contact-query-params-schema";
import { deleteContactImage } from "../../../functions/delete-contact-image";

export async function deleteContactImageRestController(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const { contactId } = contactQueryParamsSchema.parse(request.params);
    const userId = request.user.sub;
    await deleteContactImage({ contactId, userId });
    reply.status(204);
}
