import { Verificable, getVerificableData, isVerificable, asVerificable } from "./asVerificable";
import { Predicate, extractErrors } from "./Predicate";
import { VerificaException } from "./VerificaException";
import { VerificaError } from "./VerificaError";
import { makeMissingError } from "./makeMissingError";

export function getErrors<TBase, TOut>(
    input: Verificable<TBase> | unknown,
    predicate: Predicate<TOut>
): VerificaError[] {
    const verificable = isVerificable(input) ? input : asVerificable(input);

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
