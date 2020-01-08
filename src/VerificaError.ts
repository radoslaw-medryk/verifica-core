import { Path } from "./Path";
import { Verificable, isVerificable, getVerificableData } from "./verificable";

const isVerificaError = Symbol("isVerificaError");

export type VerificaErrorPayload = {
    type: string;
    [key: string]: unknown;
};

export type VerificaError = VerificaErrorPayload & {
    [isVerificaError]: true;
    path: Path;
};

export function makeError<TBase>(verificable: Verificable<TBase>, payload: VerificaErrorPayload): VerificaError;
export function makeError(path: Path, payload: VerificaErrorPayload): VerificaError;
export function makeError<TBase>(
    pathOrVerificable: Path | Verificable<TBase>,
    payload: VerificaErrorPayload
): VerificaError;
export function makeError<TBase>(
    pathOrVerificable: Path | Verificable<TBase>,
    payload: VerificaErrorPayload
): VerificaError {
    const path = getPath(pathOrVerificable);

    const error = {
        ...payload,
        path,
    };
    Object.defineProperties(error, {
        [isVerificaError]: {
            value: true,
        },
    });

    return error as VerificaError;
}

function getPath<TBase>(pathOrVerificable: Path | Verificable<TBase>) {
    return isVerificable(pathOrVerificable) ? getVerificableData(pathOrVerificable).path : pathOrVerificable;
}
