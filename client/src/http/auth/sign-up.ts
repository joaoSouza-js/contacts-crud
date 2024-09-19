import { api } from "@/lib/axios";

type signInProps = {
    cpf: string;
    password: string;
    name: string;
};

export async function signUpHttpRequest(props: signInProps): Promise<null> {
    const { cpf, password, name } = props;

    await api.post<null>("/signup", {
        cpf,
        password,
        name: name,
    });

    return null;
}
