import { toast, useToast } from "@/hooks/use-toast";
import type { ToastActionElement, ToastProps } from "@/components/ui/toast";
import { AppError } from "./app-error";

type errorToastHandlerProps = {
    error: Error | AppError;
    defaultMessage?: string;
    toastConfig?: ToastProps;
};

export function errorToastHandler(props: errorToastHandlerProps) {
    const { error, defaultMessage, toastConfig } = props;
    const defaultMessageToShow =
        defaultMessage ?? "Ocorreu um erro no servidor";

    const isAppError = error instanceof AppError;
    const message = isAppError ? error?.message : defaultMessageToShow;

    toast({
        variant: "destructive",
        title: message,
        ...toastConfig,
    });

    console.error(error);
}
