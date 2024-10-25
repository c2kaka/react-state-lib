export type Objectish = AnyObject | AnyArray | AnyMap | AnySet
export type ObjectishNoSet = AnyObject | AnyArray | AnyMap

export type AnyObject = {[key: string]: any}
export type AnyArray = Array<any>
export type AnySet = Set<any>
export type AnyMap = Map<any, any>

interface DraftState {
    _base: any,
    _copy: any,
    _modified: boolean,
    _parent: any,
}

type Drafted<Base = any, T extends DraftState = DraftState> = {
    [DRAFT_STATE]: T
} & Base


const DRAFT_STATE = Symbol.for("DRAFT_STATE"); // 定义了一个标识符，方便在代理对象中访问代理的内部状态

function latest(state: DraftState) {
    return state._copy || state._base
}

function markChanged(state: DraftState) {
    state._modified = true;
    if (state._parent) {
        markChanged(state._parent);
    }
}

const proxyHandler = {
    get(state: any, prop: string | symbol): any {
        if (prop === DRAFT_STATE) {
            return state;
        }
        const source = latest(state);
        const value = source[prop];
        if (
          typeof value === "object" &&
          value !== null &&
          value === state._base[prop]
        ) {
            state._copy = { ...state._base };
            return (state._copy[prop] = createProxy(value, state));
        }

        return value;
    },
    set(state: any, prop: string | symbol, value: any) {
        if (!state._modified) {
            state._copy = { ...state._base };
            markChanged(state);
        }
        state._copy[prop] = value;
        return true;
    }
};

function createProxy<T extends Objectish>(base: T, parent?: any) {
    const state: DraftState = {
        _base: base,
        _parent: parent,
        _copy: null,
        _modified: false,
    };

    return new Proxy(state, proxyHandler);
}

function processResult(proxy: Drafted) {
    const state = proxy[DRAFT_STATE];
    if (!state._modified) {
        return state._base;
    }

    Object.entries(state._copy).forEach(([key, childValue]) => {
        if ((childValue as any)[DRAFT_STATE]) {
            state._copy[key] = processResult(childValue);
        }
    })

    return state._copy;
}

export function produce<T extends Objectish>(base: T, recipe: Function) {
    // 生成代理（Draft）
    const proxy = createProxy(base);
    // 修改代理（Draft）
    recipe(proxy);
    // 返回更新后的状态
    return processResult(proxy);
}

const a = { x: 1, y: { z: 2 } };
const b = produce(a, (draft: any) => {
    draft.y.z = 4;
});

console.log(a, b);
