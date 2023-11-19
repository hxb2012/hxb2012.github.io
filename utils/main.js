function download_blob(blob, filename) {
    const link = document.createElement("a");
    link.download = filename;
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
}

async function download_canvas_image(canvas, filename, options) {
    const blob = await canvas.convertToBlob(options);
    download_blob(blob, filename);
}

async function screenshot() {
    const options = {video: true, audio: false};
    const stream = await navigator.mediaDevices.getDisplayMedia(options);
    const video = document.createElement("video");
    video.srcObject = stream;
    video.play();
    video.addEventListener(
        'playing',
        async function(event) {
            const canvas = new OffscreenCanvas(video.videoWidth, video.videoHeight);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
            const now = new Date();
            const filename = `\u{622a}\u{56fe} ${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()} ${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}.png`;
            await download_canvas_image(canvas, filename);
            stream.getTracks().forEach((track) => track.stop());
        });
}

function setup_convert() {
    const dialog = document.getElementById("convert");
    const input = dialog.querySelector('input[type="file"]');
    input.addEventListener(
        'change',
        function() {
            dialog.showModal();
        });
    dialog.addEventListener(
        'close',
        async function() {
            if (dialog.returnValue !== 'save')
                return;
            const form = dialog.querySelector("form");
            const data = Object.fromEntries(new FormData(form));
            const bitmap = await createImageBitmap(data.file);
            const type = data.type;
            const quality = ((data.type!=="image/png")&&data.quality)&&parseInt(data.quality);
            const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height);
            await download_canvas_image(
                canvas, data.file.name.replace(/.[^\.]+$/, ''),
                {type, quality});
        }
    );
}

function convert(dialog) {
    const input = dialog.querySelector('input[type="file"]');
    input.click();
}

function setup_jsonview() {
    const dialog = document.getElementById("jsonview");
    const button = dialog.querySelector('button[value="show"]');
    button.addEventListener(
        'click',
        function() {
            const textarea = dialog.querySelector("textarea");
            const blob = new Blob([textarea.value], {type: "application/json"});
            const url = URL.createObjectURL(blob);
            const view = window.open(url, "_blank");
            view.addEventListener('unload', function() {URL.revokeObjectURL(url);});
        }
    );
}

function jsonview(dialog) {
    dialog.showModal();
}

function onload() {
    setup_convert();
    setup_jsonview();

    document.querySelector("main nav").addEventListener(
        'click',
        function(event) {
            const button = event.target;
            if (!(button instanceof HTMLButtonElement))
                return;
            const name = button.name;
            if (!name)
                return;
            window[name](document.getElementById(name));
        }
    );
}

window.addEventListener('load', onload);
