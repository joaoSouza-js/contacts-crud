import { Outlet } from "react-router-dom";
import { Toaster } from "./ui/toaster";

export function RootLayout() {
    return (
        <div className="min-h-screen max-w-screen-xl mx-auto  ">
            <Outlet />
            <Toaster />
        </div>
    );
}
