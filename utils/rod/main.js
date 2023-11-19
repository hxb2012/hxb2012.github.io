const NUMBER = Array.from("\u{25cb}\u{1d369}\u{1d36a}\u{1d36b}\u{1d36c}\u{1d36d}\u{1d36e}\u{1d36f}\u{1d370}\u{1d371}\u{25cb}\u{1d360}\u{1d361}\u{1d362}\u{1d363}\u{1d364}\u{1d365}\u{1d366}\u{1d367}\u{1d368}");

function oninput(event) {
    const input = event.target;
    if(!input.checkValidity())
        return;

    const a = Array.from(input.value).map(c => c.codePointAt(0) - 0x30);
    a.reverse();
    const b = a.map((n, i) => NUMBER[(i % 2) * 10 + n]);
    b.reverse();
    const elem = document.createElement("pre");
    elem.id = "output";
    for(const c of b)
        elem.appendChild(document.createElement("span")).append(c);
    output.replaceWith(elem);
}

function onload() {
    input.addEventListener('input', oninput);
}

window.addEventListener('load', onload);
