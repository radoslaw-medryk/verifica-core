import { Verificable, getVerificableData } from "./asVerificable";
import { Predicate, extractErrors } from "./Predicate";
import { VerificaException } from "./VerificaException";
import { VerificaError } from "./VerificaError";
import { makeMissingError } from "./makeMissingError";

export function getErrors<TBase, TOut>(verificable: Verificable<TBase>, predicate: Predicate<TOut>): VerificaError[] {
    try {
        const { isPhantom } = getVerificableData(verificable);
        if (isPhantom) {
            const missingError = makeMissingError(verificable);
            return [missingError];
        }

        const result = predicate(verificable);
        const errors = extractErrors(result);
        return errors;
    } catch (e) {
        if (e instanceof VerificaException) {
            return e.errors;
        } else {
            throw e;
        }
    }
}
