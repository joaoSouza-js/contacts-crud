import { prisma } from "../libs/prisma";

type listUserContactsProps = {
    userId: string;
    searchName?: string;
    limit?: number;
    page?: number;
};

export function listUserContacts(props: listUserContactsProps) {
    const { userId, searchName = "", limit = 10, page = 1 } = props;

    const contacts = prisma.contact.findMany({
        where: {
            user: {
                id: userId,
            },
            name: {
                contains: searchName.toLowerCase(),
            },
        },
        orderBy: {
            name: "asc",
        },
        take: limit,
        skip: (page - 1) * limit,
    });

    return contacts;
}
