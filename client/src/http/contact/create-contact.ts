import { api } from "@/lib/axios";

type createContactProps = Pick<CONTACT_DTO, "name" | "cpf" | "email" | "phone">;

type contactResponse = Pick<CONTACT_DTO, "name" | "cpf" | "email" | "phone"> & {
    id: string;
};

type createContactResponse = {
    contact: contactResponse;
};

export async function createContactHttpRequest(
    props: createContactProps
): Promise<createContactResponse> {
    const { name, cpf, email, phone } = props;
    const response = await api.post<createContactResponse>("/contact", {
        name,
        cpf,
        email,
        phone,
    });

    return response.data;
}
