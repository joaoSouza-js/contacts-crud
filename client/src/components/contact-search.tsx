import { Input } from "@/components/ui/input";
import { type ChangeEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CreateContactModal } from "@/components/create-contact-modal";
import { UserRoundPlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContactSearch() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [contactInputSearch, setContactInputSearch] = useState<string>(() => {
        const search = searchParams.get("search");
        return search || "";
    });

    function changeSearchInputText(event: ChangeEvent<HTMLInputElement>) {
        const text = event.target.value;
        setContactInputSearch(text);

        setSearchParams((state) => {
            state.set("search", "text");
            return state;
        });

        setSearchParams((state) => {
            if (text === "") {
                state.delete("search");
            } else {
                console.log("oi mundo");
                state.set("search", text);
            }
            return state;
        });
    }

    return (
        <section className="flex flex-col gap-3 mt-8 md:flex-row md:justify-between  items-center">
            <div className="mx-auto md:mx-0">
                <h1 className="text-secondary text-center text-3xl font-bold md:text-left">
                    Contatos
                </h1>
                <span className="text-secondary font-semibold text-lg block mt-1">
                    Veja todos o seus contatos
                </span>
            </div>
            <div className="gap-6 flex  w-full  md:w-auto  flex-col sm:flex-row">
                <Input
                    name="search"
                    className=" sm:w-72 md:w-96"
                    placeholder="Pesquisar..."
                    value={contactInputSearch}
                    onChange={changeSearchInputText}
                />
                <CreateContactModal>
                    <Button className="flex gap-2" type="button">
                        <UserRoundPlusIcon size={20} />
                        Novo Contato
                    </Button>
                </CreateContactModal>
            </div>
        </section>
    );
}
