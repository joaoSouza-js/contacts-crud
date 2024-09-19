import { AuthProvider } from "./context/auth-context";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { ReactQueryProvider } from "./context/react-query-context";

export function App() {
    return (
        <AuthProvider>
            <ReactQueryProvider>
                <RouterProvider router={router} />
            </ReactQueryProvider>
        </AuthProvider>
    );
}
