import { api } from "@/lib/axios";

type signInProps = {
    cpf: string;
    password: string;
};

type signInResponse = {
    user: AUTH_USER_DTO;
    token: string;
};

export async function signInHttpRequest(
    props: signInProps
): Promise<signInResponse> {
    const { cpf, password } = props;

    const response = await api.post<signInResponse>("/sign-in", {
        cpf,
        password,
    });

    return response.data;
}
