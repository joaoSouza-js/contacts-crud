import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { useSignInForm } from "@/hooks/pages/use-signin-form";
import { usePasswordVisibility } from "@/hooks/use-password-visibility";

export function SignIn() {
    const {
        registerWithMask,
        handleSignIn,
        errors,
        handleSubmit,
        register,
        isSubmitting,
    } = useSignInForm();

    const { changePasswordVisibility, passwordIsVisible } =
        usePasswordVisibility();

    return (
        <div className="h-screen justify-center items-center flex flex-col">
            <form onSubmit={handleSubmit(handleSignIn)}>
                <Card className="p-6 min-w-96 flex flex-col ">
                    <h1 className="text-xl font-bold ">Quick Contact</h1>
                    <div className="flex flex-col gap-3 mt-6">
                        <label htmlFor="singCpf">
                            <span className="text-xs text-violet-500 font-bold">
                                CPF
                            </span>
                            <Input
                                className="mt-1"
                                id={"signCpf"}
                                placeholder="Digite o seu cpf"
                                {...registerWithMask("cpf", ["999.999.999-99"])}
                            />
                            {errors.cpf && (
                                <span className="text-xs mt-1 text-red-500 font-bold">
                                    {errors.cpf.message}
                                </span>
                            )}
                        </label>

                        <label htmlFor="signPassword">
                            <span className="text-xs text-violet-500 font-bold">
                                SENHA
                            </span>

                            <PasswordInput
                                className="mt-1"
                                type="password"
                                id="signPassword"
                                placeholder="Sua senha"
                                isVisible={passwordIsVisible}
                                changePasswordVisibility={
                                    changePasswordVisibility
                                }
                                {...register("password")}
                            />
                            {errors.password && (
                                <span className="text-xs mt-1 text-red-500 font-bold">
                                    {errors.password.message}
                                </span>
                            )}
                        </label>
                    </div>
                    <div className="mt-5 flex flex-col  ">
                        <Button
                            disabled={isSubmitting}
                            type="submit"
                            className="w-full"
                        >
                            Entrar{" "}
                        </Button>
                        <span className="underline text-center block my-2">
                            ou
                        </span>
                        <Button
                            type="button"
                            variant="link"
                            className="w-full "
                        >
                            se cadastrar
                        </Button>
                    </div>
                </Card>
            </form>
        </div>
    );
}
