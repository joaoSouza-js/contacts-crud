import * as React from "react";

import { cn } from "@/lib/utils";

export interface IconInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    LeftIcon?: React.ReactNode;
    RightIcon?: React.ReactNode;
}

const IconInput = React.forwardRef<HTMLInputElement, IconInputProps>(
    ({ className, type, LeftIcon, RightIcon, ...props }, ref) => {
        const hasIcon = LeftIcon || RightIcon;

        return (
            <label
                className={cn(
                    "flex rounded-md px-2 items-center border border-input bg-background h-10 focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
                    className
                )}
            >
                {hasIcon && (
                    <div className="h-full  w-6 flex justify-center items-center">
                        {LeftIcon && LeftIcon}
                    </div>
                )}

                <input
                    type={type}
                    className={cn(
                        "flex flex-1 w-full rounded-md border outline-none border-none border-input bg-background px-2 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground  disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {hasIcon && (
                    <div className="h-full  w-6 flex justify-center items-center">
                        {RightIcon && RightIcon}
                    </div>
                )}
            </label>
        );
    }
);
IconInput.displayName = "Input";

export { IconInput };
