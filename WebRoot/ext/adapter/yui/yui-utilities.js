/*
Copyright (c) 2007, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.4.1
*/
if (typeof YAHOO == "undefined" || !YAHOO) {
    var YAHOO = {};
}
YAHOO.namespace = function () {
    var A = arguments, E = null, C, B, D;
    for (C = 0; C < A.length; C = C + 1) {
        D = A[C].split(".");
        E = YAHOO;
        for (B = (D[0] == "YAHOO") ? 1 : 0; B < D.length; B = B + 1) {
            E[D[B]] = E[D[B]] || {};
            E = E[D[B]];
        }
    }
    return E;
};
YAHOO.log = function (D, A, C) {
    var B = YAHOO.widget.Logger;
    if (B && B.log) {
        return B.log(D, A, C);
    } else {
        return false;
    }
};
YAHOO.register = function (A, E, D) {
    var I = YAHOO.env.modules;
    if (!I[A]) {
        I[A] = {versions: [], builds: []};
    }
    var B = I[A], H = D.version, G = D.build, F = YAHOO.env.listeners;
    B.name = A;
    B.version = H;
    B.build = G;
    B.versions.push(H);
    B.builds.push(G);
    B.mainClass = E;
    for (var C = 0; C < F.length; C = C + 1) {
        F[C](B);
    }
    if (E) {
        E.VERSION = H;
        E.BUILD = G;
    } else {
        YAHOO.log("mainClass is undefined for module " + A, "warn");
    }
};
YAHOO.env = YAHOO.env || {modules: [], listeners: []};
YAHOO.env.getVersion = function (A) {
    return YAHOO.env.modules[A] || null;
};
YAHOO.env.ua = function () {
    var C = {ie: 0, opera: 0, gecko: 0, webkit: 0, mobile: null};
    var B = navigator.userAgent, A;
    if ((/KHTML/).test(B)) {
        C.webkit = 1;
    }
    A = B.match(/AppleWebKit\/([^\s]*)/);
    if (A && A[1]) {
        C.webkit = parseFloat(A[1]);
        if (/ Mobile\//.test(B)) {
            C.mobile = "Apple";
        } else {
            A = B.match(/NokiaN[^\/]*/);
            if (A) {
                C.mobile = A[0];
            }
        }
    }
    if (!C.webkit) {
        A = B.match(/Opera[\s\/]([^\s]*)/);
        if (A && A[1]) {
            C.opera = parseFloat(A[1]);
            A = B.match(/Opera Mini[^;]*/);
            if (A) {
                C.mobile = A[0];
            }
        } else {
            A = B.match(/MSIE\s([^;]*)/);
            if (A && A[1]) {
                C.ie = parseFloat(A[1]);
            } else {
                A = B.match(/Gecko\/([^\s]*)/);
                if (A) {
                    C.gecko = 1;
                    A = B.match(/rv:([^\s\)]*)/);
                    if (A && A[1]) {
                        C.gecko = parseFloat(A[1]);
                    }
                }
            }
        }
    }
    return C;
}();
(function () {
    YAHOO.namespace("util", "widget", "example");
    if ("undefined" !== typeof YAHOO_config) {
        var B = YAHOO_config.listener, A = YAHOO.env.listeners, D = true, C;
        if (B) {
            for (C = 0; C < A.length; C = C + 1) {
                if (A[C] == B) {
                    D = false;
                    break;
                }
            }
            if (D) {
                A.push(B);
            }
        }
    }
})();
YAHOO.lang = YAHOO.lang || {
    isArray: function (B) {
        if (B) {
            var A = YAHOO.lang;
            return A.isNumber(B.length) && A.isFunction(B.splice);
        }
        return false;
    }, isBoolean: function (A) {
        return typeof A === "boolean";
    }, isFunction: function (A) {
        return typeof A === "function";
    }, isNull: function (A) {
        return A === null;
    }, isNumber: function (A) {
        return typeof A === "number" && isFinite(A);
    }, isObject: function (A) {
        return (A && (typeof A === "object" || YAHOO.lang.isFunction(A))) || false;
    }, isString: function (A) {
        return typeof A === "string";
    }, isUndefined: function (A) {
        return typeof A === "undefined";
    }, hasOwnProperty: function (A, B) {
        if (Object.prototype.hasOwnProperty) {
            return A.hasOwnProperty(B);
        }
        return !YAHOO.lang.isUndefined(A[B]) && A.constructor.prototype[B] !== A[B];
    }, _IEEnumFix: function (C, B) {
        if (YAHOO.env.ua.ie) {
            var E = ["toString", "valueOf"], A;
            for (A = 0; A < E.length; A = A + 1) {
                var F = E[A], D = B[F];
                if (YAHOO.lang.isFunction(D) && D != Object.prototype[F]) {
                    C[F] = D;
                }
            }
        }
    }, extend: function (D, E, C) {
        if (!E || !D) {
            throw new Error("YAHOO.lang.extend failed, please check that all dependencies are included.");
        }
        var B = function () {
        };
        B.prototype = E.prototype;
        D.prototype = new B();
        D.prototype.constructor = D;
        D.superclass = E.prototype;
        if (E.prototype.constructor == Object.prototype.constructor) {
            E.prototype.constructor = E;
        }
        if (C) {
            for (var A in C) {
                D.prototype[A] = C[A];
            }
            YAHOO.lang._IEEnumFix(D.prototype, C);
        }
    }, augmentObject: function (E, D) {
        if (!D || !E) {
            throw new Error("Absorb failed, verify dependencies.");
        }
        var A = arguments, C, F, B = A[2];
        if (B && B !== true) {
            for (C = 2; C < A.length; C = C + 1) {
                E[A[C]] = D[A[C]];
            }
        } else {
            for (F in D) {
                if (B || !E[F]) {
                    E[F] = D[F];
                }
            }
            YAHOO.lang._IEEnumFix(E, D);
        }
    }, augmentProto: function (D, C) {
        if (!C || !D) {
            throw new Error("Augment failed, verify dependencies.");
        }
        var A = [D.prototype, C.prototype];
        for (var B = 2; B < arguments.length; B = B + 1) {
            A.push(arguments[B]);
        }
        YAHOO.lang.augmentObject.apply(this, A);
    }, dump: function (A, G) {
        var C = YAHOO.lang, D, F, I = [], J = "{...}", B = "f(){...}", H = ", ", E = " => ";
        if (!C.isObject(A)) {
            return A + "";
        } else {
            if (A instanceof Date || ("nodeType" in A && "tagName" in A)) {
                return A;
            } else {
                if (C.isFunction(A)) {
                    return B;
                }
            }
        }
        G = (C.isNumber(G)) ? G : 3;
        if (C.isArray(A)) {
            I.push("[");
            for (D = 0, F = A.length; D < F; D = D + 1) {
                if (C.isObject(A[D])) {
                    I.push((G > 0) ? C.dump(A[D], G - 1) : J);
                } else {
                    I.push(A[D]);
                }
                I.push(H);
            }
            if (I.length > 1) {
                I.pop();
            }
            I.push("]");
        } else {
            I.push("{");
            for (D in A) {
                if (C.hasOwnProperty(A, D)) {
                    I.push(D + E);
                    if (C.isObject(A[D])) {
                        I.push((G > 0) ? C.dump(A[D], G - 1) : J);
                    } else {
                        I.push(A[D]);
                    }
                    I.push(H);
                }
            }
            if (I.length > 1) {
                I.pop();
            }
            I.push("}");
        }
        return I.join("");
    }, substitute: function (Q, B, J) {
        var G, F, E, M, N, P, D = YAHOO.lang, L = [], C, H = "dump", K = " ", A = "{", O = "}";
        for (; ;) {
            G = Q.lastIndexOf(A);
            if (G < 0) {
                break;
            }
            F = Q.indexOf(O, G);
            if (G + 1 >= F) {
                break;
            }
            C = Q.substring(G + 1, F);
            M = C;
            P = null;
            E = M.indexOf(K);
            if (E > -1) {
                P = M.substring(E + 1);
                M = M.substring(0, E);
            }
            N = B[M];
            if (J) {
                N = J(M, N, P);
            }
            if (D.isObject(N)) {
                if (D.isArray(N)) {
                    N = D.dump(N, parseInt(P, 10));
                } else {
                    P = P || "";
                    var I = P.indexOf(H);
                    if (I > -1) {
                        P = P.substring(4);
                    }
                    if (N.toString === Object.prototype.toString || I > -1) {
                        N = D.dump(N, parseInt(P, 10));
                    } else {
                        N = N.toString();
                    }
                }
            } else {
                if (!D.isString(N) && !D.isNumber(N)) {
                    N = "~-" + L.length + "-~";
                    L[L.length] = C;
                }
            }
            Q = Q.substring(0, G) + N + Q.substring(F + 1);
        }
        for (G = L.length - 1; G >= 0; G = G - 1) {
            Q = Q.replace(new RegExp("~-" + G + "-~"), "{" + L[G] + "}", "g");
        }
        return Q;
    }, trim: function (A) {
        try {
            return A.replace(/^\s+|\s+$/g, "");
        } catch (B) {
            return A;
        }
    }, merge: function () {
        var D = {}, B = arguments;
        for (var C = 0, A = B.length; C < A; C = C + 1) {
            YAHOO.lang.augmentObject(D, B[C], true);
        }
        return D;
    }, later: function (H, B, I, D, E) {
        H = H || 0;
        B = B || {};
        var C = I, G = D, F, A;
        if (YAHOO.lang.isString(I)) {
            C = B[I];
        }
        if (!C) {
            throw new TypeError("method undefined");
        }
        if (!YAHOO.lang.isArray(G)) {
            G = [D];
        }
        F = function () {
            C.apply(B, G);
        };
        A = (E) ? setInterval(F, H) : setTimeout(F, H);
        return {
            interval: E, cancel: function () {
                if (this.interval) {
                    clearInterval(A);
                } else {
                    clearTimeout(A);
                }
            }
        };
    }, isValue: function (B) {
        var A = YAHOO.lang;
        return (A.isObject(B) || A.isString(B) || A.isNumber(B) || A.isBoolean(B));
    }
};
YAHOO.util.Lang = YAHOO.lang;
YAHOO.lang.augment = YAHOO.lang.augmentProto;
YAHOO.augment = YAHOO.lang.augmentProto;
YAHOO.extend = YAHOO.lang.extend;
YAHOO.register("yahoo", YAHOO, {version: "2.4.1", build: "742"});
(function () {
    var B = YAHOO.util, L, J, H = 0, K = {}, F = {}, N = window.document;
    var C = YAHOO.env.ua.opera, M = YAHOO.env.ua.webkit, A = YAHOO.env.ua.gecko, G = YAHOO.env.ua.ie;
    var E = {HYPHEN: /(-[a-z])/i, ROOT_TAG: /^body|html$/i};
    var O = function (Q) {
        if (!E.HYPHEN.test(Q)) {
            return Q;
        }
        if (K[Q]) {
            return K[Q];
        }
        var R = Q;
        while (E.HYPHEN.exec(R)) {
            R = R.replace(RegExp.$1, RegExp.$1.substr(1).toUpperCase());
        }
        K[Q] = R;
        return R;
    };
    var P = function (R) {
        var Q = F[R];
        if (!Q) {
            Q = new RegExp("(?:^|\\s+)" + R + "(?:\\s+|$)");
            F[R] = Q;
        }
        return Q;
    };
    if (N.defaultView && N.defaultView.getComputedStyle) {
        L = function (Q, T) {
            var S = null;
            if (T == "float") {
                T = "cssFloat";
            }
            var R = N.defaultView.getComputedStyle(Q, "");
            if (R) {
                S = R[O(T)];
            }
            return Q.style[T] || S;
        };
    } else {
        if (N.documentElement.currentStyle && G) {
            L = function (Q, S) {
                switch (O(S)) {
                    case"opacity":
                        var U = 100;
                        try {
                            U = Q.filters["DXImageTransform.Microsoft.Alpha"].opacity;
                        } catch (T) {
                            try {
                                U = Q.filters("alpha").opacity;
                            } catch (T) {
                            }
                        }
                        return U / 100;
                    case"float":
                        S = "styleFloat";
                    default:
                        var R = Q.currentStyle ? Q.currentStyle[S] : null;
                        return (Q.style[S] || R);
                }
            };
        } else {
            L = function (Q, R) {
                return Q.style[R];
            };
        }
    }
    if (G) {
        J = function (Q, R, S) {
            switch (R) {
                case"opacity":
                    if (YAHOO.lang.isString(Q.style.filter)) {
                        Q.style.filter = "alpha(opacity=" + S * 100 + ")";
                        if (!Q.currentStyle || !Q.currentStyle.hasLayout) {
                            Q.style.zoom = 1;
                        }
                    }
                    break;
                case"float":
                    R = "styleFloat";
                default:
                    Q.style[R] = S;
            }
        };
    } else {
        J = function (Q, R, S) {
            if (R == "float") {
                R = "cssFloat";
            }
            Q.style[R] = S;
        };
    }
    var D = function (Q, R) {
        return Q && Q.nodeType == 1 && (!R || R(Q));
    };
    YAHOO.util.Dom = {
        get: function (S) {
            if (S && (S.tagName || S.item)) {
                return S;
            }
            if (YAHOO.lang.isString(S) || !S) {
                return N.getElementById(S);
            }
            if (S.length !== undefined) {
                var T = [];
                for (var R = 0, Q = S.length; R < Q; ++R) {
                    T[T.length] = B.Dom.get(S[R]);
                }
                return T;
            }
            return S;
        }, getStyle: function (Q, S) {
            S = O(S);
            var R = function (T) {
                return L(T, S);
            };
            return B.Dom.batch(Q, R, B.Dom, true);
        }, setStyle: function (Q, S, T) {
            S = O(S);
            var R = function (U) {
                J(U, S, T);
            };
            B.Dom.batch(Q, R, B.Dom, true);
        }, getXY: function (Q) {
            var R = function (S) {
                if ((S.parentNode === null || S.offsetParent === null || this.getStyle(S, "display") == "none") && S != S.ownerDocument.body) {
                    return false;
                }
                return I(S);
            };
            return B.Dom.batch(Q, R, B.Dom, true);
        }, getX: function (Q) {
            var R = function (S) {
                return B.Dom.getXY(S)[0];
            };
            return B.Dom.batch(Q, R, B.Dom, true);
        }, getY: function (Q) {
            var R = function (S) {
                return B.Dom.getXY(S)[1];
            };
            return B.Dom.batch(Q, R, B.Dom, true);
        }, setXY: function (Q, T, S) {
            var R = function (W) {
                var V = this.getStyle(W, "position");
                if (V == "static") {
                    this.setStyle(W, "position", "relative");
                    V = "relative";
                }
                var Y = this.getXY(W);
                if (Y === false) {
                    return false;
                }
                var X = [parseInt(this.getStyle(W, "left"), 10), parseInt(this.getStyle(W, "top"), 10)];
                if (isNaN(X[0])) {
                    X[0] = (V == "relative") ? 0 : W.offsetLeft;
                }
                if (isNaN(X[1])) {
                    X[1] = (V == "relative") ? 0 : W.offsetTop;
                }
                if (T[0] !== null) {
                    W.style.left = T[0] - Y[0] + X[0] + "px";
                }
                if (T[1] !== null) {
                    W.style.top = T[1] - Y[1] + X[1] + "px";
                }
                if (!S) {
                    var U = this.getXY(W);
                    if ((T[0] !== null && U[0] != T[0]) || (T[1] !== null && U[1] != T[1])) {
                        this.setXY(W, T, true);
                    }
                }
            };
            B.Dom.batch(Q, R, B.Dom, true);
        }, setX: function (R, Q) {
            B.Dom.setXY(R, [Q, null]);
        }, setY: function (Q, R) {
            B.Dom.setXY(Q, [null, R]);
        }, getRegion: function (Q) {
            var R = function (S) {
                if ((S.parentNode === null || S.offsetParent === null || this.getStyle(S, "display") == "none") && S != N.body) {
                    return false;
                }
                var T = B.Region.getRegion(S);
                return T;
            };
            return B.Dom.batch(Q, R, B.Dom, true);
        }, getClientWidth: function () {
            return B.Dom.getViewportWidth();
        }, getClientHeight: function () {
            return B.Dom.getViewportHeight();
        }, getElementsByClassName: function (U, Y, V, W) {
            Y = Y || "*";
            V = (V) ? B.Dom.get(V) : null || N;
            if (!V) {
                return [];
            }
            var R = [], Q = V.getElementsByTagName(Y), X = P(U);
            for (var S = 0, T = Q.length; S < T; ++S) {
                if (X.test(Q[S].className)) {
                    R[R.length] = Q[S];
                    if (W) {
                        W.call(Q[S], Q[S]);
                    }
                }
            }
            return R;
        }, hasClass: function (S, R) {
            var Q = P(R);
            var T = function (U) {
                return Q.test(U.className);
            };
            return B.Dom.batch(S, T, B.Dom, true);
        }, addClass: function (R, Q) {
            var S = function (T) {
                if (this.hasClass(T, Q)) {
                    return false;
                }
                T.className = YAHOO.lang.trim([T.className, Q].join(" "));
                return true;
            };
            return B.Dom.batch(R, S, B.Dom, true);
        }, removeClass: function (S, R) {
            var Q = P(R);
            var T = function (U) {
                if (!this.hasClass(U, R)) {
                    return false;
                }
                var V = U.className;
                U.className = V.replace(Q, " ");
                if (this.hasClass(U, R)) {
                    this.removeClass(U, R);
                }
                U.className = YAHOO.lang.trim(U.className);
                return true;
            };
            return B.Dom.batch(S, T, B.Dom, true);
        }, replaceClass: function (T, R, Q) {
            if (!Q || R === Q) {
                return false;
            }
            var S = P(R);
            var U = function (V) {
                if (!this.hasClass(V, R)) {
                    this.addClass(V, Q);
                    return true;
                }
                V.className = V.className.replace(S, " " + Q + " ");
                if (this.hasClass(V, R)) {
                    this.replaceClass(V, R, Q);
                }
                V.className = YAHOO.lang.trim(V.className);
                return true;
            };
            return B.Dom.batch(T, U, B.Dom, true);
        }, generateId: function (Q, S) {
            S = S || "yui-gen";
            var R = function (T) {
                if (T && T.id) {
                    return T.id;
                }
                var U = S + H++;
                if (T) {
                    T.id = U;
                }
                return U;
            };
            return B.Dom.batch(Q, R, B.Dom, true) || R.apply(B.Dom, arguments);
        }, isAncestor: function (Q, R) {
            Q = B.Dom.get(Q);
            R = B.Dom.get(R);
            if (!Q || !R) {
                return false;
            }
            if (Q.contains && R.nodeType && !M) {
                return Q.contains(R);
            } else {
                if (Q.compareDocumentPosition && R.nodeType) {
                    return !!(Q.compareDocumentPosition(R) & 16);
                } else {
                    if (R.nodeType) {
                        return !!this.getAncestorBy(R, function (S) {
                            return S == Q;
                        });
                    }
                }
            }
            return false;
        }, inDocument: function (Q) {
            return this.isAncestor(N.documentElement, Q);
        }, getElementsBy: function (X, R, S, U) {
            R = R || "*";
            S = (S) ? B.Dom.get(S) : null || N;
            if (!S) {
                return [];
            }
            var T = [], W = S.getElementsByTagName(R);
            for (var V = 0, Q = W.length; V < Q; ++V) {
                if (X(W[V])) {
                    T[T.length] = W[V];
                    if (U) {
                        U(W[V]);
                    }
                }
            }
            return T;
        }, batch: function (U, X, W, S) {
            U = (U && (U.tagName || U.item)) ? U : B.Dom.get(U);
            if (!U || !X) {
                return false;
            }
            var T = (S) ? W : window;
            if (U.tagName || U.length === undefined) {
                return X.call(T, U, W);
            }
            var V = [];
            for (var R = 0, Q = U.length; R < Q; ++R) {
                V[V.length] = X.call(T, U[R], W);
            }
            return V;
        }, getDocumentHeight: function () {
            var R = (N.compatMode != "CSS1Compat") ? N.body.scrollHeight : N.documentElement.scrollHeight;
            var Q = Math.max(R, B.Dom.getViewportHeight());
            return Q;
        }, getDocumentWidth: function () {
            var R = (N.compatMode != "CSS1Compat") ? N.body.scrollWidth : N.documentElement.scrollWidth;
            var Q = Math.max(R, B.Dom.getViewportWidth());
            return Q;
        }, getViewportHeight: function () {
            var Q = self.innerHeight;
            var R = N.compatMode;
            if ((R || G) && !C) {
                Q = (R == "CSS1Compat") ? N.documentElement.clientHeight : N.body.clientHeight;
            }
            return Q;
        }, getViewportWidth: function () {
            var Q = self.innerWidth;
            var R = N.compatMode;
            if (R || G) {
                Q = (R == "CSS1Compat") ? N.documentElement.clientWidth : N.body.clientWidth;
            }
            return Q;
        }, getAncestorBy: function (Q, R) {
            while (Q = Q.parentNode) {
                if (D(Q, R)) {
                    return Q;
                }
            }
            return null;
        }, getAncestorByClassName: function (R, Q) {
            R = B.Dom.get(R);
            if (!R) {
                return null;
            }
            var S = function (T) {
                return B.Dom.hasClass(T, Q);
            };
            return B.Dom.getAncestorBy(R, S);
        }, getAncestorByTagName: function (R, Q) {
            R = B.Dom.get(R);
            if (!R) {
                return null;
            }
            var S = function (T) {
                return T.tagName && T.tagName.toUpperCase() == Q.toUpperCase();
            };
            return B.Dom.getAncestorBy(R, S);
        }, getPreviousSiblingBy: function (Q, R) {
            while (Q) {
                Q = Q.previousSibling;
                if (D(Q, R)) {
                    return Q;
                }
            }
            return null;
        }, getPreviousSibling: function (Q) {
            Q = B.Dom.get(Q);
            if (!Q) {
                return null;
            }
            return B.Dom.getPreviousSiblingBy(Q);
        }, getNextSiblingBy: function (Q, R) {
            while (Q) {
                Q = Q.nextSibling;
                if (D(Q, R)) {
                    return Q;
                }
            }
            return null;
        }, getNextSibling: function (Q) {
            Q = B.Dom.get(Q);
            if (!Q) {
                return null;
            }
            return B.Dom.getNextSiblingBy(Q);
        }, getFirstChildBy: function (Q, S) {
            var R = (D(Q.firstChild, S)) ? Q.firstChild : null;
            return R || B.Dom.getNextSiblingBy(Q.firstChild, S);
        }, getFirstChild: function (Q, R) {
            Q = B.Dom.get(Q);
            if (!Q) {
                return null;
            }
            return B.Dom.getFirstChildBy(Q);
        }, getLastChildBy: function (Q, S) {
            if (!Q) {
                return null;
            }
            var R = (D(Q.lastChild, S)) ? Q.lastChild : null;
            return R || B.Dom.getPreviousSiblingBy(Q.lastChild, S);
        }, getLastChild: function (Q) {
            Q = B.Dom.get(Q);
            return B.Dom.getLastChildBy(Q);
        }, getChildrenBy: function (R, T) {
            var S = B.Dom.getFirstChildBy(R, T);
            var Q = S ? [S] : [];
            B.Dom.getNextSiblingBy(S, function (U) {
                if (!T || T(U)) {
                    Q[Q.length] = U;
                }
                return false;
            });
            return Q;
        }, getChildren: function (Q) {
            Q = B.Dom.get(Q);
            if (!Q) {
            }
            return B.Dom.getChildrenBy(Q);
        }, getDocumentScrollLeft: function (Q) {
            Q = Q || N;
            return Math.max(Q.documentElement.scrollLeft, Q.body.scrollLeft);
        }, getDocumentScrollTop: function (Q) {
            Q = Q || N;
            return Math.max(Q.documentElement.scrollTop, Q.body.scrollTop);
        }, insertBefore: function (R, Q) {
            R = B.Dom.get(R);
            Q = B.Dom.get(Q);
            if (!R || !Q || !Q.parentNode) {
                return null;
            }
            return Q.parentNode.insertBefore(R, Q);
        }, insertAfter: function (R, Q) {
            R = B.Dom.get(R);
            Q = B.Dom.get(Q);
            if (!R || !Q || !Q.parentNode) {
                return null;
            }
            if (Q.nextSibling) {
                return Q.parentNode.insertBefore(R, Q.nextSibling);
            } else {
                return Q.parentNode.appendChild(R);
            }
        }, getClientRegion: function () {
            var S = B.Dom.getDocumentScrollTop(), R = B.Dom.getDocumentScrollLeft(), T = B.Dom.getViewportWidth() + R,
                Q = B.Dom.getViewportHeight() + S;
            return new B.Region(S, T, Q, R);
        }
    };
    var I = function () {
        if (N.documentElement.getBoundingClientRect) {
            return function (R) {
                var S = R.getBoundingClientRect();
                var Q = R.ownerDocument;
                return [S.left + B.Dom.getDocumentScrollLeft(Q), S.top + B.Dom.getDocumentScrollTop(Q)];
            };
        } else {
            return function (S) {
                var T = [S.offsetLeft, S.offsetTop];
                var R = S.offsetParent;
                var Q = (M && B.Dom.getStyle(S, "position") == "absolute" && S.offsetParent == S.ownerDocument.body);
                if (R != S) {
                    while (R) {
                        T[0] += R.offsetLeft;
                        T[1] += R.offsetTop;
                        if (!Q && M && B.Dom.getStyle(R, "position") == "absolute") {
                            Q = true;
                        }
                        R = R.offsetParent;
                    }
                }
                if (Q) {
                    T[0] -= S.ownerDocument.body.offsetLeft;
                    T[1] -= S.ownerDocument.body.offsetTop;
                }
                R = S.parentNode;
                while (R.tagName && !E.ROOT_TAG.test(R.tagName)) {
                    if (B.Dom.getStyle(R, "display").search(/^inline|table-row.*$/i)) {
                        T[0] -= R.scrollLeft;
                        T[1] -= R.scrollTop;
                    }
                    R = R.parentNode;
                }
                return T;
            };
        }
    }();
})();
YAHOO.util.Region = function (C, D, A, B) {
    this.top = C;
    this[1] = C;
    this.right = D;
    this.bottom = A;
    this.left = B;
    this[0] = B;
};
YAHOO.util.Region.prototype.contains = function (A) {
    return (A.left >= this.left && A.right <= this.right && A.top >= this.top && A.bottom <= this.bottom);
};
YAHOO.util.Region.prototype.getArea = function () {
    return ((this.bottom - this.top) * (this.right - this.left));
};
YAHOO.util.Region.prototype.intersect = function (E) {
    var C = Math.max(this.top, E.top);
    var D = Math.min(this.right, E.right);
    var A = Math.min(this.bottom, E.bottom);
    var B = Math.max(this.left, E.left);
    if (A >= C && D >= B) {
        return new YAHOO.util.Region(C, D, A, B);
    } else {
        return null;
    }
};
YAHOO.util.Region.prototype.union = function (E) {
    var C = Math.min(this.top, E.top);
    var D = Math.max(this.right, E.right);
    var A = Math.max(this.bottom, E.bottom);
    var B = Math.min(this.left, E.left);
    return new YAHOO.util.Region(C, D, A, B);
};
YAHOO.util.Region.prototype.toString = function () {
    return ("Region {top: " + this.top + ", right: " + this.right + ", bottom: " + this.bottom + ", left: " + this.left + "}");
};
YAHOO.util.Region.getRegion = function (D) {
    var F = YAHOO.util.Dom.getXY(D);
    var C = F[1];
    var E = F[0] + D.offsetWidth;
    var A = F[1] + D.offsetHeight;
    var B = F[0];
    return new YAHOO.util.Region(C, E, A, B);
};
YAHOO.util.Point = function (A, B) {
    if (YAHOO.lang.isArray(A)) {
        B = A[1];
        A = A[0];
    }
    this.x = this.right = this.left = this[0] = A;
    this.y = this.top = this.bottom = this[1] = B;
};
YAHOO.util.Point.prototype = new YAHOO.util.Region();
YAHOO.register("dom", YAHOO.util.Dom, {version: "2.4.1", build: "742"});
YAHOO.util.CustomEvent = function (D, B, C, A) {
    this.type = D;
    this.scope = B || window;
    this.silent = C;
    this.signature = A || YAHOO.util.CustomEvent.LIST;
    this.subscribers = [];
    if (!this.silent) {
    }
    var E = "_YUICEOnSubscribe";
    if (D !== E) {
        this.subscribeEvent = new YAHOO.util.CustomEvent(E, this, true);
    }
    this.lastError = null;
};
YAHOO.util.CustomEvent.LIST = 0;
YAHOO.util.CustomEvent.FLAT = 1;
YAHOO.util.CustomEvent.prototype = {
    subscribe: function (B, C, A) {
        if (!B) {
            throw new Error("Invalid callback for subscriber to '" + this.type + "'");
        }
        if (this.subscribeEvent) {
            this.subscribeEvent.fire(B, C, A);
        }
        this.subscribers.push(new YAHOO.util.Subscriber(B, C, A));
    }, unsubscribe: function (D, F) {
        if (!D) {
            return this.unsubscribeAll();
        }
        var E = false;
        for (var B = 0, A = this.subscribers.length; B < A; ++B) {
            var C = this.subscribers[B];
            if (C && C.contains(D, F)) {
                this._delete(B);
                E = true;
            }
        }
        return E;
    }, fire: function () {
        var D = this.subscribers.length;
        if (!D && this.silent) {
            return true;
        }
        var H = [], F = true, C, I = false;
        for (C = 0; C < arguments.length; ++C) {
            H.push(arguments[C]);
        }
        if (!this.silent) {
        }
        for (C = 0; C < D; ++C) {
            var L = this.subscribers[C];
            if (!L) {
                I = true;
            } else {
                if (!this.silent) {
                }
                var K = L.getScope(this.scope);
                if (this.signature == YAHOO.util.CustomEvent.FLAT) {
                    var A = null;
                    if (H.length > 0) {
                        A = H[0];
                    }
                    try {
                        F = L.fn.call(K, A, L.obj);
                    } catch (E) {
                        this.lastError = E;
                    }
                } else {
                    try {
                        F = L.fn.call(K, this.type, H, L.obj);
                    } catch (G) {
                        this.lastError = G;
                    }
                }
                if (false === F) {
                    if (!this.silent) {
                    }
                    return false;
                }
            }
        }
        if (I) {
            var J = [], B = this.subscribers;
            for (C = 0, D = B.length; C < D; C = C + 1) {
                J.push(B[C]);
            }
            this.subscribers = J;
        }
        return true;
    }, unsubscribeAll: function () {
        for (var B = 0, A = this.subscribers.length; B < A; ++B) {
            this._delete(A - 1 - B);
        }
        this.subscribers = [];
        return B;
    }, _delete: function (A) {
        var B = this.subscribers[A];
        if (B) {
            delete B.fn;
            delete B.obj;
        }
        this.subscribers[A] = null;
    }, toString: function () {
        return "CustomEvent: '" + this.type + "', scope: " + this.scope;
    }
};
YAHOO.util.Subscriber = function (B, C, A) {
    this.fn = B;
    this.obj = YAHOO.lang.isUndefined(C) ? null : C;
    this.override = A;
};
YAHOO.util.Subscriber.prototype.getScope = function (A) {
    if (this.override) {
        if (this.override === true) {
            return this.obj;
        } else {
            return this.override;
        }
    }
    return A;
};
YAHOO.util.Subscriber.prototype.contains = function (A, B) {
    if (B) {
        return (this.fn == A && this.obj == B);
    } else {
        return (this.fn == A);
    }
};
YAHOO.util.Subscriber.prototype.toString = function () {
    return "Subscriber { obj: " + this.obj + ", override: " + (this.override || "no") + " }";
};
if (!YAHOO.util.Event) {
    YAHOO.util.Event = function () {
        var H = false;
        var I = [];
        var J = [];
        var G = [];
        var E = [];
        var C = 0;
        var F = [];
        var B = [];
        var A = 0;
        var D = {63232: 38, 63233: 40, 63234: 37, 63235: 39, 63276: 33, 63277: 34, 25: 9};
        return {
            POLL_RETRYS: 4000,
            POLL_INTERVAL: 10,
            EL: 0,
            TYPE: 1,
            FN: 2,
            WFN: 3,
            UNLOAD_OBJ: 3,
            ADJ_SCOPE: 4,
            OBJ: 5,
            OVERRIDE: 6,
            lastError: null,
            isSafari: YAHOO.env.ua.webkit,
            webkit: YAHOO.env.ua.webkit,
            isIE: YAHOO.env.ua.ie,
            _interval: null,
            _dri: null,
            DOMReady: false,
            startInterval: function () {
                if (!this._interval) {
                    var K = this;
                    var L = function () {
                        K._tryPreloadAttach();
                    };
                    this._interval = setInterval(L, this.POLL_INTERVAL);
                }
            },
            onAvailable: function (P, M, Q, O, N) {
                var K = (YAHOO.lang.isString(P)) ? [P] : P;
                for (var L = 0; L < K.length; L = L + 1) {
                    F.push({id: K[L], fn: M, obj: Q, override: O, checkReady: N});
                }
                C = this.POLL_RETRYS;
                this.startInterval();
            },
            onContentReady: function (M, K, N, L) {
                this.onAvailable(M, K, N, L, true);
            },
            onDOMReady: function (K, M, L) {
                if (this.DOMReady) {
                    setTimeout(function () {
                        var N = window;
                        if (L) {
                            if (L === true) {
                                N = M;
                            } else {
                                N = L;
                            }
                        }
                        K.call(N, "DOMReady", [], M);
                    }, 0);
                } else {
                    this.DOMReadyEvent.subscribe(K, M, L);
                }
            },
            addListener: function (M, K, V, Q, L) {
                if (!V || !V.call) {
                    return false;
                }
                if (this._isValidCollection(M)) {
                    var W = true;
                    for (var R = 0, T = M.length; R < T; ++R) {
                        W = this.on(M[R], K, V, Q, L) && W;
                    }
                    return W;
                } else {
                    if (YAHOO.lang.isString(M)) {
                        var P = this.getEl(M);
                        if (P) {
                            M = P;
                        } else {
                            this.onAvailable(M, function () {
                                YAHOO.util.Event.on(M, K, V, Q, L);
                            });
                            return true;
                        }
                    }
                }
                if (!M) {
                    return false;
                }
                if ("unload" == K && Q !== this) {
                    J[J.length] = [M, K, V, Q, L];
                    return true;
                }
                var Y = M;
                if (L) {
                    if (L === true) {
                        Y = Q;
                    } else {
                        Y = L;
                    }
                }
                var N = function (Z) {
                    return V.call(Y, YAHOO.util.Event.getEvent(Z, M), Q);
                };
                var X = [M, K, V, N, Y, Q, L];
                var S = I.length;
                I[S] = X;
                if (this.useLegacyEvent(M, K)) {
                    var O = this.getLegacyIndex(M, K);
                    if (O == -1 || M != G[O][0]) {
                        O = G.length;
                        B[M.id + K] = O;
                        G[O] = [M, K, M["on" + K]];
                        E[O] = [];
                        M["on" + K] = function (Z) {
                            YAHOO.util.Event.fireLegacyEvent(YAHOO.util.Event.getEvent(Z), O);
                        };
                    }
                    E[O].push(X);
                } else {
                    try {
                        this._simpleAdd(M, K, N, false);
                    } catch (U) {
                        this.lastError = U;
                        this.removeListener(M, K, V);
                        return false;
                    }
                }
                return true;
            },
            fireLegacyEvent: function (O, M) {
                var Q = true, K, S, R, T, P;
                S = E[M];
                for (var L = 0, N = S.length; L < N; ++L) {
                    R = S[L];
                    if (R && R[this.WFN]) {
                        T = R[this.ADJ_SCOPE];
                        P = R[this.WFN].call(T, O);
                        Q = (Q && P);
                    }
                }
                K = G[M];
                if (K && K[2]) {
                    K[2](O);
                }
                return Q;
            },
            getLegacyIndex: function (L, M) {
                var K = this.generateId(L) + M;
                if (typeof B[K] == "undefined") {
                    return -1;
                } else {
                    return B[K];
                }
            },
            useLegacyEvent: function (L, M) {
                if (this.webkit && ("click" == M || "dblclick" == M)) {
                    var K = parseInt(this.webkit, 10);
                    if (!isNaN(K) && K < 418) {
                        return true;
                    }
                }
                return false;
            },
            removeListener: function (L, K, T) {
                var O, R, V;
                if (typeof L == "string") {
                    L = this.getEl(L);
                } else {
                    if (this._isValidCollection(L)) {
                        var U = true;
                        for (O = 0, R = L.length; O < R; ++O) {
                            U = (this.removeListener(L[O], K, T) && U);
                        }
                        return U;
                    }
                }
                if (!T || !T.call) {
                    return this.purgeElement(L, false, K);
                }
                if ("unload" == K) {
                    for (O = 0, R = J.length; O < R; O++) {
                        V = J[O];
                        if (V && V[0] == L && V[1] == K && V[2] == T) {
                            J[O] = null;
                            return true;
                        }
                    }
                    return false;
                }
                var P = null;
                var Q = arguments[3];
                if ("undefined" === typeof Q) {
                    Q = this._getCacheIndex(L, K, T);
                }
                if (Q >= 0) {
                    P = I[Q];
                }
                if (!L || !P) {
                    return false;
                }
                if (this.useLegacyEvent(L, K)) {
                    var N = this.getLegacyIndex(L, K);
                    var M = E[N];
                    if (M) {
                        for (O = 0, R = M.length; O < R; ++O) {
                            V = M[O];
                            if (V && V[this.EL] == L && V[this.TYPE] == K && V[this.FN] == T) {
                                M[O] = null;
                                break;
                            }
                        }
                    }
                } else {
                    try {
                        this._simpleRemove(L, K, P[this.WFN], false);
                    } catch (S) {
                        this.lastError = S;
                        return false;
                    }
                }
                delete I[Q][this.WFN];
                delete I[Q][this.FN];
                I[Q] = null;
                return true;
            },
            getTarget: function (M, L) {
                var K = M.target || M.srcElement;
                return this.resolveTextNode(K);
            },
            resolveTextNode: function (K) {
                if (K && 3 == K.nodeType) {
                    return K.parentNode;
                } else {
                    return K;
                }
            },
            getPageX: function (L) {
                var K = L.pageX;
                if (!K && 0 !== K) {
                    K = L.clientX || 0;
                    if (this.isIE) {
                        K += this._getScrollLeft();
                    }
                }
                return K;
            },
            getPageY: function (K) {
                var L = K.pageY;
                if (!L && 0 !== L) {
                    L = K.clientY || 0;
                    if (this.isIE) {
                        L += this._getScrollTop();
                    }
                }
                return L;
            },
            getXY: function (K) {
                return [this.getPageX(K), this.getPageY(K)];
            },
            getRelatedTarget: function (L) {
                var K = L.relatedTarget;
                if (!K) {
                    if (L.type == "mouseout") {
                        K = L.toElement;
                    } else {
                        if (L.type == "mouseover") {
                            K = L.fromElement;
                        }
                    }
                }
                return this.resolveTextNode(K);
            },
            getTime: function (M) {
                if (!M.time) {
                    var L = new Date().getTime();
                    try {
                        M.time = L;
                    } catch (K) {
                        this.lastError = K;
                        return L;
                    }
                }
                return M.time;
            },
            stopEvent: function (K) {
                this.stopPropagation(K);
                this.preventDefault(K);
            },
            stopPropagation: function (K) {
                if (K.stopPropagation) {
                    K.stopPropagation();
                } else {
                    K.cancelBubble = true;
                }
            },
            preventDefault: function (K) {
                if (K.preventDefault) {
                    K.preventDefault();
                } else {
                    K.returnValue = false;
                }
            },
            getEvent: function (M, K) {
                var L = M || window.event;
                if (!L) {
                    var N = this.getEvent.caller;
                    while (N) {
                        L = N.arguments[0];
                        if (L && Event == L.constructor) {
                            break;
                        }
                        N = N.caller;
                    }
                }
                return L;
            },
            getCharCode: function (L) {
                var K = L.keyCode || L.charCode || 0;
                if (YAHOO.env.ua.webkit && (K in D)) {
                    K = D[K];
                }
                return K;
            },
            _getCacheIndex: function (O, P, N) {
                for (var M = 0, L = I.length; M < L; ++M) {
                    var K = I[M];
                    if (K && K[this.FN] == N && K[this.EL] == O && K[this.TYPE] == P) {
                        return M;
                    }
                }
                return -1;
            },
            generateId: function (K) {
                var L = K.id;
                if (!L) {
                    L = "yuievtautoid-" + A;
                    ++A;
                    K.id = L;
                }
                return L;
            },
            _isValidCollection: function (L) {
                try {
                    return (L && typeof L !== "string" && L.length && !L.tagName && !L.alert && typeof L[0] !== "undefined");
                } catch (K) {
                    return false;
                }
            },
            elCache: {},
            getEl: function (K) {
                return (typeof K === "string") ? document.getElementById(K) : K;
            },
            clearCache: function () {
            },
            DOMReadyEvent: new YAHOO.util.CustomEvent("DOMReady", this),
            _load: function (L) {
                if (!H) {
                    H = true;
                    var K = YAHOO.util.Event;
                    K._ready();
                    K._tryPreloadAttach();
                }
            },
            _ready: function (L) {
                var K = YAHOO.util.Event;
                if (!K.DOMReady) {
                    K.DOMReady = true;
                    K.DOMReadyEvent.fire();
                    K._simpleRemove(document, "DOMContentLoaded", K._ready);
                }
            },
            _tryPreloadAttach: function () {
                if (this.locked) {
                    return false;
                }
                if (this.isIE) {
                    if (!this.DOMReady) {
                        this.startInterval();
                        return false;
                    }
                }
                this.locked = true;
                var P = !H;
                if (!P) {
                    P = (C > 0);
                }
                var O = [];
                var Q = function (S, T) {
                    var R = S;
                    if (T.override) {
                        if (T.override === true) {
                            R = T.obj;
                        } else {
                            R = T.override;
                        }
                    }
                    T.fn.call(R, T.obj);
                };
                var L, K, N, M;
                for (L = 0, K = F.length; L < K; ++L) {
                    N = F[L];
                    if (N && !N.checkReady) {
                        M = this.getEl(N.id);
                        if (M) {
                            Q(M, N);
                            F[L] = null;
                        } else {
                            O.push(N);
                        }
                    }
                }
                for (L = 0, K = F.length; L < K; ++L) {
                    N = F[L];
                    if (N && N.checkReady) {
                        M = this.getEl(N.id);
                        if (M) {
                            if (H || M.nextSibling) {
                                Q(M, N);
                                F[L] = null;
                            }
                        } else {
                            O.push(N);
                        }
                    }
                }
                C = (O.length === 0) ? 0 : C - 1;
                if (P) {
                    this.startInterval();
                } else {
                    clearInterval(this._interval);
                    this._interval = null;
                }
                this.locked = false;
                return true;
            },
            purgeElement: function (O, P, R) {
                var M = (YAHOO.lang.isString(O)) ? this.getEl(O) : O;
                var Q = this.getListeners(M, R), N, K;
                if (Q) {
                    for (N = 0, K = Q.length; N < K; ++N) {
                        var L = Q[N];
                        this.removeListener(M, L.type, L.fn, L.index);
                    }
                }
                if (P && M && M.childNodes) {
                    for (N = 0, K = M.childNodes.length; N < K; ++N) {
                        this.purgeElement(M.childNodes[N], P, R);
                    }
                }
            },
            getListeners: function (M, K) {
                var P = [], L;
                if (!K) {
                    L = [I, J];
                } else {
                    if (K === "unload") {
                        L = [J];
                    } else {
                        L = [I];
                    }
                }
                var R = (YAHOO.lang.isString(M)) ? this.getEl(M) : M;
                for (var O = 0; O < L.length; O = O + 1) {
                    var T = L[O];
                    if (T && T.length > 0) {
                        for (var Q = 0, S = T.length; Q < S; ++Q) {
                            var N = T[Q];
                            if (N && N[this.EL] === R && (!K || K === N[this.TYPE])) {
                                P.push({
                                    type: N[this.TYPE],
                                    fn: N[this.FN],
                                    obj: N[this.OBJ],
                                    adjust: N[this.OVERRIDE],
                                    scope: N[this.ADJ_SCOPE],
                                    index: Q
                                });
                            }
                        }
                    }
                }
                return (P.length) ? P : null;
            },
            _unload: function (R) {
                var Q = YAHOO.util.Event, O, N, L, K, M;
                for (O = 0, K = J.length; O < K; ++O) {
                    L = J[O];
                    if (L) {
                        var P = window;
                        if (L[Q.ADJ_SCOPE]) {
                            if (L[Q.ADJ_SCOPE] === true) {
                                P = L[Q.UNLOAD_OBJ];
                            } else {
                                P = L[Q.ADJ_SCOPE];
                            }
                        }
                        L[Q.FN].call(P, Q.getEvent(R, L[Q.EL]), L[Q.UNLOAD_OBJ]);
                        J[O] = null;
                        L = null;
                        P = null;
                    }
                }
                J = null;
                if (YAHOO.env.ua.ie && I && I.length > 0) {
                    N = I.length;
                    while (N) {
                        M = N - 1;
                        L = I[M];
                        if (L) {
                            Q.removeListener(L[Q.EL], L[Q.TYPE], L[Q.FN], M);
                        }
                        N--;
                    }
                    L = null;
                }
                G = null;
                Q._simpleRemove(window, "unload", Q._unload);
            },
            _getScrollLeft: function () {
                return this._getScroll()[1];
            },
            _getScrollTop: function () {
                return this._getScroll()[0];
            },
            _getScroll: function () {
                var K = document.documentElement, L = document.body;
                if (K && (K.scrollTop || K.scrollLeft)) {
                    return [K.scrollTop, K.scrollLeft];
                } else {
                    if (L) {
                        return [L.scrollTop, L.scrollLeft];
                    } else {
                        return [0, 0];
                    }
                }
            },
            regCE: function () {
            },
            _simpleAdd: function () {
                if (window.addEventListener) {
                    return function (M, N, L, K) {
                        M.addEventListener(N, L, (K));
                    };
                } else {
                    if (window.attachEvent) {
                        return function (M, N, L, K) {
                            M.attachEvent("on" + N, L);
                        };
                    } else {
                        return function () {
                        };
                    }
                }
            }(),
            _simpleRemove: function () {
                if (window.removeEventListener) {
                    return function (M, N, L, K) {
                        M.removeEventListener(N, L, (K));
                    };
                } else {
                    if (window.detachEvent) {
                        return function (L, M, K) {
                            L.detachEvent("on" + M, K);
                        };
                    } else {
                        return function () {
                        };
                    }
                }
            }()
        };
    }();
    (function () {
        var A = YAHOO.util.Event;
        A.on = A.addListener;
        if (A.isIE) {
            YAHOO.util.Event.onDOMReady(YAHOO.util.Event._tryPreloadAttach, YAHOO.util.Event, true);
            A._dri = setInterval(function () {
                var C = document.createElement("p");
                try {
                    C.doScroll("left");
                    clearInterval(A._dri);
                    A._dri = null;
                    A._ready();
                    C = null;
                } catch (B) {
                    C = null;
                }
            }, A.POLL_INTERVAL);
        } else {
            if (A.webkit) {
                A._dri = setInterval(function () {
                    var B = document.readyState;
                    if ("loaded" == B || "complete" == B) {
                        clearInterval(A._dri);
                        A._dri = null;
                        A._ready();
                    }
                }, A.POLL_INTERVAL);
            } else {
                A._simpleAdd(document, "DOMContentLoaded", A._ready);
            }
        }
        A._simpleAdd(window, "load", A._load);
        A._simpleAdd(window, "unload", A._unload);
        A._tryPreloadAttach();
    })();
}
YAHOO.util.EventProvider = function () {
};
YAHOO.util.EventProvider.prototype = {
    __yui_events: null, __yui_subscribers: null, subscribe: function (A, C, F, E) {
        this.__yui_events = this.__yui_events || {};
        var D = this.__yui_events[A];
        if (D) {
            D.subscribe(C, F, E);
        } else {
            this.__yui_subscribers = this.__yui_subscribers || {};
            var B = this.__yui_subscribers;
            if (!B[A]) {
                B[A] = [];
            }
            B[A].push({fn: C, obj: F, override: E});
        }
    }, unsubscribe: function (C, E, G) {
        this.__yui_events = this.__yui_events || {};
        var A = this.__yui_events;
        if (C) {
            var F = A[C];
            if (F) {
                return F.unsubscribe(E, G);
            }
        } else {
            var B = true;
            for (var D in A) {
                if (YAHOO.lang.hasOwnProperty(A, D)) {
                    B = B && A[D].unsubscribe(E, G);
                }
            }
            return B;
        }
        return false;
    }, unsubscribeAll: function (A) {
        return this.unsubscribe(A);
    }, createEvent: function (G, D) {
        this.__yui_events = this.__yui_events || {};
        var A = D || {};
        var I = this.__yui_events;
        if (I[G]) {
        } else {
            var H = A.scope || this;
            var E = (A.silent);
            var B = new YAHOO.util.CustomEvent(G, H, E, YAHOO.util.CustomEvent.FLAT);
            I[G] = B;
            if (A.onSubscribeCallback) {
                B.subscribeEvent.subscribe(A.onSubscribeCallback);
            }
            this.__yui_subscribers = this.__yui_subscribers || {};
            var F = this.__yui_subscribers[G];
            if (F) {
                for (var C = 0; C < F.length; ++C) {
                    B.subscribe(F[C].fn, F[C].obj, F[C].override);
                }
            }
        }
        return I[G];
    }, fireEvent: function (E, D, A, C) {
        this.__yui_events = this.__yui_events || {};
        var G = this.__yui_events[E];
        if (!G) {
            return null;
        }
        var B = [];
        for (var F = 1; F < arguments.length; ++F) {
            B.push(arguments[F]);
        }
        return G.fire.apply(G, B);
    }, hasEvent: function (A) {
        if (this.__yui_events) {
            if (this.__yui_events[A]) {
                return true;
            }
        }
        return false;
    }
};
YAHOO.util.KeyListener = function (A, F, B, C) {
    if (!A) {
    } else {
        if (!F) {
        } else {
            if (!B) {
            }
        }
    }
    if (!C) {
        C = YAHOO.util.KeyListener.KEYDOWN;
    }
    var D = new YAHOO.util.CustomEvent("keyPressed");
    this.enabledEvent = new YAHOO.util.CustomEvent("enabled");
    this.disabledEvent = new YAHOO.util.CustomEvent("disabled");
    if (typeof A == "string") {
        A = document.getElementById(A);
    }
    if (typeof B == "function") {
        D.subscribe(B);
    } else {
        D.subscribe(B.fn, B.scope, B.correctScope);
    }

    function E(J, I) {
        if (!F.shift) {
            F.shift = false;
        }
        if (!F.alt) {
            F.alt = false;
        }
        if (!F.ctrl) {
            F.ctrl = false;
        }
        if (J.shiftKey == F.shift && J.altKey == F.alt && J.ctrlKey == F.ctrl) {
            var G;
            if (F.keys instanceof Array) {
                for (var H = 0; H < F.keys.length; H++) {
                    G = F.keys[H];
                    if (G == J.charCode) {
                        D.fire(J.charCode, J);
                        break;
                    } else {
                        if (G == J.keyCode) {
                            D.fire(J.keyCode, J);
                            break;
                        }
                    }
                }
            } else {
                G = F.keys;
                if (G == J.charCode) {
                    D.fire(J.charCode, J);
                } else {
                    if (G == J.keyCode) {
                        D.fire(J.keyCode, J);
                    }
                }
            }
        }
    }

    this.enable = function () {
        if (!this.enabled) {
            YAHOO.util.Event.addListener(A, C, E);
            this.enabledEvent.fire(F);
        }
        this.enabled = true;
    };
    this.disable = function () {
        if (this.enabled) {
            YAHOO.util.Event.removeListener(A, C, E);
            this.disabledEvent.fire(F);
        }
        this.enabled = false;
    };
    this.toString = function () {
        return "KeyListener [" + F.keys + "] " + A.tagName + (A.id ? "[" + A.id + "]" : "");
    };
};
YAHOO.util.KeyListener.KEYDOWN = "keydown";
YAHOO.util.KeyListener.KEYUP = "keyup";
YAHOO.util.KeyListener.KEY = {
    ALT: 18,
    BACK_SPACE: 8,
    CAPS_LOCK: 20,
    CONTROL: 17,
    DELETE: 46,
    DOWN: 40,
    END: 35,
    ENTER: 13,
    ESCAPE: 27,
    HOME: 36,
    LEFT: 37,
    META: 224,
    NUM_LOCK: 144,
    PAGE_DOWN: 34,
    PAGE_UP: 33,
    PAUSE: 19,
    PRINTSCREEN: 44,
    RIGHT: 39,
    SCROLL_LOCK: 145,
    SHIFT: 16,
    SPACE: 32,
    TAB: 9,
    UP: 38
};
YAHOO.register("event", YAHOO.util.Event, {version: "2.4.1", build: "742"});
YAHOO.util.Connect = {
    _msxml_progid: ["Microsoft.XMLHTTP", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP"],
    _http_headers: {},
    _has_http_headers: false,
    _use_default_post_header: true,
    _default_post_header: "application/x-www-form-urlencoded; charset=UTF-8",
    _default_form_header: "application/x-www-form-urlencoded",
    _use_default_xhr_header: true,
    _default_xhr_header: "XMLHttpRequest",
    _has_default_headers: true,
    _default_headers: {},
    _isFormSubmit: false,
    _isFileUpload: false,
    _formNode: null,
    _sFormData: null,
    _poll: {},
    _timeOut: {},
    _polling_interval: 50,
    _transaction_id: 0,
    _submitElementValue: null,
    _hasSubmitListener: (function () {
        if (YAHOO.util.Event) {
            YAHOO.util.Event.addListener(document, "click", function (B) {
                var A = YAHOO.util.Event.getTarget(B);
                if (A.type && A.type.toLowerCase() == "submit") {
                    YAHOO.util.Connect._submitElementValue = encodeURIComponent(A.name) + "=" + encodeURIComponent(A.value);
                }
            });
            return true;
        }
        return false;
    })(),
    startEvent: new YAHOO.util.CustomEvent("start"),
    completeEvent: new YAHOO.util.CustomEvent("complete"),
    successEvent: new YAHOO.util.CustomEvent("success"),
    failureEvent: new YAHOO.util.CustomEvent("failure"),
    uploadEvent: new YAHOO.util.CustomEvent("upload"),
    abortEvent: new YAHOO.util.CustomEvent("abort"),
    _customEvents: {
        onStart: ["startEvent", "start"],
        onComplete: ["completeEvent", "complete"],
        onSuccess: ["successEvent", "success"],
        onFailure: ["failureEvent", "failure"],
        onUpload: ["uploadEvent", "upload"],
        onAbort: ["abortEvent", "abort"]
    },
    setProgId: function (A) {
        this._msxml_progid.unshift(A);
    },
    setDefaultPostHeader: function (A) {
        if (typeof A == "string") {
            this._default_post_header = A;
        } else {
            if (typeof A == "boolean") {
                this._use_default_post_header = A;
            }
        }
    },
    setDefaultXhrHeader: function (A) {
        if (typeof A == "string") {
            this._default_xhr_header = A;
        } else {
            this._use_default_xhr_header = A;
        }
    },
    setPollingInterval: function (A) {
        if (typeof A == "number" && isFinite(A)) {
            this._polling_interval = A;
        }
    },
    createXhrObject: function (E) {
        var D, A;
        try {
            A = new XMLHttpRequest();
            D = {conn: A, tId: E};
        } catch (C) {
            for (var B = 0; B < this._msxml_progid.length; ++B) {
                try {
                    A = new ActiveXObject(this._msxml_progid[B]);
                    D = {conn: A, tId: E};
                    break;
                } catch (C) {
                }
            }
        } finally {
            return D;
        }
    },
    getConnectionObject: function (A) {
        var C;
        var D = this._transaction_id;
        try {
            if (!A) {
                C = this.createXhrObject(D);
            } else {
                C = {};
                C.tId = D;
                C.isUpload = true;
            }
            if (C) {
                this._transaction_id++;
            }
        } catch (B) {
        } finally {
            return C;
        }
    },
    asyncRequest: function (F, C, E, A) {
        var D = (this._isFileUpload) ? this.getConnectionObject(true) : this.getConnectionObject();
        var B = (E && E.argument) ? E.argument : null;
        if (!D) {
            return null;
        } else {
            if (E && E.customevents) {
                this.initCustomEvents(D, E);
            }
            if (this._isFormSubmit) {
                if (this._isFileUpload) {
                    this.uploadFile(D, E, C, A);
                    return D;
                }
                if (F.toUpperCase() == "GET") {
                    if (this._sFormData.length !== 0) {
                        C += ((C.indexOf("?") == -1) ? "?" : "&") + this._sFormData;
                    }
                } else {
                    if (F.toUpperCase() == "POST") {
                        A = A ? this._sFormData + "&" + A : this._sFormData;
                    }
                }
            }
            if (F.toUpperCase() == "GET" && (E && E.cache === false)) {
                C += ((C.indexOf("?") == -1) ? "?" : "&") + "rnd=" + new Date().valueOf().toString();
            }
            D.conn.open(F, C, true);
            if (this._use_default_xhr_header) {
                if (!this._default_headers["X-Requested-With"]) {
                    this.initHeader("X-Requested-With", this._default_xhr_header, true);
                }
            }
            if ((F.toUpperCase() == "POST" && this._use_default_post_header) && this._isFormSubmit === false) {
                this.initHeader("Content-Type", this._default_post_header);
            }
            if (this._has_default_headers || this._has_http_headers) {
                this.setHeader(D);
            }
            this.handleReadyState(D, E);
            D.conn.send(A || null);
            if (this._isFormSubmit === true) {
                this.resetFormState();
            }
            this.startEvent.fire(D, B);
            if (D.startEvent) {
                D.startEvent.fire(D, B);
            }
            return D;
        }
    },
    initCustomEvents: function (A, C) {
        for (var B in C.customevents) {
            if (this._customEvents[B][0]) {
                A[this._customEvents[B][0]] = new YAHOO.util.CustomEvent(this._customEvents[B][1], (C.scope) ? C.scope : null);
                A[this._customEvents[B][0]].subscribe(C.customevents[B]);
            }
        }
    },
    handleReadyState: function (C, D) {
        var B = this;
        var A = (D && D.argument) ? D.argument : null;
        if (D && D.timeout) {
            this._timeOut[C.tId] = window.setTimeout(function () {
                B.abort(C, D, true);
            }, D.timeout);
        }
        this._poll[C.tId] = window.setInterval(function () {
            if (C.conn && C.conn.readyState === 4) {
                window.clearInterval(B._poll[C.tId]);
                delete B._poll[C.tId];
                if (D && D.timeout) {
                    window.clearTimeout(B._timeOut[C.tId]);
                    delete B._timeOut[C.tId];
                }
                B.completeEvent.fire(C, A);
                if (C.completeEvent) {
                    C.completeEvent.fire(C, A);
                }
                B.handleTransactionResponse(C, D);
            }
        }, this._polling_interval);
    },
    handleTransactionResponse: function (F, G, A) {
        var D, C;
        var B = (G && G.argument) ? G.argument : null;
        try {
            if (F.conn.status !== undefined && F.conn.status !== 0) {
                D = F.conn.status;
            } else {
                D = 13030;
            }
        } catch (E) {
            D = 13030;
        }
        if (D >= 200 && D < 300 || D === 1223) {
            C = this.createResponseObject(F, B);
            if (G && G.success) {
                if (!G.scope) {
                    G.success(C);
                } else {
                    G.success.apply(G.scope, [C]);
                }
            }
            this.successEvent.fire(C);
            if (F.successEvent) {
                F.successEvent.fire(C);
            }
        } else {
            switch (D) {
                case 12002:
                case 12029:
                case 12030:
                case 12031:
                case 12152:
                case 13030:
                    C = this.createExceptionObject(F.tId, B, (A ? A : false));
                    if (G && G.failure) {
                        if (!G.scope) {
                            G.failure(C);
                        } else {
                            G.failure.apply(G.scope, [C]);
                        }
                    }
                    break;
                default:
                    C = this.createResponseObject(F, B);
                    if (G && G.failure) {
                        if (!G.scope) {
                            G.failure(C);
                        } else {
                            G.failure.apply(G.scope, [C]);
                        }
                    }
            }
            this.failureEvent.fire(C);
            if (F.failureEvent) {
                F.failureEvent.fire(C);
            }
        }
        this.releaseObject(F);
        C = null;
    },
    createResponseObject: function (A, G) {
        var D = {};
        var I = {};
        try {
            var C = A.conn.getAllResponseHeaders();
            var F = C.split("\n");
            for (var E = 0; E < F.length; E++) {
                var B = F[E].indexOf(":");
                if (B != -1) {
                    I[F[E].substring(0, B)] = F[E].substring(B + 2);
                }
            }
        } catch (H) {
        }
        D.tId = A.tId;
        D.status = (A.conn.status == 1223) ? 204 : A.conn.status;
        D.statusText = (A.conn.status == 1223) ? "No Content" : A.conn.statusText;
        D.getResponseHeader = I;
        D.getAllResponseHeaders = C;
        D.responseText = A.conn.responseText;
        D.responseXML = A.conn.responseXML;
        if (G) {
            D.argument = G;
        }
        return D;
    },
    createExceptionObject: function (H, D, A) {
        var F = 0;
        var G = "communication failure";
        var C = -1;
        var B = "transaction aborted";
        var E = {};
        E.tId = H;
        if (A) {
            E.status = C;
            E.statusText = B;
        } else {
            E.status = F;
            E.statusText = G;
        }
        if (D) {
            E.argument = D;
        }
        return E;
    },
    initHeader: function (A, D, C) {
        var B = (C) ? this._default_headers : this._http_headers;
        B[A] = D;
        if (C) {
            this._has_default_headers = true;
        } else {
            this._has_http_headers = true;
        }
    },
    setHeader: function (A) {
        if (this._has_default_headers) {
            for (var B in this._default_headers) {
                if (YAHOO.lang.hasOwnProperty(this._default_headers, B)) {
                    A.conn.setRequestHeader(B, this._default_headers[B]);
                }
            }
        }
        if (this._has_http_headers) {
            for (var B in this._http_headers) {
                if (YAHOO.lang.hasOwnProperty(this._http_headers, B)) {
                    A.conn.setRequestHeader(B, this._http_headers[B]);
                }
            }
            delete this._http_headers;
            this._http_headers = {};
            this._has_http_headers = false;
        }
    },
    resetDefaultHeaders: function () {
        delete this._default_headers;
        this._default_headers = {};
        this._has_default_headers = false;
    },
    setForm: function (K, E, B) {
        this.resetFormState();
        var J;
        if (typeof K == "string") {
            J = (document.getElementById(K) || document.forms[K]);
        } else {
            if (typeof K == "object") {
                J = K;
            } else {
                return;
            }
        }
        if (E) {
            var F = this.createFrame(B ? B : null);
            this._isFormSubmit = true;
            this._isFileUpload = true;
            this._formNode = J;
            return;
        }
        var A, I, G, L;
        var H = false;
        for (var D = 0; D < J.elements.length; D++) {
            A = J.elements[D];
            L = A.disabled;
            I = A.name;
            G = A.value;
            if (!L && I) {
                switch (A.type) {
                    case"select-one":
                    case"select-multiple":
                        for (var C = 0; C < A.options.length; C++) {
                            if (A.options[C].selected) {
                                if (window.ActiveXObject) {
                                    this._sFormData += encodeURIComponent(I) + "=" + encodeURIComponent(A.options[C].attributes["value"].specified ? A.options[C].value : A.options[C].text) + "&";
                                } else {
                                    this._sFormData += encodeURIComponent(I) + "=" + encodeURIComponent(A.options[C].hasAttribute("value") ? A.options[C].value : A.options[C].text) + "&";
                                }
                            }
                        }
                        break;
                    case"radio":
                    case"checkbox":
                        if (A.checked) {
                            this._sFormData += encodeURIComponent(I) + "=" + encodeURIComponent(G) + "&";
                        }
                        break;
                    case"file":
                    case undefined:
                    case"reset":
                    case"button":
                        break;
                    case"submit":
                        if (H === false) {
                            if (this._hasSubmitListener && this._submitElementValue) {
                                this._sFormData += this._submitElementValue + "&";
                            } else {
                                this._sFormData += encodeURIComponent(I) + "=" + encodeURIComponent(G) + "&";
                            }
                            H = true;
                        }
                        break;
                    default:
                        this._sFormData += encodeURIComponent(I) + "=" + encodeURIComponent(G) + "&";
                }
            }
        }
        this._isFormSubmit = true;
        this._sFormData = this._sFormData.substr(0, this._sFormData.length - 1);
        this.initHeader("Content-Type", this._default_form_header);
        return this._sFormData;
    },
    resetFormState: function () {
        this._isFormSubmit = false;
        this._isFileUpload = false;
        this._formNode = null;
        this._sFormData = "";
    },
    createFrame: function (A) {
        var B = "yuiIO" + this._transaction_id;
        var C;
        if (window.ActiveXObject) {
            C = document.createElement("<iframe id=\"" + B + "\" name=\"" + B + "\" />");
            if (typeof A == "boolean") {
                C.src = "javascript:false";
            } else {
                if (typeof secureURI == "string") {
                    C.src = A;
                }
            }
        } else {
            C = document.createElement("iframe");
            C.id = B;
            C.name = B;
        }
        C.style.position = "absolute";
        C.style.top = "-1000px";
        C.style.left = "-1000px";
        document.body.appendChild(C);
    },
    appendPostData: function (A) {
        var D = [];
        var B = A.split("&");
        for (var C = 0; C < B.length; C++) {
            var E = B[C].indexOf("=");
            if (E != -1) {
                D[C] = document.createElement("input");
                D[C].type = "hidden";
                D[C].name = B[C].substring(0, E);
                D[C].value = B[C].substring(E + 1);
                this._formNode.appendChild(D[C]);
            }
        }
        return D;
    },
    uploadFile: function (D, M, E, C) {
        var N = this;
        var H = "yuiIO" + D.tId;
        var I = "multipart/form-data";
        var K = document.getElementById(H);
        var J = (M && M.argument) ? M.argument : null;
        var B = {
            action: this._formNode.getAttribute("action"),
            method: this._formNode.getAttribute("method"),
            target: this._formNode.getAttribute("target")
        };
        this._formNode.setAttribute("action", E);
        this._formNode.setAttribute("method", "POST");
        this._formNode.setAttribute("target", H);
        if (this._formNode.encoding) {
            this._formNode.setAttribute("encoding", I);
        } else {
            this._formNode.setAttribute("enctype", I);
        }
        if (C) {
            var L = this.appendPostData(C);
        }
        this._formNode.submit();
        this.startEvent.fire(D, J);
        if (D.startEvent) {
            D.startEvent.fire(D, J);
        }
        if (M && M.timeout) {
            this._timeOut[D.tId] = window.setTimeout(function () {
                N.abort(D, M, true);
            }, M.timeout);
        }
        if (L && L.length > 0) {
            for (var G = 0; G < L.length; G++) {
                this._formNode.removeChild(L[G]);
            }
        }
        for (var A in B) {
            if (YAHOO.lang.hasOwnProperty(B, A)) {
                if (B[A]) {
                    this._formNode.setAttribute(A, B[A]);
                } else {
                    this._formNode.removeAttribute(A);
                }
            }
        }
        this.resetFormState();
        var F = function () {
            if (M && M.timeout) {
                window.clearTimeout(N._timeOut[D.tId]);
                delete N._timeOut[D.tId];
            }
            N.completeEvent.fire(D, J);
            if (D.completeEvent) {
                D.completeEvent.fire(D, J);
            }
            var P = {};
            P.tId = D.tId;
            P.argument = M.argument;
            try {
                P.responseText = K.contentWindow.document.body ? K.contentWindow.document.body.innerHTML : K.contentWindow.document.documentElement.textContent;
                P.responseXML = K.contentWindow.document.XMLDocument ? K.contentWindow.document.XMLDocument : K.contentWindow.document;
            } catch (O) {
            }
            if (M && M.upload) {
                if (!M.scope) {
                    M.upload(P);
                } else {
                    M.upload.apply(M.scope, [P]);
                }
            }
            N.uploadEvent.fire(P);
            if (D.uploadEvent) {
                D.uploadEvent.fire(P);
            }
            YAHOO.util.Event.removeListener(K, "load", F);
            setTimeout(function () {
                document.body.removeChild(K);
                N.releaseObject(D);
            }, 100);
        };
        YAHOO.util.Event.addListener(K, "load", F);
    },
    abort: function (E, G, A) {
        var D;
        var B = (G && G.argument) ? G.argument : null;
        if (E && E.conn) {
            if (this.isCallInProgress(E)) {
                E.conn.abort();
                window.clearInterval(this._poll[E.tId]);
                delete this._poll[E.tId];
                if (A) {
                    window.clearTimeout(this._timeOut[E.tId]);
                    delete this._timeOut[E.tId];
                }
                D = true;
            }
        } else {
            if (E && E.isUpload === true) {
                var C = "yuiIO" + E.tId;
                var F = document.getElementById(C);
                if (F) {
                    YAHOO.util.Event.removeListener(F, "load");
                    document.body.removeChild(F);
                    if (A) {
                        window.clearTimeout(this._timeOut[E.tId]);
                        delete this._timeOut[E.tId];
                    }
                    D = true;
                }
            } else {
                D = false;
            }
        }
        if (D === true) {
            this.abortEvent.fire(E, B);
            if (E.abortEvent) {
                E.abortEvent.fire(E, B);
            }
            this.handleTransactionResponse(E, G, true);
        }
        return D;
    },
    isCallInProgress: function (B) {
        if (B && B.conn) {
            return B.conn.readyState !== 4 && B.conn.readyState !== 0;
        } else {
            if (B && B.isUpload === true) {
                var A = "yuiIO" + B.tId;
                return document.getElementById(A) ? true : false;
            } else {
                return false;
            }
        }
    },
    releaseObject: function (A) {
        if (A && A.conn) {
            A.conn = null;
            A = null;
        }
    }
};
YAHOO.register("connection", YAHOO.util.Connect, {version: "2.4.1", build: "742"});
YAHOO.util.Anim = function (B, A, C, D) {
    if (!B) {
    }
    this.init(B, A, C, D);
};
YAHOO.util.Anim.prototype = {
    toString: function () {
        var A = this.getEl();
        var B = A.id || A.tagName || A;
        return ("Anim " + B);
    },
    patterns: {
        noNegatives: /width|height|opacity|padding/i,
        offsetAttribute: /^((width|height)|(top|left))$/,
        defaultUnit: /width|height|top$|bottom$|left$|right$/i,
        offsetUnit: /\d+(em|%|en|ex|pt|in|cm|mm|pc)$/i
    },
    doMethod: function (A, C, B) {
        return this.method(this.currentFrame, C, B - C, this.totalFrames);
    },
    setAttribute: function (A, C, B) {
        if (this.patterns.noNegatives.test(A)) {
            C = (C > 0) ? C : 0;
        }
        YAHOO.util.Dom.setStyle(this.getEl(), A, C + B);
    },
    getAttribute: function (A) {
        var C = this.getEl();
        var E = YAHOO.util.Dom.getStyle(C, A);
        if (E !== "auto" && !this.patterns.offsetUnit.test(E)) {
            return parseFloat(E);
        }
        var B = this.patterns.offsetAttribute.exec(A) || [];
        var F = !!(B[3]);
        var D = !!(B[2]);
        if (D || (YAHOO.util.Dom.getStyle(C, "position") == "absolute" && F)) {
            E = C["offset" + B[0].charAt(0).toUpperCase() + B[0].substr(1)];
        } else {
            E = 0;
        }
        return E;
    },
    getDefaultUnit: function (A) {
        if (this.patterns.defaultUnit.test(A)) {
            return "px";
        }
        return "";
    },
    setRuntimeAttribute: function (B) {
        var G;
        var C;
        var D = this.attributes;
        this.runtimeAttributes[B] = {};
        var F = function (H) {
            return (typeof H !== "undefined");
        };
        if (!F(D[B]["to"]) && !F(D[B]["by"])) {
            return false;
        }
        G = (F(D[B]["from"])) ? D[B]["from"] : this.getAttribute(B);
        if (F(D[B]["to"])) {
            C = D[B]["to"];
        } else {
            if (F(D[B]["by"])) {
                if (G.constructor == Array) {
                    C = [];
                    for (var E = 0, A = G.length; E < A; ++E) {
                        C[E] = G[E] + D[B]["by"][E] * 1;
                    }
                } else {
                    C = G + D[B]["by"] * 1;
                }
            }
        }
        this.runtimeAttributes[B].start = G;
        this.runtimeAttributes[B].end = C;
        this.runtimeAttributes[B].unit = (F(D[B].unit)) ? D[B]["unit"] : this.getDefaultUnit(B);
        return true;
    },
    init: function (C, H, G, A) {
        var B = false;
        var D = null;
        var F = 0;
        C = YAHOO.util.Dom.get(C);
        this.attributes = H || {};
        this.duration = !YAHOO.lang.isUndefined(G) ? G : 1;
        this.method = A || YAHOO.util.Easing.easeNone;
        this.useSeconds = true;
        this.currentFrame = 0;
        this.totalFrames = YAHOO.util.AnimMgr.fps;
        this.setEl = function (K) {
            C = YAHOO.util.Dom.get(K);
        };
        this.getEl = function () {
            return C;
        };
        this.isAnimated = function () {
            return B;
        };
        this.getStartTime = function () {
            return D;
        };
        this.runtimeAttributes = {};
        this.animate = function () {
            if (this.isAnimated()) {
                return false;
            }
            this.currentFrame = 0;
            this.totalFrames = (this.useSeconds) ? Math.ceil(YAHOO.util.AnimMgr.fps * this.duration) : this.duration;
            if (this.duration === 0 && this.useSeconds) {
                this.totalFrames = 1;
            }
            YAHOO.util.AnimMgr.registerElement(this);
            return true;
        };
        this.stop = function (K) {
            if (!this.isAnimated()) {
                return false;
            }
            if (K) {
                this.currentFrame = this.totalFrames;
                this._onTween.fire();
            }
            YAHOO.util.AnimMgr.stop(this);
        };
        var J = function () {
            this.onStart.fire();
            this.runtimeAttributes = {};
            for (var K in this.attributes) {
                this.setRuntimeAttribute(K);
            }
            B = true;
            F = 0;
            D = new Date();
        };
        var I = function () {
            var M = {duration: new Date() - this.getStartTime(), currentFrame: this.currentFrame};
            M.toString = function () {
                return ("duration: " + M.duration + ", currentFrame: " + M.currentFrame);
            };
            this.onTween.fire(M);
            var L = this.runtimeAttributes;
            for (var K in L) {
                this.setAttribute(K, this.doMethod(K, L[K].start, L[K].end), L[K].unit);
            }
            F += 1;
        };
        var E = function () {
            var K = (new Date() - D) / 1000;
            var L = {duration: K, frames: F, fps: F / K};
            L.toString = function () {
                return ("duration: " + L.duration + ", frames: " + L.frames + ", fps: " + L.fps);
            };
            B = false;
            F = 0;
            this.onComplete.fire(L);
        };
        this._onStart = new YAHOO.util.CustomEvent("_start", this, true);
        this.onStart = new YAHOO.util.CustomEvent("start", this);
        this.onTween = new YAHOO.util.CustomEvent("tween", this);
        this._onTween = new YAHOO.util.CustomEvent("_tween", this, true);
        this.onComplete = new YAHOO.util.CustomEvent("complete", this);
        this._onComplete = new YAHOO.util.CustomEvent("_complete", this, true);
        this._onStart.subscribe(J);
        this._onTween.subscribe(I);
        this._onComplete.subscribe(E);
    }
};
YAHOO.util.AnimMgr = new function () {
    var C = null;
    var B = [];
    var A = 0;
    this.fps = 1000;
    this.delay = 1;
    this.registerElement = function (F) {
        B[B.length] = F;
        A += 1;
        F._onStart.fire();
        this.start();
    };
    this.unRegister = function (G, F) {
        F = F || E(G);
        if (!G.isAnimated() || F == -1) {
            return false;
        }
        G._onComplete.fire();
        B.splice(F, 1);
        A -= 1;
        if (A <= 0) {
            this.stop();
        }
        return true;
    };
    this.start = function () {
        if (C === null) {
            C = setInterval(this.run, this.delay);
        }
    };
    this.stop = function (H) {
        if (!H) {
            clearInterval(C);
            for (var G = 0, F = B.length; G < F; ++G) {
                this.unRegister(B[0], 0);
            }
            B = [];
            C = null;
            A = 0;
        } else {
            this.unRegister(H);
        }
    };
    this.run = function () {
        for (var H = 0, F = B.length; H < F; ++H) {
            var G = B[H];
            if (!G || !G.isAnimated()) {
                continue;
            }
            if (G.currentFrame < G.totalFrames || G.totalFrames === null) {
                G.currentFrame += 1;
                if (G.useSeconds) {
                    D(G);
                }
                G._onTween.fire();
            } else {
                YAHOO.util.AnimMgr.stop(G, H);
            }
        }
    };
    var E = function (H) {
        for (var G = 0, F = B.length; G < F; ++G) {
            if (B[G] == H) {
                return G;
            }
        }
        return -1;
    };
    var D = function (G) {
        var J = G.totalFrames;
        var I = G.currentFrame;
        var H = (G.currentFrame * G.duration * 1000 / G.totalFrames);
        var F = (new Date() - G.getStartTime());
        var K = 0;
        if (F < G.duration * 1000) {
            K = Math.round((F / H - 1) * G.currentFrame);
        } else {
            K = J - (I + 1);
        }
        if (K > 0 && isFinite(K)) {
            if (G.currentFrame + K >= J) {
                K = J - (I + 1);
            }
            G.currentFrame += K;
        }
    };
};
YAHOO.util.Bezier = new function () {
    this.getPosition = function (E, D) {
        var F = E.length;
        var C = [];
        for (var B = 0; B < F; ++B) {
            C[B] = [E[B][0], E[B][1]];
        }
        for (var A = 1; A < F; ++A) {
            for (B = 0; B < F - A; ++B) {
                C[B][0] = (1 - D) * C[B][0] + D * C[parseInt(B + 1, 10)][0];
                C[B][1] = (1 - D) * C[B][1] + D * C[parseInt(B + 1, 10)][1];
            }
        }
        return [C[0][0], C[0][1]];
    };
};
(function () {
    YAHOO.util.ColorAnim = function (E, D, F, G) {
        YAHOO.util.ColorAnim.superclass.constructor.call(this, E, D, F, G);
    };
    YAHOO.extend(YAHOO.util.ColorAnim, YAHOO.util.Anim);
    var B = YAHOO.util;
    var C = B.ColorAnim.superclass;
    var A = B.ColorAnim.prototype;
    A.toString = function () {
        var D = this.getEl();
        var E = D.id || D.tagName;
        return ("ColorAnim " + E);
    };
    A.patterns.color = /color$/i;
    A.patterns.rgb = /^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i;
    A.patterns.hex = /^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i;
    A.patterns.hex3 = /^#?([0-9A-F]{1})([0-9A-F]{1})([0-9A-F]{1})$/i;
    A.patterns.transparent = /^transparent|rgba\(0, 0, 0, 0\)$/;
    A.parseColor = function (D) {
        if (D.length == 3) {
            return D;
        }
        var E = this.patterns.hex.exec(D);
        if (E && E.length == 4) {
            return [parseInt(E[1], 16), parseInt(E[2], 16), parseInt(E[3], 16)];
        }
        E = this.patterns.rgb.exec(D);
        if (E && E.length == 4) {
            return [parseInt(E[1], 10), parseInt(E[2], 10), parseInt(E[3], 10)];
        }
        E = this.patterns.hex3.exec(D);
        if (E && E.length == 4) {
            return [parseInt(E[1] + E[1], 16), parseInt(E[2] + E[2], 16), parseInt(E[3] + E[3], 16)];
        }
        return null;
    };
    A.getAttribute = function (D) {
        var F = this.getEl();
        if (this.patterns.color.test(D)) {
            var G = YAHOO.util.Dom.getStyle(F, D);
            if (this.patterns.transparent.test(G)) {
                var E = F.parentNode;
                G = B.Dom.getStyle(E, D);
                while (E && this.patterns.transparent.test(G)) {
                    E = E.parentNode;
                    G = B.Dom.getStyle(E, D);
                    if (E.tagName.toUpperCase() == "HTML") {
                        G = "#fff";
                    }
                }
            }
        } else {
            G = C.getAttribute.call(this, D);
        }
        return G;
    };
    A.doMethod = function (E, I, F) {
        var H;
        if (this.patterns.color.test(E)) {
            H = [];
            for (var G = 0, D = I.length; G < D; ++G) {
                H[G] = C.doMethod.call(this, E, I[G], F[G]);
            }
            H = "rgb(" + Math.floor(H[0]) + "," + Math.floor(H[1]) + "," + Math.floor(H[2]) + ")";
        } else {
            H = C.doMethod.call(this, E, I, F);
        }
        return H;
    };
    A.setRuntimeAttribute = function (E) {
        C.setRuntimeAttribute.call(this, E);
        if (this.patterns.color.test(E)) {
            var G = this.attributes;
            var I = this.parseColor(this.runtimeAttributes[E].start);
            var F = this.parseColor(this.runtimeAttributes[E].end);
            if (typeof G[E]["to"] === "undefined" && typeof G[E]["by"] !== "undefined") {
                F = this.parseColor(G[E].by);
                for (var H = 0, D = I.length; H < D; ++H) {
                    F[H] = I[H] + F[H];
                }
            }
            this.runtimeAttributes[E].start = I;
            this.runtimeAttributes[E].end = F;
        }
    };
})();
YAHOO.util.Easing = {
    easeNone: function (B, A, D, C) {
        return D * B / C + A;
    }, easeIn: function (B, A, D, C) {
        return D * (B /= C) * B + A;
    }, easeOut: function (B, A, D, C) {
        return -D * (B /= C) * (B - 2) + A;
    }, easeBoth: function (B, A, D, C) {
        if ((B /= C / 2) < 1) {
            return D / 2 * B * B + A;
        }
        return -D / 2 * ((--B) * (B - 2) - 1) + A;
    }, easeInStrong: function (B, A, D, C) {
        return D * (B /= C) * B * B * B + A;
    }, easeOutStrong: function (B, A, D, C) {
        return -D * ((B = B / C - 1) * B * B * B - 1) + A;
    }, easeBothStrong: function (B, A, D, C) {
        if ((B /= C / 2) < 1) {
            return D / 2 * B * B * B * B + A;
        }
        return -D / 2 * ((B -= 2) * B * B * B - 2) + A;
    }, elasticIn: function (C, A, G, F, B, E) {
        if (C == 0) {
            return A;
        }
        if ((C /= F) == 1) {
            return A + G;
        }
        if (!E) {
            E = F * 0.3;
        }
        if (!B || B < Math.abs(G)) {
            B = G;
            var D = E / 4;
        } else {
            var D = E / (2 * Math.PI) * Math.asin(G / B);
        }
        return -(B * Math.pow(2, 10 * (C -= 1)) * Math.sin((C * F - D) * (2 * Math.PI) / E)) + A;
    }, elasticOut: function (C, A, G, F, B, E) {
        if (C == 0) {
            return A;
        }
        if ((C /= F) == 1) {
            return A + G;
        }
        if (!E) {
            E = F * 0.3;
        }
        if (!B || B < Math.abs(G)) {
            B = G;
            var D = E / 4;
        } else {
            var D = E / (2 * Math.PI) * Math.asin(G / B);
        }
        return B * Math.pow(2, -10 * C) * Math.sin((C * F - D) * (2 * Math.PI) / E) + G + A;
    }, elasticBoth: function (C, A, G, F, B, E) {
        if (C == 0) {
            return A;
        }
        if ((C /= F / 2) == 2) {
            return A + G;
        }
        if (!E) {
            E = F * (0.3 * 1.5);
        }
        if (!B || B < Math.abs(G)) {
            B = G;
            var D = E / 4;
        } else {
            var D = E / (2 * Math.PI) * Math.asin(G / B);
        }
        if (C < 1) {
            return -0.5 * (B * Math.pow(2, 10 * (C -= 1)) * Math.sin((C * F - D) * (2 * Math.PI) / E)) + A;
        }
        return B * Math.pow(2, -10 * (C -= 1)) * Math.sin((C * F - D) * (2 * Math.PI) / E) * 0.5 + G + A;
    }, backIn: function (B, A, E, D, C) {
        if (typeof C == "undefined") {
            C = 1.70158;
        }
        return E * (B /= D) * B * ((C + 1) * B - C) + A;
    }, backOut: function (B, A, E, D, C) {
        if (typeof C == "undefined") {
            C = 1.70158;
        }
        return E * ((B = B / D - 1) * B * ((C + 1) * B + C) + 1) + A;
    }, backBoth: function (B, A, E, D, C) {
        if (typeof C == "undefined") {
            C = 1.70158;
        }
        if ((B /= D / 2) < 1) {
            return E / 2 * (B * B * (((C *= (1.525)) + 1) * B - C)) + A;
        }
        return E / 2 * ((B -= 2) * B * (((C *= (1.525)) + 1) * B + C) + 2) + A;
    }, bounceIn: function (B, A, D, C) {
        return D - YAHOO.util.Easing.bounceOut(C - B, 0, D, C) + A;
    }, bounceOut: function (B, A, D, C) {
        if ((B /= C) < (1 / 2.75)) {
            return D * (7.5625 * B * B) + A;
        } else {
            if (B < (2 / 2.75)) {
                return D * (7.5625 * (B -= (1.5 / 2.75)) * B + 0.75) + A;
            } else {
                if (B < (2.5 / 2.75)) {
                    return D * (7.5625 * (B -= (2.25 / 2.75)) * B + 0.9375) + A;
                }
            }
        }
        return D * (7.5625 * (B -= (2.625 / 2.75)) * B + 0.984375) + A;
    }, bounceBoth: function (B, A, D, C) {
        if (B < C / 2) {
            return YAHOO.util.Easing.bounceIn(B * 2, 0, D, C) * 0.5 + A;
        }
        return YAHOO.util.Easing.bounceOut(B * 2 - C, 0, D, C) * 0.5 + D * 0.5 + A;
    }
};
(function () {
    YAHOO.util.Motion = function (G, F, H, I) {
        if (G) {
            YAHOO.util.Motion.superclass.constructor.call(this, G, F, H, I);
        }
    };
    YAHOO.extend(YAHOO.util.Motion, YAHOO.util.ColorAnim);
    var D = YAHOO.util;
    var E = D.Motion.superclass;
    var B = D.Motion.prototype;
    B.toString = function () {
        var F = this.getEl();
        var G = F.id || F.tagName;
        return ("Motion " + G);
    };
    B.patterns.points = /^points$/i;
    B.setAttribute = function (F, H, G) {
        if (this.patterns.points.test(F)) {
            G = G || "px";
            E.setAttribute.call(this, "left", H[0], G);
            E.setAttribute.call(this, "top", H[1], G);
        } else {
            E.setAttribute.call(this, F, H, G);
        }
    };
    B.getAttribute = function (F) {
        if (this.patterns.points.test(F)) {
            var G = [E.getAttribute.call(this, "left"), E.getAttribute.call(this, "top")];
        } else {
            G = E.getAttribute.call(this, F);
        }
        return G;
    };
    B.doMethod = function (F, J, G) {
        var I = null;
        if (this.patterns.points.test(F)) {
            var H = this.method(this.currentFrame, 0, 100, this.totalFrames) / 100;
            I = D.Bezier.getPosition(this.runtimeAttributes[F], H);
        } else {
            I = E.doMethod.call(this, F, J, G);
        }
        return I;
    };
    B.setRuntimeAttribute = function (O) {
        if (this.patterns.points.test(O)) {
            var G = this.getEl();
            var I = this.attributes;
            var F;
            var K = I["points"]["control"] || [];
            var H;
            var L, N;
            if (K.length > 0 && !(K[0] instanceof Array)) {
                K = [K];
            } else {
                var J = [];
                for (L = 0, N = K.length; L < N; ++L) {
                    J[L] = K[L];
                }
                K = J;
            }
            if (D.Dom.getStyle(G, "position") == "static") {
                D.Dom.setStyle(G, "position", "relative");
            }
            if (C(I["points"]["from"])) {
                D.Dom.setXY(G, I["points"]["from"]);
            } else {
                D.Dom.setXY(G, D.Dom.getXY(G));
            }
            F = this.getAttribute("points");
            if (C(I["points"]["to"])) {
                H = A.call(this, I["points"]["to"], F);
                var M = D.Dom.getXY(this.getEl());
                for (L = 0, N = K.length; L < N; ++L) {
                    K[L] = A.call(this, K[L], F);
                }
            } else {
                if (C(I["points"]["by"])) {
                    H = [F[0] + I["points"]["by"][0], F[1] + I["points"]["by"][1]];
                    for (L = 0, N = K.length; L < N; ++L) {
                        K[L] = [F[0] + K[L][0], F[1] + K[L][1]];
                    }
                }
            }
            this.runtimeAttributes[O] = [F];
            if (K.length > 0) {
                this.runtimeAttributes[O] = this.runtimeAttributes[O].concat(K);
            }
            this.runtimeAttributes[O][this.runtimeAttributes[O].length] = H;
        } else {
            E.setRuntimeAttribute.call(this, O);
        }
    };
    var A = function (F, H) {
        var G = D.Dom.getXY(this.getEl());
        F = [F[0] - G[0] + H[0], F[1] - G[1] + H[1]];
        return F;
    };
    var C = function (F) {
        return (typeof F !== "undefined");
    };
})();
(function () {
    YAHOO.util.Scroll = function (E, D, F, G) {
        if (E) {
            YAHOO.util.Scroll.superclass.constructor.call(this, E, D, F, G);
        }
    };
    YAHOO.extend(YAHOO.util.Scroll, YAHOO.util.ColorAnim);
    var B = YAHOO.util;
    var C = B.Scroll.superclass;
    var A = B.Scroll.prototype;
    A.toString = function () {
        var D = this.getEl();
        var E = D.id || D.tagName;
        return ("Scroll " + E);
    };
    A.doMethod = function (D, G, E) {
        var F = null;
        if (D == "scroll") {
            F = [this.method(this.currentFrame, G[0], E[0] - G[0], this.totalFrames), this.method(this.currentFrame, G[1], E[1] - G[1], this.totalFrames)];
        } else {
            F = C.doMethod.call(this, D, G, E);
        }
        return F;
    };
    A.getAttribute = function (D) {
        var F = null;
        var E = this.getEl();
        if (D == "scroll") {
            F = [E.scrollLeft, E.scrollTop];
        } else {
            F = C.getAttribute.call(this, D);
        }
        return F;
    };
    A.setAttribute = function (D, G, F) {
        var E = this.getEl();
        if (D == "scroll") {
            E.scrollLeft = G[0];
            E.scrollTop = G[1];
        } else {
            C.setAttribute.call(this, D, G, F);
        }
    };
})();
YAHOO.register("animation", YAHOO.util.Anim, {version: "2.4.1", build: "742"});
if (!YAHOO.util.DragDropMgr) {
    YAHOO.util.DragDropMgr = function () {
        var A = YAHOO.util.Event;
        return {
            ids: {},
            handleIds: {},
            dragCurrent: null,
            dragOvers: {},
            deltaX: 0,
            deltaY: 0,
            preventDefault: true,
            stopPropagation: true,
            initialized: false,
            locked: false,
            interactionInfo: null,
            init: function () {
                this.initialized = true;
            },
            POINT: 0,
            INTERSECT: 1,
            STRICT_INTERSECT: 2,
            mode: 0,
            _execOnAll: function (D, C) {
                for (var E in this.ids) {
                    for (var B in this.ids[E]) {
                        var F = this.ids[E][B];
                        if (!this.isTypeOfDD(F)) {
                            continue;
                        }
                        F[D].apply(F, C);
                    }
                }
            },
            _onLoad: function () {
                this.init();
                A.on(document, "mouseup", this.handleMouseUp, this, true);
                A.on(document, "mousemove", this.handleMouseMove, this, true);
                A.on(window, "unload", this._onUnload, this, true);
                A.on(window, "resize", this._onResize, this, true);
            },
            _onResize: function (B) {
                this._execOnAll("resetConstraints", []);
            },
            lock: function () {
                this.locked = true;
            },
            unlock: function () {
                this.locked = false;
            },
            isLocked: function () {
                return this.locked;
            },
            locationCache: {},
            useCache: true,
            clickPixelThresh: 3,
            clickTimeThresh: 1000,
            dragThreshMet: false,
            clickTimeout: null,
            startX: 0,
            startY: 0,
            fromTimeout: false,
            regDragDrop: function (C, B) {
                if (!this.initialized) {
                    this.init();
                }
                if (!this.ids[B]) {
                    this.ids[B] = {};
                }
                this.ids[B][C.id] = C;
            },
            removeDDFromGroup: function (D, B) {
                if (!this.ids[B]) {
                    this.ids[B] = {};
                }
                var C = this.ids[B];
                if (C && C[D.id]) {
                    delete C[D.id];
                }
            },
            _remove: function (C) {
                for (var B in C.groups) {
                    if (B && this.ids[B][C.id]) {
                        delete this.ids[B][C.id];
                    }
                }
                delete this.handleIds[C.id];
            },
            regHandle: function (C, B) {
                if (!this.handleIds[C]) {
                    this.handleIds[C] = {};
                }
                this.handleIds[C][B] = B;
            },
            isDragDrop: function (B) {
                return (this.getDDById(B)) ? true : false;
            },
            getRelated: function (G, C) {
                var F = [];
                for (var E in G.groups) {
                    for (var D in this.ids[E]) {
                        var B = this.ids[E][D];
                        if (!this.isTypeOfDD(B)) {
                            continue;
                        }
                        if (!C || B.isTarget) {
                            F[F.length] = B;
                        }
                    }
                }
                return F;
            },
            isLegalTarget: function (F, E) {
                var C = this.getRelated(F, true);
                for (var D = 0, B = C.length; D < B; ++D) {
                    if (C[D].id == E.id) {
                        return true;
                    }
                }
                return false;
            },
            isTypeOfDD: function (B) {
                return (B && B.__ygDragDrop);
            },
            isHandle: function (C, B) {
                return (this.handleIds[C] && this.handleIds[C][B]);
            },
            getDDById: function (C) {
                for (var B in this.ids) {
                    if (this.ids[B][C]) {
                        return this.ids[B][C];
                    }
                }
                return null;
            },
            handleMouseDown: function (D, C) {
                this.currentTarget = YAHOO.util.Event.getTarget(D);
                this.dragCurrent = C;
                var B = C.getEl();
                this.startX = YAHOO.util.Event.getPageX(D);
                this.startY = YAHOO.util.Event.getPageY(D);
                this.deltaX = this.startX - B.offsetLeft;
                this.deltaY = this.startY - B.offsetTop;
                this.dragThreshMet = false;
                this.clickTimeout = setTimeout(function () {
                    var E = YAHOO.util.DDM;
                    E.startDrag(E.startX, E.startY);
                    E.fromTimeout = true;
                }, this.clickTimeThresh);
            },
            startDrag: function (B, D) {
                clearTimeout(this.clickTimeout);
                var C = this.dragCurrent;
                if (C) {
                    C.b4StartDrag(B, D);
                }
                if (C) {
                    C.startDrag(B, D);
                }
                this.dragThreshMet = true;
            },
            handleMouseUp: function (B) {
                if (this.dragCurrent) {
                    clearTimeout(this.clickTimeout);
                    if (this.dragThreshMet) {
                        if (this.fromTimeout) {
                            this.handleMouseMove(B);
                        }
                        this.fromTimeout = false;
                        this.fireEvents(B, true);
                    } else {
                    }
                    this.stopDrag(B);
                    this.stopEvent(B);
                }
            },
            stopEvent: function (B) {
                if (this.stopPropagation) {
                    YAHOO.util.Event.stopPropagation(B);
                }
                if (this.preventDefault) {
                    YAHOO.util.Event.preventDefault(B);
                }
            },
            stopDrag: function (C, B) {
                if (this.dragCurrent && !B) {
                    if (this.dragThreshMet) {
                        this.dragCurrent.b4EndDrag(C);
                        this.dragCurrent.endDrag(C);
                    }
                    this.dragCurrent.onMouseUp(C);
                }
                this.dragCurrent = null;
                this.dragOvers = {};
            },
            handleMouseMove: function (E) {
                var B = this.dragCurrent;
                if (B) {
                    if (YAHOO.util.Event.isIE && !E.button) {
                        this.stopEvent(E);
                        return this.handleMouseUp(E);
                    }
                    if (!this.dragThreshMet) {
                        var D = Math.abs(this.startX - YAHOO.util.Event.getPageX(E));
                        var C = Math.abs(this.startY - YAHOO.util.Event.getPageY(E));
                        if (D > this.clickPixelThresh || C > this.clickPixelThresh) {
                            this.startDrag(this.startX, this.startY);
                        }
                    }
                    if (this.dragThreshMet) {
                        B.b4Drag(E);
                        if (B) {
                            B.onDrag(E);
                        }
                        if (B) {
                            this.fireEvents(E, false);
                        }
                    }
                    this.stopEvent(E);
                }
            },
            fireEvents: function (T, J) {
                var V = this.dragCurrent;
                if (!V || V.isLocked() || V.dragOnly) {
                    return;
                }
                var L = YAHOO.util.Event.getPageX(T), K = YAHOO.util.Event.getPageY(T), M = new YAHOO.util.Point(L, K),
                    H = V.getTargetCoord(M.x, M.y), E = V.getDragEl(),
                    S = new YAHOO.util.Region(H.y, H.x + E.offsetWidth, H.y + E.offsetHeight, H.x), G = [], I = [],
                    D = [], U = [], R = [], C = {}, N = [];
                for (var P in this.dragOvers) {
                    var W = this.dragOvers[P];
                    if (!this.isTypeOfDD(W)) {
                        continue;
                    }
                    if (!this.isOverTarget(M, W, this.mode, S)) {
                        I.push(W);
                    }
                    G[P] = true;
                    delete this.dragOvers[P];
                }
                for (var O in V.groups) {
                    if ("string" != typeof O) {
                        continue;
                    }
                    for (P in this.ids[O]) {
                        var F = this.ids[O][P];
                        if (!this.isTypeOfDD(F)) {
                            continue;
                        }
                        if (F.isTarget && !F.isLocked() && F != V) {
                            if (this.isOverTarget(M, F, this.mode, S)) {
                                C[O] = true;
                                if (J) {
                                    U.push(F);
                                } else {
                                    if (!G[F.id]) {
                                        R.push(F);
                                    } else {
                                        D.push(F);
                                    }
                                    this.dragOvers[F.id] = F;
                                }
                            }
                        }
                    }
                }
                this.interactionInfo = {
                    out: I,
                    enter: R,
                    over: D,
                    drop: U,
                    point: M,
                    draggedRegion: S,
                    sourceRegion: this.locationCache[V.id],
                    validDrop: J
                };
                for (var B in C) {
                    N.push(B);
                }
                if (J && !U.length) {
                    this.interactionInfo.validDrop = false;
                    V.onInvalidDrop(T);
                }
                if (this.mode) {
                    if (I.length) {
                        V.b4DragOut(T, I);
                        if (V) {
                            V.onDragOut(T, I);
                        }
                    }
                    if (R.length) {
                        if (V) {
                            V.onDragEnter(T, R, N);
                        }
                    }
                    if (D.length) {
                        if (V) {
                            V.b4DragOver(T, D, N);
                        }
                        if (V) {
                            V.onDragOver(T, D, N);
                        }
                    }
                    if (U.length) {
                        if (V) {
                            V.b4DragDrop(T, U, N);
                        }
                        if (V) {
                            V.onDragDrop(T, U, N);
                        }
                    }
                } else {
                    var Q = 0;
                    for (P = 0, Q = I.length; P < Q; ++P) {
                        if (V) {
                            V.b4DragOut(T, I[P].id, N[0]);
                        }
                        if (V) {
                            V.onDragOut(T, I[P].id, N[0]);
                        }
                    }
                    for (P = 0, Q = R.length; P < Q; ++P) {
                        if (V) {
                            V.onDragEnter(T, R[P].id, N[0]);
                        }
                    }
                    for (P = 0, Q = D.length; P < Q; ++P) {
                        if (V) {
                            V.b4DragOver(T, D[P].id, N[0]);
                        }
                        if (V) {
                            V.onDragOver(T, D[P].id, N[0]);
                        }
                    }
                    for (P = 0, Q = U.length; P < Q; ++P) {
                        if (V) {
                            V.b4DragDrop(T, U[P].id, N[0]);
                        }
                        if (V) {
                            V.onDragDrop(T, U[P].id, N[0]);
                        }
                    }
                }
            },
            getBestMatch: function (D) {
                var F = null;
                var C = D.length;
                if (C == 1) {
                    F = D[0];
                } else {
                    for (var E = 0; E < C; ++E) {
                        var B = D[E];
                        if (this.mode == this.INTERSECT && B.cursorIsOver) {
                            F = B;
                            break;
                        } else {
                            if (!F || !F.overlap || (B.overlap && F.overlap.getArea() < B.overlap.getArea())) {
                                F = B;
                            }
                        }
                    }
                }
                return F;
            },
            refreshCache: function (C) {
                var E = C || this.ids;
                for (var B in E) {
                    if ("string" != typeof B) {
                        continue;
                    }
                    for (var D in this.ids[B]) {
                        var F = this.ids[B][D];
                        if (this.isTypeOfDD(F)) {
                            var G = this.getLocation(F);
                            if (G) {
                                this.locationCache[F.id] = G;
                            } else {
                                delete this.locationCache[F.id];
                            }
                        }
                    }
                }
            },
            verifyEl: function (C) {
                try {
                    if (C) {
                        var B = C.offsetParent;
                        if (B) {
                            return true;
                        }
                    }
                } catch (D) {
                }
                return false;
            },
            getLocation: function (G) {
                if (!this.isTypeOfDD(G)) {
                    return null;
                }
                var E = G.getEl(), J, D, C, L, K, M, B, I, F;
                try {
                    J = YAHOO.util.Dom.getXY(E);
                } catch (H) {
                }
                if (!J) {
                    return null;
                }
                D = J[0];
                C = D + E.offsetWidth;
                L = J[1];
                K = L + E.offsetHeight;
                M = L - G.padding[0];
                B = C + G.padding[1];
                I = K + G.padding[2];
                F = D - G.padding[3];
                return new YAHOO.util.Region(M, B, I, F);
            },
            isOverTarget: function (J, B, D, E) {
                var F = this.locationCache[B.id];
                if (!F || !this.useCache) {
                    F = this.getLocation(B);
                    this.locationCache[B.id] = F;
                }
                if (!F) {
                    return false;
                }
                B.cursorIsOver = F.contains(J);
                var I = this.dragCurrent;
                if (!I || (!D && !I.constrainX && !I.constrainY)) {
                    return B.cursorIsOver;
                }
                B.overlap = null;
                if (!E) {
                    var G = I.getTargetCoord(J.x, J.y);
                    var C = I.getDragEl();
                    E = new YAHOO.util.Region(G.y, G.x + C.offsetWidth, G.y + C.offsetHeight, G.x);
                }
                var H = E.intersect(F);
                if (H) {
                    B.overlap = H;
                    return (D) ? true : B.cursorIsOver;
                } else {
                    return false;
                }
            },
            _onUnload: function (C, B) {
                this.unregAll();
            },
            unregAll: function () {
                if (this.dragCurrent) {
                    this.stopDrag();
                    this.dragCurrent = null;
                }
                this._execOnAll("unreg", []);
                this.ids = {};
            },
            elementCache: {},
            getElWrapper: function (C) {
                var B = this.elementCache[C];
                if (!B || !B.el) {
                    B = this.elementCache[C] = new this.ElementWrapper(YAHOO.util.Dom.get(C));
                }
                return B;
            },
            getElement: function (B) {
                return YAHOO.util.Dom.get(B);
            },
            getCss: function (C) {
                var B = YAHOO.util.Dom.get(C);
                return (B) ? B.style : null;
            },
            ElementWrapper: function (B) {
                this.el = B || null;
                this.id = this.el && B.id;
                this.css = this.el && B.style;
            },
            getPosX: function (B) {
                return YAHOO.util.Dom.getX(B);
            },
            getPosY: function (B) {
                return YAHOO.util.Dom.getY(B);
            },
            swapNode: function (D, B) {
                if (D.swapNode) {
                    D.swapNode(B);
                } else {
                    var E = B.parentNode;
                    var C = B.nextSibling;
                    if (C == D) {
                        E.insertBefore(D, B);
                    } else {
                        if (B == D.nextSibling) {
                            E.insertBefore(B, D);
                        } else {
                            D.parentNode.replaceChild(B, D);
                            E.insertBefore(D, C);
                        }
                    }
                }
            },
            getScroll: function () {
                var D, B, E = document.documentElement, C = document.body;
                if (E && (E.scrollTop || E.scrollLeft)) {
                    D = E.scrollTop;
                    B = E.scrollLeft;
                } else {
                    if (C) {
                        D = C.scrollTop;
                        B = C.scrollLeft;
                    } else {
                    }
                }
                return {top: D, left: B};
            },
            getStyle: function (C, B) {
                return YAHOO.util.Dom.getStyle(C, B);
            },
            getScrollTop: function () {
                return this.getScroll().top;
            },
            getScrollLeft: function () {
                return this.getScroll().left;
            },
            moveToEl: function (B, D) {
                var C = YAHOO.util.Dom.getXY(D);
                YAHOO.util.Dom.setXY(B, C);
            },
            getClientHeight: function () {
                return YAHOO.util.Dom.getViewportHeight();
            },
            getClientWidth: function () {
                return YAHOO.util.Dom.getViewportWidth();
            },
            numericSort: function (C, B) {
                return (C - B);
            },
            _timeoutCount: 0,
            _addListeners: function () {
                var B = YAHOO.util.DDM;
                if (YAHOO.util.Event && document) {
                    B._onLoad();
                } else {
                    if (B._timeoutCount > 2000) {
                    } else {
                        setTimeout(B._addListeners, 10);
                        if (document && document.body) {
                            B._timeoutCount += 1;
                        }
                    }
                }
            },
            handleWasClicked: function (B, D) {
                if (this.isHandle(D, B.id)) {
                    return true;
                } else {
                    var C = B.parentNode;
                    while (C) {
                        if (this.isHandle(D, C.id)) {
                            return true;
                        } else {
                            C = C.parentNode;
                        }
                    }
                }
                return false;
            }
        };
    }();
    YAHOO.util.DDM = YAHOO.util.DragDropMgr;
    YAHOO.util.DDM._addListeners();
}
(function () {
    var A = YAHOO.util.Event;
    var B = YAHOO.util.Dom;
    YAHOO.util.DragDrop = function (E, C, D) {
        if (E) {
            this.init(E, C, D);
        }
    };
    YAHOO.util.DragDrop.prototype = {
        id: null,
        config: null,
        dragElId: null,
        handleElId: null,
        invalidHandleTypes: null,
        invalidHandleIds: null,
        invalidHandleClasses: null,
        startPageX: 0,
        startPageY: 0,
        groups: null,
        locked: false,
        lock: function () {
            this.locked = true;
        },
        unlock: function () {
            this.locked = false;
        },
        isTarget: true,
        padding: null,
        dragOnly: false,
        _domRef: null,
        __ygDragDrop: true,
        constrainX: false,
        constrainY: false,
        minX: 0,
        maxX: 0,
        minY: 0,
        maxY: 0,
        deltaX: 0,
        deltaY: 0,
        maintainOffset: false,
        xTicks: null,
        yTicks: null,
        primaryButtonOnly: true,
        available: false,
        hasOuterHandles: false,
        cursorIsOver: false,
        overlap: null,
        b4StartDrag: function (C, D) {
        },
        startDrag: function (C, D) {
        },
        b4Drag: function (C) {
        },
        onDrag: function (C) {
        },
        onDragEnter: function (C, D) {
        },
        b4DragOver: function (C) {
        },
        onDragOver: function (C, D) {
        },
        b4DragOut: function (C) {
        },
        onDragOut: function (C, D) {
        },
        b4DragDrop: function (C) {
        },
        onDragDrop: function (C, D) {
        },
        onInvalidDrop: function (C) {
        },
        b4EndDrag: function (C) {
        },
        endDrag: function (C) {
        },
        b4MouseDown: function (C) {
        },
        onMouseDown: function (C) {
        },
        onMouseUp: function (C) {
        },
        onAvailable: function () {
        },
        getEl: function () {
            if (!this._domRef) {
                this._domRef = B.get(this.id);
            }
            return this._domRef;
        },
        getDragEl: function () {
            return B.get(this.dragElId);
        },
        init: function (E, C, D) {
            this.initTarget(E, C, D);
            A.on(this._domRef || this.id, "mousedown", this.handleMouseDown, this, true);
        },
        initTarget: function (E, C, D) {
            this.config = D || {};
            this.DDM = YAHOO.util.DDM;
            this.groups = {};
            if (typeof E !== "string") {
                this._domRef = E;
                E = B.generateId(E);
            }
            this.id = E;
            this.addToGroup((C) ? C : "default");
            this.handleElId = E;
            A.onAvailable(E, this.handleOnAvailable, this, true);
            this.setDragElId(E);
            this.invalidHandleTypes = {A: "A"};
            this.invalidHandleIds = {};
            this.invalidHandleClasses = [];
            this.applyConfig();
        },
        applyConfig: function () {
            this.padding = this.config.padding || [0, 0, 0, 0];
            this.isTarget = (this.config.isTarget !== false);
            this.maintainOffset = (this.config.maintainOffset);
            this.primaryButtonOnly = (this.config.primaryButtonOnly !== false);
            this.dragOnly = ((this.config.dragOnly === true) ? true : false);
        },
        handleOnAvailable: function () {
            this.available = true;
            this.resetConstraints();
            this.onAvailable();
        },
        setPadding: function (E, C, F, D) {
            if (!C && 0 !== C) {
                this.padding = [E, E, E, E];
            } else {
                if (!F && 0 !== F) {
                    this.padding = [E, C, E, C];
                } else {
                    this.padding = [E, C, F, D];
                }
            }
        },
        setInitPosition: function (F, E) {
            var G = this.getEl();
            if (!this.DDM.verifyEl(G)) {
                return;
            }
            var D = F || 0;
            var C = E || 0;
            var H = B.getXY(G);
            this.initPageX = H[0] - D;
            this.initPageY = H[1] - C;
            this.lastPageX = H[0];
            this.lastPageY = H[1];
            this.setStartPosition(H);
        },
        setStartPosition: function (D) {
            var C = D || B.getXY(this.getEl());
            this.deltaSetXY = null;
            this.startPageX = C[0];
            this.startPageY = C[1];
        },
        addToGroup: function (C) {
            this.groups[C] = true;
            this.DDM.regDragDrop(this, C);
        },
        removeFromGroup: function (C) {
            if (this.groups[C]) {
                delete this.groups[C];
            }
            this.DDM.removeDDFromGroup(this, C);
        },
        setDragElId: function (C) {
            this.dragElId = C;
        },
        setHandleElId: function (C) {
            if (typeof C !== "string") {
                C = B.generateId(C);
            }
            this.handleElId = C;
            this.DDM.regHandle(this.id, C);
        },
        setOuterHandleElId: function (C) {
            if (typeof C !== "string") {
                C = B.generateId(C);
            }
            A.on(C, "mousedown", this.handleMouseDown, this, true);
            this.setHandleElId(C);
            this.hasOuterHandles = true;
        },
        unreg: function () {
            A.removeListener(this.id, "mousedown", this.handleMouseDown);
            this._domRef = null;
            this.DDM._remove(this);
        },
        isLocked: function () {
            return (this.DDM.isLocked() || this.locked);
        },
        handleMouseDown: function (H, G) {
            var D = H.which || H.button;
            if (this.primaryButtonOnly && D > 1) {
                return;
            }
            if (this.isLocked()) {
                return;
            }
            var C = this.b4MouseDown(H);
            var E = this.onMouseDown(H);
            if ((C === false) || (E === false)) {
                return;
            }
            this.DDM.refreshCache(this.groups);
            var F = new YAHOO.util.Point(A.getPageX(H), A.getPageY(H));
            if (!this.hasOuterHandles && !this.DDM.isOverTarget(F, this)) {
            } else {
                if (this.clickValidator(H)) {
                    this.setStartPosition();
                    this.DDM.handleMouseDown(H, this);
                    this.DDM.stopEvent(H);
                } else {
                }
            }
        },
        clickValidator: function (D) {
            var C = A.getTarget(D);
            return (this.isValidHandleChild(C) && (this.id == this.handleElId || this.DDM.handleWasClicked(C, this.id)));
        },
        getTargetCoord: function (E, D) {
            var C = E - this.deltaX;
            var F = D - this.deltaY;
            if (this.constrainX) {
                if (C < this.minX) {
                    C = this.minX;
                }
                if (C > this.maxX) {
                    C = this.maxX;
                }
            }
            if (this.constrainY) {
                if (F < this.minY) {
                    F = this.minY;
                }
                if (F > this.maxY) {
                    F = this.maxY;
                }
            }
            C = this.getTick(C, this.xTicks);
            F = this.getTick(F, this.yTicks);
            return {x: C, y: F};
        },
        addInvalidHandleType: function (C) {
            var D = C.toUpperCase();
            this.invalidHandleTypes[D] = D;
        },
        addInvalidHandleId: function (C) {
            if (typeof C !== "string") {
                C = B.generateId(C);
            }
            this.invalidHandleIds[C] = C;
        },
        addInvalidHandleClass: function (C) {
            this.invalidHandleClasses.push(C);
        },
        removeInvalidHandleType: function (C) {
            var D = C.toUpperCase();
            delete this.invalidHandleTypes[D];
        },
        removeInvalidHandleId: function (C) {
            if (typeof C !== "string") {
                C = B.generateId(C);
            }
            delete this.invalidHandleIds[C];
        },
        removeInvalidHandleClass: function (D) {
            for (var E = 0, C = this.invalidHandleClasses.length; E < C; ++E) {
                if (this.invalidHandleClasses[E] == D) {
                    delete this.invalidHandleClasses[E];
                }
            }
        },
        isValidHandleChild: function (F) {
            var E = true;
            var H;
            try {
                H = F.nodeName.toUpperCase();
            } catch (G) {
                H = F.nodeName;
            }
            E = E && !this.invalidHandleTypes[H];
            E = E && !this.invalidHandleIds[F.id];
            for (var D = 0, C = this.invalidHandleClasses.length; E && D < C; ++D) {
                E = !B.hasClass(F, this.invalidHandleClasses[D]);
            }
            return E;
        },
        setXTicks: function (F, C) {
            this.xTicks = [];
            this.xTickSize = C;
            var E = {};
            for (var D = this.initPageX; D >= this.minX; D = D - C) {
                if (!E[D]) {
                    this.xTicks[this.xTicks.length] = D;
                    E[D] = true;
                }
            }
            for (D = this.initPageX; D <= this.maxX; D = D + C) {
                if (!E[D]) {
                    this.xTicks[this.xTicks.length] = D;
                    E[D] = true;
                }
            }
            this.xTicks.sort(this.DDM.numericSort);
        },
        setYTicks: function (F, C) {
            this.yTicks = [];
            this.yTickSize = C;
            var E = {};
            for (var D = this.initPageY; D >= this.minY; D = D - C) {
                if (!E[D]) {
                    this.yTicks[this.yTicks.length] = D;
                    E[D] = true;
                }
            }
            for (D = this.initPageY; D <= this.maxY; D = D + C) {
                if (!E[D]) {
                    this.yTicks[this.yTicks.length] = D;
                    E[D] = true;
                }
            }
            this.yTicks.sort(this.DDM.numericSort);
        },
        setXConstraint: function (E, D, C) {
            this.leftConstraint = parseInt(E, 10);
            this.rightConstraint = parseInt(D, 10);
            this.minX = this.initPageX - this.leftConstraint;
            this.maxX = this.initPageX + this.rightConstraint;
            if (C) {
                this.setXTicks(this.initPageX, C);
            }
            this.constrainX = true;
        },
        clearConstraints: function () {
            this.constrainX = false;
            this.constrainY = false;
            this.clearTicks();
        },
        clearTicks: function () {
            this.xTicks = null;
            this.yTicks = null;
            this.xTickSize = 0;
            this.yTickSize = 0;
        },
        setYConstraint: function (C, E, D) {
            this.topConstraint = parseInt(C, 10);
            this.bottomConstraint = parseInt(E, 10);
            this.minY = this.initPageY - this.topConstraint;
            this.maxY = this.initPageY + this.bottomConstraint;
            if (D) {
                this.setYTicks(this.initPageY, D);
            }
            this.constrainY = true;
        },
        resetConstraints: function () {
            if (this.initPageX || this.initPageX === 0) {
                var D = (this.maintainOffset) ? this.lastPageX - this.initPageX : 0;
                var C = (this.maintainOffset) ? this.lastPageY - this.initPageY : 0;
                this.setInitPosition(D, C);
            } else {
                this.setInitPosition();
            }
            if (this.constrainX) {
                this.setXConstraint(this.leftConstraint, this.rightConstraint, this.xTickSize);
            }
            if (this.constrainY) {
                this.setYConstraint(this.topConstraint, this.bottomConstraint, this.yTickSize);
            }
        },
        getTick: function (I, F) {
            if (!F) {
                return I;
            } else {
                if (F[0] >= I) {
                    return F[0];
                } else {
                    for (var D = 0, C = F.length; D < C; ++D) {
                        var E = D + 1;
                        if (F[E] && F[E] >= I) {
                            var H = I - F[D];
                            var G = F[E] - I;
                            return (G > H) ? F[D] : F[E];
                        }
                    }
                    return F[F.length - 1];
                }
            }
        },
        toString: function () {
            return ("DragDrop " + this.id);
        }
    };
})();
YAHOO.util.DD = function (C, A, B) {
    if (C) {
        this.init(C, A, B);
    }
};
YAHOO.extend(YAHOO.util.DD, YAHOO.util.DragDrop, {
    scroll: true, autoOffset: function (C, B) {
        var A = C - this.startPageX;
        var D = B - this.startPageY;
        this.setDelta(A, D);
    }, setDelta: function (B, A) {
        this.deltaX = B;
        this.deltaY = A;
    }, setDragElPos: function (C, B) {
        var A = this.getDragEl();
        this.alignElWithMouse(A, C, B);
    }, alignElWithMouse: function (C, G, F) {
        var E = this.getTargetCoord(G, F);
        if (!this.deltaSetXY) {
            var H = [E.x, E.y];
            YAHOO.util.Dom.setXY(C, H);
            var D = parseInt(YAHOO.util.Dom.getStyle(C, "left"), 10);
            var B = parseInt(YAHOO.util.Dom.getStyle(C, "top"), 10);
            this.deltaSetXY = [D - E.x, B - E.y];
        } else {
            YAHOO.util.Dom.setStyle(C, "left", (E.x + this.deltaSetXY[0]) + "px");
            YAHOO.util.Dom.setStyle(C, "top", (E.y + this.deltaSetXY[1]) + "px");
        }
        this.cachePosition(E.x, E.y);
        var A = this;
        setTimeout(function () {
            A.autoScroll.call(A, E.x, E.y, C.offsetHeight, C.offsetWidth);
        }, 0);
    }, cachePosition: function (B, A) {
        if (B) {
            this.lastPageX = B;
            this.lastPageY = A;
        } else {
            var C = YAHOO.util.Dom.getXY(this.getEl());
            this.lastPageX = C[0];
            this.lastPageY = C[1];
        }
    }, autoScroll: function (J, I, E, K) {
        if (this.scroll) {
            var L = this.DDM.getClientHeight();
            var B = this.DDM.getClientWidth();
            var N = this.DDM.getScrollTop();
            var D = this.DDM.getScrollLeft();
            var H = E + I;
            var M = K + J;
            var G = (L + N - I - this.deltaY);
            var F = (B + D - J - this.deltaX);
            var C = 40;
            var A = (document.all) ? 80 : 30;
            if (H > L && G < C) {
                window.scrollTo(D, N + A);
            }
            if (I < N && N > 0 && I - N < C) {
                window.scrollTo(D, N - A);
            }
            if (M > B && F < C) {
                window.scrollTo(D + A, N);
            }
            if (J < D && D > 0 && J - D < C) {
                window.scrollTo(D - A, N);
            }
        }
    }, applyConfig: function () {
        YAHOO.util.DD.superclass.applyConfig.call(this);
        this.scroll = (this.config.scroll !== false);
    }, b4MouseDown: function (A) {
        this.setStartPosition();
        this.autoOffset(YAHOO.util.Event.getPageX(A), YAHOO.util.Event.getPageY(A));
    }, b4Drag: function (A) {
        this.setDragElPos(YAHOO.util.Event.getPageX(A), YAHOO.util.Event.getPageY(A));
    }, toString: function () {
        return ("DD " + this.id);
    }
});
YAHOO.util.DDProxy = function (C, A, B) {
    if (C) {
        this.init(C, A, B);
        this.initFrame();
    }
};
YAHOO.util.DDProxy.dragElId = "ygddfdiv";
YAHOO.extend(YAHOO.util.DDProxy, YAHOO.util.DD, {
    resizeFrame: true, centerFrame: false, createFrame: function () {
        var B = this, A = document.body;
        if (!A || !A.firstChild) {
            setTimeout(function () {
                B.createFrame();
            }, 50);
            return;
        }
        var F = this.getDragEl(), E = YAHOO.util.Dom;
        if (!F) {
            F = document.createElement("div");
            F.id = this.dragElId;
            var D = F.style;
            D.position = "absolute";
            D.visibility = "hidden";
            D.cursor = "move";
            D.border = "2px solid #aaa";
            D.zIndex = 999;
            D.height = "25px";
            D.width = "25px";
            var C = document.createElement("div");
            E.setStyle(C, "height", "100%");
            E.setStyle(C, "width", "100%");
            E.setStyle(C, "background-color", "#ccc");
            E.setStyle(C, "opacity", "0");
            F.appendChild(C);
            A.insertBefore(F, A.firstChild);
        }
    }, initFrame: function () {
        this.createFrame();
    }, applyConfig: function () {
        YAHOO.util.DDProxy.superclass.applyConfig.call(this);
        this.resizeFrame = (this.config.resizeFrame !== false);
        this.centerFrame = (this.config.centerFrame);
        this.setDragElId(this.config.dragElId || YAHOO.util.DDProxy.dragElId);
    }, showFrame: function (E, D) {
        var C = this.getEl();
        var A = this.getDragEl();
        var B = A.style;
        this._resizeProxy();
        if (this.centerFrame) {
            this.setDelta(Math.round(parseInt(B.width, 10) / 2), Math.round(parseInt(B.height, 10) / 2));
        }
        this.setDragElPos(E, D);
        YAHOO.util.Dom.setStyle(A, "visibility", "visible");
    }, _resizeProxy: function () {
        if (this.resizeFrame) {
            var H = YAHOO.util.Dom;
            var B = this.getEl();
            var C = this.getDragEl();
            var G = parseInt(H.getStyle(C, "borderTopWidth"), 10);
            var I = parseInt(H.getStyle(C, "borderRightWidth"), 10);
            var F = parseInt(H.getStyle(C, "borderBottomWidth"), 10);
            var D = parseInt(H.getStyle(C, "borderLeftWidth"), 10);
            if (isNaN(G)) {
                G = 0;
            }
            if (isNaN(I)) {
                I = 0;
            }
            if (isNaN(F)) {
                F = 0;
            }
            if (isNaN(D)) {
                D = 0;
            }
            var E = Math.max(0, B.offsetWidth - I - D);
            var A = Math.max(0, B.offsetHeight - G - F);
            H.setStyle(C, "width", E + "px");
            H.setStyle(C, "height", A + "px");
        }
    }, b4MouseDown: function (B) {
        this.setStartPosition();
        var A = YAHOO.util.Event.getPageX(B);
        var C = YAHOO.util.Event.getPageY(B);
        this.autoOffset(A, C);
    }, b4StartDrag: function (A, B) {
        this.showFrame(A, B);
    }, b4EndDrag: function (A) {
        YAHOO.util.Dom.setStyle(this.getDragEl(), "visibility", "hidden");
    }, endDrag: function (D) {
        var C = YAHOO.util.Dom;
        var B = this.getEl();
        var A = this.getDragEl();
        C.setStyle(A, "visibility", "");
        C.setStyle(B, "visibility", "hidden");
        YAHOO.util.DDM.moveToEl(B, A);
        C.setStyle(A, "visibility", "hidden");
        C.setStyle(B, "visibility", "");
    }, toString: function () {
        return ("DDProxy " + this.id);
    }
});
YAHOO.util.DDTarget = function (C, A, B) {
    if (C) {
        this.initTarget(C, A, B);
    }
};
YAHOO.extend(YAHOO.util.DDTarget, YAHOO.util.DragDrop, {
    toString: function () {
        return ("DDTarget " + this.id);
    }
});
YAHOO.register("dragdrop", YAHOO.util.DragDropMgr, {version: "2.4.1", build: "742"});
YAHOO.util.Attribute = function (B, A) {
    if (A) {
        this.owner = A;
        this.configure(B, true);
    }
};
YAHOO.util.Attribute.prototype = {
    name: undefined,
    value: null,
    owner: null,
    readOnly: false,
    writeOnce: false,
    _initialConfig: null,
    _written: false,
    method: null,
    validator: null,
    getValue: function () {
        return this.value;
    },
    setValue: function (F, B) {
        var E;
        var A = this.owner;
        var C = this.name;
        var D = {type: C, prevValue: this.getValue(), newValue: F};
        if (this.readOnly || (this.writeOnce && this._written)) {
            return false;
        }
        if (this.validator && !this.validator.call(A, F)) {
            return false;
        }
        if (!B) {
            E = A.fireBeforeChangeEvent(D);
            if (E === false) {
                return false;
            }
        }
        if (this.method) {
            this.method.call(A, F);
        }
        this.value = F;
        this._written = true;
        D.type = C;
        if (!B) {
            this.owner.fireChangeEvent(D);
        }
        return true;
    },
    configure: function (B, C) {
        B = B || {};
        this._written = false;
        this._initialConfig = this._initialConfig || {};
        for (var A in B) {
            if (A && YAHOO.lang.hasOwnProperty(B, A)) {
                this[A] = B[A];
                if (C) {
                    this._initialConfig[A] = B[A];
                }
            }
        }
    },
    resetValue: function () {
        return this.setValue(this._initialConfig.value);
    },
    resetConfig: function () {
        this.configure(this._initialConfig);
    },
    refresh: function (A) {
        this.setValue(this.value, A);
    }
};
(function () {
    var A = YAHOO.util.Lang;
    YAHOO.util.AttributeProvider = function () {
    };
    YAHOO.util.AttributeProvider.prototype = {
        _configs: null, get: function (C) {
            this._configs = this._configs || {};
            var B = this._configs[C];
            if (!B) {
                return undefined;
            }
            return B.value;
        }, set: function (D, E, B) {
            this._configs = this._configs || {};
            var C = this._configs[D];
            if (!C) {
                return false;
            }
            return C.setValue(E, B);
        }, getAttributeKeys: function () {
            this._configs = this._configs;
            var D = [];
            var B;
            for (var C in this._configs) {
                B = this._configs[C];
                if (A.hasOwnProperty(this._configs, C) && !A.isUndefined(B)) {
                    D[D.length] = C;
                }
            }
            return D;
        }, setAttributes: function (D, B) {
            for (var C in D) {
                if (A.hasOwnProperty(D, C)) {
                    this.set(C, D[C], B);
                }
            }
        }, resetValue: function (C, B) {
            this._configs = this._configs || {};
            if (this._configs[C]) {
                this.set(C, this._configs[C]._initialConfig.value, B);
                return true;
            }
            return false;
        }, refresh: function (E, C) {
            this._configs = this._configs;
            E = ((A.isString(E)) ? [E] : E) || this.getAttributeKeys();
            for (var D = 0, B = E.length; D < B; ++D) {
                if (this._configs[E[D]] && !A.isUndefined(this._configs[E[D]].value) && !A.isNull(this._configs[E[D]].value)) {
                    this._configs[E[D]].refresh(C);
                }
            }
        }, register: function (B, C) {
            this.setAttributeConfig(B, C);
        }, getAttributeConfig: function (C) {
            this._configs = this._configs || {};
            var B = this._configs[C] || {};
            var D = {};
            for (C in B) {
                if (A.hasOwnProperty(B, C)) {
                    D[C] = B[C];
                }
            }
            return D;
        }, setAttributeConfig: function (B, C, D) {
            this._configs = this._configs || {};
            C = C || {};
            if (!this._configs[B]) {
                C.name = B;
                this._configs[B] = this.createAttribute(C);
            } else {
                this._configs[B].configure(C, D);
            }
        }, configureAttribute: function (B, C, D) {
            this.setAttributeConfig(B, C, D);
        }, resetAttributeConfig: function (B) {
            this._configs = this._configs || {};
            this._configs[B].resetConfig();
        }, subscribe: function (B, C) {
            this._events = this._events || {};
            if (!(B in this._events)) {
                this._events[B] = this.createEvent(B);
            }
            YAHOO.util.EventProvider.prototype.subscribe.apply(this, arguments);
        }, on: function () {
            this.subscribe.apply(this, arguments);
        }, addListener: function () {
            this.subscribe.apply(this, arguments);
        }, fireBeforeChangeEvent: function (C) {
            var B = "before";
            B += C.type.charAt(0).toUpperCase() + C.type.substr(1) + "Change";
            C.type = B;
            return this.fireEvent(C.type, C);
        }, fireChangeEvent: function (B) {
            B.type += "Change";
            return this.fireEvent(B.type, B);
        }, createAttribute: function (B) {
            return new YAHOO.util.Attribute(B, this);
        }
    };
    YAHOO.augment(YAHOO.util.AttributeProvider, YAHOO.util.EventProvider);
})();
(function () {
    var D = YAHOO.util.Dom, F = YAHOO.util.AttributeProvider;
    YAHOO.util.Element = function (G, H) {
        if (arguments.length) {
            this.init(G, H);
        }
    };
    YAHOO.util.Element.prototype = {
        DOM_EVENTS: null, appendChild: function (G) {
            G = G.get ? G.get("element") : G;
            this.get("element").appendChild(G);
        }, getElementsByTagName: function (G) {
            return this.get("element").getElementsByTagName(G);
        }, hasChildNodes: function () {
            return this.get("element").hasChildNodes();
        }, insertBefore: function (G, H) {
            G = G.get ? G.get("element") : G;
            H = (H && H.get) ? H.get("element") : H;
            this.get("element").insertBefore(G, H);
        }, removeChild: function (G) {
            G = G.get ? G.get("element") : G;
            this.get("element").removeChild(G);
            return true;
        }, replaceChild: function (G, H) {
            G = G.get ? G.get("element") : G;
            H = H.get ? H.get("element") : H;
            return this.get("element").replaceChild(G, H);
        }, initAttributes: function (G) {
        }, addListener: function (K, J, L, I) {
            var H = this.get("element");
            I = I || this;
            H = this.get("id") || H;
            var G = this;
            if (!this._events[K]) {
                if (this.DOM_EVENTS[K]) {
                    YAHOO.util.Event.addListener(H, K, function (M) {
                        if (M.srcElement && !M.target) {
                            M.target = M.srcElement;
                        }
                        G.fireEvent(K, M);
                    }, L, I);
                }
                this.createEvent(K, this);
            }
            YAHOO.util.EventProvider.prototype.subscribe.apply(this, arguments);
        }, on: function () {
            this.addListener.apply(this, arguments);
        }, subscribe: function () {
            this.addListener.apply(this, arguments);
        }, removeListener: function (H, G) {
            this.unsubscribe.apply(this, arguments);
        }, addClass: function (G) {
            D.addClass(this.get("element"), G);
        }, getElementsByClassName: function (H, G) {
            return D.getElementsByClassName(H, G, this.get("element"));
        }, hasClass: function (G) {
            return D.hasClass(this.get("element"), G);
        }, removeClass: function (G) {
            return D.removeClass(this.get("element"), G);
        }, replaceClass: function (H, G) {
            return D.replaceClass(this.get("element"), H, G);
        }, setStyle: function (I, H) {
            var G = this.get("element");
            if (!G) {
                return this._queue[this._queue.length] = ["setStyle", arguments];
            }
            return D.setStyle(G, I, H);
        }, getStyle: function (G) {
            return D.getStyle(this.get("element"), G);
        }, fireQueue: function () {
            var H = this._queue;
            for (var I = 0, G = H.length; I < G; ++I) {
                this[H[I][0]].apply(this, H[I][1]);
            }
        }, appendTo: function (H, I) {
            H = (H.get) ? H.get("element") : D.get(H);
            this.fireEvent("beforeAppendTo", {type: "beforeAppendTo", target: H});
            I = (I && I.get) ? I.get("element") : D.get(I);
            var G = this.get("element");
            if (!G) {
                return false;
            }
            if (!H) {
                return false;
            }
            if (G.parent != H) {
                if (I) {
                    H.insertBefore(G, I);
                } else {
                    H.appendChild(G);
                }
            }
            this.fireEvent("appendTo", {type: "appendTo", target: H});
        }, get: function (G) {
            var I = this._configs || {};
            var H = I.element;
            if (H && !I[G] && !YAHOO.lang.isUndefined(H.value[G])) {
                return H.value[G];
            }
            return F.prototype.get.call(this, G);
        }, setAttributes: function (L, H) {
            var K = this.get("element");
            for (var J in L) {
                if (!this._configs[J] && !YAHOO.lang.isUndefined(K[J])) {
                    this.setAttributeConfig(J);
                }
            }
            for (var I = 0, G = this._configOrder.length; I < G; ++I) {
                if (L[this._configOrder[I]]) {
                    this.set(this._configOrder[I], L[this._configOrder[I]], H);
                }
            }
        }, set: function (H, J, G) {
            var I = this.get("element");
            if (!I) {
                this._queue[this._queue.length] = ["set", arguments];
                if (this._configs[H]) {
                    this._configs[H].value = J;
                }
                return;
            }
            if (!this._configs[H] && !YAHOO.lang.isUndefined(I[H])) {
                C.call(this, H);
            }
            return F.prototype.set.apply(this, arguments);
        }, setAttributeConfig: function (G, I, J) {
            var H = this.get("element");
            if (H && !this._configs[G] && !YAHOO.lang.isUndefined(H[G])) {
                C.call(this, G, I);
            } else {
                F.prototype.setAttributeConfig.apply(this, arguments);
            }
            this._configOrder.push(G);
        }, getAttributeKeys: function () {
            var H = this.get("element");
            var I = F.prototype.getAttributeKeys.call(this);
            for (var G in H) {
                if (!this._configs[G]) {
                    I[G] = I[G] || H[G];
                }
            }
            return I;
        }, createEvent: function (H, G) {
            this._events[H] = true;
            F.prototype.createEvent.apply(this, arguments);
        }, init: function (H, G) {
            A.apply(this, arguments);
        }
    };
    var A = function (H, G) {
        this._queue = this._queue || [];
        this._events = this._events || {};
        this._configs = this._configs || {};
        this._configOrder = [];
        G = G || {};
        G.element = G.element || H || null;
        this.DOM_EVENTS = {
            "click": true,
            "dblclick": true,
            "keydown": true,
            "keypress": true,
            "keyup": true,
            "mousedown": true,
            "mousemove": true,
            "mouseout": true,
            "mouseover": true,
            "mouseup": true,
            "focus": true,
            "blur": true,
            "submit": true
        };
        var I = false;
        if (YAHOO.lang.isString(H)) {
            C.call(this, "id", {value: G.element});
        }
        if (D.get(H)) {
            I = true;
            E.call(this, G);
            B.call(this, G);
        }
        YAHOO.util.Event.onAvailable(G.element, function () {
            if (!I) {
                E.call(this, G);
            }
            this.fireEvent("available", {type: "available", target: G.element});
        }, this, true);
        YAHOO.util.Event.onContentReady(G.element, function () {
            if (!I) {
                B.call(this, G);
            }
            this.fireEvent("contentReady", {type: "contentReady", target: G.element});
        }, this, true);
    };
    var E = function (G) {
        this.setAttributeConfig("element", {value: D.get(G.element), readOnly: true});
    };
    var B = function (G) {
        this.initAttributes(G);
        this.setAttributes(G, true);
        this.fireQueue();
    };
    var C = function (G, I) {
        var H = this.get("element");
        I = I || {};
        I.name = G;
        I.method = I.method || function (J) {
            H[G] = J;
        };
        I.value = I.value || H[G];
        this._configs[G] = new YAHOO.util.Attribute(I, this);
    };
    YAHOO.augment(YAHOO.util.Element, F);
})();
YAHOO.register("element", YAHOO.util.Element, {version: "2.4.1", build: "742"});
YAHOO.register("utilities", YAHOO, {version: "2.4.1", build: "742"});