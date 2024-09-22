import { Link, useRouteError } from "react-router-dom";
import PageNotFoundIllustration from "@/assets/images/page-not-found-illustration.png";

export function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div
            id="error-page"
            className="flex flex-col gap-4 px-3 min-h-screen items-center justify-center"
        >
            <h1 className="text-3xl text-center text-zinc-50 font-bold">
                Foi mal Campeão (404) 🥹🥹🥹
            </h1>
            <span className="text-xl text-zinc-50 font-bold">
                Tente Recarregar á página
            </span>
            <img
                src={PageNotFoundIllustration}
                className="h-60 w-80"
                alt="Ilustração de um gato descansando com uma pilha de livros ao se  lado "
            />
            <Link className="underline text-xl text-primary" to={"/sign-in"}>
                volte para tela de login
            </Link>
        </div>
    );
}
