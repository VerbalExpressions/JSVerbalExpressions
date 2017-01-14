/*!
 * VerbalExpressions JavaScript Library v0.3.0
 * https://github.com/VerbalExpressions/JSVerbalExpressions
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 */

/**
* Define the VerbalExpression class.
* @class
*/
(function verbalExpressionIIFE(root) {
    // Constants
    var MODULE_NAME = 'VerEx';

    /**
    * I am the constructor function.
    * @constructor
    * @alias VerEx
    * @return {RegExp} A new instance of RegExp with injected methods
    */
    function VerbalExpression() {
        var verbalExpression = new RegExp();

        // Add all the class methods
        VerbalExpression.injectClassMethods(verbalExpression);

        // Return the new object.
        return verbalExpression;
    }

    /**
    * @param {RegExp} verbalExpression An instance of RegExp on which to add VerbalExpressions methods
    * @return {RegExp} A new instance of RegExp with injected methods
    */
    VerbalExpression.injectClassMethods = function injectClassMethods(verbalExpression) {
        var method;
        // Loop over all the prototype methods
        for (method in VerbalExpression.prototype) {
            // Make sure this is a local method.
            if (VerbalExpression.prototype.hasOwnProperty(method)) {
                // Add the method
                verbalExpression[method] = VerbalExpression.prototype[method];
            }
        }

        return verbalExpression;
    };

    /**
    * Define the class methods.
    */
    VerbalExpression.prototype = {
        // Variables to hold the whole
        // expression construction in order
        _prefixes: '',
        _source: '',
        _suffixes: '',
        _modifiers: 'gm', // default to global multiline matching

        /**
        * Sanitation function for adding anything safely to the expression
        * @param {String} value string to sanitize
        * @return {String} sanitized value
        */
        sanitize: function sanitize(value) {
            var reRegExpEscape;

            if (value.source) {
                return value.source;
            }

            if (typeof value === 'number') {
                return value;
            }

            // Regular expression meta characters, URL: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/regexp
            reRegExpEscape = /([\].|*?+(){}^$\\:=[])/g;

            // Escape RegExp special characters only
            // $& => Last match, URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastMatch
            return value.replace(reRegExpEscape, '\\$&');
        },

        /**
        * Function to add stuff to the expression. Also compiles the new expression so it's ready to be used.
        * @param {string} value literal expression, not sanitized
        * @return {VerbalExpression} Freshly recompiled instance of VerbalExpression
        */
        add: function add(value) {
            this._source += value || '';
            this.compile(this._prefixes + this._source + this._suffixes, this._modifiers);

            return this;
        },

        /**
        * Control start-of-line matching
        * @param {Boolean} enable Control start-of-line matching
        * @return {VerbalExpression} Same instance of VerbalExpression to allow method chaining
        */
        startOfLine: function startOfLine(enable) {
            enable = (enable !== false);
            this._prefixes = enable ? '^' : '';
            return this.add();
        },

        /**
        * Control end-of-line matching
        * @param {Boolean} enable Control end-of-line matching
        * @return {VerbalExpression} Same instance of VerbalExpression to allow method chaining
        */
        endOfLine: function endOfLine(enable) {
            enable = (enable !== false);
            this._suffixes = enable ? '$' : '';
            return this.add();
        },

        /**
        * We try to keep the syntax as user-friendly as possible. So we can use the "normal" behaviour to split the "sentences" naturally.
        * @param {String} value value to find
        * @return {VerbalExpression} Same instance of VerbalExpression to allow method chaining
        */
        then: function then(value) {
            value = this.sanitize(value);
            return this.add('(?:' + value + ')');
        },

        /**
        * And because we can't start with "then" function, we create an alias to be used as the first function of the chain.
        * @param {String} value value to find
        * @return {VerbalExpression} Same instance of VerbalExpression to allow method chaining
        */
        find: function find(value) {
            return this.then(value);
        },

        /*
        * Maybe is used to add values with ?
        * @param {String} value value to find
        * @return {VerbalExpression} Same instance of VerbalExpression to allow method chaining
        */
        maybe: function maybe(value) {
            value = this.sanitize(value);
            return this.add('(?:' + value + ')?');
        },

        /**
        * Any character any number of times
        * @param {String} value value to find
        * @return {VerbalExpression} Same instance of VerbalExpression to allow method chaining
        */
        anything: function anything() {
            return this.add('(?:.*)');
        },

        /**
        * Anything but these characters
        * @param {String} value value to find
        * @return {VerbalExpression} Same instance of VerbalExpression to allow method chaining
        */
        anythingBut: function anythingBut(value) {
            value = this.sanitize(value);
            return this.add('(?:[^' + value + ']*)');
        },

        /**
        * Any character at least one time
        * @return {VerbalExpression} Same instance of VerbalExpression to allow method chaining
        */
        something: function something() {
            return this.add('(?:.+)');
        },

        /**
        * Any character at least one time except for these characters
        * @param {String} value value to find
        * @return {VerbalExpression} Same instance of VerbalExpression to allow method chaining
        */
        somethingBut: function somethingBut(value) {
            value = this.sanitize(value);
            return this.add('(?:[^' + value + ']+)');
        },

        /**
        * Shorthand function for the String.replace function to give more logical flow if, for example, we're doing multiple replacements on one regexp.
        * @param {String} source string to search for
        * @param {String} value value to replace with
        * @return {VerbalExpression} Same instance of VerbalExpression to allow method chaining
        */
        replace: function replace(source, value) {
            source = source.toString();
            return source.replace(this, value);
        },

        /// Add regular expression special ///
        /// characters                     ///

        /**
        * Line break
        * @return {VerbalExpression} Same instance of VerbalExpression to allow method chaining
        */
        lineBreak: function lineBreak() {
            return this.add('(?:\\r\\n|\\r|\\n)'); // Unix + Windows CRLF
        },

        /**
        * And a shorthand for html-minded
        * @return {VerbalExpression} Same instance of VerbalExpression to allow method chaining
        */
        br: function br() {
            return this.lineBreak();
        },

        /**
        * Tab (duh?)
        * @return {VerbalExpression} Same instance of VerbalExpression to allow method chaining
        */
        tab: function tab() {
            return this.add('\\t');
        },

        /**
        * Any alphanumeric
        * @return {VerbalExpression} Same instance of VerbalExpression to allow method chaining
        */
        word: function word() {
            return this.add('\\w+');
        },

        /**
        * Any digit
        * @return {VerbalExpression} Same instance of VerbalExpression to allow method chaining
        */
        digit: function digit() {
            this.add('\\d');
            return this;
        },

        /**
        * Any whitespace
        * @return {VerbalExpression} Same instance of VerbalExpression to allow method chaining
        */
        whitespace: function whitespace() {
            return this.add('\\s');
        },

        /**
        * Any given character
        * @param {String} value value to find
        * @return {VerbalExpression} Same instance of VerbalExpression to allow method chaining
        */
        anyOf: function anyOf(value) {
            value = this.sanitize(value);
            return this.add('[' + value + ']');
        },

        /**
        * Shorthand
        * @param {String} value value to find
        * @return {VerbalExpression} Same instance of VerbalExpression to allow method chaining
        */
        any: function any(value) {
            return this.anyOf(value);
        },

        /**
        * Usage: .range( from, to [, from, to ... ] )
        * @return {VerbalExpression} Same instance of VerbalExpression to allow method chaining
        */
        range: function range() {
            var length = arguments.length;

            // Create a string buffer instead of concatenating on iteration
            var buffer = new Array(length / 2);
            var index = 0;
            var i = 0;
            var from;
            var to;

            buffer[index++] = '[';

            while (i < length) {
                from = this.sanitize(arguments[i++]);
                to = this.sanitize(arguments[i++]);
                buffer[index++] = from + '-' + to;
            }

            buffer[index++] = ']';

            return this.add(buffer.join(''));
        },

        /// Modifiers      ///

        /**
        * Modifier abstraction
        * @param {String} modifier modifier to add
        * @return {VerbalExpression} Same instance of VerbalExpression to allow method chaining
        */
        addModifier: function addModifier(modifier) {
            if (this._modifiers.indexOf(modifier) === -1) {
                this._modifiers += modifier;
            }

            return this.add();
        },

        /**
        * Remove modifier
        * @param {String} modifier modifier to remove
        * @return {VerbalExpression} Same instance of VerbalExpression to allow method chaining
        */
        removeModifier: function removeModifier(modifier) {
            this._modifiers = this._modifiers.replace(modifier, '');
            return this.add();
        },

        /**
        * Case-insensitivity modifier
        * @param {Boolean} enable Control case-insensitive matching
        * @return {VerbalExpression} Same instance of VerbalExpression to allow method chaining
        */
        withAnyCase: function withAnyCase(enable) {
            return enable !== false ? this.addModifier('i') : this.removeModifier('i');
        },

        /**
        * Default behaviour is with "g" modifier, so we can turn this another way around than other modifiers
        * @param {Boolean} enable Control global matching
        * @return {VerbalExpression} Same instance of VerbalExpression to allow method chaining
        */
        stopAtFirst: function stopAtFirst(enable) {
            return enable !== false ? this.removeModifier('g') : this.addModifier('g');
        },

        /**
        * Multiline, also reversed
        * @param {Boolean} enable Control multi-line matching
        * @return {VerbalExpression} Same instance of VerbalExpression to allow method chaining
        */
        searchOneLine: function searchOneLine(enable) {
            return enable !== false ? this.removeModifier('m') : this.addModifier('m');
        },

        /**
        * Repeats the previous item exactly n times or between n and m times.
        * @return {VerbalExpression} Same instance of VerbalExpression to allow method chaining
        */
        repeatPrevious: function repeatPrevious() {
            var value;
            var reIsInteger = /\d+/;
            var length = arguments.length;
            var values = new Array(length);
            var i = 0;
            var j = 0;
            for (i = 0; i < length; i++) {
                if (reIsInteger.test(arguments[i])) {
                    values[j++] = arguments[i];
                }
            }

            if (j > 0) {
                // Set the new length of the array, thus reducing to the elements that have content
                values.length = j;
                value = '{' + values.join(',') + '}';
            }


            return this.add(value);
        },

        /**
        * Repeats the previous at least once
        * @return {VerbalExpression} Same instance of VerbalExpression to allow method chaining
        */
        oneOrMore: function oneOrMore() {
            return this.add('+');
        },

        /// Loops  ///

        /**
        * Matches the value zero or more times
        * @param {String} value value to find
        * @return {VerbalExpression} Same instance of VerbalExpression to allow method chaining
        */
        multiple: function multiple(value) {
            // Use expression or string
            value = value.source || this.sanitize(value);
            if (arguments.length === 1) {
                this.add('(?:' + value + ')*');
            }

            if (arguments.length > 1) {
                this.add('(?:' + value + ')');
                this.add('{' + arguments[1] + '}');
            }

            return this;
        },

        /**
        * Adds alternative expressions
        * @param {String} value value to find
        * @return {VerbalExpression} Same instance of VerbalExpression to allow method chaining
        */
        or: function or(value) {
            this._prefixes += '(?:';
            this._suffixes = ')' + this._suffixes;

            this.add(')|(?:');
            if (value) {
                this.then(value);
            }

            return this;
        },

        /**
        * Starts a capturing group
        * @return {VerbalExpression} Same instance of VerbalExpression to allow method chaining
        */
        beginCapture: function beginCapture() {
            // Add the end of the capture group to the suffixes for now so compilation continues to work
            this._suffixes += ')';
            return this.add('(');
        },

        /**
        * Ends a capturing group
        * @return {VerbalExpression} Same instance of VerbalExpression to allow method chaining
        */
        endCapture: function endCapture() {
            // Remove the last parentheses from the _suffixes and add to the regex itself
            this._suffixes = this._suffixes.substring(0, this._suffixes.length - 1);
            return this.add(')');
        },

        /**
        * Convert to RegExp object
        * @return {RegExp} Converted RegExp instance
        */
        toRegExp: function toRegExp() {
            var array = this.toString().match(/\/(.*)\/([gimuy]+)?/);
            return new RegExp(array[1], array[2]);
        }
    };

    /**
    * @return {VerbalExpression} Returns a new instance of VerbalExpressions
    */
    function createVerbalExpression() {
        return new VerbalExpression();
    }

    // UMD (Universal Module Definition), URL: https://github.com/umdjs/umd
    // Supports AMD, CommonJS and the browser
    if (typeof module !== 'undefined' && module.exports) {
        // Node.js Module
        module.exports = createVerbalExpression;
    } else if (typeof define === 'function' && define.amd) {
        // AMD Module
        define(MODULE_NAME, [], function define() {
            return VerbalExpression;
        });
    } else {
        // Browser
        root[MODULE_NAME] = createVerbalExpression;
    }
}(this));
