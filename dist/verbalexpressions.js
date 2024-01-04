(function (root, factory) {
  if (root === undefined && window !== undefined) root = window;
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define('VerEx', [], function () {
      return (root['VerEx'] = factory());
    });
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    root['VerEx'] = factory();
  }
}(this, function () {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _extendableBuiltin(cls) {
  function ExtendableBuiltin() {
    var instance = Reflect.construct(cls, Array.from(arguments));
    Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
    return instance;
  }

  ExtendableBuiltin.prototype = Object.create(cls.prototype, {
    constructor: {
      value: cls,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(ExtendableBuiltin, cls);
  } else {
    ExtendableBuiltin.__proto__ = cls;
  }

  return ExtendableBuiltin;
}

/**
 * @file VerbalExpressions JavaScript Library
 * @version 0.3.0
 * @license MIT
 *
 * @see https://github.com/VerbalExpressions/JSVerbalExpressions
 */

/**
 * Define the VerbalExpression class
 *
 * @class VerbalExpression
 * @extends {RegExp}
 */
var VerbalExpression = /*#__PURE__*/function (_extendableBuiltin2) {
  _inherits(VerbalExpression, _extendableBuiltin2);

  var _super = _createSuper(VerbalExpression);

  /**
   * Creates an instance of VerbalExpression.
   * @constructor
   * @alias VerEx
   * @memberof VerbalExpression
   */
  function VerbalExpression() {
    var _this;

    _classCallCheck(this, VerbalExpression);

    // Call the `RegExp` constructor so that `this` can be used
    _this = _super.call(this, '', 'gm'); // Variables to hold the expression construction in order

    _this._prefixes = '';
    _this._source = '';
    _this._suffixes = '';
    _this._modifiers = 'gm'; // 'global, multiline' matching by default

    return _this;
  } // Utility //

  /**
   * Escape meta-characters in the parameter and make it safe for adding to the expression
   * @static
   * @param {(string|RegExp|number)} value object to sanitize
   * @returns {string} sanitized value
   * @memberof VerbalExpression
   */


  _createClass(VerbalExpression, [{
    key: "add",
    value:
    /**
     * Add stuff to the expression and compile the new expression so it's ready to be used.
     * @param {(string|number)} [value=''] stuff to add
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
     */
    function add() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      this._source += value;
      var pattern = this._prefixes + this._source + this._suffixes;
      this.compile(pattern, this._modifiers);
      return this;
    } // Rules //

    /**
     * Control start-of-line matching
     * @param {boolean} [enable=true] whether to enable this behaviour
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
     */

  }, {
    key: "startOfLine",
    value: function startOfLine() {
      var enable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      this._prefixes = enable ? '^' : '';
      return this.add();
    }
    /**
     * Control end-of-line matching
     * @param {boolean} [enable=true] whether to enable this behaviour
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
     */

  }, {
    key: "endOfLine",
    value: function endOfLine() {
      var enable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      this._suffixes = enable ? '$' : '';
      return this.add();
    }
    /**
     * Look for the value passed
     * @param {(string|RegExp|number)} value value to find
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
     */

  }, {
    key: "then",
    value: function then(value) {
      value = VerbalExpression.sanitize(value);
      return this.add("(?:".concat(value, ")"));
    }
    /**
     * Alias for then() to allow for readable syntax when then() is the first method in the chain.
     * @param {(string|RegExp|numer)} value value to find
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
     */

  }, {
    key: "find",
    value: function find(value) {
      return this.then(value);
    }
    /**
     * Add optional values
     * @param {(string|RegExp|number)} value value to find
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
     */

  }, {
    key: "maybe",
    value: function maybe(value) {
      value = VerbalExpression.sanitize(value);
      return this.add("(?:".concat(value, ")?"));
    }
    /**
     * Add alternative expressions
     * @param {(string|RegExp|number)} value value to find
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
     */

  }, {
    key: "or",
    value: function or(value) {
      this._prefixes += '(?:';
      this._suffixes = ")".concat(this._suffixes);
      this.add(')|(?:');

      if (value) {
        this.then(value);
      }

      return this;
    }
    /**
     * Any character any number of times
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
     */

  }, {
    key: "anything",
    value: function anything() {
      return this.add('(?:.*)');
    }
    /**
     * Anything but these characters
     * @param {(string|number|string[]|number[])} value characters to not match
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
     */

  }, {
    key: "anythingBut",
    value: function anythingBut(value) {
      if (Array.isArray(value)) {
        value = value.join('');
      }

      value = VerbalExpression.sanitize(value);
      return this.add("(?:[^".concat(value, "]*)"));
    }
    /**
     * Any character(s) at least once
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
     */

  }, {
    key: "something",
    value: function something() {
      return this.add('(?:.+)');
    }
    /**
     * Any character at least one time except for these characters
     * @param {(string|number|string[]|number[])} value characters to not match
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
     */

  }, {
    key: "somethingBut",
    value: function somethingBut(value) {
      if (Array.isArray(value)) {
        value = value.join('');
      }

      value = VerbalExpression.sanitize(value);
      return this.add("(?:[^".concat(value, "]+)"));
    }
    /**
     * Match any of the given characters
     * @param {(string|number|string[]|number[])} value characters to match
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
     */

  }, {
    key: "anyOf",
    value: function anyOf(value) {
      if (Array.isArray(value)) {
        value = value.join('');
      }

      value = VerbalExpression.sanitize(value);
      return this.add("[".concat(value, "]"));
    }
    /**
     * Shorthand for anyOf(value)
     * @param {string|number} value value to find
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
     */

  }, {
    key: "any",
    value: function any(value) {
      return this.anyOf(value);
    }
    /**
     * Ensure that the parameter does not follow
     * @param {string|number} value
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
     */

  }, {
    key: "not",
    value: function not(value) {
      value = VerbalExpression.sanitize(value);
      this.add("(?!".concat(value, ")"));
      return this;
    }
    /**
     * Matching any character within a range of characters
     * Usage: .range( from, to [, from, to ... ] )
     * @param {...string} ranges characters denoting beginning and ending of ranges
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
     */

  }, {
    key: "range",
    value: function range() {
      var value = '';

      for (var i = 1; i < arguments.length; i += 2) {
        var from = VerbalExpression.sanitize(i - 1 < 0 || arguments.length <= i - 1 ? undefined : arguments[i - 1]);
        var to = VerbalExpression.sanitize(i < 0 || arguments.length <= i ? undefined : arguments[i]);
        value += "".concat(from, "-").concat(to);
      }

      return this.add("[".concat(value, "]"));
    } // Special characters //

    /**
     * Match a Line break
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
     */

  }, {
    key: "lineBreak",
    value: function lineBreak() {
      return this.add('(?:\\r\\n|\\r|\\n)'); // Unix(LF) + Windows(CRLF)
    }
    /**
     * A shorthand for lineBreak() for html-minded users
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
     */

  }, {
    key: "br",
    value: function br() {
      return this.lineBreak();
    }
    /**
     * Match a tab character
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
     */

  }, {
    key: "tab",
    value: function tab() {
      return this.add('\\t');
    }
    /**
     * Match any alphanumeric
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
     */

  }, {
    key: "word",
    value: function word() {
      return this.add('\\w+');
    }
    /**
     * Match a single digit
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
     */

  }, {
    key: "digit",
    value: function digit() {
      return this.add('\\d');
    }
    /**
     * Match a single whitespace
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
     */

  }, {
    key: "whitespace",
    value: function whitespace() {
      return this.add('\\s');
    } // Modifiers //

    /**
     * Add a regex modifier/flag
     * @param {string} modifier modifier to add
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
     */

  }, {
    key: "addModifier",
    value: function addModifier(modifier) {
      if (!this._modifiers.includes(modifier)) {
        this._modifiers += modifier;
      }

      return this.add();
    }
    /**
     * Remove modifier
     * @param {string} modifier modifier to remove
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
     */

  }, {
    key: "removeModifier",
    value: function removeModifier(modifier) {
      this._modifiers = this._modifiers.replace(modifier, '');
      return this.add();
    }
    /**
     * Control case-insensitive matching
     * @param {boolean} [enable=true] whether to enable this behaviour
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
     */

  }, {
    key: "withAnyCase",
    value: function withAnyCase() {
      var enable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      return enable ? this.addModifier('i') : this.removeModifier('i');
    }
    /**
     * Default behaviour is with "g" modifier, so we can turn this another way around than other modifiers
     * @param {boolean} [enable=true] whether to enable this behaviour
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
     */

  }, {
    key: "stopAtFirst",
    value: function stopAtFirst() {
      var enable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      return enable ? this.removeModifier('g') : this.addModifier('g');
    }
    /**
     * Control the multiline modifier
     * @param {boolean} [enable=true] whether to enable this behaviour
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
     */

  }, {
    key: "searchOneLine",
    value: function searchOneLine() {
      var enable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      return enable ? this.removeModifier('m') : this.addModifier('m');
    } // Loops //

    /**
     * Repeat the previous item exactly n times or between n and m times
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
     */

  }, {
    key: "repeatPrevious",
    value: function repeatPrevious() {
      var isInteger = /\d+/;

      for (var _len = arguments.length, quantity = new Array(_len), _key = 0; _key < _len; _key++) {
        quantity[_key] = arguments[_key];
      }

      var values = quantity.filter(function (argument) {
        return isInteger.test(argument);
      });

      if (values.length === 0 || values.length > 2) {
        return this;
      }

      this.add("{".concat(values.join(','), "}"));
      return this;
    }
    /**
     * Repeat the previous at least once
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
     */

  }, {
    key: "oneOrMore",
    value: function oneOrMore() {
      return this.add('+');
    }
    /**
     * Match the value zero or more times
     * @param {string} value value to find
     * @param {integer} [lower] minimum number of times the value should be repeated
     * @param {integer} [upper] maximum number of times the value should be repeated
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
     */

  }, {
    key: "multiple",
    value: function multiple(value, lower, upper) {
      if (value !== undefined) {
        value = VerbalExpression.sanitize(value);
        this.add("(?:".concat(value, ")"));
      }

      if (lower === undefined && upper === undefined) {
        this.add('*'); // Any number of times
      } else if (lower !== undefined && upper === undefined) {
        this.add("{".concat(lower, ",}"));
      } else if (lower !== undefined && upper !== undefined) {
        this.add("{".concat(lower, ",").concat(upper, "}"));
      }

      return this;
    } // Capture groups //

    /**
     * Starts a capturing group
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
     */

  }, {
    key: "beginCapture",
    value: function beginCapture() {
      // Add the end of the capture group to the suffixes temporarily so that compilation continues to work
      this._suffixes += ')';
      return this.add('(');
    }
    /**
     * Ends a capturing group
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
     */

  }, {
    key: "endCapture",
    value: function endCapture() {
      // Remove the last parenthesis from the _suffixes and add it to the regex
      this._suffixes = this._suffixes.slice(0, -1);
      return this.add(')');
    } // Miscellaneous //

    /**
     * Shorthand function for the string.replace function to allow for a more logical flow
     * @param {string} source string to search for
     * @param {string} value value to replace with
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
     */

  }, {
    key: "replace",
    value: function replace(source, value) {
      source = source.toString();
      return source.replace(this, value);
    }
    /**
     * Convert to RegExp object
     * @returns {RegExp} equivalent RegExp instance
     * @memberof VerbalExpression
     */

  }, {
    key: "toRegExp",
    value: function toRegExp() {
      var components = this.toString().match(/\/(.*)\/([gimuy]+)?/);
      var pattern = components[1];
      var flags = components[2];
      return new RegExp(pattern, flags);
    }
  }], [{
    key: "sanitize",
    value: function sanitize(value) {
      if (value instanceof RegExp) {
        return value.source;
      }

      if (typeof value === 'number') {
        return value;
      }

      if (typeof value !== 'string') {
        return '';
      } // Regular expression to match meta characters
      // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/regexp


      var toEscape = /[|\\{}()[\]^$+*?.]/g; // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastMatch

      var lastMatch = '$&'; // Escape meta characters

      return value.replace(toEscape, "\\".concat(lastMatch)).replace(/-/g, '\\x2d');
    }
  }]);

  return VerbalExpression;
}(_extendableBuiltin(RegExp));
/**
 * Return a new instance of `VerbalExpression`
 * @export
 * @returns {VerbalExpression} new instance
 */


function VerEx() {
  // eslint-disable-line no-unused-vars
  var instance = new VerbalExpression();
  instance.sanitize = VerbalExpression.sanitize;
  return instance;
}
//# sourceMappingURL=verbalexpressions.js.map

return VerEx;

}));
