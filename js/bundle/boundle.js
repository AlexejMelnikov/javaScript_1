(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

window.addEventListener("DOMContentLoaded", function() {

	let tab = require('../parts/tab.js');
	let ajax = require('../parts/ajax.js');
	let calc = require('../parts/calc.js');
	let modal = require('../parts/modal.js');
	//let scrol = require('../parts/scrol.js');
	let slider = require('../parts/slider.js');
	let timer = require('../parts/timer.js');

	tab();
	ajax();
	calc();
	modal();
	//scrol();
	slider();
	timer();

});


	

		



},{"../parts/ajax.js":44,"../parts/calc.js":45,"../parts/modal.js":46,"../parts/slider.js":47,"../parts/tab.js":48,"../parts/timer.js":49}],2:[function(require,module,exports){
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],3:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":21}],4:[function(require,module,exports){
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject');
var toLength = require('./_to-length');
var toAbsoluteIndex = require('./_to-absolute-index');
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

},{"./_to-absolute-index":35,"./_to-iobject":37,"./_to-length":38}],5:[function(require,module,exports){
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],6:[function(require,module,exports){
var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],7:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"./_a-function":2}],8:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

},{}],9:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_fails":12}],10:[function(require,module,exports){
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_global":15,"./_is-object":21}],11:[function(require,module,exports){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

},{}],12:[function(require,module,exports){
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],13:[function(require,module,exports){
'use strict';
var hide = require('./_hide');
var redefine = require('./_redefine');
var fails = require('./_fails');
var defined = require('./_defined');
var wks = require('./_wks');

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);
  var fns = exec(defined, SYMBOL, ''[KEY]);
  var strfn = fns[0];
  var rxfn = fns[1];
  if (fails(function () {
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  })) {
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};

},{"./_defined":8,"./_fails":12,"./_hide":17,"./_redefine":30,"./_wks":41}],14:[function(require,module,exports){
'use strict';
// 21.2.5.3 get RegExp.prototype.flags
var anObject = require('./_an-object');
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

},{"./_an-object":3}],15:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],16:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],17:[function(require,module,exports){
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_descriptors":9,"./_object-dp":24,"./_property-desc":29}],18:[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_descriptors":9,"./_dom-create":10,"./_fails":12}],19:[function(require,module,exports){
var isObject = require('./_is-object');
var setPrototypeOf = require('./_set-proto').set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};

},{"./_is-object":21,"./_set-proto":31}],20:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

},{"./_cof":5}],21:[function(require,module,exports){
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],22:[function(require,module,exports){
// 7.2.8 IsRegExp(argument)
var isObject = require('./_is-object');
var cof = require('./_cof');
var MATCH = require('./_wks')('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};

},{"./_cof":5,"./_is-object":21,"./_wks":41}],23:[function(require,module,exports){
module.exports = false;

},{}],24:[function(require,module,exports){
var anObject = require('./_an-object');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var toPrimitive = require('./_to-primitive');
var dP = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"./_an-object":3,"./_descriptors":9,"./_ie8-dom-define":18,"./_to-primitive":39}],25:[function(require,module,exports){
var pIE = require('./_object-pie');
var createDesc = require('./_property-desc');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var has = require('./_has');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = require('./_descriptors') ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};

},{"./_descriptors":9,"./_has":16,"./_ie8-dom-define":18,"./_object-pie":28,"./_property-desc":29,"./_to-iobject":37,"./_to-primitive":39}],26:[function(require,module,exports){
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = require('./_object-keys-internal');
var hiddenKeys = require('./_enum-bug-keys').concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};

},{"./_enum-bug-keys":11,"./_object-keys-internal":27}],27:[function(require,module,exports){
var has = require('./_has');
var toIObject = require('./_to-iobject');
var arrayIndexOf = require('./_array-includes')(false);
var IE_PROTO = require('./_shared-key')('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

},{"./_array-includes":4,"./_has":16,"./_shared-key":33,"./_to-iobject":37}],28:[function(require,module,exports){
exports.f = {}.propertyIsEnumerable;

},{}],29:[function(require,module,exports){
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],30:[function(require,module,exports){
var global = require('./_global');
var hide = require('./_hide');
var has = require('./_has');
var SRC = require('./_uid')('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

require('./_core').inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});

},{"./_core":6,"./_global":15,"./_has":16,"./_hide":17,"./_uid":40}],31:[function(require,module,exports){
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = require('./_is-object');
var anObject = require('./_an-object');
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = require('./_ctx')(Function.call, require('./_object-gopd').f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

},{"./_an-object":3,"./_ctx":7,"./_is-object":21,"./_object-gopd":25}],32:[function(require,module,exports){
'use strict';
var global = require('./_global');
var dP = require('./_object-dp');
var DESCRIPTORS = require('./_descriptors');
var SPECIES = require('./_wks')('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};

},{"./_descriptors":9,"./_global":15,"./_object-dp":24,"./_wks":41}],33:[function(require,module,exports){
var shared = require('./_shared')('keys');
var uid = require('./_uid');
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

},{"./_shared":34,"./_uid":40}],34:[function(require,module,exports){
var core = require('./_core');
var global = require('./_global');
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: require('./_library') ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});

},{"./_core":6,"./_global":15,"./_library":23}],35:[function(require,module,exports){
var toInteger = require('./_to-integer');
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

},{"./_to-integer":36}],36:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

},{}],37:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject');
var defined = require('./_defined');
module.exports = function (it) {
  return IObject(defined(it));
};

},{"./_defined":8,"./_iobject":20}],38:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./_to-integer');
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

},{"./_to-integer":36}],39:[function(require,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"./_is-object":21}],40:[function(require,module,exports){
var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

},{}],41:[function(require,module,exports){
var store = require('./_shared')('wks');
var uid = require('./_uid');
var Symbol = require('./_global').Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

},{"./_global":15,"./_shared":34,"./_uid":40}],42:[function(require,module,exports){
var global = require('./_global');
var inheritIfRequired = require('./_inherit-if-required');
var dP = require('./_object-dp').f;
var gOPN = require('./_object-gopn').f;
var isRegExp = require('./_is-regexp');
var $flags = require('./_flags');
var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
// "new" creates a new object, old webkit buggy here
var CORRECT_NEW = new $RegExp(re1) !== re1;

if (require('./_descriptors') && (!CORRECT_NEW || require('./_fails')(function () {
  re2[require('./_wks')('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function (key) {
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function () { return Base[key]; },
      set: function (it) { Base[key] = it; }
    });
  };
  for (var keys = gOPN(Base), i = 0; keys.length > i;) proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  require('./_redefine')(global, 'RegExp', $RegExp);
}

require('./_set-species')('RegExp');

},{"./_descriptors":9,"./_fails":12,"./_flags":14,"./_global":15,"./_inherit-if-required":19,"./_is-regexp":22,"./_object-dp":24,"./_object-gopn":26,"./_redefine":30,"./_set-species":32,"./_wks":41}],43:[function(require,module,exports){
// @@match logic
require('./_fix-re-wks')('match', 1, function (defined, MATCH, $match) {
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});

},{"./_fix-re-wks":13}],44:[function(require,module,exports){
"use strict";

function ajax() {
  var form = document.getElementsByClassName('main-form')[0],
      input = form.getElementsByTagName('input'),
      statusMessage = document.createElement('div');
  statusMessage.classList.add('status');
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    form.appendChild(statusMessage); // AJAX

    var request = new XMLHttpRequest();
    request.open('POST', 'server.php');
    request.setRequestHeader("Content-type", "aplication/x-www-form-urlencoded");
    var formData = new FormData(form); // отправка запроса

    request.send(formData);
    var image = document.createElement('img');
    statusMessage.appendChild(image);

    request.onreadystatechange = function () {
      if (request.readyState < 4) {
        image.src = "gif/ajax-loader.svg";
      } else if (request.readyState === 4) {
        // console.log(request.readyState+"  "+request.status);
        if (request.status === 200 && request.status < 300) {
          image.src = "gif/success1.png";
        } else {
          image.src = "gif/failure.jpg";
        }
      }
    };

    console.log(request.readyState);

    for (var i = 0; i < input.length; i++) {
      input[i].value = "";
    }
  }); // ajax запрос контактной формы

  var contact_form = document.getElementById('form'),
      inputs = contact_form.getElementsByTagName('input'),
      statusMessages = document.createElement('div');
  statusMessages.classList.add('status');
  contact_form.addEventListener('submit', function (event) {
    event.preventDefault();
    contact_form.appendChild(statusMessages); // AJAX

    var request = new XMLHttpRequest(); // настройка запроса

    request.open('POST', 'server.php');
    request.setRequestHeader("Content-type", "aplication/x-www-form-urlencoded");
    var formData = new FormData(contact_form);
    request.send(formData);

    request.onreadystatechange = function () {
      if (request.readyState < 4) {
        // statusMessages.innerHTML = message.loading;
        image.src = "gif/ajax-loader.svg";
      } else if (request.readyState === 4) {
        if (request.status === 200 && request.status < 300) {
          // statusMessages.innerHTML = message.succes;
          image.src = "gif/success1.png"; // добавляем данные
        } else {
          // statusMessages.innerHTML = message.failure;
          image.src = "gif/failure.jpg";
        }
      }
    };

    for (var i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
    }
  });
}

module.exports = ajax;
},{}],45:[function(require,module,exports){
"use strict";

require("core-js/modules/es6.regexp.match");

require("core-js/modules/es6.regexp.constructor");

require("core-js/modules/es6.regexp.match");

require("core-js/modules/es6.regexp.constructor");

require("core-js/modules/es6.regexp.match");

require("core-js/modules/es6.regexp.constructor");

function calc() {
  var persons = document.getElementsByClassName('counter-block-input')[0],
      restDays = document.getElementsByClassName('counter-block-input')[1],
      totalValue = document.getElementById('total'),
      place = document.getElementById('select'),
      personsSumm = 0,
      daysSum = 0,
      total = 0;
  totalValue.innerHTML = 0;
  persons.addEventListener('input', function () {
    var inp = parseInt(persons.value, 10);
    personsSumm = +inp;
    var regExp = new RegExp(/\d+/g);

    if ((inp + "").indexOf('e') || !!(persons.value + "").match(regExp)) {
      totalValue.innerHTML = 0;
    }

    total = (daysSum + personsSumm) * 4000;

    if (persons.value == "" || restDays.value == "") {
      totalValue.innerHTML = 0;
    } else {
      totalValue.innerHTML = total;
    }
  });
  restDays.addEventListener('input', function () {
    restDays.value == NaN ? total = 0 : total = total;
    var regExp = new RegExp(/\d+/g),
        inp = parseInt(restDays.value, 10);

    if ((inp + "").indexOf('e') || !!(restDays.value + "").match(regExp)) {
      totalValue.innerHTML = 0; // console.log(restDays.value);
    }

    console.log((restDays.value + "").match(regExp));
    daysSum = +inp; //this.value

    total = (daysSum + personsSumm) * 4000;

    if (persons.value == "" || persons.value == 0 || restDays.value == "" || restDays.value == 0) {
      totalValue.innerHTML = 0;
    } else {
      totalValue.innerHTML = total;
    }
  });
  place.addEventListener('change', function () {
    place.value == NaN ? total = 0 : total = total;

    if (persons.value == "" || restDays.value == "") {
      totalValue.innerHTML = 0;
    } else {
      var a = total;
      totalValue.innerHTML = a * this.options[this.selectedIndex].value;
    }

    var regExp = new RegExp("/\+|\d{1,}|\.|\,|\e|/", g);
    console.log(restDays.value.match(regExp));
  });

  if (persons.value == "" || restDays.value == "") {
    totalValue.innerHTML = 0;
  }
}

module.exports = calc;
},{"core-js/modules/es6.regexp.constructor":42,"core-js/modules/es6.regexp.match":43}],46:[function(require,module,exports){
"use strict";

function modal() {
  var more = document.querySelector('.more'),
      overlay = document.querySelector('.overlay'),
      close = document.querySelector('.popup-close'),
      btnDesc = document.querySelectorAll('.description-btn');
  more.addEventListener('click', function () {
    console.log(more);
    more.classList.add('more-splash');
    overlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
  });

  var _loop = function _loop(i) {
    btnDesc[i].addEventListener('click', function () {
      btnDesc[i].classList.add('more-splash');
      overlay.style.display = 'block';
      document.body.style.overflow = 'hidden';
    });
  };

  for (var i = 0; i < btnDesc.length; i++) {
    _loop(i);
  }

  close.addEventListener('click', function () {
    overlay.style.display = 'none';
    more.classList.remove('more-splash');
    document.body.style.overflow = '';
  });
}

module.exports = modal;
},{}],47:[function(require,module,exports){
"use strict";

function slider() {
  var slideIndex = 1,
      slides = document.getElementsByClassName('slider-item'),
      prev = document.querySelector('.prev'),
      next = document.querySelector('.next'),
      dotsWrap = document.querySelector('.slider-dots'),
      dots = document.getElementsByClassName('dot');
  showSlides(slideIndex);

  function showSlides(n) {
    if (n > slides.length) {
      slideIndex = 1;
    }

    if (n < 1) {
      slideIndex = slides.length;
    }

    for (var i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }

    ;

    for (var _i = 0; _i < dots.length; _i++) {
      dots[_i].classList.remove('dot-active');
    }

    ;
    slides[slideIndex - 1].style.display = 'block';
    dots[slideIndex - 1].classList.add('dot-active');
  }

  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  function currentSlie(n) {
    showSlides(slideIndex = n);
  }

  prev.addEventListener('click', function () {
    plusSlides(-1);
  });
  next.addEventListener('click', function () {
    plusSlides(1);
  });
  dotsWrap.addEventListener('click', function (event) {
    for (var k = 0; k < dots.length + 1; k++) {
      if (event.target.classList.contains('dot') && event.target == dots[k - 1]) {
        currentSlie(k);
      }

      console.log(dots[k]);
    }
  });
}

module.exports = slider;
},{}],48:[function(require,module,exports){
"use strict";

function tab() {
  var tab = document.getElementsByClassName('info-header-tab'),
      tabContent = document.getElementsByClassName('info-tabcontent'),
      info = document.getElementsByClassName('info-header')[0];

  var hideTabContent = function hideTabContent(a) {
    for (var i = a; i < tabContent.length; i++) {
      tabContent[i].classList.remove('show');
      tabContent[i].classList.add('hide');
    }
  };

  hideTabContent(1);

  var showTabContent = function showTabContent(b) {
    if (tabContent[b].classList.contains('hide')) {
      hideTabContent(0);
      tabContent[b].classList.remove('hide');
      tabContent[b].classList.add('show');
    }
  };

  info.addEventListener('click', function (event) {
    var target = event.target;

    if (target.className == 'info-header-tab') {
      for (var i = 0; i < tab.length; i++) {
        if (target == tab[i]) {
          showTabContent(i);
          break;
        }
      }
    }

    ;
  });
}

module.exports = tab;
},{}],49:[function(require,module,exports){
"use strict";

function timer() {
  var deadLine = '2018-09-10';

  var geTimeRemainig = function geTimeRemainig(endTime) {
    var t = Date.parse(endTime) - Date.parse(new Date());
    t < 0 ? t = 0 : t = t;
    var seconds = Math.floor(t / 1000 % 60),
        minutes = Math.floor(t / 1000 / 60 % 60),
        hours = Math.floor(t / (1000 * 60 * 60));
    return {
      'total': t,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  };

  var setClock = function setClock(id, endtime) {
    var timer = document.getElementById(id),
        hours = timer.querySelector('.hours'),
        minutes = timer.querySelector('.minutes'),
        seconds = timer.querySelector('.seconds');

    var checkTime = function checkTime(a) {
      a < 10 ? a = "0" + a : a = a;
      return a;
    };

    var updateClock = function updateClock() {
      var t = geTimeRemainig(endtime);
      hours.innerHTML = checkTime(t.hours);
      minutes.innerHTML = checkTime(t.minutes);
      seconds.innerHTML = checkTime(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    };

    updateClock();
    var timeInterval = setInterval(updateClock, 1000);
  };

  setClock('timer', deadLine);
}

module.exports = timer;
},{}]},{},[1]);
