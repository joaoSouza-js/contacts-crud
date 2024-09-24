import { ContactList } from "@/components/contact-list";
import { ContactSearch } from "@/components/contact-search";

export function Home() {


    return (
        <div className="px-5 pb-6 pt-8 flex flex-col min-h-screen ">
            <strong className="text-3xl font-bold text-secondary  ">
                Quick Contact
            </strong>

            <ContactSearch />

            <ContactList />
        </div>
    );
}
