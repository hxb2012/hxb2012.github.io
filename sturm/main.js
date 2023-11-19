const {GOOD_RE, BAD_RE, GOOD_LOOKUP, BAD_LOOKUP} = (function() {
    const LINES = "\u4e00\u2f00\n\u4e0d\uf967\n\u4e32\uf905\n\u4e39\uf95e\n\u4e59\u2f04\n\u4e86\uf9ba\n\u4e8c\u2f06\n\u4eba\u2f08\n\u4ec0\uf9fd\n\u4f86\uf92d\n\u4fbf\uf965\n\u50da\uf9bb\n\u513f\u2f09\n\u5140\u2e8e\ufa0c\n\u5165\u2f0a\n\u516b\u2f0b\n\u51c9\uf979\n\u51e0\u2f0f\n\u5200\u2f11\n\u5229\uf9dd\n\u523a\uf9ff\n\u529b\u2f12\uf98a\n\u52c9\ufa33\n\u52d2\uf952\n\u52de\uf92f\n\u52e4\ufa34\n\u52f5\uf97f\n\u5315\u2f14\n\u5317\uf963\n\u5341\u2f17\n\u5351\ufa35\n\u535c\u2f18\n\u5364\u2ee7\n\u5375\uf91c\n\u5382\u2f1a\n\u53c8\u2f1c\n\u53e3\u2f1d\n\u53e5\uf906\n\u540f\uf9de\n\u5442\uf980\n\u54bd\uf99e\n\u5587\uf90b\n\u5606\ufa37\n\u5668\ufa38\n\u56d7\u2f1e\n\u571f\u2f1f\n\u585a\ufa10\n\u58a8\ufa3a\n\u58d8\uf94a\n\u58eb\u2f20\n\u5915\u2f23\n\u5927\u2f24\n\u5948\uf90c\n\u5973\u2f25\n\u5b50\u2f26\n\u5bf8\u2f28\n\u5c0f\u2f29\n\u5c38\u2f2b\n\u5c3f\uf9bd\n\u5c62\uf94b\n\u5c65\uf9df\n\u5c71\u2f2d\n\u5d50\uf921\n\u5de5\u2f2f\n\u5df1\u2f30\n\u5df3\u2e92\n\u5e72\u2f32\n\u5e74\uf98e\n\u5e7a\u2e93\u2f33\n\u5e7f\u2f34\n\u5f04\uf943\n\u5f0b\u2f37\n\u5f13\u2f38\n\u5f8b\uf9d8\n\u5fa9\uf966\n\u5fc3\u2f3c\n\u6012\uf960\n\u6144\uf9d9\n\u6208\u2f3d\n\u6237\u2f3e\n\u624b\u2f3f\n\u62cf\uf95b\n\u62d3\ufa02\n\u652f\u2f40\n\u6587\u2f42\n\u6597\u2f43\n\u6599\uf9be\n\u65a4\u2f44\n\u65b9\u2f45\n\u65e0\u2f46\n\u65e5\u2f47\n\u6613\uf9e0\n\u6688\uf9c5\n\u66b4\ufa06\n\u66c6\uf98b\n\u66f0\u2f48\n\u66f4\uf901\n\u6708\u2f49\n\u6728\u2f4a\n\u674e\uf9e1\n\u6797\uf9f4\n\u6881\uf97a\n\u68a8\uf9e2\n\u6a13\uf94c\n\u6ad3\uf931\n\u6b20\u2f4b\n\u6b62\u2f4c\n\u6b77\uf98c\n\u6b79\u2f4d\n\u6bb3\u2f4e\n\u6bcb\u2f4f\n\u6bcd\u2e9f\n\u6bd4\u2f50\n\u6bdb\u2f51\n\u6c0f\u2f52\n\u6c11\u2ea0\n\u6c14\u2f53\n\u6c34\u2f54\n\u6c88\uf972\n\u6ccc\uf968\n\u6ce5\uf9e3\n\u6d1b\uf915\n\u6d1e\ufa05\n\u6dcb\uf9f5\n\u6f0f\uf94e\n\u6f22\ufa47\n\u6ffe\uf984\n\u706b\u2f55\n\u7149\uf993\n\u71ce\uf9c0\n\u7210\uf932\n\u722a\u2f56\n\u7236\u2f57\n\u723b\u2f58\n\u7247\u2f5a\n\u7259\u2f5b\n\u725b\u2f5c\n\u72ac\u2f5d\n\u72c0\uf9fa\n\u7384\u2f5e\n\u7389\u2f5f\n\u73de\uf917\n\u7406\uf9e4\n\u7469\uf9ae\n\u74dc\u2f60\n\u74e6\u2f61\n\u7518\u2f62\n\u751f\u2f63\n\u7528\u2f64\n\u7530\u2f65\n\u7565\uf976\n\u7570\uf962\n\u767d\u2f69\n\u76ae\u2f6a\n\u76bf\u2f6b\n\u76e7\uf933\n\u76ee\u2f6c\n\u77db\u2f6d\n\u77e2\u2f6e\n\u77f3\u2f6f\n\u78ca\uf947\n\u78fb\uf964\n\u792a\uf985\n\u793a\u2f70\n\u79be\u2f72\n\u7a74\u2f73\n\u7acb\u2f74\n\u7af9\u2f75\n\u7c73\u2f76\n\u7ce7\uf97b\n\u7f36\u2f78\n\u7f51\u2f79\n\u7f8a\u2f7a\n\u7fbd\u2f7b\n\u8001\u2f7c\uf934\n\u800c\u2f7d\n\u8012\u2f7e\n\u8033\u2f7f\n\u807f\u2f80\n\u8089\u2f81\n\u808b\uf953\n\u81e3\u2f82\n\u81ea\u2f83\n\u81f3\u2f84\n\u81fc\u2f85\n\u820c\u2f86\n\u821b\u2f87\n\u821f\u2f88\n\u826e\u2f89\n\u8272\u2f8a\n\u82e5\uf974\n\u843d\uf918\n\u8449\uf96e\n\u8606\uf935\n\u864e\u2ec1\n\u866b\u2f8d\n\u8840\u2f8e\n\u884c\u2f8f\ufa08\n\u8863\u2f90\n\u88cf\uf9e7\n\u897f\u2ec4\n\u898b\u2f92\ufa0a\n\u89c1\u2ec5\n\u89d2\u2ec6\n\u8a00\u2f94\n\u8c37\u2f95\n\u8c46\u2f96\n\u8c48\uf900\n\u8c55\u2f97\n\u8c78\u2f98\n\u8c9d\u2f99\n\u8cc2\uf948\n\u8cc8\uf903\n\u8d1d\u2ec9\n\u8d64\u2f9a\n\u8d70\u2f9b\n\u8db3\u2f9c\n\u8def\uf937\n\u8eab\u2f9d\n\u8eca\u2f9e\uf902\n\u8f26\uf998\n\u8f3b\ufa07\n\u8f66\u2ecb\n\u8f9b\u2f9f\n\u8fb0\u2fa0\n\u9091\u2fa2\n\u9149\u2fa3\n\u916a\uf919\n\u91b4\uf9b7\n\u91c6\u2fa4\n\u91cc\u2fa5\uf9e9\n\u91cf\uf97e\n\u91d1\u2fa6\n\u9577\u2ed1\u2fa7\n\u957f\u2ed3\n\u9580\u2fa8\n\u95e8\u2ed4\n\u961c\u2fa9\n\u962e\uf9c6\n\u9686\uf9dc\n\u96b6\u2faa\n\u96b7\ufa2f\n\u96b9\u2fab\n\u96e8\u2fac\n\u96f7\uf949\n\u9732\uf938\n\u9748\uf9b3\n\u9751\u2fad\n\u9752\u2ed8\n\u975e\u2fae\n\u9762\u2faf\n\u9769\u2fb0\n\u97cb\u2fb1\n\u97e6\u2ed9\n\u97ed\u2fb2\n\u97f3\u2fb3\n\u9801\u2fb4\n\u985e\uf9d0\n\u9875\u2eda\n\u98a8\u2fb5\n\u98ce\u2edb\n\u98db\u2fb6\n\u98de\u2edc\n\u98df\u2edd\u2fb7\n\u9996\u2fb8\n\u9999\u2fb9\n\u99ac\u2fba\n\u99f1\uf91a\n\u9a6c\u2ee2\n\u9aa8\u2ee3\n\u9ad8\u2fbc\n\u9b3c\u2ee4\u2fc1\n\u9b5a\u2fc2\n\u9b6f\uf939\n\u9c7c\u2ee5\n\u9ce5\u2fc3\n\u9dfa\uf93a\n\u9e1f\u2ee6\n\u9e75\u2fc4\n\u9e7f\u2fc5\n\u9ea5\u2fc6\n\u9ea6\u2ee8\n\u9ebb\u2fc7\n\u9ec3\u2fc8\n\u9ec4\u2ee9\n\u9ecd\u2fc9\n\u9ed1\u2fca\n\u9efe\u2eea\n\u9f0e\u2fcd\n\u9f13\u2fce\n\u9f20\u2fcf\n\u9f3b\u2fd0\n\u9f4a\u2fd1\n\u9f50\u2eec\n\u9f52\u2eed\u2fd2\n\u9f7f\u2eee\n\u9f8d\u2fd3\n\u9f99\u2ef0\n\u9f9c\u2ef1\u2fd4\n\u9f9f\u2ef3\n\u9fa0\u2fd5".split("\n").map((a) => Array.from(a));
    const choice = (a) => a[Math.floor(Math.random() * a.length)];
    const GOOD_DICT = Object.fromEntries(LINES.map((a) => [a[0], a.slice(1)]));
    const BAD_DICT = Object.fromEntries([].concat(...LINES.map((a) => a.slice(1).map((c) => [c, a[0]]))));
    return {GOOD_RE: new RegExp(`([${LINES.map((a) => a[0]).join('')}]+)`),
            BAD_RE: new RegExp(`([${LINES.map((a) => a.slice(1)).flat().join('')}]+)`),
            GOOD_LOOKUP: (c) => choice(GOOD_DICT[c]),
            BAD_LOOKUP: (c) => BAD_DICT[c]};
})();

function ruby(s) {
    const ruby = document.createElement("ruby");
    for (const c of s) {
        ruby.append(c);
        ruby.appendChild(document.createElement("rp")).append("(");
        ruby.appendChild(document.createElement("rt")).append(`&#${c.codePointAt(0)};`);
        ruby.appendChild(document.createElement("rp")).append(")");
    }
    return ruby;
}

function convert() {
    const container = document.createElement("div");
    container.id = "output";
    for (const {re, text, body} of
         [{re: BAD_RE, text: "\u{68c0}\u{6d4b}\u{5230}\u{90aa}\u{6076}\u{7f16}\u{7801}\u{1F631}",
           body: [{name: "\u{90aa}\u{6076}\u{7f16}\u{7801}", lookup: (c) => c},
                  {name: "\u{6b63}\u{4e49}\u{7f16}\u{7801}", lookup: BAD_LOOKUP}]},
          {re: GOOD_RE, text: "\u{672a}\u{68c0}\u{6d4b}\u{5230}\u{90aa}\u{6076}\u{7f16}\u{7801}\u{1F60C}",
           body: [{name: "\u{6b63}\u{4e49}\u{7f16}\u{7801}", lookup: (c) => c},
                  {name: "\u{90aa}\u{6076}\u{7f16}\u{7801}", lookup: GOOD_LOOKUP}]},
          {text: "\u{6ca1}\u{6709}\u{53d1}\u{73b0}\u{652f}\u{6301}\u{8f6c}\u{6362}\u{7684}\u{5b57}\u{7b26}\u{1F9D0}", body: []}]) {
        const groups = re?input.value.split(re):{};
        if (groups.length === 1) continue;
        container.appendChild(document.createElement("div")).append(text);
        for (const {name, lookup} of body) {
            const pre = container.appendChild(document.createElement("pre"));
            pre.appendChild(document.createElement("h3")).append(name);
            pre.append(...groups.map((s,i)=>(i%2)?ruby(Array.from(s).map(lookup)):s));
        }
        break;
    }
    output.replaceWith(container);
}

window.addEventListener('load', function() { button.addEventListener('click', convert); });
