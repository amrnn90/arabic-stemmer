// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
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

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
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
  return newRequire;
})({"src/AffixCleaner.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var prefixes = {
  4: ['وكال', 'وبال', 'فبال'],
  3: ['وال', 'فال', 'كال', 'بال', 'ولل', 'فلل'],
  2: ['ال', 'لل', 'لي', 'لت', 'لن', 'لا', 'فل', 'فس', 'في', 'فت', 'فن', 'فا', 'سي', 'ست', 'سن', 'سا', 'ول', 'وس', 'وي', 'وت', 'ون', 'وا'],
  1: ['ل', 'ب', 'ف', 'س', 'و', 'ي', 'ت', 'ن', 'ا']
};
var suffixes = {
  4: [],
  3: ["\u062A\u0645\u0644", "\u0647\u0645\u0644", "\u062A\u0627\u0646", "\u062A\u064A\u0646", "\u0643\u0645\u0644"],
  2: ["\u0648\u0646", "\u0627\u062A", "\u0627\u0646", "\u064A\u0646", "\u062A\u0646", "\u0643\u0645", "\u0647\u0646", "\u0646\u0627", "\u064A\u0627", "\u0647\u0627", "\u062A\u0645", "\u0643\u0646", "\u0646\u064A", "\u0648\u0627", "\u0645\u0627", "\u0647\u0645"],
  1: ["\u0629", "\u0647", "\u064A", "\u0643", "\u062A", "\u0627", "\u0646", 'و']
};

var AffixCleaner =
/*#__PURE__*/
function () {
  function AffixCleaner(token) {
    _classCallCheck(this, AffixCleaner);

    this.token = token;
    this.currentToken = token;
    this.prefix = '';
    this.suffix = '';
  }

  _createClass(AffixCleaner, [{
    key: "remove",
    value: function remove(count) {
      var _this = this;

      var priority = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "suffix";
      var bothSides = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (!this.canRemoveAffix(count)) {
        return this.currentToken;
      }

      var order = priority == 'suffix' ? ['Suffix', 'Prefix'] : ['Prefix', 'Suffix'];
      var affix = null;
      order.forEach(function (affixType) {
        if (!affix || bothSides) {
          affix = _this['get' + affixType](count);

          _this['remove' + affixType](affix);
        }
      });
      return this.currentToken;
    }
  }, {
    key: "removeAll",
    value: function removeAll() {
      var token = this.currentToken;

      while (true) {
        var len = token.length;
        token = this.remove(1, 'suffix', true);
        if (len == token.length) break;
      }

      return token;
    }
  }, {
    key: "getPrefix",
    value: function getPrefix(count) {
      var token = this.currentToken;
      var affixList = prefixes[count] || [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = affixList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var prefix = _step.value;

          if (token.startsWith(prefix) && this.isValidPrefix(prefix)) {
            return prefix;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return '';
    }
  }, {
    key: "isValidPrefix",
    value: function isValidPrefix(prefix) {
      var wholePrefix = this.prefix + prefix;
      var pList = prefixes[wholePrefix.length];

      if (pList && pList.includes(wholePrefix)) {
        return true;
      }

      return false;
    }
  }, {
    key: "removePrefix",
    value: function removePrefix(prefix) {
      if (this.currentToken.startsWith(prefix)) {
        this.currentToken = this.currentToken.substr(prefix.length);
        this.prefix = this.prefix + prefix;
      }
    }
  }, {
    key: "getSuffix",
    value: function getSuffix(count) {
      var token = this.currentToken;
      var affixList = suffixes[count] || [];
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = affixList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var suffix = _step2.value;

          if (token.endsWith(suffix) && this.isValidSuffix(suffix)) {
            return suffix;
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return '';
    }
  }, {
    key: "isValidSuffix",
    value: function isValidSuffix(suffix) {
      return true;
      var wholeSuffix = suffix + this.suffix;
      var sList = suffixes[wholeSuffix.length];

      if (sList && sList.includes(wholeSuffix)) {
        return true;
      }

      return false;
    }
  }, {
    key: "removeSuffix",
    value: function removeSuffix(suffix) {
      if (this.currentToken.endsWith(suffix)) {
        this.currentToken = this.currentToken.substr(0, this.currentToken.length - suffix.length);
        this.suffix = suffix + this.suffix;
      }
    }
  }, {
    key: "canRemoveAffix",
    value: function canRemoveAffix(count) {
      return this.currentToken.length - count >= 3;
    }
  }]);

  return AffixCleaner;
}();

exports.default = AffixCleaner;
},{}],"src/Stemmer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AffixCleaner = _interopRequireDefault(require("./AffixCleaner"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var re_short_vowels = /[\u064B-\u0652]/g;
var re_hamza = /[\u0621\u0623\u0624\u0625\u0626]/g;
var stop_words = ["\u064A\u0643\u0648\u0646", "\u0648\u0644\u064A\u0633", "\u0648\u0643\u0627\u0646", "\u0643\u0630\u0644\u0643", "\u0627\u0644\u062A\u064A", "\u0648\u0628\u064A\u0646", "\u0639\u0644\u064A\u0647\u0627", "\u0645\u0633\u0627\u0621", "\u0627\u0644\u0630\u064A", "\u0648\u0643\u0627\u0646\u062A", "\u0648\u0644\u0643\u0646", "\u0648\u0627\u0644\u062A\u064A", "\u062A\u0643\u0648\u0646", "\u0627\u0644\u064A\u0648\u0645", "\u0627\u0644\u0644\u0630\u064A\u0646", "\u0639\u0644\u064A\u0647", "\u0643\u0627\u0646\u062A", "\u0644\u0630\u0644\u0643", "\u0623\u0645\u0627\u0645", "\u0647\u0646\u0627\u0643", "\u0645\u0646\u0647\u0627", "\u0645\u0627\u0632\u0627\u0644", "\u0644\u0627\u0632\u0627\u0644", "\u0644\u0627\u064A\u0632\u0627\u0644", "\u0645\u0627\u064A\u0632\u0627\u0644", "\u0627\u0635\u0628\u062D", "\u0623\u0635\u0628\u062D", "\u0623\u0645\u0633\u0649", "\u0627\u0645\u0633\u0649", "\u0623\u0636\u062D\u0649", "\u0627\u0636\u062D\u0649", "\u0645\u0627\u0628\u0631\u062D", "\u0645\u0627\u0641\u062A\u0626", "\u0645\u0627\u0627\u0646\u0641\u0643", "\u0644\u0627\u0633\u064A\u0645\u0627", "\u0648\u0644\u0627\u064A\u0632\u0627\u0644", "\u0627\u0644\u062D\u0627\u0644\u064A", "\u0627\u0644\u064A\u0647\u0627", "\u0627\u0644\u0630\u064A\u0646", "\u0641\u0627\u0646\u0647", "\u0648\u0627\u0644\u0630\u064A", "\u0648\u0647\u0630\u0627", "\u0644\u0647\u0630\u0627", "\u0641\u0643\u0627\u0646", "\u0633\u062A\u0643\u0648\u0646", "\u0627\u0644\u064A\u0647", "\u064A\u0645\u0643\u0646", "\u0628\u0647\u0630\u0627", "\u0627\u0644\u0630\u0649"];
var patterns = {
  8: [],
  7: [/\u0627\u0633\u062a(.)(.)\u0627(.)/],
  6: [/\u0627\u0633\u062a(.)(.)(.)/, // استفعل
  /\u0645\u0633\u062a(.)(.)(.)/, // مستفعل
  /\u0645(.)\u0627(.)(.)\u0647/, // مفاعلة
  /\u0627(.)\u062a(.)\u0627(.)/, // افتعال
  /\u0627(.)\u0639\u0648(.)(.)/, // افعوعل
  /\u062a(.)\u0627(.)\u064a(.)/, // تفاعيل
  /\u0645(.)\u0627(.)\u064a(.)/, // مفاعيل
  /\u0627(.)(.)(\u064a)\u0627\u0627/, // افعياء
  /(.)(.)(.)\u064a\u0627\u0627/, // فعلياء
  /(.)\u0648\u0627(.)\u064a(.)/, // فواعيل
  /\u0645\u062a(.)\u0627(.)(.)/, // متفاعل
  /\u0627\u0646(.)(.)\u0627(.)/, // انفعال

  /* 64 */
  /\u0627(.)(.)(.)\u0627(.)/, // افعلال
  /\u0645\u062a(.)(.)(.)(.)/, // متفعلل
  /(.)(.)(.)(.)\u0627\u0627/],
  5: [/\u0627(.)\u062a(.)(.)/, // افتعل
  /\u0627(.)\u0627(.)(.)/, // افاعل
  /\u0645(.)(.)\u0648(.)/, // مفعول
  /\u0645(.)(.)\u0627(.)/, // مفعال
  /\u0645(.)(.)\u064a(.)/, // مفعيل
  /\u0645(.)(.)(.)\u0647/, // مفعلة
  /\u062a(.)(.)(.)\u0647/, // تفعلة
  /\u0627(.)(.)(.)\u0647/, // أفعلة
  /\u0645(.)\u062a(.)(.)/, // مفتعل
  /\u064a(.)\u062a(.)(.)/, // يفتعل
  /\u062a(.)\u062a(.)(.)/, // تفتعل
  /\u0645(.)\u0627(.)(.)/, // مفاعل
  /\u062a(.)\u0627(.)(.)/, // تفاعل
  /(.)(.)\u0648(.)\u0647/, // فعولة
  /(.)(.)\u0627(.)\u0647/, // فعالة
  /\u0627\u0646(.)(.)(.)/, // انفعل
  /\u0645\u0646(.)(.)(.)/, // منفعل
  /\u0627(.)(.)\u0627(.)/, // افعال
  /(.)(.)(.)\u0627\u0646/, // فعلان
  /\u062a(.)(.)\u064a(.)/, // تفعيل
  /(.)\u0627(.)\u0648(.)/, // فاعول
  /(.)\u0648\u0627(.)(.)/, // فواعل
  /(.)(.)\u0627\u0626(.)/, // فعائل
  /(.)\u0627(.)(.)\u0647/, // فاعلة
  /(.)(.)\u0627(.)\u064a/, // فعالي
  /(.)(.)(.)\u0627\u0627/, // فعلاء
  /\u062a\u0645(.)(.)(.)/, // تمفعل

  /* 54 */
  /\u0645(.)(.)(.)(.)/, // مفعلل
  /\u062a(.)(.)(.)(.)/, // تفعلل
  /\u0627(.)(.)(.)(.)/, // افعلل
  /(.)(.)(.)(.)\u0647/, // فعللة
  /(.)(.)\u0627(.)(.)/, // فعالل
  /(.)(.)(.)\u0648(.)/],
  4: [/\u0645(.)(.)(.)/, // مفعل
  /(.)\u0627(.)(.)/, // فاعل
  /(.)(.)\u0648(.)/, // فعول
  /(.)(.)\u064a(.)/, // فعيل
  /(.)(.)\u0627(.)/, // فعال
  /(.)(.)(.)\u0647/, // فعلة
  /\u0627(.)(.)(.)/, // افعل
  /\u062a(.)(.)(.)/, // تفعل
  /(.)\u0648(.)(.)/, // فوعل
  /(.)\u064a(.)(.)/, // فيعل
  /(.)(.)(.)\u0646/],
  3: [/(.)(.)(.)/]
};

var Stemmer =
/*#__PURE__*/
function () {
  function Stemmer() {
    _classCallCheck(this, Stemmer);

    this.affixCleaner = null;
  }

  _createClass(Stemmer, [{
    key: "stem",
    value: function stem(token) {
      var _this = this;

      token = token.trim();
      token = token.replace(re_short_vowels, '');

      if (stop_words.includes(token) || token.length < 3) {
        return token;
      }

      token = this.preNormalize(token);
      this.affixCleaner = new _AffixCleaner.default(token);
      token = this.affixCleaner.remove(4, 'prefix', true);
      token = this.affixCleaner.remove(3, 'prefix', true);
      token = this.affixCleaner.remove(2, 'prefix', true);
      var matches = this.getMatches(token, 'suffix');
      matches = matches.concat(this.getMatches(token, 'prefix'));
      matches = matches.map(function (m) {
        return _this.postNormalize(m);
      });
      matches = matches.reduce(function (res, current) {
        !res.includes(current) && res.push(current);
        return res;
      }, []);
      return {
        stem: matches,
        normalized: this.affixCleaner.removeAll()
      };
    }
  }, {
    key: "getMatches",
    value: function getMatches(token) {
      var _this2 = this;

      var removeFirst = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "suffix";
      var inRecursion = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var originalToken = token;
      var len = token.length;
      var matches = [];

      while (len > 3) {
        matches = matches.concat(this.getMatchesForPatterns(token, patterns[len])); // token = this.removeOne(token, removeFirst);

        token = this.affixCleaner.remove(1, 'suffix', false);

        if (token.length == len) {
          break;
        }

        len -= 1;
      }

      if (matches.length == 0 && !inRecursion) {
        matches = matches.concat(this.getMatchesForPatterns(token, patterns[3]));
      }

      var finalMatches = [];
      matches.forEach(function (match) {
        if (match.length > 3 && match !== originalToken) {
          finalMatches = finalMatches.concat(_this2.getMatches(match, removeFirst, true));
        } else {
          finalMatches.push(match);
        }
      });
      return finalMatches;
    }
  }, {
    key: "getMatchesForPatterns",
    value: function getMatchesForPatterns(token, patterns) {
      var matches = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = patterns[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var pat = _step.value;
          var match = void 0;

          if (match = pat.exec(token)) {
            matches.push(match.slice(1).join(''));
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return matches;
    }
  }, {
    key: "preNormalize",
    value: function preNormalize(token) {
      token = token.replace(re_hamza, 'ا');
      token = token.replace(/ى/, 'ي');
      token = token.replace(/ة$/, 'ه');
      return token;
    }
  }, {
    key: "postNormalize",
    value: function postNormalize(token) {
      if (token.length == 3) {
        // const c1 = token[0].replace(/[وي]/, 'ا');
        var c1 = token[0].replace(/[ي]/, 'ا');
        var c2 = token[1].replace(/[او]/, 'ي');
        var c3 = token[2].replace(/[اوه]/, 'ي');
        token = c1 + c2 + c3;
      }

      if (token.length == 2) {
        token = token + 'ي';
      }

      return token;
    }
  }]);

  return Stemmer;
}();

exports.default = Stemmer;
},{"./AffixCleaner":"src/AffixCleaner.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _Stemmer = _interopRequireDefault(require("./src/Stemmer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _Stemmer.default;
},{"./src/Stemmer":"src/Stemmer.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "37579" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/index.map