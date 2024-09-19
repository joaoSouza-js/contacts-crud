export function formatCPF(cpf: string) {
    cpf.replace(/\D/g, "");

    if (cpf.length === 11) {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }

    return cpf;
}
