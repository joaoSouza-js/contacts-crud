import ContactCard from "@/components/contact-card";
import { CreateContactModal } from "@/components/create-contact-modal";
import { DeleteContactModal } from "@/components/delete-contact-modal";
import { EditContactModal } from "@/components/edit-contact-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFetchContacts } from "@/hooks/pages/home/use-fetch-contacts";
import { UserRoundPlusIcon } from "lucide-react";
import { useState } from "react";

export function Home() {
    const [contactInputSearch, setContactInputSearch] = useState("");
    const { contacts, isFetching, isFirstLoading } = useFetchContacts({
        searchName: contactInputSearch,
    });
    const [contactSelected, setContactSelected] = useState<CONTACT_DTO | null>(
        null
    );
    const [deleteModalVisibility, setDeleteModalVisibility] = useState(false);
    const [editModalVisibility, setEditModalVisibility] = useState(false);

    function changeDeleteModalVisibility(state: boolean) {
        setDeleteModalVisibility(state);
    }
    function openDeleteContactModal(contact: CONTACT_DTO) {
        setContactSelected(contact);
        setDeleteModalVisibility(true);
    }
    function clearContactSelected() {
        setContactSelected(null);
    }

    function changeEditModalVisibility(state: boolean) {
        setEditModalVisibility(state);
    }

    function openEditContactModal(contact: CONTACT_DTO) {
        setContactSelected(contact);
        setEditModalVisibility(true);
    }

    return (
        <div className="px-5 pb-6 mt-8">
            <strong className="text-3xl font-bold text-secondary  ">
                Quick Contact
            </strong>

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
                        onChange={(e) => setContactInputSearch(e.target.value)}
                    />
                    <CreateContactModal>
                        <Button className="flex gap-2" type="button">
                            <UserRoundPlusIcon />
                            Novo Contato
                        </Button>
                    </CreateContactModal>
                </div>
            </section>

            {contacts.length <= 0 && contactInputSearch.length <= 1 && (
                <div className="mt-7 flex flex-col items-center justify-end">
                    <p className="text-secondary">Nenhum contato encontrado.</p>
                    <button className="text-secondary" type="button">
                        {" "}
                        adicionar um contato
                    </button>
                </div>
            )}

            {contacts.length <= 0 && contactInputSearch.length > 1 && (
                <div className="mt-7 flex flex-col items-center justify-end">
                    <p className="text-secondary">
                        Você não tem nunhum contato com este nome
                    </p>
                    <CreateContactModal>
                        <button className="text-secondary" type="button">
                            {" "}
                            adicionar um contato
                        </button>
                    </CreateContactModal>
                </div>
            )}

            {contacts.length > 0 && (
                <main className="gap-6 mt-7 grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 justify-center ">
                    {contacts.map((contact) => (
                        <ContactCard
                            openDeleteContactModal={openDeleteContactModal}
                            openEditContactModal={openEditContactModal}
                            key={contact.id}
                            contact={contact}
                        />
                    ))}
                </main>
            )}
            <DeleteContactModal
                changeModalVisibility={changeDeleteModalVisibility}
                clearContactId={clearContactSelected}
                contactId={contactSelected?.id ?? null}
                contactName={contactSelected?.name ?? null}
                modalVisibility={deleteModalVisibility}
            />

            <EditContactModal
                changeModalVisibility={changeEditModalVisibility}
                clearContactSelected={clearContactSelected}
                contact={contactSelected}
                modalVisibility={editModalVisibility}
            />
        </div>
    );
}
