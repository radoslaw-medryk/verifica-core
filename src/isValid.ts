import { Verificable } from "./asVerificable";
import { Predicate } from "./Predicate";
import { getErrors } from "./getErrors";

export function isValid<TBase, TOut>(input: Verificable<TBase> | unknown, predicate: Predicate<TOut>): boolean {
    const errors = getErrors(input, predicate);
    return errors.length === 0;
}
