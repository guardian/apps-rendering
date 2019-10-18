// ----- Imports ----- //

import { Monad } from 'types/Monad';


// ----- Class ----- //

class Reader<E, A> implements Monad<A> {

    run: (e: E) => A

    map<B>(f: (_a: A) => B): Reader<E, B> {
        return new Reader((e: E): B => f(this.run(e)));
    }

    andThen<B>(f: (_a: A) => Reader<E, B>): Reader<E, B> {
        return new Reader((e: E): B => f(this.run(e)).run(e));
    }

    with<D>(f: (_d: D) => E): Reader<D, A> {
        return new Reader((d: D): A => this.run(f(d)));
    }

    static asks<E, A>(f: (e: E) => A): Reader<E, A> {
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
