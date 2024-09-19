import { api } from "@/lib/axios";

type listContactsProps = QUERY_BASE_PARAMS_DTO & {
    searchName?: string;
};

type listContactsResponse = {
    contacts: CONTACT_DTO[];
};

export async function listContactsHttpRequest(
    props: listContactsProps
): Promise<listContactsResponse> {
    const { searchName = "", page = 1, limit = 20 } = props;

    const response = await api.get<listContactsResponse>("/contact", {
        params: {
            searchName,
            page,
            limit,
        },
    });

    return response.data;
}
