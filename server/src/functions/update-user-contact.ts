import { BadRequest } from "../.error/BadRequest";
import { prisma } from "../libs/prisma";

type createNewContactProps = {
    contactId: string;
    userId: string;
    name: string;
    email: string;
    phone: string;
};

export async function updateUserContact(props: createNewContactProps) {
    const { name, email, phone, contactId, userId } = props;

    const contact = await prisma.contact.findUnique({
        where: {
            id: contactId,
        },
        include: {
            user: true,
        },
    });

    if (!contact) {
        throw new BadRequest("Contato inexistente ou já foi deletado");
    }

    const isContactOwner = contact.user?.id === userId;

    if (!isContactOwner) {
        throw new BadRequest(
            "Contato só pode ser atualizado pelo proprietário"
        );
    }

    await prisma.contact.update({
        where: {
            id: contactId,
        },
        data: {
            name: name,
            email: email,
            phone: phone,
        },
    });
}
