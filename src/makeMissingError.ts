import { VerificaErrorPayload, VerificaError, makeError } from "./VerificaError";
import { Verificable } from "./verificable";
import { Path } from "./Path";

const missingErrorPayload: VerificaErrorPayload = {
    type: "missing",
};

export function makeMissingError<TBase>(pathOrVerificable: Path | Verificable<TBase>): VerificaError {
    return makeError(pathOrVerificable, missingErrorPayload);
}
