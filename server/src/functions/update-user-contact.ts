import { prisma } from "../libs/prisma";
import { checkUserHasAuthorizationInContact } from "./check-user-has-authorization-in-contact";

type createNewContactProps = {
    contactId: string;
    userId: string;
    name: string;
    email: string;
    phone: string;
};

export async function updateUserContact(props: createNewContactProps) {
    const { name, email, phone, contactId, userId } = props;

    await checkUserHasAuthorizationInContact({
        contactId,
        userId,
        useNotAuthorizedMessageError:
            "Apenas o proprietário do contato pode alterar os dados",
    });

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
