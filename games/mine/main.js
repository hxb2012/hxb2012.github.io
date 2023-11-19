const BOARD = new Array(16).fill(null).map(_ => new Array(16).fill(false));
const COUNT = new Array(16).fill(null).map(_ => new Array(16).fill(0));
const DELTA = [
[-1,-1], [-1, 0], [-1, 1],
[ 0,-1],          [ 0, 1],
[ 1,-1], [ 1, 0], [ 1, 1]];

let MINES = [];
let FLAGGED = 0;
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
    span.id = "mines";
    span.append(`${FLAGGED}/${MINES.length}`);
    mines.replaceWith(span);

    const main = document.createElement("main");
    main.id = "board";
    for(const value of BOARD.flat()) {
        const div = document.createElement("div");
        switch (value) {
        case true:
            div.append("\u{1f6a9}");
        case false:
            div.className = "u";
            break;
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
            div.append(`${value}`);
            div.className = `c${value}`;
            break;
        case 9:
            div.append("\u{1f4a3}");
        }

        main.append(div);
    }
    board.replaceWith(main);
    main.addEventListener('click', onclick);
    main.addEventListener('contextmenu', onrightclick);
}

function restart() {
    const P = [];
    for (let Y=0; Y<16; Y++)
        for (let X=0; X<16; X++) {
            P.push([Y,X]);
            COUNT[Y][X] = 0;
            BOARD[Y][X] = false;
        }
    const A = shuffle(P);
    MINES = A.slice(0, 40);
    for(const [Y,X] of MINES)
        for(const [DY, DX] of DELTA) {
            const Y1 = Y + DY;
            const X1 = X + DX;
            if ((X1 < 0) || (X1 > 15) || (Y1 < 0) || (Y1 > 15))
                continue;
            COUNT[Y1][X1] += 1;
        }
    for(const [Y,X] of MINES)
        COUNT[Y][X] = -1;

    FLAGGED = 0;
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
    const X = I % 16;
    const Y = (I - X)/16;
    const F = BOARD[Y][X];
    if (F !== false)
        return;
    if (COUNT[Y][X] < 0) {
        BOARD[Y][X] = 9;
        finished = true;
        redraw();
        return
    }

    BOARD[Y][X] = COUNT[Y][X];
    const queue = [];
    if (COUNT[Y][X] === 0)
        queue.push([Y,X]);

    while(queue.length > 0) {
        const [Y,X] = queue.shift();
        for(const [DY, DX] of DELTA) {
            const Y1 = Y + DY;
            const X1 = X + DX;
            if ((X1 < 0) || (X1 > 15) || (Y1 < 0) || (Y1 > 15))
                continue;
            const F = BOARD[Y1][X1];
            if ((F !== true) && (F !== false))
                continue;
            BOARD[Y1][X1] = COUNT[Y1][X1];
            if (COUNT[Y1][X1] === 0)
                queue.push([Y1, X1]);
        }
    }

    finished = BOARD.flat().filter((x) => (x===true)||(x===false)).length === MINES.length;
    FLAGGED = BOARD.flat().filter((x) => x===true).length;
    redraw();
}

function onrightclick(event) {
    event.preventDefault();
    if (finished)
        return;
    const div = event.target;
    if (div === board)
        return;
    const I = Array.prototype.indexOf.call(div.parentNode.children, div);
    const X = I % 16;
    const Y = (I - X)/16;
    const F = BOARD[Y][X];
    if (F === false)
        BOARD[Y][X] = true;
    else if (F === true)
        BOARD[Y][X] = false;

    FLAGGED = BOARD.flat().filter((x) => x===true).length;
    redraw();
}

function onload() {
    reset.addEventListener('click', restart);
    board.addEventListener('click', onclick);
    board.addEventListener('contextmenu', onrightclick);
    restart();
}

window.addEventListener("load", onload);
