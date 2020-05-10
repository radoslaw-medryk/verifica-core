import { Path } from "./Path";

const dataSymbol = Symbol("dataSymbol");
const isVerificableSymbol = Symbol("isVerificableSymbol");

export type VerificableData = {
    isPhantom: boolean;
    rawValue: unknown;
    path: Path;
};

export type Verificable<TBase> = {
    [isVerificableSymbol]: true;
} & {
    [key in keyof TBase]-?: NonNullable<TBase[key]> extends never
        ? Verificable<any>
        : (NonNullable<TBase[key]> extends any[]
              ? Verificable<any>
              : (NonNullable<TBase[key]> extends Function
                    ? Verificable<any>
                    : (NonNullable<TBase[key]> extends object
                          ? Verificable<NonNullable<TBase[key]>>
                          : Verificable<any>)));
} &
    {
        [key in keyof any]: Verificable<any>;
    };

export function asVerificable<TBase>(rawValue: TBase, path: Path = []): Verificable<TBase> {
    return internalVerificable(rawValue, path, false);
}

export function isVerificable(obj: unknown): obj is Verificable<any> {
    return typeof obj === "object" && obj !== null && dataSymbol in obj;
}

export function getVerificableData<TBase>(verificable: Verificable<TBase>): VerificableData {
    return (verificable as any)[dataSymbol];
}

function internalVerificable<TBase>(rawValue: TBase, path: Path, isPhantom: boolean): Verificable<TBase> {
    const data: VerificableData = {
        isPhantom,
        rawValue,
        path,
    };
    const proxyBase = createProxyBase(data);

    const proxy = new Proxy(proxyBase, {
        get(_, key) {
            if (key in proxyBase) {
                return (proxyBase as any)[key];
            }

            const deeperPath = [...path, key];

            if (isPhantom || rawValue === null || rawValue === undefined) {
                return internalVerificable(undefined, deeperPath, true);
            }

            const deeperValue = (rawValue as any)[key];
            return internalVerificable(deeperValue, deeperPath, false);
        },
    });

    return (proxy as unknown) as Verificable<TBase>;
}

function createProxyBase(data: VerificableData) {
    const proxyBase = {};

    Object.defineProperties(proxyBase, {
        [isVerificableSymbol]: {
            value: true,
        },
        [dataSymbol]: {
            value: data,
        },
    });

    return proxyBase;
}
