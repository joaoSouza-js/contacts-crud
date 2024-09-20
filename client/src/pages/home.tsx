import ContactCard from "@/components/contact-card";
import { ContactNotFoundContact } from "@/components/contact-not-found-contact";
import { ContactSearch } from "@/components/contact-search";
import { CreateContactModal } from "@/components/create-contact-modal";
import { DeleteContactModal } from "@/components/delete-contact-modal";
import { EditContactModal } from "@/components/edit-contact-modal";
import { EmptyContacts } from "@/components/empty-contacts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFetchContacts } from "@/hooks/pages/home/use-fetch-contacts";
import { useInvalidateContactsQuery } from "@/services/react-query/user-invalidate-contacts-query";
import { UserRoundPlusIcon } from "lucide-react";
import { type ChangeEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";

export function Home() {
    const [searchParams] = useSearchParams();
    const contactInputSearch = searchParams.get("search") || "";

    const { invalidateContactsQuery } = useInvalidateContactsQuery();

    const { contacts, isFetching, isFirstLoading } = useFetchContacts({});
    const [contactSelected, setContactSelected] = useState<CONTACT_DTO | null>(
        null
    );
    const [deleteModalVisibility, setDeleteModalVisibility] = useState(false);
    const [editModalVisibility, setEditModalVisibility] = useState(false);

    const isEmptyContactsList =
        contacts.length <= 0 && contactInputSearch.length < 1 && !isFetching;
    const isContactNotFound =
        contacts.length <= 0 && contactInputSearch.length >= 1 && !isFetching;

    function changeDeleteModalVisibility(state: boolean) {
        setDeleteModalVisibility(state);
    }
    function openDeleteContactModal(contact: CONTACT_DTO) {
        setContactSelected(contact);
        setDeleteModalVisibility(true);
    }
    function clearContactSelected() {
        setContactSelected(null);
        invalidateContactsQuery();
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

            <ContactSearch />

            {isEmptyContactsList && <EmptyContacts />}

            {isContactNotFound && <ContactNotFoundContact />}

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
