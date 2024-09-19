import { ErrorPage } from "@/components/page-error";
import { RootLayout } from "@/components/root-layout";
import { setAuthTokenInApiHeaders } from "@/http/set-token-in-api-headers";
import { Home } from "@/pages/home";
import { SignIn } from "@/pages/sign";
import { SignUp } from "@/pages/sign-up";
import { getAuthInLocalStorageToken } from "@/storage/auth-token";

import { createBrowserRouter, redirect } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,

        children: [
            {
                index: true,
                element: <Home />,
                loader: () => {
                    const token = getAuthInLocalStorageToken();
                    if (!token) {
                        return redirect("/sign-in");
                    }
                    setAuthTokenInApiHeaders(token);

                    return null;
                },
            },
            {
                path: "sign-in",
                element: <SignIn />,
            },
            {
                path: "sign-up",
                element: <SignUp />,
            },
            {
                path: "home",
                element: <div>Home</div>,
            },
        ],
    },
]);
