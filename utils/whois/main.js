function h(type, props, ...children) {
    return { type, props, children };
}

function render(html) {
    if ((typeof html) === "undefined")
        return "";
    if ((typeof html) === "number")
        return `${html}`;
    if ((typeof html) === "string")
        return html;
    if (html instanceof Array) {
        const fragment = new DocumentFragment();
        for(const child of html)
            fragment.append(render(child));
        return fragment;
    }
    const {type, props, children} = html;
    const elem = document.createElement(type);
    if (props)
        for(const [name, value] of Object.entries(props))
            elem.setAttribute(name, value);
    if (children)
        for(const child of children)
            elem.append(render(child));
    return elem;
}

const html = htm.bind(h);
const RDAP = new Array(256);

function format_remark(remark) {
    return html`<dt>${remark.title}</dt>
<dd>${remark.description.map(d => html`<p>${d}</p>`)}</dd>
<dd><dl>
<dt>Links:</dt><dd><ul>${(remark.links || []).map(l => html`<li><a href="${l.href}">${l.value}</a> (${l.rel})</li>`)}</ul></dd>
</dl></dd>`;
}

function format_entity(entity) {
    return html`<dt>${entity.handle}</dt>
<dd><dl>
<dt>Roles:</dt><dd><ul>${entity.roles.map(r => html`<li>${r}</li>`)}</ul></dd>
<dt>Contact Information:</dt><dd><dl>${entity.vcardArray[1].map(v => html`<dt>${v[0]}</dt><dd>${v[1].label}${v[3]}</dd>`)}</dl></dd>
<dt>Events:</dt><dd><dl>${(entity.events || []).map(e => html`<dt>${e.eventAction}</dt><dd>${e.eventDate}</dd>`)}</dl></dd>
<dt>Remarks:</dt><dd><dl>${(entity.remarks || []).map(format_remark)}</dl></dd>
<dt>Links:</dt><dd><ul>${(entity.links || []).map(l => html`<li><a href="${l.href}">${l.value}</a> (${l.rel})</li>`)}</ul></dd>
</dl>
</dd>
`;
}

async function onsubmit(event) {
    event.preventDefault();
    const form = event.target;
    const submit = form.querySelector('input[type="submit"]');
    const data = new FormData(form);
    const ip = data.get("ip");
    const urls = RDAP[parseInt(ip.split(".", 1)[0])];

    const elem = document.querySelector("output");
    const output = document.createElement("output");
    if (!urls) {
        output.append("\u{975e}\u{516c}\u{7f51}\u{5730}\u{5740}");
        elem.replaceWith(output);
        return;
    }

    submit.disabled = true;
    output.append("\u{6b63}\u{5728}\u{67e5}\u{8be2}");
    elem.replaceWith(output);

    const response = await fetch(`${urls[0]}ip/${ip}`);
    const rdap = await response.json();
    console.log(rdap);
    output.replaceWith(
        render(
            html`<output><dl>
<dt>IP version:</dt><dd>${rdap.ipVersion}</dd>
<dt>Address Range:</dt><dd>${rdap.startAddress} - ${rdap.endAddress}</dd>
<dt>Network Name:</dt><dd>${rdap.name}</dd>
<dt>Network Type:</dt><dd>${rdap.type}</dd>
<dt>Network Country:</dt><dd>${rdap.country}</dd>
<dt>CIDR Prefix(es):</dt><dd><ul>${rdap.cidr0_cidrs.map(c => html`<li>${c.v4prefix}/${c.length}</li>`)}</ul></dd>
<dt>Status:</dt><dd><ul>${rdap.status.map(s => html`<li>${s}</li>`)}</ul></dd>
<dt>Events:</dt><dd><dl>${rdap.events.map(e => html`<dt>${e.eventAction}</dt><dd>${e.eventDate}</dd>`)}</dl></dd>
<dt>Entities:</dt><dd><dl>${rdap.entities.map(format_entity)}</dl></dd>
<dt>Remarks:</dt><dd><dl>${(rdap.remarks || []).map(format_remark)}</dl></dd>
<dt>Notices:</dt><dd><dl>${(rdap.notices || []).map(format_remark)}</dl></dd>
<dt>Links:</dt><dd><ul>${rdap.links.map(l => html`<li><a href="${l.href}">${l.value}</a> (${l.rel})</li>`)}</ul></dd>
<dt>Whois Server:</dt><dd>${rdap.port43}</dd>
<dt>Conformance:</dt><dd><ul>${rdap.rdapConformance.map(c => html`<li>${c}</li>`)}</ul></dd>

</dl></output>`));

    submit.disabled = false;
}

async function onload() {
    const form = document.querySelector("form");
    const ip = form.querySelector('input[name="ip"]');
    const submit = form.querySelector('input[type="submit"]');
    form.addEventListener('submit', onsubmit);

    const response = await fetch("https://data.iana.org/rdap/ipv4.json");
    const {services} = await response.json();

    for(const [ranges, urls] of services)
        for(const range of ranges)
            RDAP[parseInt(range.split(".", 1)[0])] = urls;

    submit.disabled = false;
}

window.addEventListener('load', onload);
