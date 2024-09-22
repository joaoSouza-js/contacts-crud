import { AppError } from "@/_error/app-error";
import { deleteAuthTokenInLocalStorage } from "@/storage/auth-token";
import axios, { type AxiosError } from "axios";

export const api = axios.create({
    baseURL: "http://localhost:3000/api",
});

api.interceptors.response.use(
    (response) => response,
    async (requestError: AxiosError<any>) => {
        if (requestError.status === 401) {
            deleteAuthTokenInLocalStorage();
            api.defaults.headers.common.Authorization = undefined;
            location.href = "/sign-in";

            return Promise.reject(new AppError("Sessão expirada", 401));
        }
        if (requestError?.response?.data) {
            if (requestError.response.data.message) {
                return Promise.reject(
                    new AppError(
                        requestError.response.data.message,
                        requestError.response.data.statusCode
                    )
                );
            }
        }

        return Promise.reject(requestError);
    }
);
