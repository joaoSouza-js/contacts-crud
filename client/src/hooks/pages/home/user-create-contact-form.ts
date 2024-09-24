import { useForm } from "react-hook-form";
import { useHookFormMask } from "use-mask-input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { errorToastHandler } from "@/_error/errorToastHandler";
import { createContactHttpRequest } from "@/http/contact/create-contact";
import { successToastHandler } from "@/utils/successToast";
import { updateContactImageHttpRequest } from "@/http/contact/update-contact-image";

const createContactSchema = z.object({
    cpf: z
        .string({ required_error: "CPF obrigatório" })
        .min(11, "CPF Imcompleto"),
    name: z.string({ required_error: "Nome obrigatório" }).min(3, "Nome deve ter pelo menos 3 caracteres"),
    email: z.string({ required_error: "Email obrigatório" }).email("Email inválido"),
    phone: z.string({ required_error: "Telefone obrigatório" }).min(4, "Este telefone não existe"),
    contactImageAvatar: z.custom<FileList>().optional(),
});

type CreateContactFormData = z.infer<typeof createContactSchema>;

type useCreateContactFormProps = {
    handleCloseForm: () => void;
};

export function useCreateContactForm(props: useCreateContactFormProps) {
    const { handleCloseForm } = props;

    const createContactForm = useForm<CreateContactFormData>({
        resolver: zodResolver(createContactSchema),
    });

    const { register, formState, handleSubmit, reset, watch } =
        createContactForm;
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

    async function handleCreateContact(data: CreateContactFormData) {
        try {
            const { contact } = await createContactHttpRequest({
                name: data.name,
                cpf: data.cpf,
                email: data.email,
                phone: data.phone,
            });
            const contactImageAvatarArray = Array.from(
                contactImageAvatarObject || []
            );
            if (contactImageAvatarArray[0]) {
                await updateContactImageHttpRequest({
                    contactId: contact.id,
                    file: contactImageAvatarArray[0],
                });
            }

            reset();
            handleCloseForm();
            successToastHandler({
                title: "Contato criado com sucesso",
            });
        } catch (error) {
            errorToastHandler({ error });
        }
    }

    function deleteContactImage() {
        reset({ contactImageAvatar: null });
    }

    return {
        handleCreateContact,
        register,
        registerWithMask,
        createContactForm,
        handleSubmit,
        errors,
        deleteContactImage,
        contactAvatarImageInformation,
        isSubmitting,
    };
}
