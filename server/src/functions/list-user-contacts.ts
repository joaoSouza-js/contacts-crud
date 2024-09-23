import { prisma } from "../libs/prisma";

type listUserContactsProps = {
    userId: string;
    searchName?: string;
    limit?: number;
    page?: number;
};

export async function listUserContacts(props: listUserContactsProps) {
    const { userId, searchName = "", limit = 10, page = 1 } = props;

    const contacts = await prisma.contact.findMany({
        where: {
            user: {
                id: userId,
            },
            name: {
                contains: searchName.toLowerCase(),
                mode: "insensitive",
            },
        },
        orderBy: {
            name: "asc",
        },
        select: {
            name: true,
            cpf: true,
            email: true,
            id: true,
            phone: true,
            photoUrl: true,
        },
        take: limit,
        skip: (page - 1) * limit,
    });

    const contactFormatted = contacts.map((contact) => {
        const contactHasPhoto = !!contact?.photoUrl;
        return { ...contact, hasPhoto: contactHasPhoto };
    });

    return {
        contacts: contactFormatted,
    };
}
