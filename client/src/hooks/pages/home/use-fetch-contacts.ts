import { errorToastHandler } from "@/_error/errorToastHandler";
import { listContactsHttpRequest } from "@/http/contact/list-contacts";
import { reactQueryKeys } from "@/services/react-query";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

type useFetchContactsProps = QUERY_BASE_PARAMS_DTO & {};

export function useFetchContacts(props: useFetchContactsProps) {
    const { limit, page } = props;

    const [searchParams] = useSearchParams();

    const searchName = useMemo(() => {
        return searchParams.get("search") || "";
    }, [searchParams]);

    async function fetchContacts() {
        try {
            const response = await listContactsHttpRequest({
                searchName: searchName,
            });
            return response;
        } catch (error) {
            errorToastHandler({ error });
        }
    }

    const {
        data,
        isFetching,
        isLoading: isFirstLoading,
    } = useQuery({
        queryKey: [reactQueryKeys.contacts, searchName],
        queryFn: fetchContacts,
        staleTime: 20,
    });

    const contacts = data?.contacts ?? [];

    return { contacts: contacts, isFetching, isFirstLoading };
}
