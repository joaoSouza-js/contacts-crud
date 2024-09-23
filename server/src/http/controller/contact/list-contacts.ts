import type { FastifyRequest, FastifyReply } from "fastify";
import { listUserContacts } from "../../../functions/list-user-contacts";
import { contactsQuerySchema } from "../../validation/contact-list-query-params-schema";

export async function listContactsRestController(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const userId = request.user.sub;
    const { limit, page, searchName } = contactsQuerySchema.parse(
        request.query
    );
    const { contacts } = await listUserContacts({
        userId: userId,
        limit,
        page,
        searchName,
    });

    return reply.status(200).send({ contacts });
}
