import { ErrorPage } from "@/components/page-error";
import { RootLayout } from "@/components/root-layout";
import { Home } from "@/pages/home";
import { SignIn } from "@/pages/sign";
import { SignUp } from "@/pages/sign-up";

import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,

        children: [
            {
                index: true,
                element: <Home />,
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
