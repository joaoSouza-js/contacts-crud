import { errorToastHandler } from "@/_error/errorToastHandler";
import { listContactsHttpRequest } from "@/http/contact/list-contacts";
import { reactQueryKeys } from "@/services/react-query";
import { useQuery } from "@tanstack/react-query";

type useFetchContactsProps = QUERY_BASE_PARAMS_DTO & {
    searchName?: string;
};

export function useFetchContacts(props: useFetchContactsProps) {
    const { limit, page, searchName } = props;
    async function fetchContacts() {
        try {
            const response = await listContactsHttpRequest(props);
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
    });

    const contacts = data?.contacts ?? [];

    return { contacts, isFetching, isFirstLoading };
}
