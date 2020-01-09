import { Verificable } from "./asVerificable";
import { Predicate } from "./Predicate";
import { VerificaError } from "./VerificaError";
import { ensureNoErrors } from "./ensure";
import { getErrors } from "./getErrors";

type ChunkPiece = {
    verificable: Verificable<unknown>;
    predicate: Predicate<unknown>;
};

export class VerificaChunk {
    private pieces: ChunkPiece[] = [];

    public add<TBase, TOut>(verificable: Verificable<TBase>, predicate: Predicate<TOut>) {
        const piece = { verificable, predicate };
        this.pieces = [...this.pieces, piece];
    }

    public ensureAll() {
        const errors = this.getAllErrors();
        ensureNoErrors(errors);
    }

    public getAllErrors(): VerificaError[] {
        const pieceErrors = this.pieces.map(piece => getErrors(piece.verificable, piece.predicate));
        const allErrors = pieceErrors.reduce((agg, curr) => {
            return [...agg, ...curr];
        }, []);
        return allErrors;
    }

    public isAllValid(): boolean {
        const errors = this.getAllErrors();
        return errors.length === 0;
    }
}
