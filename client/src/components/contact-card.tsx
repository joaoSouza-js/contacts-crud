import { Card } from "./ui/card";
import { MailIcon, PhoneIcon, UserIcon } from "lucide-react";
import { formatCPF } from "@/utils/format-cpf";
import ContactCardHeader from "./ui/contact-card-header";
type contactCardProps = {
    contact: CONTACT_DTO;
    openDeleteContactModal: (contact: CONTACT_DTO) => void;
};

export default function ContactCard(props: contactCardProps) {
    const { contact, openDeleteContactModal } = props;
    const cpfFormatted = formatCPF(contact.cpf);

    function deleteContact() {
        openDeleteContactModal(contact);
    }

    function editContact() {}

    return (
        <Card className="rounded-xl px-5 py-5 shadow-md">
            <ContactCardHeader
                name={contact.name}
                onDeleteContact={deleteContact}
                onEditContact={editContact}
                photoUrl={contact.photoUrl}
            />

            <div className="flex items-center mt-4 flex-col">
                <strong className="text-lg font-bold">{contact.name}</strong>
            </div>

            <div className="flex-col flex gap-3 mt-4">
                <div className="flex gap-3 items-center">
                    <div className="size-9  bg-zinc-200 rounded-lg items-center justify-center flex">
                        <MailIcon size={20} className="text-primary" />
                    </div>

                    <a
                        className="text-sm font-semibold"
                        href={`mailto:${contact.email}`}
                    >
                        {contact.email}
                    </a>
                </div>

                <div className="flex gap-3 items-center">
                    <div className="size-9  bg-zinc-200 rounded-lg items-center justify-center flex">
                        <PhoneIcon size={20} className="text-primary" />
                    </div>

                    <a
                        className="text-sm font-semibold"
                        href={`tel:${contact.phone}`}
                    >
                        {contact.phone}
                    </a>
                </div>

                <div className="flex gap-3 items-center ">
                    <div className="size-9  bg-zinc-200 rounded-lg items-center justify-center flex">
                        <UserIcon size={20} className="text-primary" />
                    </div>

                    <span className="text-sm font-semibold">
                        {cpfFormatted}
                    </span>
                </div>
            </div>
        </Card>
    );
}
