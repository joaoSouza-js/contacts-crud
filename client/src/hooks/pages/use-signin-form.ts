import { useForm } from "react-hook-form";
import { useHookFormMask } from "use-mask-input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../use-auth";
import { errorToastHandler } from "@/_error/errorToastHandler";
import { redirect, useNavigate } from "react-router-dom";

const signInFormSchema = z.object({
    cpf: z
        .string({ required_error: "CPF obrigatório" })
        .min(11, "CPF Imcompleto"),
    password: z.string({ required_error: "Senha obrigatória" }),
});

type SignInFormData = z.infer<typeof signInFormSchema>;

export function useSignInForm() {
    const signInForm = useForm<SignInFormData>({
        resolver: zodResolver(signInFormSchema),
    });

    const { register, formState, handleSubmit } = signInForm;
    const { errors, isSubmitting } = formState;

    const registerWithMask = useHookFormMask(register);
    const { signIn } = useAuth();

    const navigate = useNavigate();

    async function handleSignIn(data: SignInFormData) {
        try {
            await signIn({
                cpf: data.cpf,
                password: data.password,
            });
            navigate("/");
        } catch (error) {
            errorToastHandler({ error });
        }
    }

    return {
        handleSignIn,
        register,
        registerWithMask,
        signInForm,
        handleSubmit,
        errors,
        isSubmitting,
    };
}
