import { prisma } from "../src/libs/prisma";
import { createFakeUser } from "../src/utils/create-fake-user";
import { createdFakeCpf } from "../src/utils/create-fake-cpf";

const defaultCpf = "52998224725";

async function createUsers(numberOfUser = 5) {
    const usersPrismaRequestArray = Array.from({ length: numberOfUser }, () => {
        const user = createFakeUser();
        const cpf = createdFakeCpf();
        return prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: "123456",
                cpf: cpf.digitsOnly,
            },
        });
    });
    const defaultUserRequest = await prisma.user.create({
        data: {
            name: "admin",
            email: "admin@admin",
            password: "123456",
            cpf: defaultCpf,
        },
    });
    const userRequestResult = await Promise.all(usersPrismaRequestArray);

    const users = [defaultUserRequest, ...userRequestResult];

    return users;
}

async function addContacts(usersId: string[]) {
    const usersContactsRequest = usersId.map((userId) => {
        return addUserContacts(userId);
    });
    await Promise.all(usersContactsRequest);
}

async function addUserContacts(userId: string) {
    const numberOfContacts = Math.floor(Math.random() * 15);

    const userPrismaContactsRequest = Array.from(
        { length: numberOfContacts },
        () => {
            const user = createFakeUser();
            const cpf = createdFakeCpf();

            return prisma.contact.create({
                data: {
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    photoUrl: user.photoUrl,
                    cpf: cpf.digitsOnly,
                    user: {
                        connect: {
                            id: userId,
                        },
                    },
                },
            });
        }
    );

    await Promise.all(userPrismaContactsRequest);
}

export async function seed() {
    await prisma.contact.deleteMany({});
    await prisma.user.deleteMany({});
    const users = await createUsers(4); // will return 5 users cause one is the default user
    const usersId = users.map((user) => user.id);
    await addContacts(usersId);
}

seed().finally(() => {
    prisma.$disconnect();
});
