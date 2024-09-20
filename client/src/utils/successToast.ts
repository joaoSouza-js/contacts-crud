import { toast } from "@/hooks/use-toast";
import type { ToastProps } from "@/components/ui/toast";

type successToastHandlerProps = ToastProps;

export function successToastHandler(props: successToastHandlerProps) {
    toast({
        ...props,
    });
}
