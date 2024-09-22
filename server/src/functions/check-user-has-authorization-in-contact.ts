import { BadRequest } from "../.error/BadRequest";
import { prisma } from "../libs/prisma";

type checkUserHasAuthorizationInContactProps = {
    contactId: string;
    userId: string;
    useNotAuthorizedMessageError?: string;
};

export async function checkUserHasAuthorizationInContact(
    props: checkUserHasAuthorizationInContactProps
) {
    const {
        contactId,
        userId,
        useNotAuthorizedMessageError = "Ação só pode ser realiza pelo criador do contato",
    } = props;

    const contact = await prisma.contact.findUnique({
        where: {
            id: contactId,
        },
        include: {
            user: true,
        },
    });

    if (!contact) {
        throw new BadRequest("Contato inexistente ou foi deletado");
    }

    const isContactOwner = contact.user?.id === userId;

    if (!isContactOwner) {
        throw new BadRequest(useNotAuthorizedMessageError);
    }

    return contact;
}
