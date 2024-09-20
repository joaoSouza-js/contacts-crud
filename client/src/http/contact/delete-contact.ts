import { api } from "@/lib/axios";

type deleteContactProps = {
    contactId: string;
};

export async function deleteContactHttpRequest(
    props: deleteContactProps
): Promise<null> {
    const { contactId } = props;
    const response = await api.delete(`/contact/${contactId}`);
    return null;
}
