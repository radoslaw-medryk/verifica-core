import { Verificable, getVerificableData } from "./asVerificable";
import { Predicate } from "./Predicate";
import { VerificaException } from "./VerificaException";
import { getErrors } from "./getErrors";
import { VerificaError } from "./VerificaError";

export function ensure<TBase, TOut>(verificable: Verificable<TBase>, predicate: Predicate<TOut>): TOut {
    const errors = getErrors(verificable, predicate);
    ensureNoErrors(errors);

    // Since ensureNoErrors didn't throw, we know the rawValue is of type TOut.
    const { rawValue } = getVerificableData(verificable);
    return rawValue as TOut;
}

export function ensureNoErrors(errors: VerificaError[]) {
    if (errors.length > 0) {
        throw new VerificaException(errors);
    }
}
