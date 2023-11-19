function E(I, J, K) {
    return I*100+J*10+K;
}

function D(A,B) {
    return (A-A%B)/B;
}

function choice(a) {
    return a[Math.floor(Math.random() * a.length)];
}

function shuffle(it) {
    const a = Array.from(it);
    for(let i=a.length-1; i>0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function* sudoku(P) {
    const S = new Set();
    const INDEX3 = [undefined,0,0,0,1,1,1,2,2,2];
    const Rows = {};
    const Columns = {};

    for (let I=1; I<=4; I++)
        for (let J=1; J<=9; J++)
            for (let K=1; K<=9; K++)
                Columns[E(I,J,K)] = new Set();

    // \u{7eb5}\u{5750}\u{6807} Y \u{4ece}\u{5de6}\u{5230}\u{53f3}\u{ff0c}\u{6709} 1 2 3 4 5 6 7 8 9
    for (let Y=1; Y<=9; Y++)
        // \u{6a2a}\u{5750}\u{6807} X \u{4ece}\u{5de6}\u{5230}\u{53f3}\u{ff0c}\u{6709} 1 2 3 4 5 6 7 8 9
        for (let X=1; X<=9; X++)
            // \u{6bcf}\u{4e00}\u{683c}\u{53ef}\u{4ee5}\u{586b}\u{7684}\u{6570}\u{5b57} N \u{ff0c}\u{6709} 1 2 3 4 5 6 7 8 9
            for (let N=1; N<=9; N++) {
                // Row=321 \u{8868}\u{793a} Y=3 X=2 \u{586b}\u{7684}\u{6570}\u{5b57}\u{4e3a} 1
                const R = E(Y, X, N);
                // Column \u{5206}\u{56db}\u{79cd}
                const Cs = [
                    // 132 \u{8868}\u{793a} Y=3 X=2 \u{4f4d}\u{7f6e}\u{4e0a}\u{6709}\u{6570}\u{5b57}\u{4e86}
                    E(1, Y, X),
                    // 231 \u{8868}\u{793a} Y=3 \u{4e0a}\u{6709} N=1 \u{4e86}
                    E(2, Y, N),
                    // 321 \u{8868}\u{793a} X=2 \u{4e0a}\u{6709} N=1 \u{4e86}
                    E(3, X, N),
                    // 451 \u{8868}\u{793a}\u{4e2d}\u{95f4} 3x3 \u{7684}\u{65b9}\u{683c}\u{91cc}\u{6709}N=1
                    E(4, (1+D(X-1,3)+D(Y-1,3)*3), N),
                    // 3x3\u{65b9}\u{683c}\u{7684}\u{4f4d}\u{7f6e}\u{7f16}\u{7801}
                    // 1 2 3
                    // 4 5 6
                    // 7 8 9
                ];
                // Rows[Row] \u{5b58}\u{8fd9}\u{4e2a} Row \u{80fd}\u{8986}\u{76d6}\u{54ea}\u{4e9b}Column
                Rows[R] = Cs;
                // Columns[Column] \u{5b58}\u{6709}\u{54ea}\u{4e9b} Row \u{80fd}\u{8986}\u{76d6}\u{8fd9}\u{4e2a}Column
                for (const C of Cs)
                    Columns[C].add(R);
            }

    function select(R, Undo) {
        S.add(R);
        for (const C of Rows[R]) {
            for (const R1 of Columns[C])
                for (const C1 of Rows[R1])
                    if (C1 !== C)
                        Columns[C1].delete(R1);
            const Column = Columns[C];
            delete Columns[C];
            Undo.push(Column);
        }
    }

    function deselect(R, Undo) {
        for (const C of Rows[R].toReversed()) {
            const Column = Undo.pop();
            Columns[C] = Column;
            for (const R1 of Column)
                for (const C1 of Rows[R1])
                    if (C1 !== C)
                        Columns[C1].add(R1);
        }
        S.delete(R);
    }

    function find_by_min_size(it) {
        let result = {size: Infinity};
        for (const e of it)
            if (e.size < result.size)
                result = e;
        return result;
    }

    function find_by_min_size_random(it) {
        let size = Infinity;
        let result = [];
        for (const e of it) {
            if (e.size < size) {
                result = [e];
                size = e.size;
            } else if (e.size === size) {
                result.push(e);
            }
        }
        return choice(result);
    }

    function* solve() {
        const min = P?find_by_min_size(Object.values(Columns)):find_by_min_size_random(Object.values(Columns));
        if (min instanceof Set)
            for (const R of (P?Array.from(min):shuffle(min))) {
                const Undo = [];
                select(R, Undo);
                for (const _ of solve())
                    yield;
                deselect(R, Undo);
            }
        else
            yield;
    }

    for (const R of (P || []))
        select(R, []);

    for (const _ of solve()) {
        yield S;
    }
}

function solutions(P) {
    const it = sudoku(P);
    try {
        if (!it.next().value)
            return 0;
    } catch(e) {
        return 0;
    }

    try {
        if (!it.next().value)
            return 1;
    } catch(e) {
        return 1;
    }

    return 2;
}

function shrink(A) {
    const S = shuffle(A);
    const P = [];

    while(S.length > 0) {
        const R = S.shift();
        if (solutions(P.concat(S)) > 1)
            P.push(R);
    }

    return P;
}

function onmessage(e) {
    const [numbers, limit, step] = e.data;
    const start = performance.now();
    const it = sudoku();
    const S = Array.from(it.next().value.values());
    let P = shrink(S);
    let last = start;

    while(true) {
        const now = performance.now();
        const Q = shrink(S);
        if (Q.length < P.length) {
            P = Q;
            last = performance.now();
        }

        if ((now - start) > limit)
            break;
        if (P.length > numbers)
            continue;
        if ((now - last) > step)
            break;
    }

    const A = new Array(81);
    A.fill(null);
    for (const V of P)
        A[D(V,100)*9+D(V,10)%10-10] = V%10;

    const B = new Array(81);
    B.fill(null);
    for (const V of S)
        B[D(V,100)*9+D(V,10)%10-10] = V%10;

    postMessage([performance.now() - start, last-start, A, B]);
}

addEventListener('message', onmessage);
