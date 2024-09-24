import { prisma } from "../libs/prisma";
import { deleteImage } from "../services/delete-image";
import { checkUserHasAuthorizationInContact } from "./check-user-has-authorization-in-contact";

type deleteUserContactProps = {
    contactId: string;
    userId: string;
};

export async function deleteUserContact(props: deleteUserContactProps) {
    const { contactId, userId } = props;

    const contact = await checkUserHasAuthorizationInContact({
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

    if(contact.photoUrl) {
        const fileName = contact.photoUrl.split("/").pop();
        await deleteImage({ fileName });
    }
}
