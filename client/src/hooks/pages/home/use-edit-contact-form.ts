import { useForm } from "react-hook-form";
import { useHookFormMask } from "use-mask-input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { errorToastHandler } from "@/_error/errorToastHandler";
import { successToastHandler } from "@/utils/successToast";
import { editContactHttpRequest } from "@/http/contact/edit-contact ";
import { useEffect, useState } from "react";
import { updateContactImageHttpRequest } from "@/http/contact/update-contact-image";
import { deleteContactImageHttpRequest } from "@/http/contact/delete-contact-image";

const editContactSchema = z.object({
    cpf: z
        .string({ required_error: "CPF obrigatório" })
        .min(11, "CPF Imcompleto"),
    name: z.string({ required_error: "Nome obrigatório" }),
    email: z.string({ required_error: "Email obrigatório" }),
    phone: z.string({ required_error: "Telefone obrigatório" }),
    contactImageAvatar: z.custom<FileList>().optional(),
});

type editContactFormData = z.infer<typeof editContactSchema>;

type useEditContactFormProps = {
    contact: CONTACT_DTO;
    successEditCallback?: () => void;
    modalVisibility: boolean;
};

export function useEditContactForm(props: useEditContactFormProps) {
    const { successEditCallback, contact, modalVisibility } = props;

    const editContactForm = useForm<editContactFormData>({
        resolver: zodResolver(editContactSchema),
    });
    const [contactInitialPhotoUrl, setContactInitialPhotoUrl] = useState<
        string | null
    >(null);
    const { register, formState, handleSubmit, reset, setValue, watch } =
        editContactForm;
    const { errors, isSubmitting } = formState;

    const registerWithMask = useHookFormMask(register);

    const contactImageAvatarObject = watch("contactImageAvatar");
    const contactImageAvatarArray = Array.from(contactImageAvatarObject || []);
    const contactImageAvatar = contactImageAvatarArray[0] ?? null;
    const contactAvatarImageInformation = contactImageAvatar
        ? {
              name: contactImageAvatar.name,
              photoUrl: URL.createObjectURL(contactImageAvatar),
          }
        : null;

    async function handleEditContact(data: editContactFormData) {
        try {
            await editContactHttpRequest({
                id: contact.id,
                name: data.name,
                cpf: data.cpf,
                email: data.email,
                phone: data.phone,
            });
            const contactImageAvatarArray = Array.from(
                contactImageAvatarObject || []
            );

            if (
                (contactInitialPhotoUrl == null && contact.hasPhoto) ||
                (contactImageAvatarArray[0] && contact.hasPhoto)
            ) {
                await deleteContactImageHttpRequest({ contactId: contact.id });
            }

            if (contactImageAvatarArray[0]) {
                await updateContactImageHttpRequest({
                    contactId: contact.id,
                    file: contactImageAvatarArray[0],
                });
            }

            setContactInitialPhotoUrl(null);
            if (successEditCallback) {
                successEditCallback();
            }

            reset();

            successToastHandler({
                title: "Contato editado com sucesso",
            });
        } catch (error) {
            errorToastHandler({ error });
        }
    }

    function deleteContactImage() {
        if (contactInitialPhotoUrl) {
            setContactInitialPhotoUrl(null);
            return;
        }
        reset({ contactImageAvatar: null });
    }

    useEffect(() => {
        if (!contact || !modalVisibility) return;
        reset();

        setValue("name", contact.name);
        setValue("cpf", contact.cpf);
        setValue("email", contact.email);
        setValue("phone", contact.phone);

        if (contact.hasPhoto) {
            setContactInitialPhotoUrl(contact.photoUrl);
        } else {
            setContactInitialPhotoUrl(null);
        }
    }, [contact, setValue, modalVisibility, reset]);

    return {
        handleEditContact,
        register,
        registerWithMask,
        editContactForm,
        handleSubmit,
        deleteContactImage,
        contactInitialPhotoUrl,
        contactAvatarImageInformation,
        errors,
        isSubmitting,
    };
}
