import type { FastifyInstance } from "fastify";
import { createContactRestController } from "../controller/contact/create-contact";
import { deleteContactRestController } from "../controller/contact/delete-contact";
import { updateContactRestController } from "../controller/contact/update-contact";
import { swaggerUpdateContactBodySchema } from "../validation/update-contact-body-schema";
import { editContactPhotoRestController } from "../controller/contact/edit-contact-photo";
import { deleteContactImageRestController } from "../controller/contact/delete-contact-image";
import { swaggerContactRestControllerBodySchema } from "../validation/create-contact-body-schema";
import { listContactsRestController } from "../controller/contact/list-contacts";
import { swaggerContactsQueryParamsSchema } from "../validation/contact-list-query-params-schema";
import { swaggerContactContactQueryParamsSchema } from "../validation/contact-query-params-schema";

export async function contactRoutes(app: FastifyInstance) {
    app.post(
        "/contact",
        {
            schema: {
                tags: ["Contact"],
                summary: "Create contact",
                description: "route to create contact",
                body: {
                    type: "object",
                    properties: swaggerContactRestControllerBodySchema,
                },
            },
        },
        createContactRestController
    );

    app.delete(
        "/contact/:contactId",
        {
            schema: {
                tags: ["Contact"],
                summary: "Delete contact",
                description: "route to delete contact",
                params: {
                    type: "object",
                    properties: swaggerContactContactQueryParamsSchema,
                },
            },
        },
        deleteContactRestController
    );

    app.put(
        "/contact/:contactId",
        {
            schema: {
                tags: ["Contact"],
                summary: "Update contact",
                description: "route to update contact",
                params: {
                    type: "object",
                    properties: swaggerContactContactQueryParamsSchema,
                },
                body: {
                    type: "object",
                    properties: swaggerUpdateContactBodySchema,
                },
            },
        },
        updateContactRestController
    );

    app.get(
        "/contact",
        {
            schema: {
                tags: ["Contact"],
                summary: "List contacts",
                description: "route to list contacts",
                params: {
                    type: "object",
                    properties: swaggerContactsQueryParamsSchema,
                },
            },
        },
        listContactsRestController
    );

    app.patch(
        "/contact/:contactId/photo",
        {
            schema: {
                tags: ["Contact"],
                summary: "Edit contact photo",
                description: "route to edit contact photo",
                params: {
                    type: "object",
                    properties: swaggerContactContactQueryParamsSchema,
                },
            },
        },
        editContactPhotoRestController
    );

    app.delete(
        "/contact/:contactId/photo",
        {
            schema: {
                tags: ["Contact"],
                summary: "Delete contact photo",
                description: "route to delete contact photo",
                params: {
                    type: "object",
                    properties: swaggerContactContactQueryParamsSchema,
                },
            },
        },
        deleteContactImageRestController
    );
}
