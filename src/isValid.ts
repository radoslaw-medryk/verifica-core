import { Verificable } from "./verificable";
import { Predicate } from "./Predicate";
import { getErrors } from "./getErrors";

export function isValid<TBase, TOut>(verificable: Verificable<TBase>, predicate: Predicate<TOut>): boolean {
    const errors = getErrors(verificable, predicate);
    return errors.length === 0;
}
