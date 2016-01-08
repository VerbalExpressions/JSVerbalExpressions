/*!
 * VerbalExpressions JavaScript Library v0.1.2
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
(function verbalExpressionIIFE() {
    var root = this;

    // I am the constructor function.
    function VerbalExpression() {
        var verbalExpression = new RegExp();

        // Add all the class methods
        VerbalExpression.injectClassMethods(verbalExpression);

        // Return the new object.
        return verbalExpression;
    }

    // Define the static methods.
    VerbalExpression.injectClassMethods = function injectClassMethods(verbalExpression) {
        // Loop over all the prototype methods
        for (var method in VerbalExpression.prototype) {
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
            if (value.source) {
                return value.source;
            }

            if (typeof value === 'number') {
                return value;
            }

            return value.replace(/[^\w]/g, function charReplace(character) {
                return '\\' + character;
            });
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
            var value = '[';

            for (var _to = 1; _to < arguments.length; _to += 2) {
                var from = this.sanitize(arguments[_to - 1]);
                var to = this.sanitize(arguments[_to]);

                value += from + '-' + to;
            }

            value += ']';

            this.add(value);

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
            if (arguments.length <= 1) {
                if (/\d+/.exec(arguments[0]) !== null) {
                    value = '{' + arguments[0] + '}';
                }
            } else {
                var values = [];
                for (var i = 0; i < arguments.length; i++) {
                    if (/\d+/.exec(arguments[i]) !== null) {
                        values.push(arguments[i]);
                    }
                }

                value = '{' + values.join(',') + '}';
            }

            this.add(value);

            return (this);
        },

        // Repeats the previous at least ones
        oneOrMore: function oneOrMore() {
            this.add('+');
            return (this);
        },

        /// Loops  ///

        multiple: function multiple(value) {
            // Use expression or string

            value = value.source ? value.source : this.sanitize(value);
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
            this.add('(', false);

            return this;
        },

        // Ends a capturing group
        endCapture: function endCapture() {
            // Remove the last parentheses from the _suffixes and add to the regex itself
            this._suffixes = this._suffixes.substring(0, this._suffixes.length - 1);
            this.add(')', true);

            return this;
        },

        // Convert to RegExp object
        toRegExp: function toRegExp() {
            var arr = this.toString().match(/\/(.*)\/([a-z]+)?/);
            return new RegExp(arr[1], arr[2]);
        },
    };

    function createVerbalExpression() {
        return new VerbalExpression();
    }

    // Support both browser and node.js
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = createVerbalExpression;
    } else if (typeof define === 'function' && define.amd) {
        define(function define() {
            return VerbalExpression;
        });
    } else {
        root.VerEx = createVerbalExpression;
    }
})();
