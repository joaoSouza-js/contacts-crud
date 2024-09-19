import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Card } from "./ui/card";
import {
    EllipsisVerticalIcon,
    MailIcon,
    MailMinusIcon,
    PhoneIcon,
    UserIcon,
} from "lucide-react";
import { formatCPF } from "@/utils/format-cpf";
import { generateRandomColor } from "@/utils/generate-random-color";

type contactCardProps = {
    contact: CONTACT_DTO;
};

export default function ContactCard(props: contactCardProps) {
    const { contact } = props;
    const cpfFormatted = formatCPF(contact.cpf);
    const fallbackCardColor = generateRandomColor();
    const userFirstTwoLetters = contact.name.slice(0, 2).toUpperCase();
    return (
        <Card className="rounded-xl px-5 py-5 shadow-md">
            <div className="w-full flex justify-between  items-start">
                <div className="w-5" />
                <Avatar className="size-28">
                    <AvatarImage
                        className="rounded-md"
                        src={contact.photoUrl}
                    />
                    <AvatarFallback>
                        <div
                            style={{ backgroundColor: fallbackCardColor }}
                            className="rounded-md size-28  flex justify-center items-center"
                        >
                            <span className="font-bold text-secondary ">
                                {userFirstTwoLetters}
                            </span>
                        </div>
                    </AvatarFallback>
                </Avatar>
                <button type="button" className="w-5">
                    <EllipsisVerticalIcon size={20} className="text-zinc-400" />
                </button>
            </div>
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
