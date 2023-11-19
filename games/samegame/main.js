const BOARD = new Array(10).fill(null).map(_ => new Array(15).fill(0));
const DELTA = [[-1, 0], [ 0,-1],[ 0, 1],[ 1, 0]];
const CHARS = ["", "\u{1f347}", "\u{1f349}", "\u{1f34d}", "\u{1f351}"];
let SCORE = 0;

function redraw() {
    const span = document.createElement("span");
    span.id = "score";
    span.append(`${SCORE}`);
    score.replaceWith(span);

    const main = document.createElement("main");
    main.id = "board";
    for(const value of BOARD.flat())
        main.appendChild(document.createElement("div")).append(CHARS[value]);
    board.replaceWith(main);
    main.addEventListener('click', onclick);
}


function restart() {
    for(let Y=0; Y<10; Y++)
        for(let X=0; X<15; X++)
            BOARD[Y][X] = 1 + Math.floor(Math.random() * 4);
    SCORE = 0;
    redraw();
}

function onclick(event) {
    const div = event.target;
    if (div === board)
        return;

    const I = Array.prototype.indexOf.call(div.parentNode.children, div);
    const X = I % 15;
    const Y = (I - X)/15;
    const C = BOARD[Y][X];
    if (C === 0)
        return;

    let count = 1;
    let queue = [];
    queue.push([Y,X]);
    while(queue.length > 0) {
        const [Y,X] = queue.shift();
        for(const [DY, DX] of DELTA) {
            const Y1 = Y + DY;
            const X1 = X + DX;
            if ((X1 < 0) || (X1 > 14) || (Y1 < 0) || (Y1 > 9))
                continue;
            if (BOARD[Y1][X1] !== C)
                continue;
            BOARD[Y1][X1] = 0;
            queue.push([Y1, X1]);
            count += 1;
        }
    }
    if (count === 1)
        return;
    BOARD[Y][X] = 0;
    SCORE += (count - 2)*(count - 2);

    for(let X=0; X<15; X++) {
        let E = 9;
        for(let Y=9; Y>=0; Y--) {
            const C = BOARD[Y][X];
            if (C === 0)
                continue;
            BOARD[Y][X] = 0;
            BOARD[E][X] = C;
            E -= 1;
        }
    }

    if (BOARD.flat().filter((x) => x > 0).length === 0)
        SCORE += 1000;

    redraw();
}

function onload() {
    reset.addEventListener('click', restart);
    board.addEventListener('click', onclick);
    restart();
}

window.addEventListener("load", onload);
