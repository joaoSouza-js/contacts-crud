import { Toaster } from "@/components/ui/toaster";

import { SignIn } from "./pages/sign";
import { AuthProvider } from "./context/auth-context";
import { SignUp } from "./pages/sign-up";

export function App() {
    return (
        <AuthProvider>
            <div className="min-h-screen  ">
                <SignUp />
                <Toaster />
            </div>
        </AuthProvider>
    );
}
