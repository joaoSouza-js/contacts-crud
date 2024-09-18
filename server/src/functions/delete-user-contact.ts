import { prisma } from "../libs/prisma";
import { BadRequest } from "../.error/BadRequest";

type deleteUserContactProps = {
    contactId: string;
    userId: string;
};

export async function deleteUserContact(props: deleteUserContactProps) {
    const { contactId, userId } = props;

    const contact = await prisma.contact.findUnique({
        where: {
            id: contactId,
        },
        include: {
            user: true,
        },
    });

    if (!contact) {
        throw new BadRequest("Contato inexistente ou  foi deletado");
    }

    const isContactOwner = contact.user?.id === userId;

    if (!isContactOwner) {
        throw new BadRequest("Contato só pode ser deletado pelo proprietário");
    }

    await prisma.contact.delete({
        where: {
            id: contactId,
        },
    });
}
