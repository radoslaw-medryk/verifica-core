import { Verificable, getVerificableData } from "./asVerificable";

export function isPhantom(verificable: Verificable<unknown>): boolean {
    const { isPhantom } = getVerificableData(verificable);
    return isPhantom;
}
