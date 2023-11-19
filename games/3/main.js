const BOARD = new Array(16);
//  0  1  2  3
//  4  5  6  7
//  8  9 10 11
// 12 13 14 15

const DIRECTIONS = {
    Left: -1,
    Right: +1,
    Up: -4,
    Down: +4,
};

const EDGES = {
    Left: [0, 4, 8, 12],
    Right: [3, 7, 11, 15],
    Up: [0, 1, 2, 3],
    Down: [12, 13, 14, 15],
};

const LEFT = -1;
const RIGHT = +1;
const UP = -4;
const DOWN = +4;
let SCORE = 0;
let NEXT = [];

function redraw() {
    const span = document.createElement("span");
    span.id = "score";
    span.append(`${SCORE}`);
    score.replaceWith(span);

    const main = document.createElement("main");
    main.id = "board";
    for(const value of BOARD) {
        const div = document.createElement("div");
        if (value) {
            div.append(`${value}`);
            div.className = `tile tile-${value}`;
        }
        main.append(div);
    }
    board.replaceWith(main);

    const div = document.createElement("div");
    div.id = "next";
    const elem = document.createElement("div");
    const value = NEXT[0];
    elem.className = `tile tile-${value}`;
    div.append(elem);

    next.replaceWith(div);
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

function add(n) {
    const choices = Array.from(BOARD.entries()).filter(x => x[1] === 0).map(x => x[0]);
    if (choices.length === 0)
        return false;
    BOARD[choice(choices)] = n;
    return true;
}

function restart() {
    SCORE = 0;
    BOARD.fill(0);
    for(let I=0;I<4;I++) {
        add(1);
        add(2);
    }
    add(3);
    NEXT = shuffle([1,1,1,1,2,2,2,2,3,3,3,3]);
    redraw();
}

function onkeydown(event) {
    if (event.isComposing || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey)
        return;
    if (!event.key.startsWith("Arrow"))
        return;

    const key = event.key.slice(5);
    const D = DIRECTIONS[key];
    const edge = EDGES[key];
    const moved = new Set();

    for(const I of edge)
        for(let J=I-D; J!=I-4*D; J-=D) {
            const B = BOARD[J];
            if (B === 0)
                continue;
            const K = J+D;
            const C = BOARD[K];

            BOARD[J] = 0;
            if (C === 0) {
                BOARD[K] = B;
                moved.add(I);
            } else if ((C>2) && (B === C)) {
                BOARD[K] = B * 2;
                SCORE += B * 2;
                moved.add(I);
            } else if (B*C === 2) {
                BOARD[K] = 3;
                SCORE += 3;
                moved.add(I);
            } else {
                BOARD[J] = B;
            }
        }

    const M = Array.from(moved.values());
    if (M.length > 0) {
        const X = choice(M) - 3 * D;
        BOARD[X] = NEXT.shift();
        if (NEXT.length === 0)
            NEXT = shuffle([1,1,1,1,2,2,2,2,3,3,3,3]);
    }

    redraw();
}

function onload() {
    restart();
    reset.addEventListener('click', restart);
    window.addEventListener('keydown', onkeydown);
}

window.addEventListener('load', onload);
