import { api } from "@/lib/axios";

type deleteContactImageProps = {
    contactId: string;
};

export async function deleteContactImageHttpRequest(
    props: deleteContactImageProps
) {
    const { contactId } = props;
    await api.delete(`/contact/${contactId}/photo`);
}
