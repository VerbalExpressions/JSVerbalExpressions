/*!
 * VerbalExpressions JavaScript Library v0.2.1
 * https://github.com/VerbalExpressions/JSVerbalExpressions
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 * Date: 2013-07-19
 *
 */

// Define the collection class.
/**
* @module VerbalExpressions
*/
(function verbalExpressionIIFE(root) {
    // Constants
    var MODULE_NAME = 'VerEx';

    /**
    * I am the constructor function.
    * @constructor
    * @return {RegExp} a new RegExp instance modified with injected methods
    */
    function VerbalExpression() {
        var verbalExpression = new RegExp();

        // Add all the class methods
        VerbalExpression.injectClassMethods(verbalExpression);

        // Return the new object.
        return verbalExpression;
    }

    // Define the static methods.
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

    // Define the class methods.
    VerbalExpression.prototype = {
        // Variables to hold the whole
        // expression construction in order
        _prefixes: '',
        _source: '',
        _suffixes: '',
        _modifiers: 'gm', // default to global multiline matching

        // Sanitation function for adding
        // anything safely to the expression
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

        // Function to add stuff to the
        // expression. Also compiles the
        // new expression so it's ready to
        // be used.
        add: function add(value) {
            this._source += value || '';
            this.compile(this._prefixes + this._source + this._suffixes, this._modifiers);

            return this;
        },

        // Start and end of line functions
        startOfLine: function startOfLine(enable) {
            enable = (enable !== false);
            this._prefixes = enable ? '^' : '';
            this.add();

            return this;
        },

        endOfLine: function endOfLine(enable) {
            enable = (enable !== false);
            this._suffixes = enable ? '$' : '';
            this.add();

            return this;
        },

        // We try to keep the syntax as
        // user-friendly as possible.
        // So we can use the "normal"
        // behaviour to split the "sentences"
        // naturally.
        then: function then(value) {
            value = this.sanitize(value);
            this.add('(?:' + value + ')');

            return this;
        },

        // And because we can't start with
        // "then" function, we create an alias
        // to be used as the first function
        // of the chain.
        find: function find(value) {
            return this.then(value);
        },

        // Maybe is used to add values with ?
        maybe: function maybe(value) {
            value = this.sanitize(value);
            this.add('(?:' + value + ')?');

            return this;
        },

        // Any character any number of times
        anything: function anything() {
            this.add('(?:.*)');
            return this;
        },

        // Anything but these characters
        anythingBut: function anythingBut(value) {
            value = this.sanitize(value);
            this.add('(?:[^' + value + ']*)');

            return this;
        },

        // Any character at least one time
        something: function something() {
            this.add('(?:.+)');
            return this;
        },

        // Any character at least one time except for these characters
        somethingBut: function somethingBut(value) {
            value = this.sanitize(value);
            this.add('(?:[^' + value + ']+)');

            return this;
        },

        // Shorthand function for the
        // String.replace function to
        // give more logical flow if, for
        // example, we're doing multiple
        // replacements on one regexp.
        replace: function replace(source, value) {
            source = source.toString();
            return source.replace(this, value);
        },

        /// Add regular expression special ///
        /// characters                     ///

        // Line break
        lineBreak: function lineBreak() {
            this.add('(?:\\r\\n|\\r|\\n)'); // Unix + Windows CRLF
            return this;
        },

        // And a shorthand for html-minded
        br: function br() {
            return this.lineBreak();
        },

        // Tab (duh?)
        tab: function tab() {
            this.add('\\t');
            return this;
        },

        // Any alphanumeric
        word: function word() {
            this.add('\\w+');
            return this;
        },

        // Any whitespace
        whitespace: function whitespace() {
            this.add('\\s');
            return this;
        },

        // Any given character
        anyOf: function anyOf(value) {
            value = this.sanitize(value);
            this.add('[' + value + ']');

            return this;
        },

        // Shorthand
        any: function any(value) {
            return this.anyOf(value);
        },

        // Usage: .range( from, to [, from, to ... ] )
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

            this.add(buffer.join(''));

            return this;
        },

        /// Modifiers      ///

        // Modifier abstraction
        addModifier: function addModifier(modifier) {
            if (this._modifiers.indexOf(modifier) === -1) {
                this._modifiers += modifier;
            }

            this.add();

            return this;
        },

        removeModifier: function removeModifier(modifier) {
            this._modifiers = this._modifiers.replace(modifier, '');
            this.add();

            return this;
        },

        // Case-insensitivity modifier
        withAnyCase: function withAnyCase(enable) {
            if (enable !== false) {
                this.addModifier('i');
            } else {
                this.removeModifier('i');
            }

            this.add();

            return this;
        },

        // Default behaviour is with "g" modifier,
        // so we can turn this another way around
        // than other modifiers
        stopAtFirst: function stopAtFirst(enable) {
            if (enable !== false) {
                this.removeModifier('g');
            } else {
                this.addModifier('g');
            }

            this.add();

            return this;
        },

        // Multiline, also reversed
        searchOneLine: function searchOneLine(enable) {
            if (enable !== false) {
                this.removeModifier('m');
            } else {
                this.addModifier('m');
            }

            this.add();

            return this;
        },

        // Repeats the previous item
        // exactly n times or
        // between n and m times.
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


            this.add(value);

            return (this);
        },

        // Repeats the previous at least once
        oneOrMore: function oneOrMore() {
            this.add('+');
            return (this);
        },

        /// Loops  ///

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

        // Adds alternative expressions
        or: function or(value) {
            this._prefixes += '(?:';
            this._suffixes = ')' + this._suffixes;

            this.add(')|(?:');
            if (value) {
                this.then(value);
            }

            return this;
        },

        // Starts a capturing group
        beginCapture: function beginCapture() {
            // Add the end of the capture group to the suffixes for now so compilation continues to work
            this._suffixes += ')';
            this.add('(');

            return this;
        },

        // Ends a capturing group
        endCapture: function endCapture() {
            // Remove the last parentheses from the _suffixes and add to the regex itself
            this._suffixes = this._suffixes.substring(0, this._suffixes.length - 1);
            this.add(')');

            return this;
        },

        // Convert to RegExp object
        toRegExp: function toRegExp() {
            var array = this.toString().match(/\/(.*)\/([gimuy]+)?/);
            return new RegExp(array[1], array[2]);
        },
    };

    /**
    * @return {VerbalExpressions} a new VerbalExpressions instance
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
})(this);
