
function onmessage(event) {
    const [time, found, A, B] = event.data;
    const grid = document.createElement("div");
    grid.className = "grid";
    for(const a of A)
        grid.appendChild(document.createElement("div")).append(a || "\u{A0}");
    const div = document.createElement("div");
    div.id = 'output';
    div.appendChild(grid);
    const length = A.join("").length;
    div.appendChild(document.createElement("div")).append(`${length}\u{4e2a}\u{8d77}\u{59cb}\u{6570}\u{5b57}\u{ff0c}\u{7528}\u{65f6}${found}/${time}\u{6beb}\u{79d2}`);
    output.replaceWith(div);
    input.value = A.map(a => a || ".").join("").split(/([1-9.]{9})/).filter((x) => x).join("\n");
    input.pattern = B.join("").split(/([1-9]{9})/).filter((x) => x).join("\n");
    input.className = 'invalid';
    generate.disabled = false;
}

function oninput(event) {
    const pattern = event.target.pattern;
    if (!pattern)
        return;
    input.className = (input.value === pattern)?"valid":"invalid";
}

function onload() {
    const worker = new Worker("worker.js");
    worker.addEventListener('message', onmessage);
    input.addEventListener('input', oninput);
    form.addEventListener(
        'submit',
        function(event) {
            event.preventDefault();
            generate.disabled = true;
            const {numbers, limit, step} = Object.fromEntries((new FormData(form)).entries());
            worker.postMessage([parseInt(numbers), parseInt(limit), parseInt(step)]);
        }
    );
}


window.addEventListener('load', onload);
