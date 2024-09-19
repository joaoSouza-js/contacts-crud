import { Outlet } from "react-router-dom";
import { Toaster } from "./ui/toaster";

export function RootLayout() {
    return (
        <div className="min-h-screen  ">
            <Outlet />
            <Toaster />
        </div>
    );
}
