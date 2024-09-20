import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { reactQueryKeys } from ".";

export function useInvalidateContactsQuery() {
    const client = useQueryClient();
    const [searchParams] = useSearchParams();
    const search = searchParams.get("search") ?? "";

    function invalidateContactsQuery() {
        client.invalidateQueries({
            queryKey: [reactQueryKeys.contacts, search],
        });
    }

    return { invalidateContactsQuery };
}
