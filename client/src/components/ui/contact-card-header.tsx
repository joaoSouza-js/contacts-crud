import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { generateRandomColor } from "@/utils/generate-random-color";
import { Edit2Icon, EllipsisVerticalIcon, TrashIcon } from "lucide-react";

type contactCardHeaderProps = {
    photoUrl: string;
    onDeleteContact: () => void;
    onEditContact: () => void;
    name: string;
};

export default function ContactCardHeader(props: contactCardHeaderProps) {
    const { onEditContact, onDeleteContact, photoUrl, name } = props;
    const fallbackCardColor = generateRandomColor();
    const userFirstTwoLetters = name.slice(0, 2).toUpperCase();

    return (
        <div className="w-full flex justify-between  items-start">
            <div className="w-5" />
            <Avatar className="size-28">
                <AvatarImage className="rounded-md" src={photoUrl} />
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

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button type="button" className="w-5">
                        <EllipsisVerticalIcon
                            size={20}
                            className="text-zinc-500"
                        />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>
                        {name.slice(0, 18).concat("...")}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={onDeleteContact}
                        className="gap-2 items-center"
                    >
                        <TrashIcon size={20} className="text-red-500" />
                        <span>Excluir Contato</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={onEditContact}
                        className="gap-2 items-center"
                    >
                        <Edit2Icon size={20} className="text-violet-500" />
                        <span>Editar Contato</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
