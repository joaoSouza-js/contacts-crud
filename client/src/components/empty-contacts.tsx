import EmptyContactsIllustration from "@/assets/images/empty-contacts-illustration.png";
import { CreateContactModal } from "./create-contact-modal";
import { Button } from "./ui/button";

export function EmptyContacts() {
    return (
        <div className="mt-10 flex flex-col items-center justify-end">
            <img
                src={EmptyContactsIllustration}
                className="size-80"
                alt="Ilustração com duas mulherers conversando, uma a direita e um  a esquerda"
            />
            <p className="text-secondary max-w-96 text-xl font-medium mt-3 text-center">
                Parece que você ainda não tem nenhum contato, que tal adicionar
                um
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
