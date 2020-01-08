import { VerificaError } from "./VerificaError";

export class VerificaException extends Error {
    public errors: VerificaError[];

    constructor(errors: VerificaError[]) {
        const errorsStr = JSON.stringify(errors);
        super(`VerificaException - errors occured: ${errorsStr}.`);
        this.errors = errors;
    }
}
