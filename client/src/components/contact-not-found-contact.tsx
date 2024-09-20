import CanNotFoundContactsIllustration from "@/assets/images/cant-not-find-contact-illustration.png";
import { CreateContactModal } from "./create-contact-modal";
import { Button } from "./ui/button";

export function ContactNotFoundContact() {
    return (
        <div className="mt-10 flex flex-col items-center justify-end">
            <img
                src={CanNotFoundContactsIllustration}
                className="size-80"
                alt="Ilustração de uma mulher utilizando óculos de cabelo liso médio com balões de desenho animado  ao redor dela com sinais de interrogação"
            />
            <p className="text-secondary max-w-96 text-xl font-medium mt-3 text-center">
                Não consegui encontrar ninguém com este nome eu sua lista de
                contos, que tal ?
            </p>
            <CreateContactModal>
                <Button
                    className="text-secondary mt-4 gap-2 text-base font-medium w-full max-w-96"
                    type="button"
                >
                    Adicionar um contato
                </Button>
            </CreateContactModal>
        </div>
    );
}
