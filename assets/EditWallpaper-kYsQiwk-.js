import { aL as Ye, r as w, j as d, ac as N } from "./smart_action-DDA1Pq_I.js";
import { M as qe } from "./MainScaffold-DrBDE309.js";
import {
  j as $e,
  e as Je,
  B as Qe,
  l as et,
  h as tt,
  u as rt,
  a as _e,
  x as B,
  o as H,
  E as Ce,
  I as be,
  b as D,
  J as ot,
  L as nt,
  N as it,
  M as at,
} from "./device_config_data-NyrEEVSW.js";
var ie = function (n, o) {
  return (
    (ie =
      Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array &&
        function (e, t) {
          e.__proto__ = t;
        }) ||
      function (e, t) {
        for (var r in t)
          Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
      }),
    ie(n, o)
  );
};
function st(n, o) {
  if (typeof o != "function" && o !== null)
    throw new TypeError(
      "Class extends value " + String(o) + " is not a constructor or null",
    );
  ie(n, o);
  function e() {
    this.constructor = n;
  }
  n.prototype =
    o === null ? Object.create(o) : ((e.prototype = o.prototype), new e());
}
var x = function () {
  return (
    (x =
      Object.assign ||
      function (o) {
        for (var e, t = 1, r = arguments.length; t < r; t++) {
          e = arguments[t];
          for (var i in e)
            Object.prototype.hasOwnProperty.call(e, i) && (o[i] = e[i]);
        }
        return o;
      }),
    x.apply(this, arguments)
  );
};
var Se = !1,
  k,
  ae,
  se,
  Q,
  ee,
  je,
  te,
  ce,
  le,
  pe,
  Te,
  ue,
  de,
  Ae,
  Ne;
function E() {
  if (!Se) {
    Se = !0;
    var n = navigator.userAgent,
      o =
        /(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(
          n,
        ),
      e = /(Mac OS X)|(Windows)|(Linux)/.exec(n);
    if (
      ((ue = /\b(iPhone|iP[ao]d)/.exec(n)),
      (de = /\b(iP[ao]d)/.exec(n)),
      (pe = /Android/i.exec(n)),
      (Ae = /FBAN\/\w+;/i.exec(n)),
      (Ne = /Mobile/i.exec(n)),
      (Te = !!/Win64/.exec(n)),
      o)
    ) {
      ((k = o[1] ? parseFloat(o[1]) : o[5] ? parseFloat(o[5]) : NaN),
        k && document && document.documentMode && (k = document.documentMode));
      var t = /(?:Trident\/(\d+.\d+))/.exec(n);
      ((je = t ? parseFloat(t[1]) + 4 : k),
        (ae = o[2] ? parseFloat(o[2]) : NaN),
        (se = o[3] ? parseFloat(o[3]) : NaN),
        (Q = o[4] ? parseFloat(o[4]) : NaN),
        Q
          ? ((o = /(?:Chrome\/(\d+\.\d+))/.exec(n)),
            (ee = o && o[1] ? parseFloat(o[1]) : NaN))
          : (ee = NaN));
    } else k = ae = se = ee = Q = NaN;
    if (e) {
      if (e[1]) {
        var r = /(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(n);
        te = r ? parseFloat(r[1].replace("_", ".")) : !0;
      } else te = !1;
      ((ce = !!e[2]), (le = !!e[3]));
    } else te = ce = le = !1;
  }
}
var he = {
    ie: function () {
      return E() || k;
    },
    ieCompatibilityMode: function () {
      return E() || je > k;
    },
    ie64: function () {
      return he.ie() && Te;
    },
    firefox: function () {
      return E() || ae;
    },
    opera: function () {
      return E() || se;
    },
    webkit: function () {
      return E() || Q;
    },
    safari: function () {
      return he.webkit();
    },
    chrome: function () {
      return E() || ee;
    },
    windows: function () {
      return E() || ce;
    },
    osx: function () {
      return E() || te;
    },
    linux: function () {
      return E() || le;
    },
    iphone: function () {
      return E() || ue;
    },
    mobile: function () {
      return E() || ue || de || pe || Ne;
    },
    nativeApp: function () {
      return E() || Ae;
    },
    android: function () {
      return E() || pe;
    },
    ipad: function () {
      return E() || de;
    },
  },
  ct = he,
  lt = !!(
    typeof window < "u" &&
    window.document &&
    window.document.createElement
  ),
  pt = { canUseDOM: lt },
  ut = pt,
  Fe = ut,
  ke;
Fe.canUseDOM &&
  (ke =
    document.implementation &&
    document.implementation.hasFeature &&
    document.implementation.hasFeature("", "") !== !0);
/**
 * Checks if an event is supported in the current execution environment.
 *
 * NOTE: This will not work correctly for non-generic events such as `change`,
 * `reset`, `load`, `error`, and `select`.
 *
 * Borrows from Modernizr.
 *
 * @param {string} eventNameSuffix Event name, e.g. "click".
 * @param {?boolean} capture Check if the capture phase is supported.
 * @return {boolean} True if the event is supported.
 * @internal
 * @license Modernizr 3.0.0pre (Custom Build) | MIT
 */ function dt(n, o) {
  if (!Fe.canUseDOM || (o && !("addEventListener" in document))) return !1;
  var e = "on" + n,
    t = e in document;
  if (!t) {
    var r = document.createElement("div");
    (r.setAttribute(e, "return;"), (t = typeof r[e] == "function"));
  }
  return (
    !t &&
      ke &&
      n === "wheel" &&
      (t = document.implementation.hasFeature("Events.wheel", "3.0")),
    t
  );
}
var ht = dt,
  ft = ct,
  vt = ht,
  xe = 10,
  Re = 40,
  De = 800;
function We(n) {
  var o = 0,
    e = 0,
    t = 0,
    r = 0;
  return (
    "detail" in n && (e = n.detail),
    "wheelDelta" in n && (e = -n.wheelDelta / 120),
    "wheelDeltaY" in n && (e = -n.wheelDeltaY / 120),
    "wheelDeltaX" in n && (o = -n.wheelDeltaX / 120),
    "axis" in n && n.axis === n.HORIZONTAL_AXIS && ((o = e), (e = 0)),
    (t = o * xe),
    (r = e * xe),
    "deltaY" in n && (r = n.deltaY),
    "deltaX" in n && (t = n.deltaX),
    (t || r) &&
      n.deltaMode &&
      (n.deltaMode == 1 ? ((t *= Re), (r *= Re)) : ((t *= De), (r *= De))),
    t && !o && (o = t < 1 ? -1 : 1),
    r && !e && (e = r < 1 ? -1 : 1),
    { spinX: o, spinY: e, pixelX: t, pixelY: r }
  );
}
We.getEventType = function () {
  return ft.firefox() ? "DOMMouseScroll" : vt("wheel") ? "wheel" : "mousewheel";
};
var mt = We,
  gt = mt;
const wt = Ye(gt);
function yt(n, o, e, t, r, i) {
  i === void 0 && (i = 0);
  var s = Z(n, o, i),
    a = s.width,
    c = s.height,
    l = Math.min(a, e),
    h = Math.min(c, t);
  return l > h * r ? { width: h * r, height: h } : { width: l, height: l / r };
}
function _t(n) {
  return n.width > n.height
    ? n.width / n.naturalWidth
    : n.height / n.naturalHeight;
}
function K(n, o, e, t, r) {
  r === void 0 && (r = 0);
  var i = Z(o.width, o.height, r),
    s = i.width,
    a = i.height;
  return { x: Ee(n.x, s, e.width, t), y: Ee(n.y, a, e.height, t) };
}
function Ee(n, o, e, t) {
  var r = Math.abs((o * t) / 2 - e / 2);
  return re(n, -r, r);
}
function ze(n, o) {
  return Math.sqrt(Math.pow(n.y - o.y, 2) + Math.pow(n.x - o.x, 2));
}
function Pe(n, o) {
  return (Math.atan2(o.y - n.y, o.x - n.x) * 180) / Math.PI;
}
function Ct(n, o, e, t, r, i, s) {
  (i === void 0 && (i = 0), s === void 0 && (s = !0));
  var a = s ? bt : St,
    c = Z(o.width, o.height, i),
    l = Z(o.naturalWidth, o.naturalHeight, i),
    h = {
      x: a(100, (((c.width - e.width / r) / 2 - n.x / r) / c.width) * 100),
      y: a(100, (((c.height - e.height / r) / 2 - n.y / r) / c.height) * 100),
      width: a(100, ((e.width / c.width) * 100) / r),
      height: a(100, ((e.height / c.height) * 100) / r),
    },
    y = Math.round(a(l.width, (h.width * l.width) / 100)),
    f = Math.round(a(l.height, (h.height * l.height) / 100)),
    b = l.width >= l.height * t,
    _ = b
      ? { width: Math.round(f * t), height: f }
      : { width: y, height: Math.round(y / t) },
    m = x(x({}, _), {
      x: Math.round(a(l.width - _.width, (h.x * l.width) / 100)),
      y: Math.round(a(l.height - _.height, (h.y * l.height) / 100)),
    });
  return { croppedAreaPercentages: h, croppedAreaPixels: m };
}
function bt(n, o) {
  return Math.min(n, Math.max(0, o));
}
function St(n, o) {
  return o;
}
function xt(n, o, e, t, r, i) {
  var s = Z(o.width, o.height, e),
    a = re((t.width / s.width) * (100 / n.width), r, i),
    c = {
      x: (a * s.width) / 2 - t.width / 2 - s.width * a * (n.x / 100),
      y: (a * s.height) / 2 - t.height / 2 - s.height * a * (n.y / 100),
    };
  return { crop: c, zoom: a };
}
function Rt(n, o, e) {
  var t = _t(o);
  return e.height > e.width
    ? e.height / (n.height * t)
    : e.width / (n.width * t);
}
function Dt(n, o, e, t, r, i) {
  e === void 0 && (e = 0);
  var s = Z(o.naturalWidth, o.naturalHeight, e),
    a = re(Rt(n, o, t), r, i),
    c = t.height > t.width ? t.height / n.height : t.width / n.width,
    l = {
      x: ((s.width - n.width) / 2 - n.x) * c,
      y: ((s.height - n.height) / 2 - n.y) * c,
    };
  return { crop: l, zoom: a };
}
function Me(n, o) {
  return { x: (o.x + n.x) / 2, y: (o.y + n.y) / 2 };
}
function Et(n) {
  return (n * Math.PI) / 180;
}
function Z(n, o, e) {
  var t = Et(e);
  return {
    width: Math.abs(Math.cos(t) * n) + Math.abs(Math.sin(t) * o),
    height: Math.abs(Math.sin(t) * n) + Math.abs(Math.cos(t) * o),
  };
}
function re(n, o, e) {
  return Math.min(Math.max(n, o), e);
}
function J() {
  for (var n = [], o = 0; o < arguments.length; o++) n[o] = arguments[o];
  return n
    .filter(function (e) {
      return typeof e == "string" && e.length > 0;
    })
    .join(" ")
    .trim();
}
var zt = `.reactEasyCrop_Container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  user-select: none;
  touch-action: none;
  cursor: move;
  display: flex;
  justify-content: center;
  align-items: center;
}

.reactEasyCrop_Image,
.reactEasyCrop_Video {
  will-change: transform; /* this improves performances and prevent painting issues on iOS Chrome */
}

.reactEasyCrop_Contain {
  max-width: 100%;
  max-height: 100%;
  margin: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.reactEasyCrop_Cover_Horizontal {
  width: 100%;
  height: auto;
}
.reactEasyCrop_Cover_Vertical {
  width: auto;
  height: 100%;
}

.reactEasyCrop_CropArea {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-sizing: border-box;
  box-shadow: 0 0 0 9999em;
  color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

.reactEasyCrop_CropAreaRound {
  border-radius: 50%;
}

.reactEasyCrop_CropAreaGrid::before {
  content: ' ';
  box-sizing: border-box;
  position: absolute;
  border: 1px solid rgba(255, 255, 255, 0.5);
  top: 0;
  bottom: 0;
  left: 33.33%;
  right: 33.33%;
  border-top: 0;
  border-bottom: 0;
}

.reactEasyCrop_CropAreaGrid::after {
  content: ' ';
  box-sizing: border-box;
  position: absolute;
  border: 1px solid rgba(255, 255, 255, 0.5);
  top: 33.33%;
  bottom: 33.33%;
  left: 0;
  right: 0;
  border-left: 0;
  border-right: 0;
}
`,
  Pt = 1,
  Mt = 3,
  jt = 1,
  Tt = (function (n) {
    st(o, n);
    function o() {
      var e = (n !== null && n.apply(this, arguments)) || this;
      return (
        (e.cropperRef = w.createRef()),
        (e.imageRef = w.createRef()),
        (e.videoRef = w.createRef()),
        (e.containerPosition = { x: 0, y: 0 }),
        (e.containerRef = null),
        (e.styleRef = null),
        (e.containerRect = null),
        (e.mediaSize = {
          width: 0,
          height: 0,
          naturalWidth: 0,
          naturalHeight: 0,
        }),
        (e.dragStartPosition = { x: 0, y: 0 }),
        (e.dragStartCrop = { x: 0, y: 0 }),
        (e.gestureZoomStart = 0),
        (e.gestureRotationStart = 0),
        (e.isTouching = !1),
        (e.lastPinchDistance = 0),
        (e.lastPinchRotation = 0),
        (e.rafDragTimeout = null),
        (e.rafPinchTimeout = null),
        (e.wheelTimer = null),
        (e.currentDoc = typeof document < "u" ? document : null),
        (e.currentWindow = typeof window < "u" ? window : null),
        (e.resizeObserver = null),
        (e.previousCropSize = null),
        (e.isInitialized = !1),
        (e.state = {
          cropSize: null,
          hasWheelJustStarted: !1,
          mediaObjectFit: void 0,
        }),
        (e.initResizeObserver = function () {
          if (!(typeof window.ResizeObserver > "u" || !e.containerRef)) {
            var t = !0;
            ((e.resizeObserver = new window.ResizeObserver(function (r) {
              if (t) {
                t = !1;
                return;
              }
              e.computeSizes();
            })),
              e.resizeObserver.observe(e.containerRef));
          }
        }),
        (e.preventZoomSafari = function (t) {
          return t.preventDefault();
        }),
        (e.cleanEvents = function () {
          e.currentDoc &&
            (e.currentDoc.removeEventListener("mousemove", e.onMouseMove),
            e.currentDoc.removeEventListener("mouseup", e.onDragStopped),
            e.currentDoc.removeEventListener("touchmove", e.onTouchMove),
            e.currentDoc.removeEventListener("touchend", e.onDragStopped),
            e.currentDoc.removeEventListener(
              "gesturechange",
              e.onGestureChange,
            ),
            e.currentDoc.removeEventListener("gestureend", e.onGestureEnd),
            e.currentDoc.removeEventListener("scroll", e.onScroll));
        }),
        (e.clearScrollEvent = function () {
          (e.containerRef &&
            e.containerRef.removeEventListener("wheel", e.onWheel),
            e.wheelTimer && clearTimeout(e.wheelTimer));
        }),
        (e.onMediaLoad = function () {
          var t = e.computeSizes();
          (t &&
            ((e.previousCropSize = t),
            e.emitCropData(),
            e.setInitialCrop(t),
            (e.isInitialized = !0)),
            e.props.onMediaLoaded && e.props.onMediaLoaded(e.mediaSize));
        }),
        (e.setInitialCrop = function (t) {
          if (e.props.initialCroppedAreaPercentages) {
            var r = xt(
                e.props.initialCroppedAreaPercentages,
                e.mediaSize,
                e.props.rotation,
                t,
                e.props.minZoom,
                e.props.maxZoom,
              ),
              i = r.crop,
              s = r.zoom;
            (e.props.onCropChange(i),
              e.props.onZoomChange && e.props.onZoomChange(s));
          } else if (e.props.initialCroppedAreaPixels) {
            var a = Dt(
                e.props.initialCroppedAreaPixels,
                e.mediaSize,
                e.props.rotation,
                t,
                e.props.minZoom,
                e.props.maxZoom,
              ),
              i = a.crop,
              s = a.zoom;
            (e.props.onCropChange(i),
              e.props.onZoomChange && e.props.onZoomChange(s));
          }
        }),
        (e.computeSizes = function () {
          var t,
            r,
            i,
            s,
            a,
            c,
            l = e.imageRef.current || e.videoRef.current;
          if (l && e.containerRef) {
            ((e.containerRect = e.containerRef.getBoundingClientRect()),
              e.saveContainerPosition());
            var h = e.containerRect.width / e.containerRect.height,
              y =
                ((t = e.imageRef.current) === null || t === void 0
                  ? void 0
                  : t.naturalWidth) ||
                ((r = e.videoRef.current) === null || r === void 0
                  ? void 0
                  : r.videoWidth) ||
                0,
              f =
                ((i = e.imageRef.current) === null || i === void 0
                  ? void 0
                  : i.naturalHeight) ||
                ((s = e.videoRef.current) === null || s === void 0
                  ? void 0
                  : s.videoHeight) ||
                0,
              b = l.offsetWidth < y || l.offsetHeight < f,
              _ = y / f,
              m = void 0;
            if (b)
              switch (e.state.mediaObjectFit) {
                default:
                case "contain":
                  m =
                    h > _
                      ? {
                          width: e.containerRect.height * _,
                          height: e.containerRect.height,
                        }
                      : {
                          width: e.containerRect.width,
                          height: e.containerRect.width / _,
                        };
                  break;
                case "horizontal-cover":
                  m = {
                    width: e.containerRect.width,
                    height: e.containerRect.width / _,
                  };
                  break;
                case "vertical-cover":
                  m = {
                    width: e.containerRect.height * _,
                    height: e.containerRect.height,
                  };
                  break;
              }
            else m = { width: l.offsetWidth, height: l.offsetHeight };
            ((e.mediaSize = x(x({}, m), { naturalWidth: y, naturalHeight: f })),
              e.props.setMediaSize && e.props.setMediaSize(e.mediaSize));
            var R = e.props.cropSize
              ? e.props.cropSize
              : yt(
                  e.mediaSize.width,
                  e.mediaSize.height,
                  e.containerRect.width,
                  e.containerRect.height,
                  e.props.aspect,
                  e.props.rotation,
                );
            return (
              (((a = e.state.cropSize) === null || a === void 0
                ? void 0
                : a.height) !== R.height ||
                ((c = e.state.cropSize) === null || c === void 0
                  ? void 0
                  : c.width) !== R.width) &&
                e.props.onCropSizeChange &&
                e.props.onCropSizeChange(R),
              e.setState({ cropSize: R }, e.recomputeCropPosition),
              e.props.setCropSize && e.props.setCropSize(R),
              R
            );
          }
        }),
        (e.saveContainerPosition = function () {
          if (e.containerRef) {
            var t = e.containerRef.getBoundingClientRect();
            e.containerPosition = { x: t.left, y: t.top };
          }
        }),
        (e.onMouseDown = function (t) {
          e.currentDoc &&
            (t.preventDefault(),
            e.currentDoc.addEventListener("mousemove", e.onMouseMove),
            e.currentDoc.addEventListener("mouseup", e.onDragStopped),
            e.saveContainerPosition(),
            e.onDragStart(o.getMousePoint(t)));
        }),
        (e.onMouseMove = function (t) {
          return e.onDrag(o.getMousePoint(t));
        }),
        (e.onScroll = function (t) {
          e.currentDoc && (t.preventDefault(), e.saveContainerPosition());
        }),
        (e.onTouchStart = function (t) {
          e.currentDoc &&
            ((e.isTouching = !0),
            !(e.props.onTouchRequest && !e.props.onTouchRequest(t)) &&
              (e.currentDoc.addEventListener("touchmove", e.onTouchMove, {
                passive: !1,
              }),
              e.currentDoc.addEventListener("touchend", e.onDragStopped),
              e.saveContainerPosition(),
              t.touches.length === 2
                ? e.onPinchStart(t)
                : t.touches.length === 1 &&
                  e.onDragStart(o.getTouchPoint(t.touches[0]))));
        }),
        (e.onTouchMove = function (t) {
          (t.preventDefault(),
            t.touches.length === 2
              ? e.onPinchMove(t)
              : t.touches.length === 1 &&
                e.onDrag(o.getTouchPoint(t.touches[0])));
        }),
        (e.onGestureStart = function (t) {
          e.currentDoc &&
            (t.preventDefault(),
            e.currentDoc.addEventListener("gesturechange", e.onGestureChange),
            e.currentDoc.addEventListener("gestureend", e.onGestureEnd),
            (e.gestureZoomStart = e.props.zoom),
            (e.gestureRotationStart = e.props.rotation));
        }),
        (e.onGestureChange = function (t) {
          if ((t.preventDefault(), !e.isTouching)) {
            var r = o.getMousePoint(t),
              i = e.gestureZoomStart - 1 + t.scale;
            if (
              (e.setNewZoom(i, r, { shouldUpdatePosition: !0 }),
              e.props.onRotationChange)
            ) {
              var s = e.gestureRotationStart + t.rotation;
              e.props.onRotationChange(s);
            }
          }
        }),
        (e.onGestureEnd = function (t) {
          e.cleanEvents();
        }),
        (e.onDragStart = function (t) {
          var r,
            i,
            s = t.x,
            a = t.y;
          ((e.dragStartPosition = { x: s, y: a }),
            (e.dragStartCrop = x({}, e.props.crop)),
            (i = (r = e.props).onInteractionStart) === null ||
              i === void 0 ||
              i.call(r));
        }),
        (e.onDrag = function (t) {
          var r = t.x,
            i = t.y;
          e.currentWindow &&
            (e.rafDragTimeout &&
              e.currentWindow.cancelAnimationFrame(e.rafDragTimeout),
            (e.rafDragTimeout = e.currentWindow.requestAnimationFrame(
              function () {
                if (e.state.cropSize && !(r === void 0 || i === void 0)) {
                  var s = r - e.dragStartPosition.x,
                    a = i - e.dragStartPosition.y,
                    c = { x: e.dragStartCrop.x + s, y: e.dragStartCrop.y + a },
                    l = e.props.restrictPosition
                      ? K(
                          c,
                          e.mediaSize,
                          e.state.cropSize,
                          e.props.zoom,
                          e.props.rotation,
                        )
                      : c;
                  e.props.onCropChange(l);
                }
              },
            )));
        }),
        (e.onDragStopped = function () {
          var t, r;
          ((e.isTouching = !1),
            e.cleanEvents(),
            e.emitCropData(),
            (r = (t = e.props).onInteractionEnd) === null ||
              r === void 0 ||
              r.call(t));
        }),
        (e.onWheel = function (t) {
          if (
            e.currentWindow &&
            !(e.props.onWheelRequest && !e.props.onWheelRequest(t))
          ) {
            t.preventDefault();
            var r = o.getMousePoint(t),
              i = wt(t).pixelY,
              s = e.props.zoom - (i * e.props.zoomSpeed) / 200;
            (e.setNewZoom(s, r, { shouldUpdatePosition: !0 }),
              e.state.hasWheelJustStarted ||
                e.setState({ hasWheelJustStarted: !0 }, function () {
                  var a, c;
                  return (c = (a = e.props).onInteractionStart) === null ||
                    c === void 0
                    ? void 0
                    : c.call(a);
                }),
              e.wheelTimer && clearTimeout(e.wheelTimer),
              (e.wheelTimer = e.currentWindow.setTimeout(function () {
                return e.setState({ hasWheelJustStarted: !1 }, function () {
                  var a, c;
                  return (c = (a = e.props).onInteractionEnd) === null ||
                    c === void 0
                    ? void 0
                    : c.call(a);
                });
              }, 250)));
          }
        }),
        (e.getPointOnContainer = function (t, r) {
          var i = t.x,
            s = t.y;
          if (!e.containerRect) throw new Error("The Cropper is not mounted");
          return {
            x: e.containerRect.width / 2 - (i - r.x),
            y: e.containerRect.height / 2 - (s - r.y),
          };
        }),
        (e.getPointOnMedia = function (t) {
          var r = t.x,
            i = t.y,
            s = e.props,
            a = s.crop,
            c = s.zoom;
          return { x: (r + a.x) / c, y: (i + a.y) / c };
        }),
        (e.setNewZoom = function (t, r, i) {
          var s = i === void 0 ? {} : i,
            a = s.shouldUpdatePosition,
            c = a === void 0 ? !0 : a;
          if (!(!e.state.cropSize || !e.props.onZoomChange)) {
            var l = re(t, e.props.minZoom, e.props.maxZoom);
            if (c) {
              var h = e.getPointOnContainer(r, e.containerPosition),
                y = e.getPointOnMedia(h),
                f = { x: y.x * l - h.x, y: y.y * l - h.y },
                b = e.props.restrictPosition
                  ? K(f, e.mediaSize, e.state.cropSize, l, e.props.rotation)
                  : f;
              e.props.onCropChange(b);
            }
            e.props.onZoomChange(l);
          }
        }),
        (e.getCropData = function () {
          if (!e.state.cropSize) return null;
          var t = e.props.restrictPosition
            ? K(
                e.props.crop,
                e.mediaSize,
                e.state.cropSize,
                e.props.zoom,
                e.props.rotation,
              )
            : e.props.crop;
          return Ct(
            t,
            e.mediaSize,
            e.state.cropSize,
            e.getAspect(),
            e.props.zoom,
            e.props.rotation,
            e.props.restrictPosition,
          );
        }),
        (e.emitCropData = function () {
          var t = e.getCropData();
          if (t) {
            var r = t.croppedAreaPercentages,
              i = t.croppedAreaPixels;
            (e.props.onCropComplete && e.props.onCropComplete(r, i),
              e.props.onCropAreaChange && e.props.onCropAreaChange(r, i));
          }
        }),
        (e.emitCropAreaChange = function () {
          var t = e.getCropData();
          if (t) {
            var r = t.croppedAreaPercentages,
              i = t.croppedAreaPixels;
            e.props.onCropAreaChange && e.props.onCropAreaChange(r, i);
          }
        }),
        (e.recomputeCropPosition = function () {
          var t, r;
          if (e.state.cropSize) {
            var i = e.props.crop;
            if (
              e.isInitialized &&
              !((t = e.previousCropSize) === null || t === void 0) &&
              t.width &&
              !((r = e.previousCropSize) === null || r === void 0) &&
              r.height
            ) {
              var s =
                Math.abs(e.previousCropSize.width - e.state.cropSize.width) >
                  1e-6 ||
                Math.abs(e.previousCropSize.height - e.state.cropSize.height) >
                  1e-6;
              if (s) {
                var a = e.state.cropSize.width / e.previousCropSize.width,
                  c = e.state.cropSize.height / e.previousCropSize.height;
                i = { x: e.props.crop.x * a, y: e.props.crop.y * c };
              }
            }
            var l = e.props.restrictPosition
              ? K(
                  i,
                  e.mediaSize,
                  e.state.cropSize,
                  e.props.zoom,
                  e.props.rotation,
                )
              : i;
            ((e.previousCropSize = e.state.cropSize),
              e.props.onCropChange(l),
              e.emitCropData());
          }
        }),
        (e.onKeyDown = function (t) {
          var r,
            i,
            s = e.props,
            a = s.crop,
            c = s.onCropChange,
            l = s.keyboardStep,
            h = s.zoom,
            y = s.rotation,
            f = l;
          if (e.state.cropSize) {
            t.shiftKey && (f *= 0.2);
            var b = x({}, a);
            switch (t.key) {
              case "ArrowUp":
                ((b.y -= f), t.preventDefault());
                break;
              case "ArrowDown":
                ((b.y += f), t.preventDefault());
                break;
              case "ArrowLeft":
                ((b.x -= f), t.preventDefault());
                break;
              case "ArrowRight":
                ((b.x += f), t.preventDefault());
                break;
              default:
                return;
            }
            (e.props.restrictPosition &&
              (b = K(b, e.mediaSize, e.state.cropSize, h, y)),
              t.repeat ||
                (i = (r = e.props).onInteractionStart) === null ||
                i === void 0 ||
                i.call(r),
              c(b));
          }
        }),
        (e.onKeyUp = function (t) {
          var r, i;
          switch (t.key) {
            case "ArrowUp":
            case "ArrowDown":
            case "ArrowLeft":
            case "ArrowRight":
              t.preventDefault();
              break;
            default:
              return;
          }
          (e.emitCropData(),
            (i = (r = e.props).onInteractionEnd) === null ||
              i === void 0 ||
              i.call(r));
        }),
        e
      );
    }
    return (
      (o.prototype.componentDidMount = function () {
        !this.currentDoc ||
          !this.currentWindow ||
          (this.containerRef &&
            (this.containerRef.ownerDocument &&
              (this.currentDoc = this.containerRef.ownerDocument),
            this.currentDoc.defaultView &&
              (this.currentWindow = this.currentDoc.defaultView),
            this.initResizeObserver(),
            typeof window.ResizeObserver > "u" &&
              this.currentWindow.addEventListener("resize", this.computeSizes),
            this.props.zoomWithScroll &&
              this.containerRef.addEventListener("wheel", this.onWheel, {
                passive: !1,
              }),
            this.containerRef.addEventListener(
              "gesturestart",
              this.onGestureStart,
            )),
          this.currentDoc.addEventListener("scroll", this.onScroll),
          this.props.disableAutomaticStylesInjection ||
            ((this.styleRef = this.currentDoc.createElement("style")),
            this.styleRef.setAttribute("type", "text/css"),
            this.props.nonce &&
              this.styleRef.setAttribute("nonce", this.props.nonce),
            (this.styleRef.innerHTML = zt),
            this.currentDoc.head.appendChild(this.styleRef)),
          this.imageRef.current &&
            this.imageRef.current.complete &&
            this.onMediaLoad(),
          this.props.setImageRef && this.props.setImageRef(this.imageRef),
          this.props.setVideoRef && this.props.setVideoRef(this.videoRef),
          this.props.setCropperRef &&
            this.props.setCropperRef(this.cropperRef));
      }),
      (o.prototype.componentWillUnmount = function () {
        var e, t;
        !this.currentDoc ||
          !this.currentWindow ||
          (typeof window.ResizeObserver > "u" &&
            this.currentWindow.removeEventListener("resize", this.computeSizes),
          (e = this.resizeObserver) === null || e === void 0 || e.disconnect(),
          this.containerRef &&
            this.containerRef.removeEventListener(
              "gesturestart",
              this.preventZoomSafari,
            ),
          this.styleRef &&
            ((t = this.styleRef.parentNode) === null ||
              t === void 0 ||
              t.removeChild(this.styleRef)),
          this.cleanEvents(),
          this.props.zoomWithScroll && this.clearScrollEvent());
      }),
      (o.prototype.componentDidUpdate = function (e) {
        var t, r, i, s, a, c, l, h, y;
        (e.rotation !== this.props.rotation
          ? (this.computeSizes(), this.recomputeCropPosition())
          : e.aspect !== this.props.aspect
            ? this.computeSizes()
            : e.objectFit !== this.props.objectFit
              ? this.computeSizes()
              : e.zoom !== this.props.zoom
                ? this.recomputeCropPosition()
                : ((t = e.cropSize) === null || t === void 0
                      ? void 0
                      : t.height) !==
                      ((r = this.props.cropSize) === null || r === void 0
                        ? void 0
                        : r.height) ||
                    ((i = e.cropSize) === null || i === void 0
                      ? void 0
                      : i.width) !==
                      ((s = this.props.cropSize) === null || s === void 0
                        ? void 0
                        : s.width)
                  ? this.computeSizes()
                  : (((a = e.crop) === null || a === void 0 ? void 0 : a.x) !==
                      ((c = this.props.crop) === null || c === void 0
                        ? void 0
                        : c.x) ||
                      ((l = e.crop) === null || l === void 0 ? void 0 : l.y) !==
                        ((h = this.props.crop) === null || h === void 0
                          ? void 0
                          : h.y)) &&
                    this.emitCropAreaChange(),
          e.zoomWithScroll !== this.props.zoomWithScroll &&
            this.containerRef &&
            (this.props.zoomWithScroll
              ? this.containerRef.addEventListener("wheel", this.onWheel, {
                  passive: !1,
                })
              : this.clearScrollEvent()),
          e.video !== this.props.video &&
            ((y = this.videoRef.current) === null || y === void 0 || y.load()));
        var f = this.getObjectFit();
        f !== this.state.mediaObjectFit &&
          this.setState({ mediaObjectFit: f }, this.computeSizes);
      }),
      (o.prototype.getAspect = function () {
        var e = this.props,
          t = e.cropSize,
          r = e.aspect;
        return t ? t.width / t.height : r;
      }),
      (o.prototype.getObjectFit = function () {
        var e, t, r, i;
        if (this.props.objectFit === "cover") {
          var s = this.imageRef.current || this.videoRef.current;
          if (s && this.containerRef) {
            this.containerRect = this.containerRef.getBoundingClientRect();
            var a = this.containerRect.width / this.containerRect.height,
              c =
                ((e = this.imageRef.current) === null || e === void 0
                  ? void 0
                  : e.naturalWidth) ||
                ((t = this.videoRef.current) === null || t === void 0
                  ? void 0
                  : t.videoWidth) ||
                0,
              l =
                ((r = this.imageRef.current) === null || r === void 0
                  ? void 0
                  : r.naturalHeight) ||
                ((i = this.videoRef.current) === null || i === void 0
                  ? void 0
                  : i.videoHeight) ||
                0,
              h = c / l;
            return h < a ? "horizontal-cover" : "vertical-cover";
          }
          return "horizontal-cover";
        }
        return this.props.objectFit;
      }),
      (o.prototype.onPinchStart = function (e) {
        var t = o.getTouchPoint(e.touches[0]),
          r = o.getTouchPoint(e.touches[1]);
        ((this.lastPinchDistance = ze(t, r)),
          (this.lastPinchRotation = Pe(t, r)),
          this.onDragStart(Me(t, r)));
      }),
      (o.prototype.onPinchMove = function (e) {
        var t = this;
        if (!(!this.currentDoc || !this.currentWindow)) {
          var r = o.getTouchPoint(e.touches[0]),
            i = o.getTouchPoint(e.touches[1]),
            s = Me(r, i);
          (this.onDrag(s),
            this.rafPinchTimeout &&
              this.currentWindow.cancelAnimationFrame(this.rafPinchTimeout),
            (this.rafPinchTimeout = this.currentWindow.requestAnimationFrame(
              function () {
                var a = ze(r, i),
                  c = t.props.zoom * (a / t.lastPinchDistance);
                (t.setNewZoom(c, s, { shouldUpdatePosition: !1 }),
                  (t.lastPinchDistance = a));
                var l = Pe(r, i),
                  h = t.props.rotation + (l - t.lastPinchRotation);
                (t.props.onRotationChange && t.props.onRotationChange(h),
                  (t.lastPinchRotation = l));
              },
            )));
        }
      }),
      (o.prototype.render = function () {
        var e = this,
          t,
          r = this.props,
          i = r.image,
          s = r.video,
          a = r.mediaProps,
          c = r.cropperProps,
          l = r.transform,
          h = r.crop,
          y = h.x,
          f = h.y,
          b = r.rotation,
          _ = r.zoom,
          m = r.cropShape,
          R = r.showGrid,
          U = r.roundCropAreaPixels,
          W = r.style,
          X = W.containerStyle,
          V = W.cropAreaStyle,
          Y = W.mediaStyle,
          O = r.classes,
          oe = O.containerClassName,
          q = O.cropAreaClassName,
          $ = O.mediaClassName,
          A =
            (t = this.state.mediaObjectFit) !== null && t !== void 0
              ? t
              : this.getObjectFit();
        return w.createElement(
          "div",
          {
            onMouseDown: this.onMouseDown,
            onTouchStart: this.onTouchStart,
            ref: function (z) {
              return (e.containerRef = z);
            },
            "data-testid": "container",
            style: X,
            className: J("reactEasyCrop_Container", oe),
          },
          i
            ? w.createElement(
                "img",
                x(
                  {
                    alt: "",
                    className: J(
                      "reactEasyCrop_Image",
                      A === "contain" && "reactEasyCrop_Contain",
                      A === "horizontal-cover" &&
                        "reactEasyCrop_Cover_Horizontal",
                      A === "vertical-cover" && "reactEasyCrop_Cover_Vertical",
                      $,
                    ),
                  },
                  a,
                  {
                    src: i,
                    ref: this.imageRef,
                    style: x(x({}, Y), {
                      transform:
                        l ||
                        "translate("
                          .concat(y, "px, ")
                          .concat(f, "px) rotate(")
                          .concat(b, "deg) scale(")
                          .concat(_, ")"),
                    }),
                    onLoad: this.onMediaLoad,
                  },
                ),
              )
            : s &&
                w.createElement(
                  "video",
                  x(
                    {
                      autoPlay: !0,
                      playsInline: !0,
                      loop: !0,
                      muted: !0,
                      className: J(
                        "reactEasyCrop_Video",
                        A === "contain" && "reactEasyCrop_Contain",
                        A === "horizontal-cover" &&
                          "reactEasyCrop_Cover_Horizontal",
                        A === "vertical-cover" &&
                          "reactEasyCrop_Cover_Vertical",
                        $,
                      ),
                    },
                    a,
                    {
                      ref: this.videoRef,
                      onLoadedMetadata: this.onMediaLoad,
                      style: x(x({}, Y), {
                        transform:
                          l ||
                          "translate("
                            .concat(y, "px, ")
                            .concat(f, "px) rotate(")
                            .concat(b, "deg) scale(")
                            .concat(_, ")"),
                      }),
                      controls: !1,
                    },
                  ),
                  (Array.isArray(s) ? s : [{ src: s }]).map(function (F) {
                    return w.createElement("source", x({ key: F.src }, F));
                  }),
                ),
          this.state.cropSize &&
            w.createElement(
              "div",
              x(
                {
                  ref: this.cropperRef,
                  style: x(x({}, V), {
                    width: U
                      ? Math.round(this.state.cropSize.width)
                      : this.state.cropSize.width,
                    height: U
                      ? Math.round(this.state.cropSize.height)
                      : this.state.cropSize.height,
                  }),
                  tabIndex: 0,
                  onKeyDown: this.onKeyDown,
                  onKeyUp: this.onKeyUp,
                  "data-testid": "cropper",
                  className: J(
                    "reactEasyCrop_CropArea",
                    m === "round" && "reactEasyCrop_CropAreaRound",
                    R && "reactEasyCrop_CropAreaGrid",
                    q,
                  ),
                },
                c,
              ),
            ),
        );
      }),
      (o.defaultProps = {
        zoom: 1,
        rotation: 0,
        aspect: 4 / 3,
        maxZoom: Mt,
        minZoom: Pt,
        cropShape: "rect",
        objectFit: "contain",
        showGrid: !0,
        style: {},
        classes: {},
        mediaProps: {},
        cropperProps: {},
        zoomSpeed: 1,
        restrictPosition: !0,
        zoomWithScroll: !0,
        keyboardStep: jt,
      }),
      (o.getMousePoint = function (e) {
        return { x: Number(e.clientX), y: Number(e.clientY) };
      }),
      (o.getTouchPoint = function (e) {
        return { x: Number(e.clientX), y: Number(e.clientY) };
      }),
      o
    );
  })(w.Component);
const At = "_editor_askwj_1",
  Nt = "_landing_askwj_21",
  Ft = "_landing_top_askwj_37",
  kt = "_wallpaper_image_askwj_49",
  Wt = "_preview_askwj_59",
  Ot = "_helper_askwj_73",
  It = "_actions_row_askwj_93",
  Lt = "_crop_stack_askwj_109",
  Zt = "_crop_image_askwj_123",
  Ut = "_crop_toolbar_askwj_135",
  Gt = "_crop_group_askwj_155",
  Bt = "_crop_label_askwj_167",
  Ht = "_crop_divider_askwj_187",
  Kt = "_zoom_slider_askwj_199",
  Xt = "_uploading_askwj_275",
  Vt = "_wallpaper_message_askwj_321",
  Yt = "_actions_column_askwj_335",
  S = {
    editor: At,
    landing: Nt,
    landing_top: Ft,
    wallpaper_image: kt,
    preview: Wt,
    helper: Ot,
    actions_row: It,
    crop_stack: Lt,
    crop_image: Zt,
    crop_toolbar: Ut,
    crop_group: Gt,
    crop_label: Bt,
    crop_divider: Ht,
    zoom_slider: Kt,
    uploading: Xt,
    wallpaper_message: Vt,
    actions_column: Yt,
  };
function Qt() {
  const n = $e(),
    o = Je(),
    e = Qe(),
    t = et(),
    r = tt(),
    [i, s] = w.useState(void 0),
    a = w.useRef(null),
    [c, l] = w.useState(),
    [h, y] = w.useState({ x: 0, y: 0 }),
    [f, b] = w.useState(1),
    [_, m] = w.useState(0),
    [R, U] = w.useState(null),
    [W, X] = w.useState(null),
    [V, Y] = w.useState(void 0),
    [O, oe] = w.useState(void 0),
    [q, $] = w.useState(void 0),
    [A, F] = w.useState(void 0),
    z = rt((p) => p.deviceInfo),
    ne = _e.deviceHasNewGifFlow(z),
    fe = w.useCallback(async () => {
      const p = await (e == null ? void 0 : e.getWallpaper());
      if (p !== void 0) {
        const g = p.data.buffer.slice(
            p.data.byteOffset,
            p.data.byteOffset + p.data.byteLength,
          ),
          v = new Blob([g], { type: p.mimeType }),
          C = URL.createObjectURL(v);
        s(C);
      }
    }, [e]);
  w.useEffect(() => {
    fe();
    const g = setInterval(async () => {
      if ((await o.isConnected()) === !1) {
        n(H.main, { state: { tab: B.keymap } });
        return;
      }
    }, 1e3);
    return () => {
      clearInterval(g);
    };
  }, [fe, o, n]);
  const ve = (p) => {
      b(p);
    },
    Oe = (p, g) => {
      U(g);
    },
    Ie = () => {
      var p;
      _ !== 1 &&
        (a.current && (a.current.value = ""),
        (p = a == null ? void 0 : a.current) == null || p.click());
    },
    Le = async (p, g, v, C) => {
      const P = document.createElement("canvas"),
        j = P.getContext("2d");
      if (!j) return;
      ((P.width = g.width),
        (P.height = g.height),
        j.drawImage(p, g.x, g.y, g.width, g.height, 0, 0, g.width, g.height));
      const M = document.createElement("canvas"),
        u = M.getContext("2d"),
        T = 12;
      return (
        (M.width = v),
        (M.height = C),
        u == null || u.beginPath(),
        u == null || u.moveTo(T, 0),
        u == null || u.arcTo(v, 0, v, C, T),
        u == null || u.arcTo(v, C, 0, C, T),
        u == null || u.arcTo(0, C, 0, 0, T),
        u == null || u.arcTo(0, 0, v, 0, T),
        u == null || u.closePath(),
        u == null || u.clip(),
        u == null || u.drawImage(P, 0, 0, I(), L()),
        new Promise((Ve) => {
          M.toBlob((ye) => (ye != null && Ve(ye.arrayBuffer()), null));
        })
      );
    },
    me = async (p, g) => {
      let v = 2;
      try {
        let C;
        for (
          (z.deviceType === D.DeviceType.Knob ||
            z.deviceType === D.DeviceType.KnobF1) &&
          (C = (await imageChannel.getAccentColorFromImage(p)).replace(
            "#",
            "",
          ));
          v > 0;
        ) {
          if (await (e == null ? void 0 : e.addNewWallpaper(p, g, C)))
            return !0;
          v -= 1;
        }
        return !1;
      } catch (C) {
        return (console.log(C), !1);
      }
    },
    ge = async () => {
      if (_ == 1 || W === null || R === null) return;
      if ((m(1), O === "image/gif" && V)) {
        if (!ne) {
          m(2);
          return;
        }
        const C = await imageChannel.cropGifImage(
          V,
          R.x,
          R.y,
          R.width,
          R.height,
          I(),
          L(),
          q,
        );
        if (!C) {
          m(2);
          return;
        }
        if (!(await me(C, Ce.gif))) {
          m(2);
          return;
        }
        (await r.getDeviceConfigAsync(z),
          m(0),
          t.sendAddWallpaperEvent(!i),
          n(H.main, { state: { tab: B.widgets } }));
        return;
      }
      const p = await Le(W, R, I(), L());
      if (p == null) {
        m(2);
        return;
      }
      const g = new Uint8Array(p);
      if (!(await me(g, Ce.static))) {
        m(2);
        return;
      }
      (await r.getDeviceConfigAsync(z),
        m(0),
        t.sendAddWallpaperEvent(!i),
        n(H.main, { state: { tab: B.widgets } }));
    },
    we = async (p, g, v) => {
      const C = await new Promise((P, j) => {
        const M = new FileReader();
        ((M.onload = (u) => {
          if (u.target === null || u.target.result === null) {
            j(new Error("Image is null"));
            return;
          }
          const T = new Image();
          ((T.onload = () => P({ src: u.target.result, image: T })),
            (T.onerror = () => j(new Error("Cannot decode image"))),
            (T.src = u.target.result));
        }),
          (M.onerror = () => j(M.error ?? new Error("Cannot read image"))),
          M.readAsDataURL(p));
      });
      (oe(be(p) ? "image/gif" : p.type),
        Y(g),
        X(C.image),
        l(C.src),
        $(v),
        F(void 0),
        m(0));
    },
    Ze = async (p) => {
      var g;
      try {
        const v = (g = p.target.files) == null ? void 0 : g[0];
        if (!v) throw new Error("No file selected");
        (F(void 0), m(0));
        const C = be(v);
        if (C && !ne)
          throw new Error("GIF wallpapers are not supported by this device");
        const P = await v.arrayBuffer();
        if (C) {
          const j = _e.getMaxGifFrameCount(z.deviceType),
            M = await imageChannel.getGifFrameCount(P);
          if (j === void 0 || M === void 0)
            throw new Error("Could not inspect the selected GIF");
          await we(v, P, M > j ? j : void 0);
          return;
        }
        await we(v, P);
      } catch (v) {
        (console.log("cannot open image" + v),
          F(
            v instanceof Error
              ? v.message
              : "Could not open the selected image",
          ),
          a.current && (a.current.value = ""));
      }
    },
    Ue = () => {
      _ !== 1 && n(H.main, { state: { tab: B.widgets } });
    },
    Ge = (p) => {
      n(H.main, { state: { tab: p } });
    },
    Be = () => {
      _ !== 1 && (l(null), X(null), b(1), y({ x: 0, y: 0 }), U(null));
    },
    He = async () => {
      if (_ === 1 || i === void 0) return;
      if ((m(1), !(await (e == null ? void 0 : e.deleteWallpaper())))) {
        m(2);
        return;
      }
      (URL.revokeObjectURL(i), s(void 0), m(0));
    },
    Ke = () => {
      (b(1), y({ x: 0, y: 0 }));
    },
    I = () => {
      switch (z.deviceType) {
        case D.DeviceType.NomadE:
        case D.DeviceType.NomadEV2:
          return 170;
        case D.DeviceType.Knob:
        case D.DeviceType.KnobF1:
          return 100;
        default:
          return 170;
      }
    },
    L = () => {
      switch (z.deviceType) {
        case D.DeviceType.NomadE:
        case D.DeviceType.NomadEV2:
          return 320;
        case D.DeviceType.Knob:
        case D.DeviceType.KnobF1:
          return 310;
        default:
          return 320;
      }
    },
    Xe = () => {
      switch (z.deviceType) {
        case D.DeviceType.NomadE:
          return at;
        case D.DeviceType.NomadEV2:
          return it;
        case D.DeviceType.Knob:
          return nt;
        case D.DeviceType.KnobF1:
          return ot;
      }
    },
    G = _ === 1;
  return z
    ? d.jsxs(qe, {
        currentScreen: B.widgets,
        changeCurrentScreen: Ge,
        children: [
          d.jsxs("div", {
            className: S.editor,
            children: [
              c
                ? d.jsxs("div", {
                    className: S.crop_stack,
                    children: [
                      d.jsx("div", {
                        className: S.crop_image,
                        children: d.jsx(Tt, {
                          showGrid: !1,
                          style: {
                            containerStyle: {
                              borderRadius: "var(--radius-small)",
                            },
                            mediaStyle: { bottom: 0 },
                            cropAreaStyle: {
                              borderRadius: "12px",
                              border: "2px dashed var(--color-error)",
                              color: "rgba(239, 239, 239, 0.8)",
                            },
                          },
                          image: c,
                          crop: h,
                          aspect: I() / L(),
                          zoom: f,
                          onCropChange: y,
                          onCropComplete: Oe,
                          onZoomChange: ve,
                          restrictPosition: !0,
                        }),
                      }),
                      G &&
                        d.jsx(N, {
                          linked: !0,
                          icon: "cached",
                          className: S.uploading,
                          children: "Uploading wallpaper",
                        }),
                      !G &&
                        _ === 2 &&
                        d.jsx(N, {
                          variant: "destructive",
                          intent: "delete",
                          icon: "close",
                          onClick: ge,
                          children: "Updating error, try again",
                        }),
                      !G &&
                        _ !== 2 &&
                        d.jsxs("div", {
                          className: S.crop_toolbar,
                          children: [
                            d.jsxs("div", {
                              className: S.crop_group,
                              children: [
                                d.jsx("span", {
                                  className: S.crop_label,
                                  children: "Crop",
                                }),
                                d.jsx("input", {
                                  className: S.zoom_slider,
                                  type: "range",
                                  min: 1,
                                  max: 3,
                                  step: 0.01,
                                  value: f,
                                  "aria-label": "Zoom",
                                  onChange: (p) => ve(Number(p.target.value)),
                                }),
                                d.jsx(N, {
                                  variant: "tertiary",
                                  iconOnly: !0,
                                  icon: "arrows_input",
                                  "aria-label": "Fit",
                                  onClick: Ke,
                                }),
                              ],
                            }),
                            d.jsx("span", { className: S.crop_divider }),
                            d.jsxs("div", {
                              className: S.crop_group,
                              children: [
                                d.jsx(N, {
                                  variant: "tertiary",
                                  intent: "delete",
                                  iconOnly: !0,
                                  icon: "delete",
                                  "aria-label": "Discard image",
                                  onClick: Be,
                                }),
                                d.jsx(N, {
                                  iconOnly: !0,
                                  icon: "check",
                                  "aria-label": "Confirm and save",
                                  onClick: ge,
                                }),
                              ],
                            }),
                          ],
                        }),
                    ],
                  })
                : d.jsxs("div", {
                    className: S.landing,
                    children: [
                      d.jsx("div", {
                        className: S.landing_top,
                        children: d.jsx(N, {
                          iconOnly: !0,
                          icon: "arrow_back",
                          "aria-label": "Back",
                          onClick: Ue,
                        }),
                      }),
                      d.jsx("div", {
                        className: S.wallpaper_image,
                        style: { width: I(), height: L() },
                        children: d.jsx("img", {
                          className: S.preview,
                          src: i !== void 0 ? i : Xe(),
                          alt: "Current wallpaper",
                        }),
                      }),
                      d.jsxs("p", {
                        className: S.helper,
                        children: [
                          "Click and drag to move the wallpaper, scroll to resize.",
                          d.jsx("br", {}),
                          `(min size ${I()}x${L()}px, max 1mb)`,
                        ],
                      }),
                      d.jsxs("div", {
                        className: S.actions_row,
                        children: [
                          d.jsx(N, {
                            onClick: Ie,
                            disabled: G,
                            children: "Upload",
                          }),
                          d.jsx(N, {
                            onClick: He,
                            disabled: G || i === void 0,
                            children: "Reset",
                          }),
                        ],
                      }),
                    ],
                  }),
              d.jsx("input", {
                type: "file",
                ref: a,
                accept: ne
                  ? ".png,.jpg,.jpeg,.webp,.gif"
                  : ".png,.jpg,.jpeg,.webp",
                onChange: Ze,
                style: { display: "none" },
              }),
            ],
          }),
          d.jsxs("div", {
            className: S.actions_column,
            children: [
              A && d.jsx("h5", { className: S.wallpaper_message, children: A }),
              O === "image/gif" &&
                !z.isUsbConnection &&
                d.jsx("h5", {
                  className: S.wallpaper_message,
                  children:
                    "GIF uploads over Bluetooth can be slow. Use USB for a faster upload.",
                }),
              q !== void 0 &&
                d.jsx("h5", {
                  className: S.wallpaper_message,
                  children: "GIF has more than the allowed number of frames.",
                }),
            ],
          }),
        ],
      })
    : null;
}
export { Qt as default };
