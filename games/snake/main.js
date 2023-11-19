const BOARD = new Array(21).fill(null).map(_ => new Array(21).fill(0));
const CHARS = ["", "\u{1f353}", ""];
const DIRECTIONS = {
    Left: [0, -1],
    Right: [0, +1],
    Up: [-1, 0],
    Down: [+1, 0],
};

let dir = null;
let nextdir = null;
let body = [];
let timer = null;
let finished = true;

function choice(a) {
    return a[Math.floor(Math.random() * a.length)];
}


function redraw() {
    const span = document.createElement("span");
    span.id = "score";
    span.append(`${body.length}`);
    score.replaceWith(span);

    const main = document.createElement("main");
    main.id = "board";
    for(const value of BOARD.flat())
        main.appendChild(document.createElement("div")).append(CHARS[value]);
    for(const [Y,X] of body)
        main.children[Y*21+X].className = 'b';
    const [Y,X] = body[0];
    main.children[Y*21+X].className = 'h';
    board.replaceWith(main);
}

function add_food() {
    const I = choice(BOARD.flat().map((x,i) => (x===0)&&i).filter((x)=>x));
    const X = I%21;
    const Y = (I-X)/21;
    BOARD[Y][X]=1;
}

function restart() {
    if (timer)
        window.clearInterval(timer);
    for(let Y=0; Y<21; Y++)
        for(let X=0; X<21; X++)
            BOARD[Y][X] = 0;
    const head = [
        7 + Math.floor(Math.random() * 7),
        7 + Math.floor(Math.random() * 7)];
    body = [];
    dir = choice(Object.values(DIRECTIONS));
    nextdir = dir;
    for(let I=0; I<3; I++)
        body.push([head[0] - dir[0]*I, head[1] - dir[1] * I]);
    for(const [Y,X] of body)
        BOARD[Y][X] = 2;
    add_food();
    add_food();
    add_food();

    finished = false;
    SCORE = 3;
    timer = window.setInterval(oninterval, 200);
    redraw();
}

function oninterval() {
    dir = nextdir;
    const [Y,X] = [body[0][0] + dir[0], body[0][1] + dir[1]];
    if ((Y < 0) || (Y > 20) || (X < 0) || (X > 20) || (BOARD[Y][X] === 2)) {
        finished = true;
        window.clearInterval(timer);
        timer = null;
        return;
    }

    body.unshift([Y, X]);
    if (BOARD[Y][X] === 1) {
        add_food();
    } else {
        const [Y1, X1] = body.pop();
        BOARD[Y1][X1] = 0;
    }
    BOARD[Y][X] = 2;
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
    if (((DY + dir[0]) === 0) && ((DX + dir[1]) === 0))
        return;
    nextdir = [DY, DX];
}


function onload() {
    reset.addEventListener('click', restart);
    window.addEventListener('keydown', onkeydown);
}

window.addEventListener("load", onload);
