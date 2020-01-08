import { VerificaError } from "./VerificaError";
import { Verificable } from "./verificable";

export type PredicateResult = VerificaError | VerificaError[] | void;

export type Predicate<TOut> = (verificable: Verificable<unknown>) => PredicateResult;

export function extractErrors(predicateResult: PredicateResult): VerificaError[] {
    if (predicateResult === undefined) {
        return [];
    }

    if (Array.isArray(predicateResult)) {
        return predicateResult;
    }

    return [predicateResult];
}
