import { baseLocalStorageKey } from ".";

const authTokenKey = `${baseLocalStorageKey}:authToken`;

export function getAuthInLocalStorageToken() {
    const token = localStorage.getItem(authTokenKey);
    return token;
}

export function setAuthTokenInLocalStorage(token: string) {
    localStorage.setItem(authTokenKey, token);
}

export function deleteAuthTokenInLocalStorage() {
    localStorage.removeItem(authTokenKey);
}
