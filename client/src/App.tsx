import { Toaster } from "@/components/ui/toaster";

import { SignIn } from "./pages/sign";
import { AuthProvider } from "./context/auth-context";
import { SignUp } from "./pages/sign-up";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

export function App() {
    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    );
}
