import { useForm } from "react-hook-form";
import { useHookFormMask } from "use-mask-input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/use-auth";
import { errorToastHandler } from "@/_error/errorToastHandler";

const signUpFormSchema = z
    .object({
        cpf: z
            .string({ required_error: "CPF obrigatório" })
            .min(11, "CPF Imcompleto"),
        password: z
            .string({ required_error: "Senha obrigatória" })
            .min(6, "Senha deve ter no mínimo 6 caracteres"),
        confirmPassword: z
            .string({
                required_error: "Confirmar senha obrigatória",
            })
            .min(6, "Senha deve ter no mínimo 6 caracteres"),
        name: z
            .string({ required_error: "Nome obrigatório" })
            .min(3, "Nome deve ter no mínimo 3 caracteres"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "As senhas devem ser iguais",
    });

type SignUpFormData = z.infer<typeof signUpFormSchema>;

export function useSignUpForm() {
    const signUpForm = useForm<SignUpFormData>({
        resolver: zodResolver(signUpFormSchema),
    });

    const { register, formState, handleSubmit } = signUpForm;
    const { errors, isSubmitting } = formState;

    const registerWithMask = useHookFormMask(register);
    const { signUp, signIn } = useAuth();

    async function handleSignUp(data: SignUpFormData) {
        try {
            await signUp({
                cpf: data.cpf,
                password: data.password,
                name: data.name,
            });

            await signIn({
                cpf: data.cpf,
                password: data.password,
            });
        } catch (error) {
            errorToastHandler({ error });
        }
    }

    return {
        handleSignUp,
        register,
        registerWithMask,
        signUpForm,
        handleSubmit,
        errors,
        isSubmitting,
    };
}
