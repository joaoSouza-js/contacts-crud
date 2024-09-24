import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { useEditContactForm } from "@/hooks/pages/home/use-edit-contact-form";
import { XIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { generateRandomColor } from "@/utils/generate-random-color";

type editContactModalProps = {
    modalVisibility: boolean;
    contact: CONTACT_DTO | null;
    changeModalVisibility: (state: boolean) => void;
    clearContactSelected: () => void;
};
export function EditContactModal(props: editContactModalProps) {
    const {
        changeModalVisibility,
        modalVisibility,
        contact,
        clearContactSelected,
    } = props;

    function closeEditContactModal() {
        changeModalVisibility(false);
        clearContactSelected();
    }

    const {
        errors,
        handleSubmit,
        register,
        deleteContactImage,
        isSubmitting,
        contactAvatarImageInformation,
        handleEditContact,
        contactInitialPhotoUrl,
        registerWithMask,
    } = useEditContactForm({
        contact: contact ?? null,
        successEditCallback: closeEditContactModal,
        modalVisibility: modalVisibility,
    });

    return (
        <Dialog open={modalVisibility} onOpenChange={changeModalVisibility}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar Contato</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(handleEditContact)}>
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

                        <div>
                            <label htmlFor="create-contact-form-avatar">
                                <span className="text-sm block text-violet-500 font-bold">
                                    Foto
                                </span>
                            </label>
                            <div className=" h-10 border-input border-2 mt-2 gap-2 flex items-center pl-3 rounded-md ">
                                <label
                                    htmlFor="create-contact-form-avatar"
                                    className="flex flex-1 items-center gap-3"
                                >
                                    {contactAvatarImageInformation?.name && (
                                        <img
                                            className="w-8 h-8  rounded-md"
                                            src={
                                                contactAvatarImageInformation.photoUrl
                                            }
                                            alt={
                                                contactAvatarImageInformation.name
                                            }
                                        />
                                    )}

                                    {contactInitialPhotoUrl !== null &&
                                        !contactAvatarImageInformation && (
                                            <Avatar className="w-8 h-8  rounded-md">
                                                <AvatarImage
                                                    src={contactInitialPhotoUrl}
                                                    alt={"imagem selecionada"}
                                                />
                                                <AvatarFallback
                                                    style={{
                                                        background:
                                                            generateRandomColor(),
                                                    }}
                                                >
                                                    <span className="text-secondary font-bold uppercase">
                                                        {contact.name.slice(
                                                            0,
                                                            2
                                                        )}
                                                    </span>
                                                </AvatarFallback>
                                            </Avatar>
                                        )}

                                    <span className="flex flex-1 text-xs">
                                        {contactAvatarImageInformation?.name ??
                                            "Selecione uma iamgem"}
                                    </span>
                                    <input
                                        className="hidden"
                                        id="create-contact-form-avatar"
                                        type="file"
                                        accept="image/png, image/jpeg"
                                        {...register("contactImageAvatar")}
                                        placeholder="Digite o seu nome"
                                    />
                                </label>
                                {(contactAvatarImageInformation ||
                                    contactInitialPhotoUrl) && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={deleteContactImage}
                                        className=" text-red-400 h-full border-0"
                                    >
                                        <XIcon size={20} />
                                    </Button>
                                )}
                            </div>

                            {errors.contactImageAvatar && (
                                <label htmlFor="create-contact-form-avatar">
                                    <span className="text-xs mt-1 text-red-500 font-bold">
                                        {errors.contactImageAvatar.message}
                                    </span>
                                </label>
                            )}
                        </div>

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
                        Salvar alterações
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
