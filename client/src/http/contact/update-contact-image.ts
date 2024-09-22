import { api } from "@/lib/axios";

type updateContactImageProps = {
    contactId: string;
    file: File;
};

export async function updateContactImageHttpRequest(
    props: updateContactImageProps
) {
    const { contactId, file } = props;

    const formData = new FormData();

    formData.append("file", file);

    await api.patch(`/contact/${contactId}/photo`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}
