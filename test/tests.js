/* eslint require-jsdoc: 0 */

import test from 'ava';
import VerEx from '../dist/verbalexpressions';

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test#Using_test()_on_a_regex_with_the_global_flag
function resetLastIndex(regex) {
    regex.lastIndex = 0;
}

test('constructor', (t) => {
    const testRegex = VerEx();

    t.true(testRegex instanceof RegExp, 'Should extend RegExp');
    t.is(testRegex.toString(), '/(?:)/gm', 'Should be empty regex with global, multiline matching');
});

// Utility //

test('add', (t) => {
    const testString = '$a^b\\c|d(e)f[g]h{i}j.k*l+m?n:o=p[q]';
    const testRegex = VerEx().startOfLine().then(testString).endOfLine();

    t.true(testRegex.test(testString), 'Special characters should be sanitized');
});

// Rules //

test('startOfLine', (t) => {
    let testRegex = VerEx().startOfLine().then('a');
    let testString = 'a';

    t.true(testRegex.test(testString));

    resetLastIndex(testRegex);
    testString = 'ba';
    t.false(testRegex.test(testString));

    testRegex = testRegex.startOfLine(false); // start of line is no longer necessary
    testString = 'ba';
    t.true(testRegex.test(testString));
});

test('endOfLine', (t) => {
    let testRegex = VerEx().find('a').endOfLine();
    let testString = 'a';

    t.true(testRegex.test(testString));

    resetLastIndex(testRegex);
    testString = 'ab';
    t.false(testRegex.test(testString));

    testRegex = testRegex.endOfLine(false); // end of line is no longer necessary
    testString = 'ab';
    t.true(testRegex.test(testString));
});

function then(name, t) {
    let testRegex = VerEx()[name]('a');
    let testString = 'a';

    t.true(testRegex.test(testString));

    resetLastIndex(testRegex);
    testString = 'b';
    t.false(testRegex.test(testString));

    resetLastIndex(testRegex);
    testString = '';
    t.false(testRegex.test(testString));

    testRegex = VerEx()[name]('a')[name]('b');
    testString = 'ab';
    t.true(testRegex.test(testString));

    resetLastIndex(testRegex);
    testString = 'ac';
    t.false(testRegex.test(testString));
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

    t.true(testRegex.test(testString));

    resetLastIndex(testRegex);
    testString = 'abc';
    t.true(testRegex.test(testString));
});

test('or', (t) => {
    const testRegex = VerEx().startOfLine().then('abc').or('def');
    let testString = 'defzzz';

    t.true(testRegex.test(testString));

    resetLastIndex(testRegex);
    testString = 'xyzabc';
    t.false(testRegex.test(testString));
});

test('anything', (t) => {
    const testRegex = VerEx().startOfLine().anything();
    let testString = 'foo';

    t.true(testRegex.test(testString));

    resetLastIndex(testRegex);
    testString = '';
    t.true(testRegex.test(testString), 'Should be able to match zero characters');
});

test('anythingBut', (t) => {
    let testRegex = VerEx().startOfLine().anythingBut('br').endOfLine();
    let testString = 'foobar';

    t.false(testRegex.test(testString));

    resetLastIndex(testRegex);
    testString = 'foo_a_';
    t.true(testRegex.test(testString));

    testRegex = VerEx().startOfLine().anythingBut('br');
    testString = 'bar';
    t.true(testRegex.test(testString), 'Should be able to match zero characters');
});

test('something', (t) => {
    const testRegex = VerEx().something();
    let testString = '';

    t.false(testRegex.test(testString));

    resetLastIndex(testRegex);
    testString = 'a';
    t.true(testRegex.test(testString));
});

test('somethingBut', (t) => {
    const testRegex = VerEx().somethingBut('a');
    let testString = '';

    t.false(testRegex.test(testString));

    resetLastIndex(testRegex);
    testString = 'b';
    t.true(testRegex.test(testString));

    resetLastIndex(testRegex);
    testString = 'a';
    t.false(testRegex.test(testString));
});

function anyOf(name, t) {
    const testRegex = VerEx().startOfLine().then('a')[name]('xyz');
    let testString = 'ay';

    t.true(testRegex.test(testString));

    resetLastIndex(testRegex);
    testString = 'abc';
    t.false(testRegex.test(testString));
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

    t.true(testRegex.test(testString));

    resetLastIndex(testRegex);
    testString = 'fooBarBaz_123';
    t.false(testRegex.test(testString));
});

// Special characters //

function lineBreak(name, t) {
    const testRegex = VerEx().startOfLine().then('abc')[name]().then('def');
    let testString = 'abc\r\ndef';

    t.true(testRegex.test(testString));

    resetLastIndex(testRegex);
    testString = 'abc\ndef';
    t.true(testRegex.test(testString));

    resetLastIndex(testRegex);
    testString = 'abc\r\n def';
    t.false(testRegex.test(testString));
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

    t.true(testRegex.test(testString));

    resetLastIndex(testRegex);
    testString = 'abc';
    t.false(testRegex.test(testString));
});

test('word', (t) => {
    const testRegex = VerEx().word().endOfLine();
    let testString = 'azertyuiopqsdfghjklmwxcvbn0123456789_';

    t.true(testRegex.test(testString));

    testString = '. @[]|,&~-';
    for (const char of testString) {
        t.false(testRegex.test(char));
    }
});

test('digit', (t) => {
    const testRegex = VerEx().digit();
    let testString = '0123456789';

    t.true(testRegex.test(testString));

    testString = '-.azertyuiopqsdfghjklmwxcvbn @[]|,_&~';
    for (const char of testString) {
        t.false(testRegex.test(char));
    }
});

test('whitespace', (t) => {
    const testRegex = VerEx().startOfLine().then('a').whitespace().then('z');
    let testString = 'a z';

    t.true(testRegex.test(testString));

    resetLastIndex(testRegex);
    testString = 'a_z';
    t.false(testRegex.test(testString));
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

    t.false(testRegex.test(testString));

    testRegex = VerEx().startOfLine().then('a').withAnyCase();
    testString = 'A';
    t.true(testRegex.test(testString));

    resetLastIndex(testRegex);
    testString = 'a';
    t.true(testRegex.test(testString));

    testRegex = VerEx().startOfLine().then('a').withAnyCase(false);
    testString = 'A';
    t.false(testRegex.test(testString));
});

test('stopAtFirst', (t) => {
    let testRegex = VerEx().find('foo');
    const testString = 'foofoofoo';

    t.is(testString.match(testRegex).length, 3, 'Should match all "foo"s');

    testRegex = VerEx().find('foo').stopAtFirst();
    t.is(testString.match(testRegex).length, 1, 'Should match one "foo"');

    testRegex = VerEx().find('foo').stopAtFirst(false);
    t.is(testString.match(testRegex).length, 3, 'Should match all "foo"s');
});

test('searchOneLine', (t) => {
    let testRegex = VerEx().startOfLine().then('b').endOfLine();
    const testString = 'a\nb\nc';

    t.true(testRegex.test(testString), 'Should match "b"');

    testRegex = VerEx().startOfLine().then('b').endOfLine().searchOneLine();
    t.false(testRegex.test(testString), 'Should not match "b"');

    testRegex = VerEx().startOfLine().then('b').endOfLine().searchOneLine(false);
    t.true(testRegex.test(testString), 'Should match "b"');
});

// Loops //

test('repeatPrevious', (t) => {
    let testRegex = VerEx().startOfLine().find('foo').repeatPrevious(3).endOfLine();
    let testString = 'foofoofoo';

    t.true(testRegex.test(testString));

    resetLastIndex(testRegex);
    testString = 'foofoo';
    t.false(testRegex.test(testString));

    resetLastIndex(testRegex);
    testString = 'bar';
    t.false(testRegex.test(testString));

    testRegex = VerEx().startOfLine().find('foo').repeatPrevious(1, 3).endOfLine();
    testString = 'foo';
    t.true(testRegex.test(testString));

    resetLastIndex(testRegex);
    testString = 'foofoo';
    t.true(testRegex.test(testString));

    resetLastIndex(testRegex);
    testString = 'foofoofoo';
    t.true(testRegex.test(testString));

    resetLastIndex(testRegex);
    testString = 'foofoofoofoo';
    t.false(testRegex.test(testString));
});

test('oneOrMore', (t) => {
    const testRegex = VerEx().startOfLine().then('foo').oneOrMore().endOfLine();
    let testString = 'foo';

    t.true(testRegex.test(testString));

    resetLastIndex(testRegex);
    testString = 'foofoo';
    t.true(testRegex.test(testString));

    resetLastIndex(testRegex);
    testString = 'bar';
    t.false(testRegex.test(testString));
});

test('multiple', (t) => {
    let testRegex = VerEx().startOfLine().multiple('foo').endOfLine();
    let testString = 'foo';

    t.true(testRegex.test(testString));

    testRegex = VerEx().startOfLine().multiple('foo', 2).endOfLine();
    testString = 'foo';
    t.false(testRegex.test(testString));

    resetLastIndex(testRegex);
    testString = 'foofoo';
    t.true(testRegex.test(testString));

    resetLastIndex(testRegex);
    testString = 'foofoofoo';
    t.false(testRegex.test(testString));

    testRegex = VerEx().startOfLine().multiple('foo', 2, 5).endOfLine();
    testString = 'foo';
    t.false(testRegex.test(testString));

    resetLastIndex(testRegex);
    testString = 'foofoo';
    t.true(testRegex.test(testString));

    resetLastIndex(testRegex);
    testString = 'foofoofoo';
    t.true(testRegex.test(testString));

    resetLastIndex(testRegex);
    testString = 'foofoofoofoo';
    t.true(testRegex.test(testString));

    resetLastIndex(testRegex);
    testString = 'foofoofoofoofoo';
    t.true(testRegex.test(testString));

    resetLastIndex(testRegex);
    testString = 'foofoofoofoofoofoo';
    t.false(testRegex.test(testString));
});

// Capture groups //

test('capture groups', (t) => {
    let testRegex = VerEx().find('foo').beginCapture().then('bar');
    let testString = 'foobar';

    t.true(testRegex.test(testString), 'Expressions with incomplete capture groups should work');

    testRegex = testRegex.endCapture().then('baz');
    testString = 'foobarbaz';
    t.true(testRegex.test(testString));

    resetLastIndex(testRegex);
    const matches = testRegex.exec(testString);
    t.is(matches[1], 'bar');
});

// Miscellaneous //

test('replace', (t) => {
    const testRegex = VerEx().find(' ');
    const testString = 'foo bar baz';

    t.is(testRegex.replace(testString, '_'), 'foo_bar_baz');
});

test('toRegExp', (t) => {
    const testRegex = VerEx().anything();
    const converted = testRegex.toRegExp();

    t.is(converted.toString(), testRegex.toString(), 'Converted regex should have same behaviour');
});
