export function createdFakeCpf(): { formatted: string; digitsOnly: string } {
    // Helper function to calculate verification digits
    const calculateCheckDigit = (
        cpfArray: number[],
        initialFactor: number
    ): number => {
        const total = cpfArray.reduce(
            (sum, num, index) => sum + num * (initialFactor - index),
            0
        );
        const remainder = total % 11;
        return remainder < 2 ? 0 : 11 - remainder;
    };

    // Generate the first 9 digits randomly
    const randomDigits: number[] = Array.from({ length: 9 }, () =>
        Math.floor(Math.random() * 10)
    );

    // Calculate the 10th digit
    const checkDigit1 = calculateCheckDigit(randomDigits, 10);

    // Add the 10th digit to the array
    randomDigits.push(checkDigit1);

    // Calculate the 11th digit
    const checkDigit2 = calculateCheckDigit(randomDigits, 11);

    // Add the 11th digit to the array
    randomDigits.push(checkDigit2);

    // Convert the array of digits to a string
    const digitsOnly = randomDigits.join("");

    // Format the CPF with dots and hyphen: xxx.xxx.xxx-xx
    const formatted = digitsOnly.replace(
        /(\d{3})(\d{3})(\d{3})(\d{2})/,
        "$1.$2.$3-$4"
    );

    return { formatted, digitsOnly };
}
