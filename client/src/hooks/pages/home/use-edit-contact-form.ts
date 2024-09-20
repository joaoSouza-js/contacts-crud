import { useForm } from "react-hook-form";
import { useHookFormMask } from "use-mask-input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { errorToastHandler } from "@/_error/errorToastHandler";
import { successToastHandler } from "@/utils/successToast";
import { editContactHttpRequest } from "@/http/contact/edit-contact ";
import { useEffect } from "react";

const editContactSchema = z.object({
    cpf: z
        .string({ required_error: "CPF obrigatório" })
        .min(11, "CPF Imcompleto"),
    name: z.string({ required_error: "Nome obrigatório" }),
    email: z.string({ required_error: "Email obrigatório" }),
    phone: z.string({ required_error: "Telefone obrigatório" }),
});

type editContactFormData = z.infer<typeof editContactSchema>;

type useEditContactFormProps = {
    contact: CONTACT_DTO;
    successEditCallback?: () => void;
};

export function useEditContactForm(props: useEditContactFormProps) {
    const { successEditCallback, contact } = props;

    const editContactForm = useForm<editContactFormData>({
        resolver: zodResolver(editContactSchema),
    });

    const { register, formState, handleSubmit, reset, setValue } =
        editContactForm;
    const { errors, isSubmitting } = formState;

    const registerWithMask = useHookFormMask(register);

    async function handleEditContact(data: editContactFormData) {
        try {
            await editContactHttpRequest({
                id: contact.id,
                name: data.name,
                cpf: data.cpf,
                email: data.email,
                phone: data.phone,
            });
            reset();
            if (successEditCallback) {
                successEditCallback();
            }
            successToastHandler({
                title: "Contato editado com sucesso",
            });
        } catch (error) {
            errorToastHandler({ error });
        }
    }

    useEffect(() => {
        if (!contact) return;
        setValue("name", contact.name);
        setValue("cpf", contact.cpf);
        setValue("email", contact.email);
        setValue("phone", contact.phone);
    }, [contact, setValue]);

    return {
        handleEditContact,
        register,
        registerWithMask,
        editContactForm,
        handleSubmit,
        errors,
        isSubmitting,
    };
}
