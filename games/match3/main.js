const BOARD = new Array(10).fill(null).map(_ => new Array(15).fill(0));
const CHARS = ["", "\u{1f352}", "\u{1f347}", "\u{1f349}", "\u{1f34d}", "\u{1f351}"];
let SCORE = 0;
let ACTIVE = null;

function redraw() {
    const span = document.createElement("span");
    span.id = "score";
    span.append(`${SCORE}`);
    score.replaceWith(span);

    const main = document.createElement("main");
    main.id = "board";
    for(const value of BOARD.flat())
        main.appendChild(document.createElement("div")).append(CHARS[value]);
    if (ACTIVE !== null)
        main.children[ACTIVE[0]*15+ACTIVE[1]].className="active";

    board.replaceWith(main);
    main.addEventListener('click', onclick);
}

function restart() {
    for(let Y=0; Y<10; Y++)
        for(let X=0; X<15; X++) {
            let choices = [1,2,3,4,5];
            if ((Y >= 2) && (BOARD[Y-1][X] === BOARD[Y-2][X])) {
                const C = BOARD[Y-1][X];
                choices = choices.filter((x) => x !== C);
            }
            if ((X >= 2) && (BOARD[Y][X-1] === BOARD[Y][X-2])) {
                const C = BOARD[Y][X-1];
                choices = choices.filter((x) => x !== C);
            }
            BOARD[Y][X] = choices[Math.floor(Math.random() * choices.length)];
        }

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
    if (ACTIVE === null) {
        ACTIVE = [Y, X];
        redraw();
        return;
    }

    const [Y0, X0] = ACTIVE;
    const C0 = BOARD[Y0][X0];
    const C = BOARD[Y][X];
    let count0 = 1;
    let count1 = 1;
    let count2 = 1;
    let count3 = 1;

    if ((X0 === X) && (((Y0 + 1) === Y) || ((Y0 - 1) === Y))) {
        for(let X1=X-1; (X1>=0) && (BOARD[Y0][X1] === C); X1--)
            count0 += 1;
        for(let X1=X+1; (X1<15) && (BOARD[Y0][X1] === C); X1++)
            count0 += 1;
        for(let X1=X-1; (X1>=0) && (BOARD[Y][X1] === C0); X1--)
            count1 += 1;
        for(let X1=X+1; (X1<15) && (BOARD[Y][X1] === C0); X1++)
            count1 += 1;
        const DY = Y0 - Y;
        for(let Y1=Y0+DY; (Y1>=0) && (Y1<10) && (BOARD[Y1][X] === C); Y1+=DY)
            count2 += 1;
        for(let Y1=Y-DY; (Y1>=0) && (Y1<10) && (BOARD[Y1][X] === C0); Y1-=DY)
            count3 += 1;
    } else if ((Y0 === Y) && (((X0 + 1) === X) || ((X0 - 1) === X))) {
        for(let Y1=Y-1; (Y1>=0) && (BOARD[Y1][X0] === C); Y1--)
            count0 += 1;
        for(let Y1=Y+1; (Y1<10) && (BOARD[Y1][X0] === C); Y1++)
            count0 += 1;
        for(let Y1=Y-1; (Y1>=0) && (BOARD[Y1][X] === C0); Y1--)
            count1 += 1;
        for(let Y1=Y+1; (Y1<10) && (BOARD[Y1][X] === C0); Y1++)
            count1 += 1;
        const DX = X0 - X;
        for(let X1=X0+DX; (X1>=0) && (X1<15) && (BOARD[Y][X1] === C); X1+=DX)
            count2 += 1;
        for(let X1=X-DX; (X1>=0) && (X1<15) && (BOARD[Y][X1] === C0); X1-=DX)
            count3 += 1;
    }

    ACTIVE = null;

    if ((count0 < 3) && (count1 < 3) && (count2 < 3) && (count3 < 3)) {
        redraw();
        return;
    }

    BOARD[Y0][X0] = C;
    BOARD[Y][X] = C0;

    let round = 1;
    while(true) {
        let add = 0;

        for(let Y=0; Y<10; Y++) {
            let count = 1;
            let C = BOARD[Y][0];
            for(let X=1; X<15; X++) {
                if (BOARD[Y][X] === C) {
                    count += 1;
                    continue;
                }
                if ((count > 2) && (C > 0)) {
                    for(let X1=X-count; X1<X; X1++)
                        BOARD[Y][X1] = 0;
                    add += round * (count - 2);
                }
                count = 1;
                C = BOARD[Y][X];
            }
            if ((count > 2) && (C > 0)) {
                for(let X1=15-count; X1<15; X1++)
                    BOARD[Y][X1] = 0;
                add += round * (count - 2);
            }
        }

        for(let X=0; X<15; X++) {
            let count = 1;
            let C = BOARD[0][X];
            for(let Y=1; Y<10; Y++) {
                if (BOARD[Y][X] === C) {
                    count += 1;
                    continue;
                }
                if ((count > 2) && (C > 0)) {
                    for(let Y1=Y-count; Y1<Y; Y1++)
                        BOARD[Y1][X] = 0;
                    add += (count - 2);
                }
                count = 1;
                C = BOARD[Y][X];
            }
            if((count>2) && (C>0)) {
                for(let Y1=10-count; Y1<10; Y1++)
                    BOARD[Y1][X] = 0;
                add += (count - 2);
            }
        }

        if (add === 0)
            break;

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

            for(let Y=E; Y>=0; Y--)
                BOARD[Y][X] = 1 + Math.floor(Math.random() * 5);
        }

        SCORE += add * round;
        round += 1;
    }

    redraw();
}

function onload() {
    reset.addEventListener('click', restart);
    board.addEventListener('click', onclick);
    restart();
}

window.addEventListener("load", onload);
