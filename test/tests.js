/* eslint require-jsdoc: 0 */

import test from 'ava';
import VerEx from '../dist/verbalexpressions';

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test#Using_test()_on_a_regex_with_the_global_flag
function resetLastIndex(regex) {
    regex.lastIndex = 0;
}

test('constructor', (t) => {
    const testRegex = VerEx();

    t.true(testRegex instanceof RegExp, 'Extends RegExp');
    t.is(testRegex.toString(), '/(?:)/gm', 'Is empty regex with global, multiline matching');
});

// Utility //

test('add', (t) => {
    const testString = '$a^b\\c|d(e)f[g]h{i}j.k*l+m?n:o=p[q]';
    const testRegex = VerEx().startOfLine().then(testString).endOfLine();

    t.true(testRegex.test(testString), 'Special character sanitization');
});

// Rules //

test('startOfLine', (t) => {
    let testRegex = VerEx().startOfLine().then('a');
    let testString = 'a';

    t.true(testRegex.test(testString), 'Starts with an a');

    resetLastIndex(testRegex);
    testString = 'ba';
    t.false(testRegex.test(testString), 'Doesn\'t start with an a');

    testRegex = testRegex.startOfLine(false); // start of line is no longer necessary
    testString = 'ba';
    t.true(testRegex.test(testString), 'Has an a');
});

test('endOfLine', (t) => {
    let testRegex = VerEx().find('a').endOfLine();
    let testString = 'a';

    t.true(testRegex.test(testString), 'Ends with an a');

    resetLastIndex(testRegex);
    testString = 'ab';
    t.false(testRegex.test(testString), 'Doesn\'t end with an a');

    testRegex = testRegex.endOfLine(false); // end of line is no longer necessary
    testString = 'ab';
    t.true(testRegex.test(testString), 'Has an a');
});

function then(name, t) {
    let testRegex = VerEx()[name]('a');
    let testString = 'a';

    t.true(testRegex.test(testString), 'Is "a"');

    resetLastIndex(testRegex);
    testString = 'b';
    t.false(testRegex.test(testString), 'Is not "a"');

    resetLastIndex(testRegex);
    testString = '';
    t.false(testRegex.test(testString), 'Does not have "a"');

    testRegex = VerEx()[name]('a')[name]('b');
    testString = 'ab';
    t.true(testRegex.test(testString), 'Is "ab"');

    resetLastIndex(testRegex);
    testString = 'ac';
    t.false(testRegex.test(testString), 'Is not "ab"');
}

test('then', (t) => {
    then('then', t);
});

test('find', (t) => {
    then('find', t);
});

test('maybe', (t) => {
    const testRegex = VerEx().startOfLine().then('a').maybe('b');
    let testString = 'acb';

    t.true(testRegex.test(testString), 'Maybe has a b after an a');

    resetLastIndex(testRegex);
    testString = 'abc';
    t.true(testRegex.test(testString), 'Maybe has a b after an a');
});

test('or', (t) => {
    const testRegex = VerEx().startOfLine().then('abc').or('def');
    let testString = 'defzzz';

    t.true(testRegex.test(testString), 'Starts with an abc or a def');

    resetLastIndex(testRegex);
    testString = 'xyzabc';
    t.false(testRegex.test(testString), 'Doesn\'t start with an abc or a def');
});

test('anything', (t) => {
    const testRegex = VerEx().startOfLine().anything();
    const testString = 'what';

    t.true(testRegex.test(testString), 'Contains anything');
});

test('anythingBut', (t) => {
    const testRegex = VerEx().startOfLine().anythingBut('w');
    const testString = 'what';

    t.true(testRegex.test(testString), 'Starts with a w');
});

test('something', (t) => {
    const testRegex = VerEx().something();
    let testString = '';

    t.false(testRegex.test(testString), 'Empty string doesn\'t have something');

    resetLastIndex(testRegex);
    testString = 'a';
    t.true(testRegex.test(testString), 'a is something');
});

test('somethingBut', (t) => {
    const testRegex = VerEx().somethingBut('a');
    let testString = '';

    t.false(testRegex.test(testString), 'Empty string doesn\'t have something');

    resetLastIndex(testRegex);
    testString = 'b';
    t.true(testRegex.test(testString), 'Doesn\'t start with an a');

    resetLastIndex(testRegex);
    testString = 'a';
    t.false(testRegex.test(testString), 'Starts with an a');
});

function anyOf(name, t) {
    const testRegex = VerEx().startOfLine().then('a')[name]('xyz');
    let testString = 'ay';

    t.true(testRegex.test(testString), 'Has an x, y, or z after an a');

    resetLastIndex(testRegex);
    testString = 'abc';
    t.false(testRegex.test(testString), 'Doesn\'t have an x, y, or z after an a');
}

test('anyOf', (t) => {
    anyOf('anyOf', t);
});

test('any', (t) => {
    anyOf('any', t);
});

test('range', (t) => {
    const testRegex = VerEx().startOfLine().range('a', 'z', '0', '9').oneOrMore().endOfLine();
    let testString = 'foobarbaz123';

    t.true(testRegex.test(testString), 'Has all characters within defined range');

    resetLastIndex(testRegex);
    testString = 'fooBarBaz_123';
    t.false(testRegex.test(testString), 'Has some characters out of defined range');
});

// Special characters //

function lineBreak(name, t) {
    const testRegex = VerEx().startOfLine().then('abc')[name]().then('def');
    let testString = 'abc\r\ndef';

    t.true(testRegex.test(testString), 'abc,then a line break and then def');

    resetLastIndex(testRegex);
    testString = 'abc\ndef';
    t.true(testRegex.test(testString), 'abc, then a line break and then def');

    resetLastIndex(testRegex);
    testString = 'abc\r\n def';
    t.false(testRegex.test(testString), 'abc, then a line break, then a space and then def');
}

test('lineBreak', (t) => {
    lineBreak('lineBreak', t);
});

test('br', (t) => {
    lineBreak('br', t);
});

test('tab', (t) => {
    const testRegex = VerEx().startOfLine().tab().then('abc');
    let testString = '\tabc';

    t.true(testRegex.test(testString), 'tab then abc');

    resetLastIndex(testRegex);
    testString = 'abc';
    t.false(testRegex.test(testString), 'No tab then abc');
});

test('word', (t) => {
    const testRegex = VerEx().word().endOfLine();
    let testString = 'azertyuiopqsdfghjklmwxcvbn0123456789_';

    t.true(testRegex.test(testString), 'Should match word');

    testString = '. @[]|,&~-';
    for (const char of testString) {
        t.false(testRegex.test(char), `Should not match word (${char})`);
    }
});

test('digit', (t) => {
    const testRegex = VerEx().digit();
    let testString = '0123456789';

    t.true(testRegex.test(testString), 'Should match digit');

    testString = '-.azertyuiopqsdfghjklmwxcvbn @[]|,_&~';
    for (const char of testString) {
        t.false(testRegex.test(char), `Should not match digit (${char})`);
    }
});

test('whitespace', (t) => {
    const testRegex = VerEx().startOfLine().then('a').whitespace().then('z');
    let testString = 'a z';

    t.true(testRegex.test(testString), 'a, then a space and then z');

    resetLastIndex(testRegex);
    testString = 'a_z';
    t.false(testRegex.test(testString), 'a, then no whitespace and then z');
});

// Modifiers //

test('addModifier', (t) => {
    const testRegex = VerEx().addModifier('y');
    t.true(testRegex.flags.includes('y'));
});

test('removeModifier', (t) => {
    const testRegex = VerEx().removeModifier('g');
    t.false(testRegex.flags.includes('g'));
});

test('withAnyCase', (t) => {
    let testRegex = VerEx().startOfLine().then('a');
    let testString = 'A';

    t.false(testRegex.test(testString), 'Not case-insensitive');

    testRegex = VerEx().startOfLine().then('a').withAnyCase();
    testString = 'A';
    t.true(testRegex.test(testString), 'Case-insensitive');

    resetLastIndex(testRegex);
    testString = 'a';
    t.true(testRegex.test(testString), 'Case-insensitive');

    testRegex = VerEx().startOfLine().then('a').withAnyCase(false);
    testString = 'A';
    t.false(testRegex.test(testString), 'Not case-insensitive');
});

test('stopAtFirst', (t) => {
    let testRegex = VerEx().find('foo');
    const testString = 'foofoofoo';

    t.is(testString.match(testRegex).length, 3, 'Matches all "foo"s');

    testRegex = VerEx().find('foo').stopAtFirst();
    t.is(testString.match(testRegex).length, 1, 'Matches one "foo"');

    testRegex = VerEx().find('foo').stopAtFirst(false);
    t.is(testString.match(testRegex).length, 3, 'Matches all "foo"s');
});

test('searchOneLine', (t) => {
    let testRegex = VerEx().startOfLine().then('b').endOfLine();
    const testString = 'a\nb\nc';

    t.true(testRegex.test(testString), '"b" is at the end of it\'s own line');

    testRegex = VerEx().startOfLine().then('b').endOfLine().searchOneLine();
    t.false(testRegex.test(testString), '"c" is at the end of the string');

    testRegex = VerEx().startOfLine().then('b').endOfLine().searchOneLine(false);
    t.true(testRegex.test(testString), '"b" is at the end of it\'s own line');
});

// Loops //

test('repeatPrevious', (t) => {
    let testRegex = VerEx().startOfLine().find('foo').repeatPrevious(3).endOfLine();
    let testString = 'foofoofoo';

    t.true(testRegex.test(testString), 'Has exactly 3 "foo"s');

    resetLastIndex(testRegex);
    testString = 'foofoo';
    t.false(testRegex.test(testString), 'Does not have exactly 3 "foo"s');

    resetLastIndex(testRegex);
    testString = 'bar';
    t.false(testRegex.test(testString), 'Does not have exactly 3 "foo"s');

    testRegex = VerEx().startOfLine().find('foo').repeatPrevious(1, 3).endOfLine();
    testString = 'foo';
    t.true(testRegex.test(testString), 'Has between 1 and 3 (inclusive) "foo"s');

    resetLastIndex(testRegex);
    testString = 'foofoo';
    t.true(testRegex.test(testString), 'Has between 1 and 3 (inclusive) "foo"s');

    resetLastIndex(testRegex);
    testString = 'foofoofoo';
    t.true(testRegex.test(testString), 'Has between 1 and 3 (inclusive) "foo"s');

    resetLastIndex(testRegex);
    testString = 'foofoofoofoo';
    t.false(testRegex.test(testString), 'Does not have between 1 and 3 (inclusive) "foo"s');
});

test('oneOrMore', (t) => {
    const testRegex = VerEx().startOfLine().then('foo').oneOrMore().endOfLine();
    let testString = 'foo';

    t.true(testRegex.test(testString), 'Contains \'foo\' at least once ');

    resetLastIndex(testRegex);
    testString = 'foofoo';
    t.true(testRegex.test(testString), 'Contains \'foo\' at least once in \'foofoo\'');

    resetLastIndex(testRegex);
    testString = 'bar';
    t.false(testRegex.test(testString), 'Contains \'foo\' at least once');
});

test('multiple', (t) => {
    let testRegex = VerEx().startOfLine().multiple('foo').endOfLine();
    let testString = 'foo';

    t.true(testRegex.test(testString), 'Contains \'foo\' at least once');

    testRegex = VerEx().startOfLine().multiple('foo', 2).endOfLine();
    testString = 'foo';
    t.false(testRegex.test(testString), 'Should contain \'foo\' at least twice');

    testRegex = VerEx().startOfLine().multiple('foo', 2).endOfLine();
    testString = 'foofoo';
    t.true(testRegex.test(testString), 'Should contain \'foo\' at least twice');

    testRegex = VerEx().startOfLine().multiple('foo', 2, 5).endOfLine();
    testString = 'foofoofoofoo';
    t.true(testRegex.test(testString), 'Should be \'foo\' repeated two to five times');

    testRegex = VerEx().startOfLine().multiple('foo', 2, 5).endOfLine();
    testString = 'foo';
    t.false(testRegex.test(testString), 'Should be \'foo\' repeated two to five times');
});

// Capture groups //

test('capture groups', (t) => {
    let testRegex = VerEx().find('foo').beginCapture().then('bar');
    let testString = 'foobar';

    t.true(testRegex.test(testString), 'Expressions with incomplete capture groups work');

    testRegex = testRegex.endCapture().then('baz');
    testString = 'foobarbaz';
    t.true(testRegex.test(testString), 'Has "foobarbaz"');

    resetLastIndex(testRegex);
    const matches = testRegex.exec(testString);
    t.is(matches[1], 'bar', 'Captured string is "bar"');
});

// Miscellaneous //

test('replace', (t) => {
    const testRegex = VerEx().find(' ');
    const testString = 'foo bar baz';

    t.is(testRegex.replace(testString, '_'), 'foo_bar_baz', 'Spaces are replaced with underscores');
});

test('toRegExp', (t) => {
    const testRegex = VerEx().anything();
    const converted = testRegex.toRegExp();

    t.is(converted.toString(), testRegex.toString(), 'Converted regex has same behaviour');
});
