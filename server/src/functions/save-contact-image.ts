import { prisma } from "../libs/prisma";
import type { MultipartFile } from "@fastify/multipart";
import { saveImage } from "../services/save-image";
import { BadRequest } from "../.error/BadRequest";
import { env } from "../env";

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
