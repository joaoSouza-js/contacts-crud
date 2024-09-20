import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { useSignUpForm } from "@/hooks/pages/sign-up/use-sign-up-form";
import { usePasswordVisibility } from "@/hooks/use-password-visibility";

export function SignUp() {
    const {
        registerWithMask,
        handleSignUp,
        errors,
        handleSubmit,
        register,
        isSubmitting,
    } = useSignUpForm();

    const { changePasswordVisibility, passwordIsVisible } =
        usePasswordVisibility();

    return (
        <div className="h-screen min-h-screen flex">
            <form
                onSubmit={handleSubmit(handleSignUp)}
                className="p-4 flex-1  justify-center items-center flex flex-col"
            >
                <Card className="p-6 w-full max-w-sm flex flex-col">
                    <h1 className="text-xl font-bold ">Quick Contact</h1>
                    <div className="flex flex-col gap-3 mt-6">
                        <label htmlFor="sing-up-name">
                            <span className="text-xs text-violet-500 font-bold">
                                Nome
                            </span>
                            <Input
                                className="mt-1"
                                id={"sing-up-name"}
                                type="text"
                                {...register("name")}
                                placeholder="Digite o seu nome"
                            />
                            {errors.name && (
                                <span className="text-xs mt-1 text-red-500 font-bold">
                                    {errors.name.message}
                                </span>
                            )}
                        </label>
                        <label htmlFor="sing-up-cpf">
                            <span className="text-xs text-violet-500 font-bold">
                                CPF
                            </span>
                            <Input
                                className="mt-1"
                                id={"sing-up-cpf"}
                                placeholder="Digite o seu cpf"
                                {...registerWithMask("cpf", ["999.999.999-99"])}
                            />
                            {errors.cpf && (
                                <span className="text-xs mt-1 text-red-500 font-bold">
                                    {errors.cpf.message}
                                </span>
                            )}
                        </label>

                        <label htmlFor="sign-up-password">
                            <span className="text-xs text-violet-500 font-bold">
                                SENHA
                            </span>

                            <PasswordInput
                                className="mt-1"
                                type="password"
                                id="sign-up-password"
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

                        <label htmlFor="sign-up-confirm-password">
                            <span className="text-xs text-violet-500 font-bold">
                                CONFIRMAR SENHA
                            </span>

                            <PasswordInput
                                className="mt-1"
                                type="password"
                                id="sign-up-confirm-password"
                                placeholder="Confirme sua senha"
                                isVisible={passwordIsVisible}
                                changePasswordVisibility={
                                    changePasswordVisibility
                                }
                                {...register("confirmPassword")}
                            />
                            {errors.confirmPassword && (
                                <span className="text-xs mt-1 text-red-500 font-bold">
                                    {errors.confirmPassword.message}
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
                            Casdastrar-se
                        </Button>
                    </div>
                </Card>
            </form>
        </div>
    );
}
