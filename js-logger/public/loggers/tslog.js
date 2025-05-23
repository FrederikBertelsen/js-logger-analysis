"use strict";
var tslog = (() => {
  var j = Object.defineProperty;
  var K = Object.getOwnPropertyDescriptor;
  var Z = Object.getOwnPropertyNames;
  var J = Object.prototype.hasOwnProperty;
  var G = (e, t) => {
    for (var r in t) j(e, r, {
      get: t[r],
      enumerable: !0
    })
  },
    H = (e, t, r, n) => {
      if (t && typeof t == "object" || typeof t == "function")
        for (let i of Z(t)) !J.call(e, i) && i !== r && j(e, i, {
          get: () => t[i],
          enumerable: !(n = K(t, i)) || n.enumerable
        });
      return e
    };
  var v = e => H(j({}, "__esModule", {
    value: !0
  }), e);
  var gt = {};
  G(gt, {
    BaseLogger: () => b,
    Logger: () => A,
    Runtime: () => N
  });
  var d = {
    reset: [0, 0],
    bold: [1, 22],
    dim: [2, 22],
    italic: [3, 23],
    underline: [4, 24],
    overline: [53, 55],
    inverse: [7, 27],
    hidden: [8, 28],
    strikethrough: [9, 29],
    black: [30, 39],
    red: [31, 39],
    green: [32, 39],
    yellow: [33, 39],
    blue: [34, 39],
    magenta: [35, 39],
    cyan: [36, 39],
    white: [37, 39],
    blackBright: [90, 39],
    redBright: [91, 39],
    greenBright: [92, 39],
    yellowBright: [93, 39],
    blueBright: [94, 39],
    magentaBright: [95, 39],
    cyanBright: [96, 39],
    whiteBright: [97, 39],
    bgBlack: [40, 49],
    bgRed: [41, 49],
    bgGreen: [42, 49],
    bgYellow: [43, 49],
    bgBlue: [44, 49],
    bgMagenta: [45, 49],
    bgCyan: [46, 49],
    bgWhite: [47, 49],
    bgBlackBright: [100, 49],
    bgRedBright: [101, 49],
    bgGreenBright: [102, 49],
    bgYellowBright: [103, 49],
    bgBlueBright: [104, 49],
    bgMagentaBright: [105, 49],
    bgCyanBright: [106, 49],
    bgWhiteBright: [107, 49]
  };

  function y(e, t, r, n = !1) {
    let i = String(t),
      o = (g, l) => `\x1B[${l[0]}m${g}\x1B[${l[1]}m`,
      s = (g, l) => l != null && typeof l == "string" ? o(g, d[l]) : l != null && Array.isArray(l) ? l.reduce((u, f) => s(u, f), g) : l != null && l[g.trim()] != null ? s(g, l[g.trim()]) : l != null && l["*"] != null ? s(g, l["*"]) : g,
      a = null;
    return i.replace(/{{(.+?)}}/g, (g, l) => {
      let u = r[l] != null ? String(r[l]) : n ? "" : g;
      return e.stylePrettyLogs ? s(u, e?.prettyLogStyles?.[l] ?? a) + o("", d.reset) : u
    })
  }

  function p(e, t = 2, r = 0) {
    return e != null && isNaN(e) ? "" : (e = e != null ? e + r : e, t === 2 ? e == null ? "--" : e < 10 ? "0" + e : e.toString() : e == null ? "---" : e < 10 ? "00" + e : e < 100 ? "0" + e : e.toString())
  }

  function C(e) {
    return {
      href: e.href,
      protocol: e.protocol,
      username: e.username,
      password: e.password,
      host: e.host,
      hostname: e.hostname,
      port: e.port,
      pathname: e.pathname,
      search: e.search,
      searchParams: [...e.searchParams].map(([t, r]) => ({
        key: t,
        value: r
      })),
      hash: e.hash,
      origin: e.origin
    }
  }

  function w(e) {
    let t = new Set;
    return JSON.stringify(e, (r, n) => {
      if (typeof n == "object" && n !== null) {
        if (t.has(n)) return "[Circular]";
        t.add(n)
      }
      return typeof n == "bigint" ? `${n}` : n
    })
  }

  function m(e, t) {
    let r = {
      seen: [],
      stylize: M
    };
    return t != null && D(r, t), h(r.showHidden) && (r.showHidden = !1), h(r.depth) && (r.depth = 2), h(r.colors) && (r.colors = !0), h(r.customInspect) && (r.customInspect = !0), r.colors && (r.stylize = q), O(r, e, r.depth)
  }
  m.colors = d;
  m.styles = {
    special: "cyan",
    number: "yellow",
    boolean: "yellow",
    undefined: "grey",
    null: "bold",
    string: "green",
    date: "magenta",
    regexp: "red"
  };

  function Y(e) {
    return typeof e == "boolean"
  }

  function h(e) {
    return e === void 0
  }

  function M(e) {
    return e
  }

  function q(e, t) {
    let r = m.styles[t];
    return r != null && m?.colors?.[r]?.[0] != null && m?.colors?.[r]?.[1] != null ? "\x1B[" + m.colors[r][0] + "m" + e + "\x1B[" + m.colors[r][1] + "m" : e
  }

  function L(e) {
    return typeof e == "function"
  }

  function F(e) {
    return typeof e == "string"
  }

  function Q(e) {
    return typeof e == "number"
  }

  function B(e) {
    return e === null
  }

  function R(e, t) {
    return Object.prototype.hasOwnProperty.call(e, t)
  }

  function S(e) {
    return k(e) && P(e) === "[object RegExp]"
  }

  function k(e) {
    return typeof e == "object" && e !== null
  }

  function I(e) {
    return k(e) && (P(e) === "[object Error]" || e instanceof Error)
  }

  function x(e) {
    return k(e) && P(e) === "[object Date]"
  }

  function P(e) {
    return Object.prototype.toString.call(e)
  }

  function X(e) {
    let t = {};
    return e.forEach(r => {
      t[r] = !0
    }), t
  }

  function tt(e, t, r, n, i) {
    let o = [];
    for (let s = 0, a = t.length; s < a; ++s) R(t, String(s)) ? o.push(E(e, t, r, n, String(s), !0)) : o.push("");
    return i.forEach(s => {
      s.match(/^\d+$/) || o.push(E(e, t, r, n, s, !0))
    }), o
  }

  function T(e) {
    return "[" + Error.prototype.toString.call(e) + "]"
  }

  function O(e, t, r = 0) {
    if (e.customInspect && t != null && L(t) && t?.inspect !== m && !(t?.constructor && t?.constructor.prototype === t)) {
      if (typeof t.inspect != "function" && t.toString != null) return t.toString();
      let u = t?.inspect(r, e);
      return F(u) || (u = O(e, u, r)), u
    }
    let n = c(e, t);
    if (n) return n;
    let i = Object.keys(t),
      o = X(i);
    try {
      e.showHidden && Object.getOwnPropertyNames && (i = Object.getOwnPropertyNames(t))
    } catch { }
    if (I(t) && (i.indexOf("message") >= 0 || i.indexOf("description") >= 0)) return T(t);
    if (i.length === 0)
      if (L(e.stylize)) {
        if (L(t)) {
          let u = t.name ? ": " + t.name : "";
          return e.stylize("[Function" + u + "]", "special")
        }
        if (S(t)) return e.stylize(RegExp.prototype.toString.call(t), "regexp");
        if (x(t)) return e.stylize(Date.prototype.toISOString.call(t), "date");
        if (I(t)) return T(t)
      } else return t;
    let s = "",
      a = !1,
      g = [`{
`, `
}`];
    if (Array.isArray(t) && (a = !0, g = [`[
`, `
]`]), L(t) && (s = " [Function" + (t.name ? ": " + t.name : "") + "]"), S(t) && (s = " " + RegExp.prototype.toString.call(t)), x(t) && (s = " " + Date.prototype.toUTCString.call(t)), I(t) && (s = " " + T(t)), i.length === 0 && (!a || t.length == 0)) return g[0] + s + g[1];
    if (r < 0) return S(t) ? e.stylize(RegExp.prototype.toString.call(t), "regexp") : e.stylize("[Object]", "special");
    e.seen.push(t);
    let l;
    return a ? l = tt(e, t, r, o, i) : l = i.map(u => E(e, t, r, o, u, a)), e.seen.pop(), et(l, s, g)
  }

  function E(e, t, r, n, i, o) {
    let s, a, g = {
      value: void 0
    };
    try {
      g.value = t[i]
    } catch { }
    try {
      Object.getOwnPropertyDescriptor && (g = Object.getOwnPropertyDescriptor(t, i) || g)
    } catch { }
    if (g.get ? g.set ? a = e.stylize("[Getter/Setter]", "special") : a = e.stylize("[Getter]", "special") : g.set && (a = e.stylize("[Setter]", "special")), R(n, i) || (s = "[" + i + "]"), a || (e.seen.indexOf(g.value) < 0 ? (B(r) ? a = O(e, g.value, void 0) : a = O(e, g.value, r - 1), a.indexOf(`
`) > -1 && (o ? a = a.split(`
`).map(l => "  " + l).join(`
`).substr(2) : a = `
` + a.split(`
`).map(l => "   " + l).join(`
`))) : a = e.stylize("[Circular]", "special")), h(s)) {
      if (o && i.match(/^\d+$/)) return a;
      s = JSON.stringify("" + i), s.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (s = s.substr(1, s.length - 2), s = e.stylize(s, "name")) : (s = s.replace(/'/g, "\\'").replace(/\\"/g, "\\'").replace(/(^"|"$)/g, "'"), s = e.stylize(s, "string"))
    }
    return s + ": " + a
  }

  function c(e, t) {
    if (h(t)) return e.stylize("undefined", "undefined");
    if (F(t)) {
      let r = "'" + JSON.stringify(t).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, "\\'") + "'";
      return e.stylize(r, "string")
    }
    if (Q(t)) return e.stylize("" + t, "number");
    if (Y(t)) return e.stylize("" + t, "boolean");
    if (B(t)) return e.stylize("null", "null")
  }

  function et(e, t, r) {
    return r[0] + (t === "" ? "" : t + `
`) + "  " + e.join(`,
  `) + " " + r[1]
  }

  function D(e, t) {
    let r = {
      ...e
    };
    if (!t || !k(t)) return e;
    let n = {
      ...t
    },
      i = Object.keys(t),
      o = i.length;
    for (; o--;) r[i[o]] = n[i[o]];
    return r
  }

  function W(e, ...t) {
    let r = {
      seen: [],
      stylize: M
    };
    e != null && D(r, e);
    let n = t[0],
      i = 0,
      o = "",
      s = "";
    if (typeof n == "string") {
      if (t.length === 1) return n;
      let a, g = 0;
      for (let l = 0; l < n.length - 1; l++)
        if (n.charCodeAt(l) === 37) {
          let u = n.charCodeAt(++l);
          if (i + 1 !== t.length) {
            switch (u) {
              case 115: {
                let f = t[++i];
                typeof f == "number" || typeof f == "bigint" ? a = c(r, f) : typeof f != "object" || f === null ? a = String(f) : a = m(f, {
                  ...e,
                  compact: 3,
                  colors: !1,
                  depth: 0
                });
                break
              }
              case 106:
                a = w(t[++i]);
                break;
              case 100: {
                let f = t[++i];
                typeof f == "bigint" ? a = c(r, f) : typeof f == "symbol" ? a = "NaN" : a = c(r, f);
                break
              }
              case 79:
                a = m(t[++i], e);
                break;
              case 111:
                a = m(t[++i], {
                  ...e,
                  showHidden: !0,
                  showProxy: !0,
                  depth: 4
                });
                break;
              case 105: {
                let f = t[++i];
                typeof f == "bigint" ? a = c(r, f) : typeof f == "symbol" ? a = "NaN" : a = c(r, parseInt(a));
                break
              }
              case 102: {
                let f = t[++i];
                typeof f == "symbol" ? a = "NaN" : a = c(r, parseInt(f));
                break
              }
              case 99:
                i += 1, a = "";
                break;
              case 37:
                o += n.slice(g, l), g = l + 1;
                continue;
              default:
                continue
            }
            g !== l - 1 && (o += n.slice(g, l - 1)), o += a, g = l + 1
          } else u === 37 && (o += n.slice(g, l), g = l + 1)
        } g !== 0 && (i++, s = " ", g < n.length && (o += n.slice(g)))
    }
    for (; i < t.length;) {
      let a = t[i];
      o += s, o += typeof a != "string" ? m(a, e) : a, s = " ", i++
    }
    return o
  }
  var N = {
    getCallerStackFrame: z,
    getErrorTrace: _,
    getMeta: it,
    transportJSON: at,
    transportFormatted: st,
    isBuffer: lt,
    isError: $,
    prettyFormatLogObj: ot,
    prettyFormatErrorObj: U
  },
    rt = {
      runtime: [typeof window, typeof document].includes("undefined") ? "Generic" : "Browser",
      browser: globalThis?.navigator?.userAgent
    },
    nt = /(?:(?:file|https?|global code|[^@]+)@)?(?:file:)?((?:\/[^:/]+){2,})(?::(\d+))?(?::(\d+))?/;

  function it(e, t, r, n, i, o) {
    return Object.assign({}, rt, {
      name: i,
      parentNames: o,
      date: new Date,
      logLevelId: e,
      logLevelName: t,
      path: n ? void 0 : z(r)
    })
  }

  function z(e, t = Error()) {
    return V(t?.stack?.split(`
`)?.filter(r => !r.includes("Error: "))?.[e])
  }

  function _(e) {
    return (e?.stack?.split(`
`) ?? [])?.filter(t => !t.includes("Error: "))?.reduce((t, r) => (t.push(V(r)), t), [])
  }

  function V(e) {
    let t = globalThis?.location?.origin,
      r = {
        fullFilePath: void 0,
        fileName: void 0,
        fileNameWithLine: void 0,
        fileColumn: void 0,
        fileLine: void 0,
        filePath: void 0,
        filePathWithLine: void 0,
        method: void 0
      };
    if (e != null) {
      let n = e.match(nt);
      if (n) {
        r.filePath = n[1].replace(/\?.*$/, ""), r.fullFilePath = `${t}${r.filePath}`;
        let i = r.filePath.split("/");
        r.fileName = i[i.length - 1], r.fileLine = n[2], r.fileColumn = n[3], r.filePathWithLine = `${r.filePath}:${r.fileLine}`, r.fileNameWithLine = `${r.fileName}:${r.fileLine}`
      }
    }
    return r
  }

  function $(e) {
    return e instanceof Error
  }

  function ot(e, t) {
    return e.reduce((r, n) => ($(n) ? r.errors.push(U(n, t)) : r.args.push(n), r), {
      args: [],
      errors: []
    })
  }

  function U(e, t) {
    let r = _(e).map(i => y(t, t.prettyErrorStackTemplate, {
      ...i
    }, !0)),
      n = {
        errorName: ` ${e.name} `,
        errorMessage: Object.getOwnPropertyNames(e).reduce((i, o) => (o !== "stack" && i.push(e[o]), i), []).join(", "),
        errorStack: r.join(`
`)
      };
    return y(t, t.prettyErrorTemplate, n)
  }

  function st(e, t, r, n) {
    let i = (r.length > 0 && t.length > 0 ? `
` : "") + r.join(`
`);
    n.prettyInspectOptions.colors = n.stylePrettyLogs, console.log(e + W(n.prettyInspectOptions, ...t) + i)
  }

  function at(e) {
    console.log(w(e))
  }

  function lt(e) {
    return !1
  }
  var b = class {
    constructor(t, r, n = 4) {
      this.logObj = r;
      this.stackDepthLevel = n;
      this.runtime = N, this.settings = {
        type: t?.type ?? "pretty",
        name: t?.name,
        parentNames: t?.parentNames,
        minLevel: t?.minLevel ?? 0,
        argumentsArrayName: t?.argumentsArrayName,
        hideLogPositionForProduction: t?.hideLogPositionForProduction ?? !1,
        prettyLogTemplate: t?.prettyLogTemplate ?? "{{yyyy}}.{{mm}}.{{dd}} {{hh}}:{{MM}}:{{ss}}:{{ms}}	{{logLevelName}}	{{filePathWithLine}}{{nameWithDelimiterPrefix}}	",
        prettyErrorTemplate: t?.prettyErrorTemplate ?? `
{{errorName}} {{errorMessage}}
error stack:
{{errorStack}}`,
        prettyErrorStackTemplate: t?.prettyErrorStackTemplate ?? `  \u2022 {{fileName}}	{{method}}
	{{filePathWithLine}}`,
        prettyErrorParentNamesSeparator: t?.prettyErrorParentNamesSeparator ?? ":",
        prettyErrorLoggerNameDelimiter: t?.prettyErrorLoggerNameDelimiter ?? "	",
        stylePrettyLogs: t?.stylePrettyLogs ?? !0,
        prettyLogTimeZone: t?.prettyLogTimeZone ?? "UTC",
        prettyLogStyles: t?.prettyLogStyles ?? {
          logLevelName: {
            "*": ["bold", "black", "bgWhiteBright", "dim"],
            SILLY: ["bold", "white"],
            TRACE: ["bold", "whiteBright"],
            DEBUG: ["bold", "green"],
            INFO: ["bold", "blue"],
            WARN: ["bold", "yellow"],
            ERROR: ["bold", "red"],
            FATAL: ["bold", "redBright"]
          },
          dateIsoStr: "white",
          filePathWithLine: "white",
          name: ["white", "bold"],
          nameWithDelimiterPrefix: ["white", "bold"],
          nameWithDelimiterSuffix: ["white", "bold"],
          errorName: ["bold", "bgRedBright", "whiteBright"],
          fileName: ["yellow"],
          fileNameWithLine: "white"
        },
        prettyInspectOptions: t?.prettyInspectOptions ?? {
          colors: !0,
          compact: !1,
          depth: 1 / 0
        },
        metaProperty: t?.metaProperty ?? "_meta",
        maskPlaceholder: t?.maskPlaceholder ?? "[***]",
        maskValuesOfKeys: t?.maskValuesOfKeys ?? ["password"],
        maskValuesOfKeysCaseInsensitive: t?.maskValuesOfKeysCaseInsensitive ?? !1,
        maskValuesRegEx: t?.maskValuesRegEx,
        prefix: [...t?.prefix ?? []],
        attachedTransports: [...t?.attachedTransports ?? []],
        overwrite: {
          mask: t?.overwrite?.mask,
          toLogObj: t?.overwrite?.toLogObj,
          addMeta: t?.overwrite?.addMeta,
          addPlaceholders: t?.overwrite?.addPlaceholders,
          formatMeta: t?.overwrite?.formatMeta,
          formatLogObj: t?.overwrite?.formatLogObj,
          transportFormatted: t?.overwrite?.transportFormatted,
          transportJSON: t?.overwrite?.transportJSON
        }
      }
    }
    async log(t, r, ...n) {
      if (t < this.settings.minLevel) return;
      let i = [...this.settings.prefix, ...n],
        o = this.settings.overwrite?.mask != null ? this.settings.overwrite?.mask(i) : this.settings.maskValuesOfKeys != null && this.settings.maskValuesOfKeys.length > 0 ? this._mask(i) : i,
        s = this.logObj != null ? this._recursiveCloneAndExecuteFunctions(this.logObj) : void 0,
        a = this.settings.overwrite?.toLogObj != null ? this.settings.overwrite?.toLogObj(o, s) : this._toLogObj(o, s),
        g = this.settings.overwrite?.addMeta != null ? this.settings.overwrite?.addMeta(a, t, r) : this._addMetaToLogObj(a, t, r),
        l, u;
      return this.settings.overwrite?.formatMeta != null &&
        (l = this.settings.overwrite?.formatMeta(g?.[this.settings.metaProperty])), this.settings.overwrite?.formatLogObj != null &&
        (u = this.settings.overwrite?.formatLogObj(o, this.settings)), this.settings.type === "pretty" &&
        (l = l ?? this._prettyFormatLogObjMeta(g?.[this.settings.metaProperty]), u = u ?? this.runtime.prettyFormatLogObj(o, this.settings)), l != null &&
          u != null ? this.settings.overwrite?.transportFormatted != null ? this.settings.overwrite?.transportFormatted(l, u.args, u.errors, this.settings) : this.runtime.transportFormatted(l, u.args, u.errors, this.settings) : this.settings.overwrite?.transportJSON != null ? this.settings.overwrite?.transportJSON(g) : this.settings.type !== "hidden" && this.runtime.transportJSON(g), this.settings.attachedTransports != null &&
          this.settings.attachedTransports.length > 0 &&

        await Promise.all(this.settings.attachedTransports.map(async f => {
          await f(g);
        })), g
      // this.settings.attachedTransports.forEach(async f => {
      //   await f(g)
      // }), g
    }
    attachTransport(t) {
      this.settings.attachedTransports.push(t)
    }
    getSubLogger(t, r) {
      let n = {
        ...this.settings,
        ...t,
        parentNames: this.settings?.parentNames != null && this.settings?.name != null ? [...this.settings.parentNames, this.settings.name] : this.settings?.name != null ? [this.settings.name] : void 0,
        prefix: [...this.settings.prefix, ...t?.prefix ?? []]
      };
      return new this.constructor(n, r ?? this.logObj, this.stackDepthLevel)
    }
    _mask(t) {
      let r = this.settings.maskValuesOfKeysCaseInsensitive !== !0 ? this.settings.maskValuesOfKeys : this.settings.maskValuesOfKeys.map(n => n.toLowerCase());
      return t?.map(n => this._recursiveCloneAndMaskValuesOfKeys(n, r))
    }
    _recursiveCloneAndMaskValuesOfKeys(t, r, n = []) {
      if (n.includes(t)) return {
        ...t
      };
      if (typeof t == "object" && t !== null && n.push(t), this.runtime.isError(t) || this.runtime.isBuffer(t)) return t;
      if (t instanceof Map) return new Map(t);
      if (t instanceof Set) return new Set(t);
      if (Array.isArray(t)) return t.map(i => this._recursiveCloneAndMaskValuesOfKeys(i, r, n));
      if (t instanceof Date) return new Date(t.getTime());
      if (t instanceof URL) return C(t);
      if (t !== null && typeof t == "object") {
        let i = this.runtime.isError(t) ? this._cloneError(t) : Object.create(Object.getPrototypeOf(t));
        return Object.getOwnPropertyNames(t).reduce((o, s) => (o[s] = r.includes(this.settings?.maskValuesOfKeysCaseInsensitive !== !0 ? s : s.toLowerCase()) ? this.settings.maskPlaceholder : (() => {
          try {
            return this._recursiveCloneAndMaskValuesOfKeys(t[s], r, n)
          } catch {
            return null
          }
        })(), o), i)
      } else {
        if (typeof t == "string") {
          let i = t;
          for (let o of this.settings?.maskValuesRegEx || []) i = i.replace(o, this.settings?.maskPlaceholder || "");
          return i
        }
        return t
      }
    }
    _recursiveCloneAndExecuteFunctions(t, r = []) {
      return this.isObjectOrArray(t) && r.includes(t) ? this.shallowCopy(t) : (this.isObjectOrArray(t) && r.push(t), Array.isArray(t) ? t.map(n => this._recursiveCloneAndExecuteFunctions(n, r)) : t instanceof Date ? new Date(t.getTime()) : this.isObject(t) ? Object.getOwnPropertyNames(t).reduce((n, i) => {
        let o = Object.getOwnPropertyDescriptor(t, i);
        if (o) {
          Object.defineProperty(n, i, o);
          let s = t[i];
          n[i] = typeof s == "function" ? s() : this._recursiveCloneAndExecuteFunctions(s, r)
        }
        return n
      }, Object.create(Object.getPrototypeOf(t))) : t)
    }
    isObjectOrArray(t) {
      return typeof t == "object" && t !== null
    }
    isObject(t) {
      return typeof t == "object" && !Array.isArray(t) && t !== null
    }
    shallowCopy(t) {
      return Array.isArray(t) ? [...t] : {
        ...t
      }
    }
    _toLogObj(t, r = {}) {
      return t = t?.map(n => this.runtime.isError(n) ? this._toErrorObject(n) : n), this.settings.argumentsArrayName == null ? t.length === 1 && !Array.isArray(t[0]) && this.runtime.isBuffer(t[0]) !== !0 && !(t[0] instanceof Date) ? r = typeof t[0] == "object" && t[0] != null ? {
        ...t[0],
        ...r
      } : {
        0: t[0],
        ...r
      } : r = {
        ...r,
        ...t
      } : r = {
        ...r,
        [this.settings.argumentsArrayName]: t
      }, r
    }
    _cloneError(t) {
      let r = new t.constructor;
      return Object.getOwnPropertyNames(t).forEach(n => {
        r[n] = t[n]
      }), r
    }
    _toErrorObject(t) {
      return {
        nativeError: t,
        name: t.name ?? "Error",
        message: t.message,
        stack: this.runtime.getErrorTrace(t)
      }
    }
    _addMetaToLogObj(t, r, n) {
      return {
        ...t,
        [this.settings.metaProperty]: this.runtime.getMeta(r, n, this.stackDepthLevel, this.settings.hideLogPositionForProduction, this.settings.name, this.settings.parentNames)
      }
    }
    _prettyFormatLogObjMeta(t) {
      if (t == null) return "";
      let r = this.settings.prettyLogTemplate,
        n = {};
      r.includes("{{yyyy}}.{{mm}}.{{dd}} {{hh}}:{{MM}}:{{ss}}:{{ms}}") ? r = r.replace("{{yyyy}}.{{mm}}.{{dd}} {{hh}}:{{MM}}:{{ss}}:{{ms}}", "{{dateIsoStr}}") : this.settings.prettyLogTimeZone === "UTC" ? (n.yyyy = t?.date?.getUTCFullYear() ?? "----", n.mm = p(t?.date?.getUTCMonth(), 2, 1), n.dd = p(t?.date?.getUTCDate(), 2), n.hh = p(t?.date?.getUTCHours(), 2), n.MM = p(t?.date?.getUTCMinutes(), 2), n.ss = p(t?.date?.getUTCSeconds(), 2), n.ms = p(t?.date?.getUTCMilliseconds(), 3)) : (n.yyyy = t?.date?.getFullYear() ?? "----", n.mm = p(t?.date?.getMonth(), 2, 1), n.dd = p(t?.date?.getDate(), 2), n.hh = p(t?.date?.getHours(), 2), n.MM = p(t?.date?.getMinutes(), 2), n.ss = p(t?.date?.getSeconds(), 2), n.ms = p(t?.date?.getMilliseconds(), 3));
      let i = this.settings.prettyLogTimeZone === "UTC" ? t?.date : new Date(t?.date?.getTime() - t?.date?.getTimezoneOffset() * 6e4);
      n.rawIsoStr = i?.toISOString(), n.dateIsoStr = i?.toISOString().replace("T", " ").replace("Z", ""), n.logLevelName = t?.logLevelName, n.fileNameWithLine = t?.path?.fileNameWithLine ?? "", n.filePathWithLine = t?.path?.filePathWithLine ?? "", n.fullFilePath = t?.path?.fullFilePath ?? "";
      let o = this.settings.parentNames?.join(this.settings.prettyErrorParentNamesSeparator);
      return o = o != null && t?.name != null ? o + this.settings.prettyErrorParentNamesSeparator : void 0, n.name = t?.name != null || o != null ? (o ?? "") + t?.name : "", n.nameWithDelimiterPrefix = n.name.length > 0 ? this.settings.prettyErrorLoggerNameDelimiter + n.name : "", n.nameWithDelimiterSuffix = n.name.length > 0 ? n.name + this.settings.prettyErrorLoggerNameDelimiter : "", this.settings.overwrite?.addPlaceholders != null && this.settings.overwrite?.addPlaceholders(t, n), y(this.settings, r, n)
    }
  };
  var A = class extends b {
    constructor(t, r) {
      let n = ![typeof window, typeof document].includes("undefined"),
        i = n ? ((window?.chrome || window.Intl && Intl?.v8BreakIterator) && "CSS" in window) != null : !1,
        o = n ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent) : !1;
      t = t || {}, t.stylePrettyLogs = t.stylePrettyLogs && n && !i ? !1 : t.stylePrettyLogs, super(t, r, o ? 4 : 5)
    }
    async log(t, r, ...n) {
      return await super.log(t, r, ...n)
    }
    async silly(...t) {
      return await super.log(0, "SILLY", ...t)
    }
    async trace(...t) {
      return await super.log(1, "TRACE", ...t)
    }
    async debug(...t) {
      return await super.log(2, "DEBUG", ...t)
    }
    async info(...t) {
      return await super.log(3, "INFO", ...t)
    }
    async warn(...t) {
      return await super.log(4, "WARN", ...t)
    }
    async error(...t) {
      return await super.log(5, "ERROR", ...t)
    }
    async fatal(...t) {
      return await super.log(6, "FATAL", ...t)
    }
    getSubLogger(t, r) {
      return super.getSubLogger(t, r)
    }
  };
  return v(gt);
})();