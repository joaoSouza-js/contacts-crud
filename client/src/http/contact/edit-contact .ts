import { api } from "@/lib/axios";

type editContactProps = Pick<
    CONTACT_DTO,
    "name" | "cpf" | "email" | "phone" | "id"
>;

type contactResponse = Pick<CONTACT_DTO, "name" | "cpf" | "email" | "phone"> & {
    id: string;
};

type editContactResponse = {
    contact: contactResponse;
};

export async function editContactHttpRequest(
    props: editContactProps
): Promise<editContactResponse> {
    const { name, cpf, email, phone, id } = props;
    const response = await api.put<editContactResponse>(`contact/${id}`, {
        name,
        cpf,
        email,
        phone,
    });

    return response.data;
}
