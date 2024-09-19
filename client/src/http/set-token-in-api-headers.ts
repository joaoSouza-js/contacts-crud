import { api } from "@/lib/axios";

export function setAuthTokenInApiHeaders(token: string) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
}
