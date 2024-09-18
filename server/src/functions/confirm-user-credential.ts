import { BadRequest } from "../.error/BadRequest";
import { prisma } from "../libs/prisma";
import { comparePassword } from "../utils/compare-password";
import { validateCPF } from "../utils/validate-cpf";

type confirmUserCredentialsProps = {
    cpf: string;
    password: string;
};

export async function confirmUserCredentials(
    props: confirmUserCredentialsProps
) {
    const { cpf, password } = props;
    const { cleanedCPF, isValidCpf } = validateCPF(cpf);

    if (isValidCpf === false) {
        throw new BadRequest("Cpf inválido");
    }

    const userAlreadyExits = await prisma.user.findUnique({
        where: {
            cpf: cleanedCPF,
        },
    });

    if (!userAlreadyExits) {
        throw new BadRequest("usuário não encontrado");
    }

    const isValidPassword = await comparePassword({
        hashedPassword: userAlreadyExits.password,
        password: password,
    });

    if (!isValidPassword) {
        throw new BadRequest("credenciais inválidas");
    }
}
