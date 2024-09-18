export class AuthErrorRequest {
    error: string | null = null;

    constructor(error: string | null) {
        this.error = error;
    }

    callError(): string | null {
        return this.error;
    }
}
