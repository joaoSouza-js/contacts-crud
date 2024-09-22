import z from "zod";
import type { FastifyInstance } from "fastify";
import { createNewContact } from "../../functions/create-new-contact";
import { deleteUserContact } from "../../functions/delete-user-contact";
import { updateUserContact } from "../../functions/update-user-contact";
import { listUserContacts } from "../../functions/list-user-contacts";
import { saveContactImage } from "../../functions/save-contact-image";
import { BadRequest } from "../../.error/BadRequest";
import { deleteContactImage } from "../../functions/delete-contact-image";

const newContactBodySchema = z.object({
    name: z.string(),
    email: z.string().email("Email inválido"),
    phone: z.string(),
    cpf: z.coerce.string(),
});

const contactQueryParamsSchema = z.object({
    contactId: z.string().uuid(),
});

const updateContactBodySchema = z.object({
    name: z.string(),
    email: z.string().email("Email inválido"),
    phone: z.string(),
    cpf: z.coerce.string(),
});

const userContactsQuerySchema = z.object({
    limit: z.coerce.number().default(10),
    page: z.coerce.number().default(1),
    searchName: z.string().default(""),
});

const contactPhotoQueryParamsSchema = z.object({
    contactId: z.string().uuid(),
});

export async function contactRoutes(app: FastifyInstance) {
    app.post("/contact", async (request, reply) => {
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
    });

    app.delete("/contact/:contactId", async (request, reply) => {
        const { contactId } = contactQueryParamsSchema.parse(request.params);
        const userId = request.user.sub;
        await deleteUserContact({ contactId: contactId, userId: userId });

        reply.status(204).send(contactId);
    });

    app.put("/contact/:contactId", async (request, reply) => {
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
    });

    app.get("/contact", async (request, reply) => {
        const userId = request.user.sub;
        const { limit, page, searchName } = userContactsQuerySchema.parse(
            request.query
        );
        const { contacts } = await listUserContacts({
            userId: userId,
            limit,
            page,
            searchName,
        });

        return reply.status(200).send({ contacts });
    });

    app.patch("/contact/:contactId/photo", async (request, reply) => {
        const { contactId } = contactPhotoQueryParamsSchema.parse(
            request.params
        );

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
    });

    app.delete("/contact/:contactId/photo", async (request, reply) => {
        const { contactId } = contactQueryParamsSchema.parse(request.params);
        const userId = request.user.sub;
        await deleteContactImage({ contactId, userId });
        reply.status(204);
    });
}
