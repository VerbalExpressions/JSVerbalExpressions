/*!
 * VerbalExpressions JavaScript Library
 * https://github.com/VerbalExpressions/JSVerbalExpressions
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 */

class VerbalExpression extends RegExp {
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

    add(value = '') {
        this._source += value;
        const pattern = this._prefixes + this._source + this._suffixes;

        this.compile(pattern, this._modifiers);

        return this;
    }

    // Rules //

    startOfLine(enable = true) {
        this._prefixes = enable ? '^' : '';
        return this.add();
    }

    endOfLine(enable = true) {
        this._suffixes = enable ? '$' : '';
        return this.add();
    }

    then(value) {
        value = VerbalExpression.sanitize(value);
        return this.add(`(?:${value})`);
    }

    find(value) {
        return this.then(value);
    }

    maybe(value) {
        value = VerbalExpression.sanitize(value);
        return this.add(`(?:${value})?`);
    }

    or(value) {
        this._prefixes += '(?:';
        this._suffixes = `)${this._suffixes}`;

        this.add(')|(?:');

        if (value) {
            this.then(value);
        }

        return this;
    }

    anything() {
        return this.add('(?:.*)');
    }

    anythingBut(value) {
        value = VerbalExpression.sanitize(value);
        return this.add(`(?:[^${value}]*)`);
    }

    something() {
        return this.add('(?:.+)');
    }

    somethingBut(value) {
        value = VerbalExpression.sanitize(value);
        return this.add(`(?:[^${value}]+)`);
    }

    anyOf(value) {
        value = VerbalExpression.sanitize(value);
        return this.add(`[${value}]`);
    }

    any(value) {
        return this.anyOf(value);
    }

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

    lineBreak() {
        return this.add('(?:\\r\\n|\\r|\\n)'); // Unix(LF) + Windows(CRLF)
    }

    br() {
        return this.lineBreak();
    }

    tab() {
        return this.add('\\t');
    }

    word() {
        return this.add('\\w+');
    }

    digit() {
        return this.add('\\d');
    }

    whitespace() {
        return this.add('\\s');
    }

    // Modifiers //

    addModifier(modifier) {
        if (!this._modifiers.includes(modifier)) {
            this._modifiers += modifier;
        }

        return this.add();
    }

    removeModifier(modifier) {
        this._modifiers = this._modifiers.replace(modifier, '');
        return this.add();
    }

    withAnyCase(enable = true) {
        return enable ? this.addModifier('i') : this.removeModifier('i');
    }

    stopAtFirst(enable = true) {
        return enable ? this.removeModifier('g') : this.addModifier('g');
    }

    searchOneLine(enable = true) {
        return enable ? this.removeModifier('m') : this.addModifier('m');
    }

    repeatPrevious(...quantity) {
        const isInteger = /\d+/;
        const values = quantity.filter(argument => isInteger.test(argument));

        if (values.length > 0) {
            this.add(`{${values.join()}}`);
        }

        return this;
    }

    // Loops //

    oneOrMore() {
        return this.add('+');
    }

    multiple(value, count) {
        // Use expression or string
        value = value.source || VerbalExpression.sanitize(value);

        this.add(`(?:${value})`);

        if (count === undefined) {
            this.add('*'); // Any number of times
        } else {
            this.add(`{${count}}`);
        }

        return this;
    }

    // Capture groups //

    beginCapture() {
        // Add the end of the capture group to the suffixes temporarily so that compilation continues to work
        this._suffixes += ')';
        return this.add('(');
    }

    endCapture() {
        // Remove the last parenthesis from the _suffixes and add it to the regex
        this._suffixes = this._suffixes.slice(0, -1);
        return this.add(')');
    }

    // Miscellaneous //

    replace(source, value) {
        source = source.toString();
        return source.replace(this, value);
    }

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
