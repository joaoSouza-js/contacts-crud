import * as React from "react";

import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export interface PasswordInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    isVisible?: boolean;
    changePasswordVisibility?: () => void;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
    (props, ref) => {
        const {
            className,
            type,
            isVisible = false,
            changePasswordVisibility,
            ...rest
        } = props;

        function handleChangePasswordVisibility() {
            changePasswordVisibility();
        }
        return (
            <div
                className={cn(
                    "flex rounded-md pr-2 border border-input bg-background h-10 focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
                    className
                )}
            >
                <input
                    type={isVisible ? "text" : "password"}
                    className={cn(
                        "flex flex-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground  disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none"
                    )}
                    ref={ref}
                    {...rest}
                />
                <button
                    onClick={handleChangePasswordVisibility}
                    type="button"
                    className="text-primary"
                >
                    {isVisible ? (
                        <EyeIcon size={20} />
                    ) : (
                        <EyeOffIcon size={20} />
                    )}
                </button>
            </div>
        );
    }
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
