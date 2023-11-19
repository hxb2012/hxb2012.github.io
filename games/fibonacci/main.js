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

const FIB = [1,1,2,3,5,8,13,21,34,55,89,144,233,377,610,987];

const LEFT = -1;
const RIGHT = +1;
const UP = -4;
const DOWN = +4;
let SCORE = 0;

function redraw() {
    const span = document.createElement("span");
    span.id = "score";
    span.append(`${SCORE}`);
    score.replaceWith(span);

    const main = document.createElement("main");
    main.id = "board";
    for(const v of BOARD) {
        const value = FIB[v];
        const div = document.createElement("div");
        if (v) {
            div.append(`${value}`);
            div.className = `tile-${value}`;
        }
        main.append(div);
    }
    board.replaceWith(main);
}

function choice(a) {
    return a[Math.floor(Math.random() * a.length)];
}

function add() {
    const choices = Array.from(BOARD.entries()).filter(x => x[1] === 0).map(x => x[0]);
    if (choices.length === 0)
        return false;
    BOARD[choice(choices)] = 1;
    return true;
}

function restart() {
    SCORE = 0;
    BOARD.fill(0);
    add();
    add();
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
    let moved = false;

    for (const I of edge) {
        let E = I;
        for(let J=I-D; J!=I-4*D; J-=D) {
            const B = BOARD[J];
            if (B === 0)
                continue;
            let K = J+D;
            while((K!=E) && (BOARD[K]===0))
                K+=D;

            const C = BOARD[K];

            BOARD[J] = 0;
            if (C === 0) {
                BOARD[K] = B;
                moved = true;
            } else if ((Math.abs(B-C)===1) || (B*C === 1)) {
                const F = Math.max(B,C)+1;
                SCORE += FIB[F];
                BOARD[K] = F;
                E = K-D;
                moved = true;
            }  else {
                BOARD[K-D] = B;
            }
        }
    }
    if (moved)
        add();
    redraw();
}

function onload() {
    restart();
    reset.addEventListener('click', restart);
    window.addEventListener('keydown', onkeydown);
}

window.addEventListener('load', onload);
