!(function () {
    'use strict';
    var t = function (t, e, n) {
            var a = t[e];
            return function () {
                for (var e = [], r = arguments.length; r--; ) e[r] = arguments[r];
                return n.apply(null, e), a.apply(t, e);
            };
        },
        e = function () {
            var t = window.doNotTrack,
                e = window.navigator,
                n = window.external,
                a =
                    t ||
                    e.doNotTrack ||
                    e.msDoNotTrack ||
                    (n && 'function' == typeof n.msTrackingProtectionEnabled && n.msTrackingProtectionEnabled());
            return !0 === a || 1 === a || 'yes' === a || '1' === a;
        };
    !(function (n) {
        var a = n.screen,
            r = a.width,
            i = a.height,
            o = n.navigator.language,
            c = n.location,
            u = c.hostname,
            s = c.pathname,
            f = c.search,
            l = n.sessionStorage,
            d = n.document,
            p = n.history,
            v = d.querySelector('script[data-website-id]');
        if (v) {
            var h,
                m = function (t) {
                    return v && v.getAttribute(t);
                },
                g = m('data-website-id'),
                w = m('data-host-url'),
                y = 'false' !== m('data-auto-track'),
                S = m('data-do-not-track'),
                k = m('data-cache'),
                E = m('data-domains'),
                b =
                    (S && e()) ||
                    (E &&
                        !E.split(',')
                            .map(function (t) {
                                return t.trim();
                            })
                            .includes(u)),
                T = w
                    ? (h = w) && h.length > 1 && h.endsWith('/')
                        ? h.slice(0, -1)
                        : h
                    : new URL(v.src).href.split('/').slice(0, -1).join('/'),
                L = r + 'x' + i,
                N = [],
                q = '' + s + f,
                R = d.referrer,
                j = function (t, e, n) {
                    if (!b) {
                        var a = 'umami.cache',
                            r = { website: n, hostname: u, screen: L, language: o, cache: k && l.getItem(a) };
                        e &&
                            Object.keys(e).forEach(function (t) {
                                r[t] = e[t];
                            }),
                            (function (t, e, n) {
                                var a = new XMLHttpRequest();
                                a.open('POST', t, !0),
                                    a.setRequestHeader('Content-Type', 'application/json'),
                                    (a.onreadystatechange = function () {
                                        4 === a.readyState && n && n(a.response);
                                    }),
                                    a.send(JSON.stringify(e));
                            })(T + '/api/collect', { type: t, payload: r }, function (t) {
                                return k && l.setItem(a, t);
                            });
                    }
                },
                O = function (t, e, n) {
                    return (
                        void 0 === t && (t = q),
                        void 0 === e && (e = R),
                        void 0 === n && (n = g),
                        j('pageview', { url: t, referrer: e }, n)
                    );
                },
                P = function (t, e, n, a) {
                    return (
                        void 0 === e && (e = 'custom'),
                        void 0 === n && (n = q),
                        void 0 === a && (a = g),
                        j('event', { event_type: e, event_value: t, url: n }, a)
                    );
                },
                x = function () {
                    d.querySelectorAll("[class*='umami--']").forEach(function (t) {
                        t.className.split(' ').forEach(function (e) {
                            if (/^umami--([a-z]+)--([\w]+[\w-]*)$/.test(e)) {
                                var n = e.split('--'),
                                    a = n[1],
                                    r = n[2],
                                    i = function () {
                                        return P(r, a);
                                    };
                                N.push([t, a, i]), t.addEventListener(a, i, !0);
                            }
                        });
                    });
                },
                A = function (t, e, n) {
                    N.forEach(function (t) {
                        var e = t[0],
                            n = t[1],
                            a = t[2];
                        e && e.removeEventListener(n, a, !0);
                    }),
                        (N.length = 0),
                        (R = q);
                    var a = n.toString();
                    if ('http' === a.substring(0, 4)) {
                        var r = new URL(a),
                            i = r.pathname,
                            o = r.search;
                        q = '' + i + o;
                    } else q = a;
                    O(q, R), setTimeout(x, 300);
                };
            if (!n.umami) {
                var H = function (t) {
                    return P(t);
                };
                (H.trackView = O), (H.trackEvent = P), (n.umami = H);
            }
            y && !b && ((p.pushState = t(p, 'pushState', A)), (p.replaceState = t(p, 'replaceState', A)), O(q, R), x());
        }
    })(window);
})();
