import { Toaster } from "@/components/ui/toaster";

import { SignIn } from "./pages/sign";
import { AuthProvider } from "./context/auth-context";

export function App() {
    return (
        <AuthProvider>
            <div className="w-screen h-screen bg-foreground">
                <SignIn />
                <Toaster />
            </div>
        </AuthProvider>
    );
}
