const BOARD = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
const DELTA = [[-1,0],[0,-1],[0,0],[0,1],[1,0],];
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
        const div = document.createElement("div");
        if (value) {
            div.append("\u{1F4A1}");
        }
        main.append(div);
    }
    board.replaceWith(main);
    main.addEventListener('click', onclick);
}

function restart() {
    const N = 1 + Math.floor(Math.random() * 25);
    const P = [];
    for (let Y=0; Y<5; Y++)
        for (let X=0; X<5; X++) {
            P.push([Y,X]);
            BOARD[Y][X] = 0;
        }
    const A = shuffle(P);
    for(let I=0; I<N; I++) {
        const [Y,X] = A.shift();
        BOARD[Y][X] = 1;
    }
    MOVES = 0;
    finished = false;

    redraw();
}

function onclick(event) {
    if (finished)
        return;
    const div = event.target;
    if (div === board)
        return;
    const I = Array.prototype.indexOf.call(div.parentNode.children, div);
    const X = I % 5;
    const Y = (I - X)/5;
    for(const [DX,DY] of DELTA) {
        const X1 = X + DX;
        const Y1 = Y + DY;
        if ((X1 < 0) || (X1 >4))
            continue;
        if ((Y1 < 0) || (Y1 > 4))
            continue;
        BOARD[Y1][X1] = 1-BOARD[Y1][X1];
    }
    MOVES += 1;
    finished = BOARD.flat().every((x) => x===0);

    redraw();
}

function onload() {
    reset.addEventListener('click', restart);
    board.addEventListener('click', onclick);
    restart();
}

window.addEventListener("load", onload);
