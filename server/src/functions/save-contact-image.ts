import { prisma } from "../libs/prisma";
import type { MultipartFile } from "@fastify/multipart";
import { saveImage } from "../services/save-image";
import { env } from "../env";
import { checkUserHasAuthorizationInContact } from "./check-user-has-authorization-in-contact";

type saveContactImageProps = {
    contactId: string;
    image: MultipartFile;
    userId: string;
};

export async function saveContactImage(props: saveContactImageProps) {
    const { contactId, image, userId } = props;
    const photoName = await saveImage({
        image,
    });

    await checkUserHasAuthorizationInContact({
        contactId,
        userId,
        useNotAuthorizedMessageError:
            "Apenas o proprietário do contato pode alterar a imagem",
    });

    const photoUrl = `http://localhost:${env.PORT}/uploads/${photoName}`; // Replace with your actual server URL

    await prisma.contact.update({
        where: {
            id: contactId,
        },
        data: {
            photoUrl: photoUrl,
        },
    });

    return photoUrl;
}
