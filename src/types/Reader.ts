// ----- Imports ----- //

import { Monad } from 'types/Monad';


// ----- Class ----- //

class Reader<E, A> implements Monad<A> {

    run: (e: E) => A

    map<B>(f: (_a: A) => B) {
        return new Reader((e: E) => f(this.run(e)));
    }

    andThen<B>(f: (_a: A) => Reader<E, B>) {
        return new Reader((e: E) => f(this.run(e)).run(e));
    }

    ask() {
        return new Reader((x) => x);
    }

    with<D>(f: (_d: D) => E) {
        return new Reader((d: D) => this.run(f(d)));
    }

    static asks<E, A>(f: (e: E) => A) {
        return new Reader(f);
    };

    constructor(f: (e: E) => A) {
        this.run = f;
    }
}


// ----- Exports ----- //

export {
    Reader,
};
