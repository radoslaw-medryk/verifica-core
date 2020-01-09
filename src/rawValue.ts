import { Verificable, getVerificableData } from "./asVerificable";
import { makeMissingError } from "./makeMissingError";
import { VerificaException } from "./VerificaException";

export function rawValue<TBase>(verificable: Verificable<TBase>): unknown {
    const { isPhantom, rawValue } = getVerificableData(verificable);

    if (isPhantom) {
        const missingError = makeMissingError(verificable);
        throw new VerificaException([missingError]);
    }

    return rawValue;
}
