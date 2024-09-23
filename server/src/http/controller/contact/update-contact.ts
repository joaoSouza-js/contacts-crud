import type { FastifyRequest, FastifyReply } from "fastify";
import { contactQueryParamsSchema } from "../../validation/contact-query-params-schema";
import { updateContactBodySchema } from "../../validation/update-contact-body-schema";
import { updateUserContact } from "../../../functions/update-user-contact";

export async function updateContactRestController(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const { contactId } = contactQueryParamsSchema.parse(request.params);

    const contact = updateContactBodySchema.parse(request.body);
    const userId = request.user.sub;

    await updateUserContact({
        contactId: contactId,
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        userId: userId,
    });

    reply.status(204);
}
