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

    static do<E, A, B>(gen: Generator<Reader<E, A>, Reader<E, B>, A | undefined>): Reader<E, B> {

        function iterate(value?: A): Reader<E, B> {
            const result = gen.next(value);
    
            if (result.done) {
                return result.value;
            }
    
            return result.value.andThen(iterate);
        }
    
        return iterate();
    
    }

    static of<E, A>(a: A): Reader<E, A> {
        return new Reader((_: E) => a);
    }

    constructor(f: (e: E) => A) {
        this.run = f;
    }
}


// ----- Exports ----- //

export {
    Reader,
};
