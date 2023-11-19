function oninput() {
    try {
        new RegExp(regexp.value);
    } catch (e) {
        regexp.className = 'invalid';
        text.pattern = '';
        text.required = false;
        return;
    }

    regexp.className = '';
    text.pattern = regexp.value;
    text.required = true;
}

function onload() {
    regexp.addEventListener('input', oninput);
}

window.addEventListener('load', onload);
