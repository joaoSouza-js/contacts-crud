import { useForm } from "react-hook-form";
import { useHookFormMask } from "use-mask-input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { errorToastHandler } from "@/_error/errorToastHandler";
import { createContactHttpRequest } from "@/http/contact/create-contact";
import { successToastHandler } from "@/utils/successToast";

const createContactSchema = z.object({
    cpf: z
        .string({ required_error: "CPF obrigatório" })
        .min(11, "CPF Imcompleto"),
    name: z.string({ required_error: "Nome obrigatório" }),
    email: z.string({ required_error: "Email obrigatório" }),
    phone: z.string({ required_error: "Telefone obrigatório" }),
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

    const { register, formState, handleSubmit, reset } = createContactForm;
    const { errors, isSubmitting } = formState;

    const registerWithMask = useHookFormMask(register);

    async function handleCreateContact(data: CreateContactFormData) {
        try {
            await createContactHttpRequest({
                name: data.name,
                cpf: data.cpf,
                email: data.email,
                phone: data.phone,
            });
            reset();
            handleCloseForm();
            successToastHandler({
                title: "Contato criado com sucesso",
            });
        } catch (error) {
            errorToastHandler({ error });
        }
    }

    return {
        handleCreateContact,
        register,
        registerWithMask,
        createContactForm,
        handleSubmit,
        errors,
        isSubmitting,
    };
}
