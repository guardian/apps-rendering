// ----- Types ----- //

enum Param {
    None,
    Valid,
    Invalid,
}

type QueryParam<A> = {
    kind: Param.None;
} | {
    kind: Param.Invalid;
} | {
    kind: Param.Valid;
    value: A;
}


// ----- Functions ----- //

// Disabled because the point of this function is to convert the `any`
// provided by Express to a stricter type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseNumber(param: any): QueryParam<number> {
    if (param === undefined) {
        return { kind: Param.None };
    }
    const num = Number(param);
    return isNaN(num) ? { kind: Param.Valid, value: num } : { kind: Param.Invalid };
}


// ----- Exports ----- //

export {
    Param,
    parseNumber,
};
