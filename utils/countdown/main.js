function remain(date, now, extra) {
    const diff = (date-now)/1000 + (extra||0);
    const seconds = Math.abs(diff);
    const s = Math.floor(seconds % 60);
    const minutes = seconds / 60;
    const m = Math.floor(minutes % 60);
    const hours = minutes / 60;
    const h = Math.floor(hours % 24);
    const days =  Math.floor(hours / 24);
    return {passed: diff<0,
            text:
            `${days}`.padStart(4, "0") + "\u{5929}" +
            `${h}`.padStart(2, "0") + "\u{65f6}" +
            `${m}`.padStart(2, "0") + "\u{5206}" +
            `${s}`.padStart(2, "0") + "\u{79d2}"}
}

const CountDown = {
    view(vnode) {
        return m("div",
                 {"class": vnode.attrs.remain.passed && "passed"},
                 vnode.attrs.remain.passed?
                 m('span', vnode.attrs.name, "\u{5df2}\u{8fc7}")
                 :m('span', "\u{8ddd}\u{79bb}", vnode.attrs.name, "\u{8fd8}\u{5269}"),
                 vnode.attrs.remain.text,
                 m('button', {onclick: vnode.attrs.ondelete}, '\u{5220}\u{9664}')
                 );
    }
};

const CountDownList = {
    oninit(vnode) {
        vnode.state.count_down_list = JSON.parse(window.localStorage.getItem("gyeron") || "[]");
    },

    view(vnode) {
        function onsubmit(event) {
            event.preventDefault();
            const data = new FormData(event.target);
            const date = new Date(`${data.get("date")} ${data.get("time")}`);
            vnode.state.count_down_list.push({name: data.get("name"), date: date.valueOf()});
            window.localStorage.setItem("gyeron", JSON.stringify(vnode.state.count_down_list));
        }

        const now = Date.now();

        return [
            m("form",
              {onsubmit},
              m("input", {name: "name", placeholder: "\u{6bd4}\u{5982}\u{ff1a}\u{653e}\u{5047}", required: "required"}),
              m("input", {name: "date", type: "date", required: "required"}),
              m("input", {name: "time", type: "time", required: "required"}),
              m("input", {type: "submit", value: "\u{6dfb}\u{52a0}"})),
            ...vnode.state.count_down_list.map(
                (entry, index) =>
                m(CountDown,
                  {"name": entry.name,
                   "remain": remain(entry.date,now),
                   ondelete() {
                       vnode.state.count_down_list.splice(index, 1);
                       window.localStorage.setItem("gyeron", JSON.stringify(vnode.state.count_down_list));
                   }
                  }
                 ))
        ];
    }
};

function main() {
    m.mount(document.body, CountDownList);
    window.setInterval(function() { m.redraw(); }, 1000);
}

window.addEventListener('load', main);
