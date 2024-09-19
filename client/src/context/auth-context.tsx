import { signInHttpRequest } from "@/http/auth/sign-in";
import { signUpHttpRequest } from "@/http/auth/sign-up";
import { setAuthTokenInLocalStorage } from "@/storage/auth-token";
import { setUserInLocalStorage } from "@/storage/user";
import { createContext, useState, type ReactNode } from "react";

type signInProps = {
    cpf: string;
    password: string;
};

type signUpProps = {
    cpf: string;
    name: string;
    password: string;
};

type authContextProps = {
    user: AUTH_USER_DTO | null;
    signIn: (props: signInProps) => Promise<void>;
    signUp: (props: signUpProps) => Promise<void>;
};
type authContextProviderProps = {
    children: ReactNode;
};

export const AuthContext = createContext<authContextProps>(
    {} as authContextProps
);

export function AuthProvider({ children }: authContextProviderProps) {
    const [user, setUser] = useState<AUTH_USER_DTO | null>(null);

    async function signIn({ cpf, password }: signInProps) {
        const signInResponse = await signInHttpRequest({
            cpf: cpf,
            password: password,
        });

        setAuthTokenInLocalStorage(signInResponse.token);
        setUserInLocalStorage(signInResponse.user);

        setUser({
            name: "Example User",
            id: cpf, // Using CPF as the user ID for this example
            photo: "example-photo-url",
        });
    }

    async function signUp({ cpf, name, password }: signUpProps) {
        await signUpHttpRequest({ cpf, name, password });
    }

    const value: authContextProps = {
        user,
        signIn,
        signUp,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}
