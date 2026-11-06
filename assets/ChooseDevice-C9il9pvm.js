import { j as r, r as i, ab as W, a1 as F } from "./smart_action-DDA1Pq_I.js";
import { M as ie, B as le } from "./MainScaffold-DrBDE309.js";
import {
  j as fe,
  w as de,
  e as ue,
  g as _e,
  l as ge,
  u as H,
  x as K,
  a as q,
  b as l,
  P as I,
  z as he,
  o as me,
} from "./device_config_data-NyrEEVSW.js";
const ve = "_page_1l66e_1",
  pe = "_title_1l66e_61",
  xe = "_stage_1l66e_75",
  we = "_carousel_1l66e_95",
  ye = "_carousel_scrollable_1l66e_115",
  Ce = "_dragging_1l66e_127",
  be = "_track_1l66e_147",
  De = "_edge_spacer_1l66e_163",
  Le = "_card_1l66e_175",
  Re = "_image_1l66e_201",
  je = "_image_big_1l66e_227",
  Ne = "_image_small_1l66e_235",
  Pe = "_pill_row_1l66e_243",
  Oe = "_pill_1l66e_243",
  Se = "_device_name_1l66e_279",
  Te = "_pill_icons_1l66e_297",
  Me = "_nav_arrow_1l66e_353",
  We = "_nav_left_1l66e_399",
  Ie = "_nav_right_1l66e_407",
  Be = "_fade_1l66e_415",
  Ee = "_fade_left_1l66e_433",
  ke = "_fade_right_1l66e_443",
  Ae = "_footer_1l66e_453",
  $e = "_footer_sun_1l66e_475",
  Ue = "_error_container_1l66e_487",
  n = {
    page: ve,
    title: pe,
    stage: xe,
    carousel: we,
    carousel_scrollable: ye,
    dragging: Ce,
    track: be,
    edge_spacer: De,
    card: Le,
    image: Re,
    image_big: je,
    image_small: Ne,
    pill_row: Pe,
    pill: Oe,
    device_name: Se,
    pill_icons: Te,
    nav_arrow: Me,
    nav_left: We,
    nav_right: Ie,
    fade: Be,
    fade_left: Ee,
    fade_right: ke,
    footer: Ae,
    footer_sun: $e,
    error_container: Ue,
  },
  Xe = "_app_button_3v98x_1",
  ze = { app_button: Xe };
function Fe({
  text: R,
  onClick: _,
  backgroundColor: C,
  textColor: b,
  align: v,
  marginBottom: j,
}) {
  const f = () => (C !== void 0 ? C : ""),
    p = () => (b !== void 0 ? b : ""),
    d = () => (v !== void 0 ? v : "");
  return r.jsx("div", {
    className: ze.app_button,
    style: {
      marginBottom: j,
      backgroundColor: f(),
      color: p(),
      justifyContent: d(),
    },
    onClick: _,
    children: r.jsx("h3", { children: R }),
  });
}
const He = "" + new URL("have-fun-sun-B2SOaR8J.svg", import.meta.url).href,
  Ke = "" + new URL("nomad-Bq_XJWcj.png", import.meta.url).href,
  qe = "" + new URL("knob_1-BtBwnvQT.svg", import.meta.url).href,
  Ve = "" + new URL("framer_f1-BtAjmdcJ.svg", import.meta.url).href,
  Ye = "" + new URL("creato_micro_v2-Bx34qkyw.svg", import.meta.url).href,
  Je = "" + new URL("codex_micro-DmyLnRWU.svg", import.meta.url).href,
  Ze = "" + new URL("xyz-vQXsDFLP.svg", import.meta.url).href,
  Qe = {
    leftPad: 0,
    rightPad: 0,
    viewportWidth: 0,
    initialCenterOffset: 0,
    hasOverflow: !1,
  };
function nt({ handleDeviceConnected: R }) {
  const _ = fe(),
    C = de(),
    b = ue(),
    v = _e(),
    j = ge(),
    f = i.useRef(null),
    p = i.useRef(null),
    d = i.useRef({ down: !1, startX: 0, startScroll: 0, moved: !1 }),
    N = i.useRef(null),
    D = i.useRef(null),
    P = i.useRef(null),
    [B, E] = i.useState(!1),
    [V, O] = i.useState(!1),
    [x, Y] = i.useState(C.state ?? []),
    [J, k] = i.useState(!1),
    [u, Z] = i.useState(Qe),
    { leftPad: Q, rightPad: G, hasOverflow: w } = u,
    A = H((e) => e.setPhase);
  if (
    (i.useEffect(() => {
      x.length <= 1 && _("/");
    }, [x.length, _]),
    i.useLayoutEffect(() => {
      const e = f.current,
        t = p.current;
      if (!e || !t) return;
      const s = () => {
        const c = Array.from(t.querySelectorAll("[data-device-card]"));
        if (c.length === 0) return;
        const a = e.clientWidth,
          g = c[0],
          S = c[c.length - 1],
          T = S.offsetLeft + S.offsetWidth - g.offsetLeft,
          y = Math.floor(c.length / 2),
          M =
            c.length % 2 === 1
              ? c[y].offsetLeft + c[y].offsetWidth / 2 - g.offsetLeft
              : (c[y - 1].offsetLeft + c[y - 1].offsetWidth + c[y].offsetLeft) /
                  2 -
                g.offsetLeft,
          L = Math.min(T, Math.max(0, D.current ?? M)),
          h =
            L > a / 2 || T - L > a / 2
              ? {
                  leftPad: Math.max(0, a / 2 - g.offsetWidth / 2),
                  rightPad: Math.max(0, a / 2 - S.offsetWidth / 2),
                  viewportWidth: a,
                  initialCenterOffset: M,
                  hasOverflow: !0,
                }
              : {
                  leftPad: a / 2 - L,
                  rightPad: a / 2 - (T - L),
                  viewportWidth: a,
                  initialCenterOffset: M,
                  hasOverflow: !1,
                },
          m = N.current;
        (m &&
          m.leftPad === h.leftPad &&
          m.rightPad === h.rightPad &&
          m.viewportWidth === h.viewportWidth &&
          m.initialCenterOffset === h.initialCenterOffset &&
          m.hasOverflow === h.hasOverflow) ||
          ((P.current = D.current), Z(h));
      };
      s();
      const o = new ResizeObserver(s);
      return (o.observe(e), o.observe(t), () => o.disconnect());
    }, [x, B]),
    i.useLayoutEffect(() => {
      const e = f.current;
      if (!e || u.viewportWidth === 0) return;
      const t = P.current ?? u.initialCenterOffset;
      if (!u.hasOverflow) e.scrollLeft = 0;
      else {
        const s = u.leftPad + t - u.viewportWidth / 2,
          o = Math.max(0, e.scrollWidth - e.clientWidth);
        e.scrollLeft = Math.min(o, Math.max(0, s));
      }
      ((N.current = u),
        (D.current = e.scrollLeft + e.clientWidth / 2 - u.leftPad),
        (P.current = null));
    }, [u]),
    i.useEffect(() => {
      const e = v.onDevicesFound((t) => {
        (Y(t), t.length <= 1 && _("/"));
      });
      return () => {
        e();
      };
    }, [v, _]),
    x.length <= 1)
  )
    return null;
  const ee = (e) => {
      const t = f.current;
      !t ||
        !w ||
        e.button !== 0 ||
        (d.current = {
          down: !0,
          startX: e.clientX,
          startScroll: t.scrollLeft,
          moved: !1,
        });
    },
    te = (e) => {
      const t = f.current,
        s = d.current;
      if (!t || !s.down) return;
      const o = e.clientX - s.startX;
      (!s.moved &&
        Math.abs(o) > 5 &&
        ((s.moved = !0), t.setPointerCapture(e.pointerId), k(!0)),
        s.moved && (t.scrollLeft = s.startScroll - o));
    },
    $ = (e) => {
      const t = f.current,
        s = d.current.down && d.current.moved;
      (t != null &&
        t.hasPointerCapture(e.pointerId) &&
        t.releasePointerCapture(e.pointerId),
        (d.current.down = !1),
        k(!1),
        s && oe());
    },
    re = () => {
      const e = f.current,
        t = N.current;
      !e ||
        !t ||
        e.clientWidth !== t.viewportWidth ||
        (D.current = e.scrollLeft + e.clientWidth / 2 - t.leftPad);
    },
    ne = async (e) => {
      if (d.current.moved) {
        d.current.moved = !1;
        return;
      }
      if (!V) {
        (O(!0), E(!1));
        try {
          if ((A(I.connecting), await b.selectAndConnectDevice(e.id))) {
            (j.sendDeviceSelectedEvent(e, he.chooseDevice),
              R(),
              _(me.main, { state: { tab: K.keymap } }));
            return;
          }
        } catch {
          (H.getState().phase !== I.hidUnavailable && A(I.notConnected), O(!1));
          return;
        }
        (E(!0), O(!1));
      }
    },
    se = () => {
      _("/");
    };
  function U() {
    const e = f.current,
      t = p.current;
    if (!e || !t) return [];
    const o = e.getBoundingClientRect().left + e.clientWidth / 2;
    return Array.from(t.querySelectorAll("[data-device-card]")).map((c) => {
      const a = c.getBoundingClientRect();
      return { card: c, centerOffset: a.left + a.width / 2 - o };
    });
  }
  function X(e) {
    const t = f.current;
    if (!t) return;
    const s = t.getBoundingClientRect(),
      o = e.getBoundingClientRect();
    t.scrollTo({
      left: t.scrollLeft + o.left + o.width / 2 - s.left - t.clientWidth / 2,
      behavior: "smooth",
    });
  }
  function oe() {
    const e = U();
    if (e.length === 0) return;
    const t = e.reduce((s, o) =>
      Math.abs(o.centerOffset) < Math.abs(s.centerOffset) ? o : s,
    );
    X(t.card);
  }
  function z(e) {
    const t = U();
    if (t.length === 0) return;
    const s = 2,
      o = t.filter(({ centerOffset: a }) => (e === 1 ? a > s : a < -s));
    if (o.length === 0) return;
    const c = o.reduce((a, g) =>
      Math.abs(g.centerOffset) < Math.abs(a.centerOffset) ? g : a,
    );
    X(c.card);
  }
  const ae = (e) => {
      switch (e.deviceType) {
        case l.DeviceType.NomadE:
        case l.DeviceType.NomadEV2:
          return Ke;
        case l.DeviceType.Knob:
          return qe;
        case l.DeviceType.KnobF1:
          return Ve;
        case l.DeviceType.CreatorMicroV2:
          return Ye;
        case l.DeviceType.CodexMicro:
          return Je;
        case l.DeviceType.XYZ:
          return Ze;
      }
    },
    ce = (e) => {
      switch (e.deviceType) {
        case l.DeviceType.NomadE:
        case l.DeviceType.NomadEV2:
          return !0;
        case l.DeviceType.Knob:
        case l.DeviceType.KnobF1:
          return !0;
        case l.DeviceType.CreatorMicroV2:
          return !1;
        case l.DeviceType.CodexMicro:
          return !1;
        case l.DeviceType.XYZ:
          return !0;
      }
    };
  return r.jsx(ie, {
    changeCurrentScreen: () => {},
    currentScreen: K.undefined,
    children: r.jsxs("div", {
      className: n.page,
      children: [
        r.jsx("h1", {
          className: `${n.title} text-headline-s`,
          children: "Choose your device",
        }),
        B
          ? r.jsx("div", {
              className: n.error_container,
              children: r.jsx(Fe, {
                onClick: se,
                text: "We had an error when trying to connect. Please retry!",
                textColor: "var(--color-text-secondary)",
                backgroundColor: "var(--color-error)",
              }),
            })
          : r.jsxs("div", {
              className: n.stage,
              children: [
                w &&
                  r.jsx("button", {
                    className: `${n.nav_arrow} ${n.nav_left}`,
                    onClick: () => z(-1),
                    "aria-label": "Previous device",
                    children: r.jsx(W, {
                      name: "arrow_back",
                      size: "md",
                      opsz: 15,
                    }),
                  }),
                r.jsx(F.div, {
                  ref: f,
                  className: `${n.carousel} ${J ? n.dragging : ""} ${w ? n.carousel_scrollable : ""}`,
                  onPointerDown: ee,
                  onPointerMove: te,
                  onPointerUp: $,
                  onPointerCancel: $,
                  onScroll: re,
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.4, ease: "easeOut" },
                  children: r.jsxs("div", {
                    className: n.track,
                    ref: p,
                    children: [
                      r.jsx("div", {
                        className: n.edge_spacer,
                        style: { width: Q },
                        "aria-hidden": !0,
                      }),
                      x.map((e) =>
                        r.jsxs(
                          F.div,
                          {
                            "data-device-card": !0,
                            className: n.card,
                            onClick: () => ne(e),
                            whileHover: { scale: 1.02 },
                            transition: { duration: 0.3, ease: "easeOut" },
                            children: [
                              r.jsx("div", {
                                className: `${n.image} ${ce(e) ? n.image_big : n.image_small}`,
                                children: r.jsx("img", {
                                  src: ae(e),
                                  alt: q.getDeviceName(e.deviceType),
                                  draggable: !1,
                                }),
                              }),
                              r.jsxs("div", {
                                className: n.pill_row,
                                children: [
                                  r.jsx("div", {
                                    className: n.pill,
                                    children: r.jsx("span", {
                                      className: `${n.device_name} text-body-small`,
                                      children: q.getDeviceName(e.deviceType),
                                    }),
                                  }),
                                  r.jsxs("div", {
                                    className: n.pill_icons,
                                    children: [
                                      r.jsx(le, { deviceInfo: e }),
                                      r.jsx(W, {
                                        name: e.isUsbConnection
                                          ? "usb"
                                          : "bluetooth",
                                        size: "md",
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          },
                          e.id,
                        ),
                      ),
                      r.jsx("div", {
                        className: n.edge_spacer,
                        style: { width: G },
                        "aria-hidden": !0,
                      }),
                    ],
                  }),
                }),
                w &&
                  r.jsx("button", {
                    className: `${n.nav_arrow} ${n.nav_right}`,
                    onClick: () => z(1),
                    "aria-label": "Next device",
                    children: r.jsx(W, {
                      name: "arrow_forward",
                      size: "md",
                      opsz: 15,
                    }),
                  }),
                w &&
                  r.jsxs(r.Fragment, {
                    children: [
                      r.jsx("div", { className: `${n.fade} ${n.fade_left}` }),
                      r.jsx("div", { className: `${n.fade} ${n.fade_right}` }),
                    ],
                  }),
              ],
            }),
        r.jsxs("div", {
          className: `${n.footer} text-headline-s`,
          children: [
            r.jsx("span", { children: "Have fun!" }),
            r.jsx("img", { className: n.footer_sun, src: He, alt: "" }),
          ],
        }),
      ],
    }),
  });
}
export { nt as default };
