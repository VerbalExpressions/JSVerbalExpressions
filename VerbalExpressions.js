/*!
 * VerbalExpressions JavaScript Library
 * https://github.com/VerbalExpressions/JSVerbalExpressions
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 */

/**
 * Define the VerbalExpression class.
 * @class
 */
class VerbalExpression extends RegExp {
    /**
     * Construct an instance of VerbalExpression
     * @constructor
     * @alias VerEx
     * @return {VerbalExpression} A new instance of VerbalExpression
     */
    constructor() {
        // Call the `RegExp` constructor so that `this` can be used
        super('//gm');

        // Variables to hold the expression construction in order
        this._prefixes = '';
        this._source = '';
        this._suffixes = '';
        this._modifiers = 'gm'; // 'global, multiline' matching by default
    }

    // Utility //

    /**
     * Escape metacharacters in the parameter and make it safe for adding to the expression
     * @param {String} value string to sanitize
     * @return {String} sanitized value
     */
    static sanitize(value) {
        if (value.source) {
            return value.source;
        }

        if (typeof value === 'number') {
            return value;
        }

        // Regular expression to match meta characters
        // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/regexp
        const toEscape = /([\].|*?+(){}^$\\:=[])/g;

        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastMatch
        const lastMatch = '$&';

        // Escape meta characters
        return value.replace(toEscape, `\\${lastMatch}`);
    }

    /**
     * Add stuff to the expression and compile the new expression so it's ready to be used.
     * @param {string} value literal expression, not sanitized
     * @return {VerbalExpression} Freshly recompiled instance of VerbalExpression
     */
    add(value = '') {
        this._source += value;
        const pattern = this._prefixes + this._source + this._suffixes;

        this.compile(pattern, this._modifiers);

        return this;
    }

    // Rules //

    /**
     * Control start-of-line matching
     * @param {Boolean} enable Control start-of-line matching
     * @return {VerbalExpression} same instace of VerbalExpression
     */
    startOfLine(enable = true) {
        this._prefixes = enable ? '^' : '';
        return this.add();
    }

    /**
     * Control end-of-line matching
     * @param {Boolean} enable Control end-of-line matching
     * @return {VerbalExpression} same instace of VerbalExpression
     */
    endOfLine(enable = true) {
        this._suffixes = enable ? '$' : '';
        return this.add();
    }

    /**
     * Look for the value passed
     * @param {String} value value to find
     * @return {VerbalExpression} same instace of VerbalExpression
     */
    then(value) {
        value = VerbalExpression.sanitize(value);
        return this.add(`(?:${value})`);
    }

    /**
     * Alias for then() to allow for readable syntax when then() is the first method in the chain.
     * @param {String} value value to find
     * @return {VerbalExpression} same instace of VerbalExpression
     */
    find(value) {
        return this.then(value);
    }

    /**
     * Add optional values
     * @param {String} value value to find
     * @return {VerbalExpression} same instace of VerbalExpression
     */
    maybe(value) {
        value = VerbalExpression.sanitize(value);
        return this.add(`(?:${value})?`);
    }

    /**
     * Add alternative expressions
     * @param {String} value value to find
     * @return {VerbalExpression} same instace of VerbalExpression
     */
    or(value) {
        this._prefixes += '(?:';
        this._suffixes = `)${this._suffixes}`;

        this.add(')|(?:');

        if (value) {
            this.then(value);
        }

        return this;
    }

    /**
     * Any character any number of times
     * @param {String} value value to find
     * @return {VerbalExpression} same instace of VerbalExpression
     */
    anything() {
        return this.add('(?:.*)');
    }

    /**
     * Anything but these characters
     * @param {String} value value to find
     * @return {VerbalExpression} same instace of VerbalExpression
     */
    anythingBut(value) {
        value = VerbalExpression.sanitize(value);
        return this.add(`(?:[^${value}]*)`);
    }

    /**
     * Any character at least one time
     * @return {VerbalExpression} same instace of VerbalExpression
     */
    something() {
        return this.add('(?:.+)');
    }

    /**
     * Any character at least one time except for these characters
     * @param {String} value value to find
     * @return {VerbalExpression} same instace of VerbalExpression
     */
    somethingBut(value) {
        value = VerbalExpression.sanitize(value);
        return this.add(`(?:[^${value}]+)`);
    }

    /**
     * Match any given character
     * @param {String} value value to find
     * @return {VerbalExpression} same instace of VerbalExpression
     */
    anyOf(value) {
        value = VerbalExpression.sanitize(value);
        return this.add(`[${value}]`);
    }

    /**
     * Shorthand for anyOf(value)
     * @param {String} value value to find
     * @return {VerbalExpression} same instace of VerbalExpression
     */
    any(value) {
        return this.anyOf(value);
    }

    /**
     * Usage: .range( from, to [, from, to ... ] )
     * @return {VerbalExpression} same instace of VerbalExpression
     */
    range(...ranges) {
        let value;

        for (let i = 0; i < ranges.length; i += 2) {
            const from = VerbalExpression.sanitize(ranges[i - 1]);
            const to = VerbalExpression.sanitize(ranges[i]);

            value += `${from}-${to}`;
        }

        return this.add(`[${value}]`);
    }

    // Special characters //

    /**
     * Match a Line break
     * @return {VerbalExpression} same instace of VerbalExpression
     */
    lineBreak() {
        return this.add('(?:\\r\\n|\\r|\\n)'); // Unix(LF) + Windows(CRLF)
    }

    /**
     * A shorthand for lineBreak() for html-minded users
     * @return {VerbalExpression} same instace of VerbalExpression
     */
    br() {
        return this.lineBreak();
    }

    /**
     * Match a tab character
     * @return {VerbalExpression} same instace of VerbalExpression
     */
    tab() {
        return this.add('\\t');
    }

    /**
     * Match any alphanumeric
     * @return {VerbalExpression} same instace of VerbalExpression
     */
    word() {
        return this.add('\\w+');
    }

    /**
     * Match a single digit digit
     * @return {VerbalExpression} same instace of VerbalExpression
     */
    digit() {
        return this.add('\\d');
    }

    /**
     * Match a single whitespace
     * @return {VerbalExpression} same instace of VerbalExpression
     */
    whitespace() {
        return this.add('\\s');
    }

    // Modifiers //

    /**
     * Add modifier
     * @param {String} modifier modifier to add
     * @return {VerbalExpression} same instace of VerbalExpression
     */
    addModifier(modifier) {
        if (!this._modifiers.includes(modifier)) {
            this._modifiers += modifier;
        }

        return this.add();
    }

    /**
     * Remove modifier
     * @param {String} modifier modifier to remove
     * @return {VerbalExpression} same instace of VerbalExpression
     */
    removeModifier(modifier) {
        this._modifiers = this._modifiers.replace(modifier, '');
        return this.add();
    }

    /**
     * Case-insensitivity modifier
     * @param {Boolean} enable Control case-insensitive matching
     * @return {VerbalExpression} same instace of VerbalExpression
     */
    withAnyCase(enable = true) {
        return enable ? this.addModifier('i') : this.removeModifier('i');
    }

    /**
     * Default behaviour is with "g" modifier, so we can turn this another way around than other modifiers
     * @param {Boolean} enable Control global matching
     * @return {VerbalExpression} same instace of VerbalExpression
     */
    stopAtFirst(enable = true) {
        return enable ? this.removeModifier('g') : this.addModifier('g');
    }

    /**
     * Control the multiline modifier
     * @param {Boolean} enable Control multi-line matching
     * @return {VerbalExpression} same instace of VerbalExpression
     */
    searchOneLine(enable = true) {
        return enable ? this.removeModifier('m') : this.addModifier('m');
    }

    /**
     * Repeat the previous item exactly n times or between n and m times.
     * @return {VerbalExpression} same instace of VerbalExpression
     */
    repeatPrevious(...quantity) {
        const isInteger = /\d+/;
        const values = quantity.filter(argument => isInteger.test(argument));

        if (values.length > 0) {
            this.add(`{${values.join(',')}}`);
        }

        return this;
    }

    // Loops //

    /**
     * Repeat the previous at least once
     * @return {VerbalExpression} same instace of VerbalExpression
     */
    oneOrMore() {
        return this.add('+');
    }

    /**
     * Match the value zero or more times
     * @param {String} value value to find
     * @param {Integer?} lower minimum number of times the value should be repeated
     * @param {Integer?} upper maximum number of times the value should be repeated
     * @return {VerbalExpression} same instace of VerbalExpression
     */
    multiple(value, lower, upper) {
        // Use expression or string
        value = value.source || VerbalExpression.sanitize(value);

        this.add(`(?:${value})`);

        if (lower === undefined && upper === undefined) {
            this.add('*'); // Any number of times
        } else if (lower !== undefined && upper === undefined) {
            this.add(`{${lower}}`);
        } else if (lower !== undefined && upper !== undefined) {
            this.add(`{${lower},${upper}}`);
        }

        return this;
    }

    // Capture groups //

    /**
     * Starts a capturing group
     * @return {VerbalExpression} same instace of VerbalExpression
     */
    beginCapture() {
        // Add the end of the capture group to the suffixes temporarily so that compilation continues to work
        this._suffixes += ')';
        return this.add('(');
    }

    /**
     * Ends a capturing group
     * @return {VerbalExpression} same instace of VerbalExpression
     */
    endCapture() {
        // Remove the last parenthesis from the _suffixes and add it to the regex
        this._suffixes = this._suffixes.slice(0, -1);
        return this.add(')');
    }

    // Miscellaneous //

    /**
     * Shorthand function for the String.replace function to allow for a more logical flow.
     * @param {String} source string to search for
     * @param {String} value value to replace with
     * @return {VerbalExpression} same instace of VerbalExpression
     */
    replace(source, value) {
        source = source.toString();
        return source.replace(this, value);
    }

    /**
     * Convert to RegExp object
     * @return {RegExp} Converted RegExp instance
     */
    toRegExp() {
        const components = this.toString().match(/\/(.*)\/([gimuy]+)?/);
        const pattern = components[1];
        const flags = components[2];

        return new RegExp(pattern, flags);
    }
}

// UMD (Universal Module Definition)
// https://github.com/umdjs/umd
((root, factory) => {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.VerEx = factory();
    }
})(this, () => () => new VerbalExpression());
