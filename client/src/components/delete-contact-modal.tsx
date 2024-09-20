import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Close, DialogClose, DialogDescription } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import { useDeleteContact } from "@/hooks/pages/home/use-delete-contact";

type deleteContactModalProps = {
    contactId: string | null;
    clearContactId: () => void;
    modalVisibility: boolean;
    contactName: string | null;
    changeModalVisibility: (state: boolean) => void;
};

export function DeleteContactModal(props: deleteContactModalProps) {
    const {
        contactName,
        modalVisibility,
        clearContactId,
        contactId,
        changeModalVisibility,
    } = props;

    function closeDeleteContactModal() {
        clearContactId();
        changeModalVisibility(false);
    }

    const { deleteContact, isDeletingContact } = useDeleteContact({
        contactId,
        successDeleteCallback: closeDeleteContactModal,
    });

    return (
        <Dialog onOpenChange={changeModalVisibility} open={modalVisibility}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Deletar Contato</DialogTitle>
                </DialogHeader>
                <div className="flex justify-center">
                    <DialogDescription className="text-center md:max-w-[80%]">
                        Tem certeza que deseja deletar o conatato de{" "}
                        {contactName ?? ""} de sua agenda?
                    </DialogDescription>
                </div>

                <DialogFooter className="flex gap-3 mt-2">
                    <Close asChild>
                        <Button
                            type="button"
                            className="border-primary flex-1"
                            variant="outline"
                        >
                            Cancelar
                        </Button>
                    </Close>

                    <Button
                        disabled={isDeletingContact}
                        onClick={deleteContact}
                        type="button"
                        className="flex-1"
                        variant="destructive"
                    >
                        Deletar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
