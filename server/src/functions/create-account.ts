import { BadRequest } from "../.error/BadRequest";
import { prisma } from "../libs/prisma";
import { hashPassword } from "../utils/hash-password";
import { validateCPF } from "../utils/validate-cpf";

type CreateAccountProps = {
    cpf: string;
    password: string;
    name: string;
};

export async function createAccount(props: CreateAccountProps) {
    const { cpf, name, password } = props;
    const { cleanedCPF, isValidCpf } = validateCPF(cpf);

    if (isValidCpf === false) {
        throw new BadRequest("Cpf inválido");
    }

    const userAlreadyExits = await prisma.user.findUnique({
        where: {
            cpf: cleanedCPF,
        },
    });

    if (userAlreadyExits) {
        throw new BadRequest("cpf já foi cadastrado");
    }

    const hashedPassword = hashPassword(password);

    await prisma.user.create({
        data: {
            name: name,
            cpf: cleanedCPF,
            password: hashedPassword,
        },
    });
}
