import { useState } from "react";

export function usePasswordVisibility() {
    const [passwordIsVisible, setPasswordIsVisible] = useState(false);

    function changePasswordVisibility() {
        setPasswordIsVisible(!passwordIsVisible);
    }
    return { passwordIsVisible, changePasswordVisibility };
}
