function oninput(event) {
    const input = event.target;
    if(input.checkValidity())
        location.hash = input.value;
    input.focus();
}

function onload() {
    const input = document.querySelector("input");
    input.addEventListener("input", oninput);
    const table = document.querySelector("table");
    table.addEventListener(
        "click",
        function(event) {
            const td = event.target.closest("td");
            if (td) {
                input.value = td.id;
                input.dispatchEvent(new Event("input"));
            }
        }
    );
}

window.addEventListener('load', onload);
