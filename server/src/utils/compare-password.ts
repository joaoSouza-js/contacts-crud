import bcrypt from "bcrypt";

type comparePasswordProps = {
    password: string;
    hashedPassword: string;
};

export async function comparePassword(
    props: comparePasswordProps
): Promise<boolean> {
    const { hashedPassword, password } = props;
    const isSamePassword = await bcrypt.compare(password, hashedPassword);
    return isSamePassword;
}
