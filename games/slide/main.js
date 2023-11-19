const BOARD = [[0,1,2],[3,4,5],[6,7,8]];
const DIRECTIONS = {
    Left: [0, +1],
    Right: [0, -1],
    Up: [+1, 0],
    Down: [-1, 0],
};

let EMPTY = undefined;
let MOVES = 0;
let finished = false;

function shuffle(it) {
    const a = Array.from(it);
    for(let i=a.length-1; i>0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function redraw() {
    const span = document.createElement("span");
    span.id = "moves";
    span.append(`${MOVES}`);
    moves.replaceWith(span);
    const main = document.createElement("main");
    main.id = "board";
    for(const value of BOARD.flat()) {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
        use.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", `#${value}`);
        svg.append(use);
        main.append(svg);
    }
    board.replaceWith(main);
}

function restart() {
    const P = [];
    for (let Y=0; Y<3; Y++)
        for (let X=0; X<3; X++)
            P.push([Y,X]);

    const A = shuffle(P);
    for(let I=0; I<9; I++)
        BOARD[A[I][0]][A[I][1]] = I;

    EMPTY = A[0];
    MOVES = 0;
    finished = false;
    redraw();
}

function onkeydown(event) {
    if (finished)
        return;
    if (event.isComposing || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey)
        return;
    if (!event.key.startsWith("Arrow"))
        return;

    const key = event.key.slice(5);
    const [DY, DX] = DIRECTIONS[key];
    const [Y, X] = EMPTY;
    const Y1 = Y + DY;
    const X1 = X + DX;
    if ((X1 < 0) || (X1 > 2) || (Y1 < 0) || (Y1 > 2))
        return;

    const I = BOARD[Y1][X1];
    BOARD[Y][X] = I;
    BOARD[Y1][X1] = 0;
    EMPTY = [Y1, X1];

    MOVES += 1;
    finished = BOARD.flat().slice(0,8).every((x, i) => x===(i+1));
    redraw();
}


function onload() {
    console.log("RESTART");
    reset.addEventListener('click', restart);
    window.addEventListener('keydown', onkeydown);
    restart();
}

window.addEventListener("load", onload);
