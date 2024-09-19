import { baseLocalStorageKey } from ".";

const storageUserKey = `${baseLocalStorageKey}:user`;

export function getUserInLocalStorage(): AUTH_USER_DTO | null {
    const userString = localStorage.getItem(storageUserKey);
    const user = JSON.parse(userString) as AUTH_USER_DTO;

    if (!user?.id) {
        return null;
    }

    return user;
}

export function setUserInLocalStorage(user: AUTH_USER_DTO) {
    localStorage.setItem(storageUserKey, JSON.stringify(user));
}
