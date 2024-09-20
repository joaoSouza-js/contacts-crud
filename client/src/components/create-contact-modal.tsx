import { useState } from "react";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { useCreateContactForm } from "@/hooks/pages/home/user-create-contact-form";
import { useInvalidateContactsQuery } from "@/services/react-query/user-invalidate-contacts-query";

type createContactModalProps = {
    children: React.ReactNode;
};
export function CreateContactModal(props: createContactModalProps) {
    const { children } = props;
    const [dialogVisibility, setDialogVisibility] = useState(false);
    const { invalidateContactsQuery } = useInvalidateContactsQuery();

    function closeCreateContactModal() {
        setDialogVisibility(false);
        invalidateContactsQuery();
    }

    const {
        errors,
        handleCreateContact,
        handleSubmit,
        register,
        isSubmitting,
        registerWithMask,
    } = useCreateContactForm({
        handleCloseForm: closeCreateContactModal,
    });

    return (
        <Dialog open={dialogVisibility} onOpenChange={setDialogVisibility}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Criar Contato</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(handleCreateContact)}>
                    <div className="flex flex-col gap-3 mt-6">
                        <label htmlFor="create-contact-form-name">
                            <span className="text-sm text-violet-500 font-bold">
                                Nome
                            </span>
                            <Input
                                className="mt-2"
                                id={"create-contact-form-name"}
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

                        <label htmlFor="create-contact-form-email">
                            <span className="text-sm text-violet-500 font-bold">
                                Email
                            </span>
                            <Input
                                className="mt-2"
                                id={"create-contact-form-name"}
                                type="email"
                                {...register("email")}
                                placeholder="Seu@gmail.com"
                            />
                            {errors.email && (
                                <span className="text-xs mt-1 text-red-500 font-bold">
                                    {errors.email.message}
                                </span>
                            )}
                        </label>

                        <label htmlFor="create-contact-form-email">
                            <span className="text-sm text-violet-500 font-bold">
                                Telefone
                            </span>
                            <Input
                                className="mt-2"
                                id={"create-contact-form-name"}
                                {...registerWithMask("phone", [
                                    "(99) 99999-9999",
                                    "+55 (99) 99999-9999",
                                ])}
                                placeholder="Ex: (99) 99999-9999"
                            />
                            {errors.phone && (
                                <span className="text-xs mt-1 text-red-500 font-bold">
                                    {errors.phone.message}
                                </span>
                            )}
                        </label>

                        <label htmlFor="create-contact-form-cpf">
                            <span className="text-sm text-violet-500 font-bold">
                                CPF
                            </span>
                            <Input
                                className="mt-2"
                                id={"create-contact-form-cpf"}
                                placeholder="Digite o seu cpf"
                                {...registerWithMask("cpf", ["999.999.999-99"])}
                            />
                            {errors.cpf && (
                                <span className="text-xs mt-1 text-red-500 font-bold">
                                    {errors.cpf.message}
                                </span>
                            )}
                        </label>
                    </div>
                    <Button
                        disabled={isSubmitting}
                        type="submit"
                        className="w-full mt-4"
                    >
                        Casdastrar
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
