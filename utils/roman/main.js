const ROMAN = [
    [ 'M', 1000],
    ['CM',  900],
    [ 'D',  500],
    ['CD',  400],
    [ 'C',  100],
    ['XC',   90],
    [ 'L',   50],
    ['XL',   40],
    [ 'X',   10],
    ['IX',    9],
    [ 'V',    5],
    ['IV',    4],
    [ 'I',    1],
]

function oninput(event) {
    const input = event.target;
    if(!input.checkValidity())
        return;

    if (input === roman) {
        let sum = 0;
        let s = input.value;
        for (const [r,i] of ROMAN)
            while (s.startsWith(r)) {
                s = s.slice(r.length);
                sum += i;
            }
        number.value = sum;
    } else {
        let n = parseInt(number.value);
        const a = [];
        for (const [r,i] of ROMAN) {
            a.push(r.repeat(n/i));
            n = n%i;
        }
        roman.value = a.join('');
    }
}

function onload() {
    number.addEventListener('input', oninput);
    roman.addEventListener('input', oninput);
}

window.addEventListener('load', onload);
