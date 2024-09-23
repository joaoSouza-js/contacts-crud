import type { FastifyRequest, FastifyReply } from "fastify";
import { BadRequest } from "../../../.error/BadRequest";
import { saveContactImage } from "../../../functions/save-contact-image";
import { contactQueryParamsSchema } from "../../validation/contact-query-params-schema";

export async function editContactPhotoRestController(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const { contactId } = contactQueryParamsSchema.parse(request.params);

    const userId = request.user.sub;

    const image = await request.file();

    if (!image) {
        throw new BadRequest("Imagem inválida");
    }

    const photoUrl = await saveContactImage({
        contactId: contactId,
        image,
        userId: userId,
    });

    reply.send({
        fileName: photoUrl,
    });
}
