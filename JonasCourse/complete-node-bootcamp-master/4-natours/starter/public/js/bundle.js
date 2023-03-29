// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"index.js":[function(require,module,exports) {
"use strict";

require("core-js/modules/es6.array.copy-within.js");
require("core-js/modules/es6.array.fill.js");
require("core-js/modules/es6.array.filter.js");
require("core-js/modules/es6.array.find.js");
require("core-js/modules/es6.array.find-index.js");
require("core-js/modules/es7.array.flat-map.js");
require("core-js/modules/es6.array.from.js");
require("core-js/modules/es7.array.includes.js");
require("core-js/modules/es6.array.iterator.js");
require("core-js/modules/es6.array.map.js");
require("core-js/modules/es6.array.of.js");
require("core-js/modules/es6.array.slice.js");
require("core-js/modules/es6.array.sort.js");
require("core-js/modules/es6.array.species.js");
require("core-js/modules/es6.date.to-primitive.js");
require("core-js/modules/es6.function.has-instance.js");
require("core-js/modules/es6.function.name.js");
require("core-js/modules/es6.map.js");
require("core-js/modules/es6.math.acosh.js");
require("core-js/modules/es6.math.asinh.js");
require("core-js/modules/es6.math.atanh.js");
require("core-js/modules/es6.math.cbrt.js");
require("core-js/modules/es6.math.clz32.js");
require("core-js/modules/es6.math.cosh.js");
require("core-js/modules/es6.math.expm1.js");
require("core-js/modules/es6.math.fround.js");
require("core-js/modules/es6.math.hypot.js");
require("core-js/modules/es6.math.imul.js");
require("core-js/modules/es6.math.log1p.js");
require("core-js/modules/es6.math.log10.js");
require("core-js/modules/es6.math.log2.js");
require("core-js/modules/es6.math.sign.js");
require("core-js/modules/es6.math.sinh.js");
require("core-js/modules/es6.math.tanh.js");
require("core-js/modules/es6.math.trunc.js");
require("core-js/modules/es6.number.constructor.js");
require("core-js/modules/es6.number.epsilon.js");
require("core-js/modules/es6.number.is-finite.js");
require("core-js/modules/es6.number.is-integer.js");
require("core-js/modules/es6.number.is-nan.js");
require("core-js/modules/es6.number.is-safe-integer.js");
require("core-js/modules/es6.number.max-safe-integer.js");
require("core-js/modules/es6.number.min-safe-integer.js");
require("core-js/modules/es6.number.parse-float.js");
require("core-js/modules/es6.number.parse-int.js");
require("core-js/modules/es6.object.assign.js");
require("core-js/modules/es7.object.define-getter.js");
require("core-js/modules/es7.object.define-setter.js");
require("core-js/modules/es7.object.entries.js");
require("core-js/modules/es6.object.freeze.js");
require("core-js/modules/es6.object.get-own-property-descriptor.js");
require("core-js/modules/es7.object.get-own-property-descriptors.js");
require("core-js/modules/es6.object.get-own-property-names.js");
require("core-js/modules/es6.object.get-prototype-of.js");
require("core-js/modules/es7.object.lookup-getter.js");
require("core-js/modules/es7.object.lookup-setter.js");
require("core-js/modules/es6.object.prevent-extensions.js");
require("core-js/modules/es6.object.to-string.js");
require("core-js/modules/es6.object.is.js");
require("core-js/modules/es6.object.is-frozen.js");
require("core-js/modules/es6.object.is-sealed.js");
require("core-js/modules/es6.object.is-extensible.js");
require("core-js/modules/es6.object.keys.js");
require("core-js/modules/es6.object.seal.js");
require("core-js/modules/es6.object.set-prototype-of.js");
require("core-js/modules/es7.object.values.js");
require("core-js/modules/es6.promise.js");
require("core-js/modules/es7.promise.finally.js");
require("core-js/modules/es6.reflect.apply.js");
require("core-js/modules/es6.reflect.construct.js");
require("core-js/modules/es6.reflect.define-property.js");
require("core-js/modules/es6.reflect.delete-property.js");
require("core-js/modules/es6.reflect.get.js");
require("core-js/modules/es6.reflect.get-own-property-descriptor.js");
require("core-js/modules/es6.reflect.get-prototype-of.js");
require("core-js/modules/es6.reflect.has.js");
require("core-js/modules/es6.reflect.is-extensible.js");
require("core-js/modules/es6.reflect.own-keys.js");
require("core-js/modules/es6.reflect.prevent-extensions.js");
require("core-js/modules/es6.reflect.set.js");
require("core-js/modules/es6.reflect.set-prototype-of.js");
require("core-js/modules/es6.regexp.constructor.js");
require("core-js/modules/es6.regexp.flags.js");
require("core-js/modules/es6.regexp.match.js");
require("core-js/modules/es6.regexp.replace.js");
require("core-js/modules/es6.regexp.split.js");
require("core-js/modules/es6.regexp.search.js");
require("core-js/modules/es6.regexp.to-string.js");
require("core-js/modules/es6.set.js");
require("core-js/modules/es6.symbol.js");
require("core-js/modules/es7.symbol.async-iterator.js");
require("core-js/modules/es6.string.anchor.js");
require("core-js/modules/es6.string.big.js");
require("core-js/modules/es6.string.blink.js");
require("core-js/modules/es6.string.bold.js");
require("core-js/modules/es6.string.code-point-at.js");
require("core-js/modules/es6.string.ends-with.js");
require("core-js/modules/es6.string.fixed.js");
require("core-js/modules/es6.string.fontcolor.js");
require("core-js/modules/es6.string.fontsize.js");
require("core-js/modules/es6.string.from-code-point.js");
require("core-js/modules/es6.string.includes.js");
require("core-js/modules/es6.string.italics.js");
require("core-js/modules/es6.string.iterator.js");
require("core-js/modules/es6.string.link.js");
require("core-js/modules/es7.string.pad-start.js");
require("core-js/modules/es7.string.pad-end.js");
require("core-js/modules/es6.string.raw.js");
require("core-js/modules/es6.string.repeat.js");
require("core-js/modules/es6.string.small.js");
require("core-js/modules/es6.string.starts-with.js");
require("core-js/modules/es6.string.strike.js");
require("core-js/modules/es6.string.sub.js");
require("core-js/modules/es6.string.sup.js");
require("core-js/modules/es7.string.trim-left.js");
require("core-js/modules/es7.string.trim-right.js");
require("core-js/modules/es6.typed.array-buffer.js");
require("core-js/modules/es6.typed.int8-array.js");
require("core-js/modules/es6.typed.uint8-array.js");
require("core-js/modules/es6.typed.uint8-clamped-array.js");
require("core-js/modules/es6.typed.int16-array.js");
require("core-js/modules/es6.typed.uint16-array.js");
require("core-js/modules/es6.typed.int32-array.js");
require("core-js/modules/es6.typed.uint32-array.js");
require("core-js/modules/es6.typed.float32-array.js");
require("core-js/modules/es6.typed.float64-array.js");
require("core-js/modules/es6.weak-map.js");
require("core-js/modules/es6.weak-set.js");
require("core-js/modules/web.timers.js");
require("core-js/modules/web.immediate.js");
require("core-js/modules/web.dom.iterable.js");
require("regenerator-runtime/runtime.js");
var _mapbox = require("./mapbox");
var _login = require("./login");
var _updateSettings = require("./updateSettings");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
// DOM Elements
var mapBox = document.getElementById('map');
var loginForm = document.querySelector('.form--login');
var logOutBtn = document.querySelector('.nav__el--logout');
var userDataForm = document.querySelector('.form-user-data');
var userPasswordForm = document.querySelector('.form-user-password');

// DELEGATION
if (mapBox) {
  var locations = JSON.parse(mapBox.dataset.locations);
  (0, _mapbox.displayMap)(locations);
}
if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    (0, _login.login)(email, password);
  });
}
if (logOutBtn) logOutBtn.addEventListener('click', _login.logout);
if (userDataForm) userDataForm.addEventListener('submit', function (e) {
  e.preventDefault();
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  (0, _updateSettings.updateSettings)({
    name: name,
    email: email
  }, 'data');
});
if (userPasswordForm) userPasswordForm.addEventListener('submit', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(e) {
    var passwordCurrent, password, passwordConfirm;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          e.preventDefault();
          document.querySelector('btn--save-password').textContent = 'Updating...';
          passwordCurrent = document.getElementById('password-current').value;
          password = document.getElementById('password').value;
          passwordConfirm = document.getElementById('password-confirm').value;
          _context.next = 7;
          return (0, _updateSettings.updateSettings)({
            passwordCurrent: passwordCurrent,
            password: password,
            passwordConfirm: passwordConfirm
          }, 'password');
        case 7:
          document.querySelector('btn--save-password').textContent = 'Save Password';
          document.getElementById('password-current').value = '';
          document.getElementById('password').value = '';
          document.getElementById('password-confirm').value = '';
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
},{}]},{},["index.js"], null)
//# sourceMappingURL=/bundle.js.map