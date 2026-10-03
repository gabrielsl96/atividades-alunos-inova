(function () {
  var expr = "", hist = "", ans = 0, deg = true, fresh = false, err = false;
  var elH = document.getElementById("hist"), elM = document.getElementById("main"), elD = document.getElementById("deg");

  // ---------- Avaliador de expressões (sem eval) ----------
  function evaluate(str) {
    var toks = [], re = /\s*(?:(\d+\.?\d*|\.\d+)(e[+-]?\d+)?|([A-Za-z]+)|(π|√|[-+−×÷^()!%]))/y, i = 0, m;
    while (i < str.length) {
      re.lastIndex = i; m = re.exec(str);
      if (!m) throw 1;
      if (m[1] !== undefined) toks.push({ k: "n", v: parseFloat(m[1] + (m[2] || "")) });
      else if (m[3]) toks.push({ k: "i", v: m[3].toLowerCase() });
      else toks.push({ k: "o", v: m[4] === "-" ? "−" : m[4] });
      i = re.lastIndex;
    }
    var p = 0, k = deg ? Math.PI / 180 : 1;
    function peek() { return toks[p]; }
    function next() { return toks[p++]; }
    function close() { var t = peek(); if (t && t.v === ")") next(); else if (t) throw 1; }
    function fact(v) {
      if (v < 0 || v % 1 !== 0 || v > 170) throw 1;
      var r = 1; for (var j = 2; j <= v; j++) r *= j; return r;
    }
    function E() {
      var v = T(), t;
      while ((t = peek()) && (t.v === "+" || t.v === "−")) { next(); var r = T(); v = t.v === "+" ? v + r : v - r; }
      return v;
    }
    function T() {
      var v = U(), t;
      while ((t = peek())) {
        if (t.v === "×" || t.v === "÷") {
          next(); var r = U();
          if (t.v === "÷") { if (r === 0) throw 1; v /= r; } else v *= r;
        } else if (t.k === "n" || t.k === "i" || t.v === "π" || t.v === "√" || t.v === "(") v *= U();
        else break;
      }
      return v;
    }
    function U() {
      var t = peek();
      if (t && (t.v === "−" || t.v === "+")) { next(); var v = U(); return t.v === "−" ? -v : v; }
      return P();
    }
    function P() {
      var b = Q(), t = peek();
      if (t && t.v === "^") { next(); return Math.pow(b, U()); }
      return b;
    }
    function Q() {
      var v = A(), t;
      while ((t = peek()) && (t.v === "!" || t.v === "%")) { next(); v = t.v === "!" ? fact(v) : v / 100; }
      return v;
    }
    function A() {
      var t = next(), v;
      if (!t) throw 1;
      if (t.k === "n") return t.v;
      if (t.v === "π") return Math.PI;
      if (t.v === "(") { v = E(); close(); return v; }
      if (t.v === "√") { v = A(); if (v < 0) throw 1; return Math.sqrt(v); }
      if (t.k === "i") {
        if (t.v === "e") return Math.E;
        if (t.v === "ans") return ans;
        var o = next();
        if (!o || o.v !== "(") throw 1;
        v = E(); close();
        switch (t.v) {
          case "sin": return Math.sin(v * k);
          case "cos": return Math.cos(v * k);
          case "tan": if (Math.abs(Math.cos(v * k)) < 1e-12) throw 1; return Math.tan(v * k);
          case "asin": if (Math.abs(v) > 1) throw 1; return Math.asin(v) / k;
          case "acos": if (Math.abs(v) > 1) throw 1; return Math.acos(v) / k;
          case "atan": return Math.atan(v) / k;
          case "ln": if (v <= 0) throw 1; return Math.log(v);
          case "log": if (v <= 0) throw 1; return Math.log10(v);
        }
      }
      throw 1;
    }
    var res = E();
    if (p < toks.length) throw 1;
    if (!isFinite(res)) throw 1;
    return Math.abs(res) < 1e-12 ? 0 : res;
  }

  // ---------- Tela e ações ----------
  function show() {
    elM.textContent = err ? "Erro" : (expr || "0").replace(/\./g, ",");
    elH.textContent = hist.replace(/\./g, ",");
    elD.textContent = deg ? "DEG" : "RAD";
    elM.scrollLeft = elM.scrollWidth;
  }
  function insert(s) {
    if (err) { expr = ""; hist = ""; err = false; fresh = false; }
    if (fresh) { if (!/^[+−×÷^!%]/.test(s)) expr = ""; fresh = false; }
    expr += s;
  }
  function equals() {
    if (!expr || err) return;
    try {
      var r = String(parseFloat(evaluate(expr).toPrecision(12)));
      hist = expr + " ="; ans = parseFloat(r); expr = r; fresh = true;
    } catch (e) { err = true; }
  }
  function back() {
    if (err) { expr = ""; err = false; return; }
    expr = fresh ? "" : expr.replace(/(asin\(|acos\(|atan\(|sin\(|cos\(|tan\(|log\(|ln\(|√\(|Ans)$|.$/, "");
    fresh = false;
  }
  function act(a, i) {
    if (i !== undefined) insert(i);
    else if (a === "eq") equals();
    else if (a === "clear") { expr = ""; hist = ""; err = false; fresh = false; }
    else if (a === "back") back();
    else if (a === "deg") deg = !deg;
    show();
  }

  document.getElementById("keys").addEventListener("click", function (e) {
    var b = e.target.closest("button");
    if (b) act(b.dataset.a, b.dataset.i);
  });

  var map = { "*": "×", "/": "÷", "-": "−", "+": "+", "^": "^", "(": "(", ")": ")", "!": "!", "%": "%", ".": ".", ",": ".", "p": "π", "r": "√(" };
  document.addEventListener("keydown", function (e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    var k = e.key;
    if (/^\d$/.test(k)) act(null, k);
    else if (map[k]) { e.preventDefault(); act(null, map[k]); }
    else if (k === "Enter" || k === "=") { e.preventDefault(); act("eq"); }
    else if (k === "Backspace") act("back");
    else if (k === "Escape" || k === "Delete") act("clear");
  });

  show();
})();