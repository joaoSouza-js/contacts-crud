import { Link, useRouteError } from "react-router-dom";

export function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div
            id="error-page"
            className="flex flex-col gap-4 min-h-screen items-center justify-center"
        >
            <h1 className="text-3xl text-zinc-50 font-bold">
                Foi mal Campeão (404) 🥹🥹🥹
            </h1>
            <span className="text-xl text-zinc-50 font-bold">
                Tente Recarregar á pagina
            </span>
            <Link className="text-lg underline text-primary" to={"/sign-in"}>
                volte para de login
            </Link>
        </div>
    );
}
