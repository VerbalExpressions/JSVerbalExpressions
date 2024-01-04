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
class VerbalExpression extends RegExp {
    /**
     * Creates an instance of VerbalExpression.
     * @constructor
     * @alias VerEx
     * @memberof VerbalExpression
     */
    constructor() {
        // Call the `RegExp` constructor so that `this` can be used
        super('', 'gm');

        // Variables to hold the expression construction in order
        this._prefixes = '';
        this._source = '';
        this._suffixes = '';
        this._modifiers = 'gm'; // 'global, multiline' matching by default
    }

    // Utility //

    /**
     * Escape meta-characters in the parameter and make it safe for adding to the expression
     * @static
     * @param {(string|RegExp|number)} value object to sanitize
     * @returns {string} sanitized value
     * @memberof VerbalExpression
     */
    static sanitize(value) {
        if (value instanceof RegExp) {
            return value.source;
        }

        if (typeof value === 'number') {
            return value;
        }

        if (typeof value !== 'string') {
            return '';
        }

        // Regular expression to match meta characters
        // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/regexp
        const toEscape = /[|\\{}()[\]^$+*?.]/g;

        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastMatch
        const lastMatch = '$&';

        // Escape meta characters
        return value
            .replace(toEscape, `\\${lastMatch}`)
            .replace(/-/g, '\\x2d');
    }

    /**
     * Add stuff to the expression and compile the new expression so it's ready to be used.
     * @param {(string|number)} [value=''] stuff to add
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
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
     * @param {boolean} [enable=true] whether to enable this behaviour
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
     */
    startOfLine(enable = true) {
        this._prefixes = enable ? '^' : '';
        return this.add();
    }

    /**
     * Control end-of-line matching
     * @param {boolean} [enable=true] whether to enable this behaviour
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
     */
    endOfLine(enable = true) {
        this._suffixes = enable ? '$' : '';
        return this.add();
    }

    /**
     * Look for the value passed
     * @param {(string|RegExp|number)} value value to find
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
     */
    then(value) {
        value = VerbalExpression.sanitize(value);
        return this.add(`(?:${value})`);
    }

    /**
     * Alias for then() to allow for readable syntax when then() is the first method in the chain.
     * @param {(string|RegExp|numer)} value value to find
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
     */
    find(value) {
        return this.then(value);
    }

    /**
     * Add optional values
     * @param {(string|RegExp|number)} value value to find
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
     */
    maybe(value) {
        value = VerbalExpression.sanitize(value);
        return this.add(`(?:${value})?`);
    }

    /**
     * Add alternative expressions
     * @param {(string|RegExp|number)} value value to find
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
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
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
     */
    anything() {
        return this.add('(?:.*)');
    }

    /**
     * Anything but these characters
     * @param {(string|number|string[]|number[])} value characters to not match
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
     */
    anythingBut(value) {
        if (Array.isArray(value)) {
            value = value.join('');
        }

        value = VerbalExpression.sanitize(value);
        return this.add(`(?:[^${value}]*)`);
    }

    /**
     * Any character(s) at least once
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
     */
    something() {
        return this.add('(?:.+)');
    }

    /**
     * Any character at least one time except for these characters
     * @param {(string|number|string[]|number[])} value characters to not match
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
     */
    somethingBut(value) {
        if (Array.isArray(value)) {
            value = value.join('');
        }

        value = VerbalExpression.sanitize(value);
        return this.add(`(?:[^${value}]+)`);
    }

    /**
     * Match any of the given characters
     * @param {(string|number|string[]|number[])} value characters to match
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
     */
    anyOf(value) {
        if (Array.isArray(value)) {
            value = value.join('');
        }

        value = VerbalExpression.sanitize(value);
        return this.add(`[${value}]`);
    }

    /**
     * Shorthand for anyOf(value)
     * @param {string|number} value value to find
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
     */
    any(value) {
        return this.anyOf(value);
    }

    /**
     * Ensure that the parameter does not follow
     * @param {string|number} value
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
     */
    not(value) {
        value = VerbalExpression.sanitize(value);
        this.add(`(?!${value})`);

        return this;
    }

    /**
     * Matching any character within a range of characters
     * Usage: .range( from, to [, from, to ... ] )
     * @param {...string} ranges characters denoting beginning and ending of ranges
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
     */
    range(...ranges) {
        let value = '';

        for (let i = 1; i < ranges.length; i += 2) {
            const from = VerbalExpression.sanitize(ranges[i - 1]);
            const to = VerbalExpression.sanitize(ranges[i]);

            value += `${from}-${to}`;
        }

        return this.add(`[${value}]`);
    }

    // Special characters //

    /**
     * Match a Line break
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
     */
    lineBreak() {
        return this.add('(?:\\r\\n|\\r|\\n)'); // Unix(LF) + Windows(CRLF)
    }

    /**
     * A shorthand for lineBreak() for html-minded users
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
     */
    br() {
        return this.lineBreak();
    }

    /**
     * Match a tab character
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
     */
    tab() {
        return this.add('\\t');
    }

    /**
     * Match any alphanumeric
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
     */
    word() {
        return this.add('\\w+');
    }

    /**
     * Match a single digit
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
     */
    digit() {
        return this.add('\\d');
    }

    /**
     * Match a single whitespace
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
     */
    whitespace() {
        return this.add('\\s');
    }

    // Modifiers //

    /**
     * Add a regex modifier/flag
     * @param {string} modifier modifier to add
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
     */
    addModifier(modifier) {
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
    removeModifier(modifier) {
        this._modifiers = this._modifiers.replace(modifier, '');
        return this.add();
    }

    /**
     * Control case-insensitive matching
     * @param {boolean} [enable=true] whether to enable this behaviour
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
     */
    withAnyCase(enable = true) {
        return enable ? this.addModifier('i') : this.removeModifier('i');
    }

    /**
     * Default behaviour is with "g" modifier, so we can turn this another way around than other modifiers
     * @param {boolean} [enable=true] whether to enable this behaviour
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
     */
    stopAtFirst(enable = true) {
        return enable ? this.removeModifier('g') : this.addModifier('g');
    }

    /**
     * Control the multiline modifier
     * @param {boolean} [enable=true] whether to enable this behaviour
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
     */
    searchOneLine(enable = true) {
        return enable ? this.removeModifier('m') : this.addModifier('m');
    }

    // Loops //

    /**
     * Repeat the previous item exactly n times or between n and m times
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
     */
    repeatPrevious(...quantity) {
        const isInteger = /\d+/;
        const values = quantity.filter((argument) => isInteger.test(argument));

        if (values.length === 0 || values.length > 2) {
            return this;
        }

        this.add(`{${values.join(',')}}`);

        return this;
    }

    /**
     * Repeat the previous at least once
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
     */
    oneOrMore() {
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
    multiple(value, lower, upper) {
        if (value !== undefined) {
            value = VerbalExpression.sanitize(value);
            this.add(`(?:${value})`);
        }

        if (lower === undefined && upper === undefined) {
            this.add('*'); // Any number of times
        } else if (lower !== undefined && upper === undefined) {
            this.add(`{${lower},}`);
        } else if (lower !== undefined && upper !== undefined) {
            this.add(`{${lower},${upper}}`);
        }

        return this;
    }

    // Capture groups //

    /**
     * Starts a capturing group
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
     */
    beginCapture() {
        // Add the end of the capture group to the suffixes temporarily so that compilation continues to work
        this._suffixes += ')';
        return this.add('(');
    }

    /**
     * Ends a capturing group
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
     */
    endCapture() {
        // Remove the last parenthesis from the _suffixes and add it to the regex
        this._suffixes = this._suffixes.slice(0, -1);
        return this.add(')');
    }

    // Miscellaneous //

    /**
     * Shorthand function for the string.replace function to allow for a more logical flow
     * @param {string} source string to search for
     * @param {string} value value to replace with
     * @returns {VerbalExpression} recompiled instance of VerbalExpression
     * @memberof VerbalExpression
     */
    replace(source, value) {
        source = source.toString();
        return source.replace(this, value);
    }

    /**
     * Convert to RegExp object
     * @returns {RegExp} equivalent RegExp instance
     * @memberof VerbalExpression
     */
    toRegExp() {
        const components = this.toString().match(/\/(.*)\/([gimuy]+)?/);
        const pattern = components[1];
        const flags = components[2];

        return new RegExp(pattern, flags);
    }
}

/**
 * Return a new instance of `VerbalExpression`
 * @export
 * @returns {VerbalExpression} new instance
 */
function VerEx() { // eslint-disable-line no-unused-vars
    const instance = new VerbalExpression();
    instance.sanitize = VerbalExpression.sanitize;
    return instance;
}
