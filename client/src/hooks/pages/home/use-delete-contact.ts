import { errorToastHandler } from "@/_error/errorToastHandler";
import { deleteContactHttpRequest } from "@/http/contact/delete-contact";
import { successToastHandler } from "@/utils/successToast";
import { useState } from "react";

type useDeleteContactProps = {
    contactId: string;
    successDeleteCallback?: () => void;
};

export function useDeleteContact(props: useDeleteContactProps) {
    const { contactId, successDeleteCallback } = props;
    const [isDeletingContact, setIsDeletingContact] = useState(false);

    async function deleteContact() {
        if (isDeletingContact) return;
        setIsDeletingContact(true);

        try {
            await deleteContactHttpRequest({ contactId });

            if (successDeleteCallback) {
                successDeleteCallback();
            }

            successToastHandler({
                title: "Contato deletado com sucesso",
            });
        } catch (error) {
            errorToastHandler({ error });
        } finally {
            setIsDeletingContact(false);
        }
    }

    return { deleteContact, isDeletingContact };
}
