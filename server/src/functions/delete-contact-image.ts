import { prisma } from "../libs/prisma";
import { checkUserHasAuthorizationInContact } from "./check-user-has-authorization-in-contact";

type deleteContactImage = {
    contactId: string;
    userId: string;
};

export async function deleteContactImage(props: deleteContactImage) {
    const { contactId, userId } = props;

    const contact = await checkUserHasAuthorizationInContact({
        contactId,
        userId,
        useNotAuthorizedMessageError:
            "Apenas o proprietário do contato pode deletar a imagem",
    });

    if (!contact.photoUrl) return;

    await Promise.all([
        prisma.contact.update({
            where: {
                id: contactId,
            },
            data: {
                photoUrl: null,
            },
        }),
        prisma.contact.update({
            where: {
                id: contactId,
            },
            data: {
                photoUrl: null,
            },
        }),
    ]);
}
