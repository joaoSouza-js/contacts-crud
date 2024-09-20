import { BadRequest } from "../.error/BadRequest";
import { prisma } from "../libs/prisma";
import { validateCPF } from "../utils/validate-cpf";

type createNewContactProps = {
    userId: string;
    name: string;
    email: string;
    phone: string;
    photoUrl?: string;
    cpf: string;
};

export async function createNewContact(props: createNewContactProps) {
    const { name, email, photoUrl, cpf, phone, userId } = props;

    if (!userId) {
        throw new BadRequest("Usuário inexistente");
    }

    const { cleanedCPF, isValidCpf } = validateCPF(cpf);

    if (isValidCpf === false) {
        throw new BadRequest("Cpf inválido");
    }

    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            contacts: true,
        },
    });

    if (!user) {
        throw new BadRequest("Usuário inexistente");
    }

    const contactAlreadyExits = user?.contacts.find(
        (contact) => contact.cpf === cleanedCPF
    );

    if (contactAlreadyExits) {
        throw new BadRequest("Contato  Já foi cadastrado");
    }

    if (contactAlreadyExits?.id === userId) {
        throw new BadRequest("Você não pode se  auto cadastrar");
    }

    const contactCreated = await prisma.contact.create({
        data: {
            cpf: cleanedCPF,
            name: name,
            email: email,
            phone: phone,
            userId: userId,
        },
        select: {
            id: true,
            cpf: true,
            email: true,
            name: true,
            phone: true,
        },
    });

    return {
        contactCreated: contactCreated,
    };
}
