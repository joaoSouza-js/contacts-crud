import { prisma } from "../libs/prisma";
import { checkUserHasAuthorizationInContact } from "./check-user-has-authorization-in-contact";

type deleteUserContactProps = {
    contactId: string;
    userId: string;
};

export async function deleteUserContact(props: deleteUserContactProps) {
    const { contactId, userId } = props;

    await checkUserHasAuthorizationInContact({
        contactId,
        userId,
        useNotAuthorizedMessageError:
            "Contato só pode ser deletado pelo proprietário",
    });

    await prisma.contact.delete({
        where: {
            id: contactId,
        },
    });
}
