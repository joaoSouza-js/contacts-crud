// Função para limpar o CPF (remover caracteres não numéricos)
function cleanCPF(cpf: string): string {
    return cpf.replace(/\D/g, "");
}

// Função para verificar se o CPF tem 11 dígitos
function isValidLength(cpf: string): boolean {
    return cpf.length === 11;
}

// Função para verificar se todos os dígitos são iguais
function hasAllDigitsSame(cpf: string): boolean {
    return /^(\d)\1+$/.test(cpf);
}

// Função para calcular o dígito verificador
function calculateCheckDigit(cpfPart: string, factor: number): number {
    const sum = cpfPart
        .split("")
        .map((digit, index) => Number.parseInt(digit) * (factor - index))
        .reduce((acc, value) => acc + value, 0);

    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
}

// Função principal que valida o CPF e também retorna o CPF limpo
export function validateCPF(cpf: string): {
    isValidCpf: boolean;
    cleanedCPF: string;
} {
    const cleanedCPF = cleanCPF(cpf);

    if (!isValidLength(cleanedCPF) || hasAllDigitsSame(cleanedCPF)) {
        return { isValidCpf: false, cleanedCPF };
    }

    const firstCheckDigit = calculateCheckDigit(cleanedCPF.slice(0, 9), 10);
    const secondCheckDigit = calculateCheckDigit(cleanedCPF.slice(0, 10), 11);

    const isValidCpf =
        firstCheckDigit === Number.parseInt(cleanedCPF[9]) &&
        secondCheckDigit === Number.parseInt(cleanedCPF[10]);

    return { isValidCpf, cleanedCPF };
}
