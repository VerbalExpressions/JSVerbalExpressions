import test from 'ava';
import VerEx from '../dist/verbalexpressions';

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test#Using_test()_on_a_regex_with_the_global_flag
function resetLastIndex(regex) {
    regex.lastIndex = 0;
}

test('constructor', (t) => {
    const regex = VerEx();

    t.true(regex instanceof RegExp, 'Should extend RegExp');
    t.is(regex.toString(), '/(?:)/gm', 'Should be empty regex with global, multiline matching');
});

// Utility //

test('sanitize', (t) => {
    // VerEx().then() sanitizes the parameter and calls `add`
    // Hence, using `then()` is a fair proxy for testing sanitize

    let string = '$a^b\\c|d(e)f[g]h{i}j.k*l+m?n:o=p[q]';
    let regex = VerEx().startOfLine().then(string).endOfLine();

    t.true(regex.test(string), 'Special characters should be sanitized');

    regex = VerEx().startOfLine().then(42).endOfLine();
    string = '42';
    t.true(regex.test(string), 'Numbers are handled');

    regex = VerEx().startOfLine().then(/foo/).endOfLine();
    string = 'foo';
    t.true(regex.test(string), 'Regular expressions are handled');
});

test('add', (t) => {
    let regex = VerEx().startOfLine().withAnyCase().endOfLine();
    regex = regex.add('(?:foo)?');

    t.true(regex.source.startsWith('^'), 'Should retain old prefixes');
    t.true(regex.source.endsWith('$'), 'Should retain old suffixes');

    t.true(regex.test('foo'), 'Should add new rules');
    resetLastIndex(regex);
    t.true(regex.test(''), 'Should add new rules');

    t.true(regex.flags.includes('i'), 'Should retain old modifiers');
});

// Rules //

test('startOfLine', (t) => {
    let regex = VerEx().startOfLine().then('a');
    let string = 'a';

    t.true(regex.test(string));

    resetLastIndex(regex);
    string = 'ba';
    t.false(regex.test(string));

    regex = regex.startOfLine(false); // start of line is no longer necessary
    string = 'ba';
    t.true(regex.test(string));
});

test('endOfLine', (t) => {
    let regex = VerEx().find('a').endOfLine();
    let string = 'a';

    t.true(regex.test(string));

    resetLastIndex(regex);
    string = 'ab';
    t.false(regex.test(string));

    regex = regex.endOfLine(false); // end of line is no longer necessary
    string = 'ab';
    t.true(regex.test(string));
});

function then(name, t) {
    let regex = VerEx()[name]('a');
    let string = 'a';

    t.true(regex.test(string));

    resetLastIndex(regex);
    string = 'b';
    t.false(regex.test(string));

    resetLastIndex(regex);
    string = '';
    t.false(regex.test(string));

    regex = VerEx()[name]('a')[name]('b');
    string = 'ab';
    t.true(regex.test(string));

    resetLastIndex(regex);
    string = 'ac';
    t.false(regex.test(string));
}

test('then', (t) => {
    then('then', t);
});

test('find', (t) => {
    then('find', t);
});

test('maybe', (t) => {
    const regex = VerEx().startOfLine().then('a').maybe('b');
    let string = 'acb';

    t.true(regex.test(string));

    resetLastIndex(regex);
    string = 'abc';
    t.true(regex.test(string));
});

test('or', (t) => {
    let regex = VerEx().startOfLine().then('abc').or('def');
    let string = 'defzzz';

    t.true(regex.test(string));

    resetLastIndex(regex);
    string = 'abczzz';
    t.true(regex.test(string));

    resetLastIndex(regex);
    string = 'xyzabc';
    t.false(regex.test(string));

    regex = VerEx().startOfLine().then('abc').or().then('def');
    string = 'defzzz';
    t.true(regex.test(string));

    resetLastIndex(regex);
    string = 'abczzz';
    t.true(regex.test(string));

    resetLastIndex(regex);
    string = 'xyzabc';
    t.false(regex.test(string));
});

test('anything', (t) => {
    const regex = VerEx().startOfLine().anything();
    let string = 'foo';

    t.true(regex.test(string));

    resetLastIndex(regex);
    string = '';
    t.true(regex.test(string), 'Should be able to match zero characters');
});

test('anythingBut', (t) => {
    let regex = VerEx().startOfLine().anythingBut('br').endOfLine();
    let string = 'foobar';

    t.false(regex.test(string));

    resetLastIndex(regex);
    string = 'foo_a_';
    t.true(regex.test(string));

    regex = VerEx().startOfLine().anythingBut('br');
    string = 'bar';
    t.true(regex.test(string), 'Should be able to match zero characters');

    regex = VerEx().startOfLine().anythingBut(['b', 'r']).endOfLine();
    string = 'foobar';
    t.false(regex.test(string));

    resetLastIndex(regex);
    string = 'foo_a_';
    t.true(regex.test(string));

    regex = VerEx().startOfLine().anythingBut(['b', 'r']);
    string = 'bar';
    t.true(regex.test(string), 'Should be able to match zero characters');
});

test('something', (t) => {
    const regex = VerEx().something();
    let string = '';

    t.false(regex.test(string));

    resetLastIndex(regex);
    string = 'a';
    t.true(regex.test(string));
});

test('somethingBut', (t) => {
    let regex = VerEx().startOfLine().somethingBut('abc').endOfLine();
    let string = '';
    t.false(regex.test(string));

    resetLastIndex(regex);
    string = 'foo';
    t.true(regex.test(string));

    resetLastIndex(regex);
    string = 'fab';
    t.false(regex.test(string));

    regex = VerEx().startOfLine().somethingBut(['a', 'b', 'c']).endOfLine();
    string = '';
    t.false(regex.test(string));

    resetLastIndex(regex);
    string = 'foo';
    t.true(regex.test(string));

    resetLastIndex(regex);
    string = 'fab';
    t.false(regex.test(string));
});

function anyOf(name, t) {
    let regex = VerEx().startOfLine().then('a')[name]('xyz');
    let string = 'ay';

    t.true(regex.test(string));

    resetLastIndex(regex);
    string = 'ab';
    t.false(regex.test(string));

    resetLastIndex(regex);
    string = 'a';
    t.false(regex.test(string));

    regex = VerEx().startOfLine().then('a')[name](['x', 'y', 'z']);
    string = 'ay';

    t.true(regex.test(string));

    resetLastIndex(regex);
    string = 'ab';
    t.false(regex.test(string));

    resetLastIndex(regex);
    string = 'a';
    t.false(regex.test(string));
}

test('anyOf', (t) => {
    anyOf('anyOf', t);
});

test('any', (t) => {
    anyOf('any', t);
});

test('not', (t) => {
    const regex = VerEx().startOfLine().not('foo').anything().endOfLine();
    let string = 'foobar';

    t.false(regex.test(string));

    resetLastIndex(regex);
    string = 'bar';
    t.true(regex.test(string));
});

test('range', (t) => {
    let regex = VerEx().startOfLine().range('a', 'z', '0', '9').oneOrMore().endOfLine();
    let string = 'foobarbaz123';

    t.true(regex.test(string));

    resetLastIndex(regex);
    string = 'fooBarBaz_123';
    t.false(regex.test(string));

    regex = VerEx().startOfLine().range('a', 'z', '0').oneOrMore().endOfLine();
    string = 'foobarbaz';
    t.true(regex.test(string));

    resetLastIndex(regex);
    string = 'foobarbaz123';
    t.false(regex.test(string), 'Should ignore extra parameters');
});

// Special characters //

function lineBreak(name, t) {
    const regex = VerEx().startOfLine().then('abc')[name]().then('def');
    let string = 'abc\r\ndef';

    t.true(regex.test(string));

    resetLastIndex(regex);
    string = 'abc\ndef';
    t.true(regex.test(string));

    resetLastIndex(regex);
    string = 'abc\rdef';
    t.true(regex.test(string));

    resetLastIndex(regex);
    string = 'abc\r\n\ndef';
    t.false(regex.test(string));
}

test('lineBreak', (t) => {
    lineBreak('lineBreak', t);
});

test('br', (t) => {
    lineBreak('br', t);
});

test('tab', (t) => {
    const regex = VerEx().startOfLine().tab().then('abc');
    let string = '\tabc';

    t.true(regex.test(string));

    resetLastIndex(regex);
    string = 'abc';
    t.false(regex.test(string));
});

test('word', (t) => {
    let regex = VerEx().startOfLine().word().endOfLine();
    let string = 'azertyuiopqsdfghjklmwxcvbn0123456789_';

    t.true(regex.test(string));

    regex = VerEx().word();
    string = '. @[]|,&~-';
    t.false(regex.test(string));
});

test('digit', (t) => {
    let regex = VerEx().startOfLine().digit().oneOrMore().endOfLine();
    let string = '0123456789';

    t.true(regex.test(string));

    regex = VerEx().digit();
    string = '-.azertyuiopqsdfghjklmwxcvbn @[]|,_&~';
    t.false(regex.test(string));
});

test('whitespace', (t) => {
    const regex = VerEx().startOfLine().whitespace().oneOrMore().searchOneLine().endOfLine();
    let string = ' \t\r\n\v\f';

    t.true(regex.test(string));

    resetLastIndex(regex);
    string = 'a z';
    t.false(regex.test(string));
});

// Modifiers //

test('addModifier', (t) => {
    let regex = VerEx().addModifier('y');
    t.true(regex.flags.includes('y'));

    t.notThrows(() => {
        regex = VerEx().addModifier('g');
    }, 'Should not add extra modifier if it already exists');
});

test('removeModifier', (t) => {
    const regex = VerEx().removeModifier('g');
    t.false(regex.flags.includes('g'));
});

test('withAnyCase', (t) => {
    let regex = VerEx().startOfLine().then('a');
    let string = 'A';

    t.false(regex.test(string));

    regex = VerEx().startOfLine().then('a').withAnyCase();
    string = 'A';
    t.true(regex.test(string));

    resetLastIndex(regex);
    string = 'a';
    t.true(regex.test(string));

    regex = VerEx().startOfLine().then('a').withAnyCase(false);
    string = 'A';
    t.false(regex.test(string));
});

test('stopAtFirst', (t) => {
    let regex = VerEx().find('foo');
    const string = 'foofoofoo';

    t.is(string.match(regex).length, 3, 'Should match all "foo"s');

    regex = VerEx().find('foo').stopAtFirst();
    t.is(string.match(regex).length, 1, 'Should match one "foo"');

    regex = VerEx().find('foo').stopAtFirst(false);
    t.is(string.match(regex).length, 3, 'Should match all "foo"s');
});

test('searchOneLine', (t) => {
    let regex = VerEx().startOfLine().then('b').endOfLine();
    const string = 'a\nb\nc';

    t.true(regex.test(string));

    regex = VerEx().startOfLine().then('b').endOfLine().searchOneLine();
    t.false(regex.test(string));

    regex = VerEx().startOfLine().then('b').endOfLine().searchOneLine(false);
    t.true(regex.test(string));
});

// Loops //

test('repeatPrevious', (t) => {
    let regex = VerEx().startOfLine().find('foo').repeatPrevious(3).endOfLine();
    let string = 'foofoofoo';

    t.true(regex.test(string));

    resetLastIndex(regex);
    string = 'foofoo';
    t.false(regex.test(string));

    resetLastIndex(regex);
    string = 'foofoofoofoo';
    t.false(regex.test(string));

    resetLastIndex(regex);
    string = 'bar';
    t.false(regex.test(string));

    regex = VerEx().startOfLine().find('foo').repeatPrevious(1, 3).endOfLine();

    for (let i = 0; i <= 4; i++) {
        resetLastIndex(regex);
        string = 'foo'.repeat(i);

        if (i < 1 || i > 3) {
            t.false(regex.test(string));
        } else {
            t.true(regex.test(string));
        }
    }

    regex = VerEx().startOfLine().find('foo').repeatPrevious().endOfLine();
    string = 'foofoo';
    t.false(regex.test(string), 'Should silently fail on edge cases');

    regex = VerEx().startOfLine().find('foo').repeatPrevious(1, 2, 3).endOfLine();
    string = 'foofoo';
    t.false(regex.test(string), 'Should silently fail on edge cases');
});

test('oneOrMore', (t) => {
    const regex = VerEx().startOfLine().then('foo').oneOrMore().endOfLine();
    let string = 'foo';

    t.true(regex.test(string));

    resetLastIndex(regex);
    string = 'foofoo';
    t.true(regex.test(string));

    resetLastIndex(regex);
    string = 'bar';
    t.false(regex.test(string));
});

test('multiple', (t) => {
    let regex = VerEx().startOfLine().find(' ').multiple().endOfLine();
    let string = '   ';
    t.true(regex.test(string));

    resetLastIndex(regex);
    string = ' a ';
    t.false(regex.test(string));

    regex = VerEx().startOfLine().multiple('foo').endOfLine();
    string = 'foo';

    t.true(regex.test(string));

    resetLastIndex(regex);
    string = 'foofoofoo';
    t.true(regex.test(string));

    resetLastIndex(regex);
    string = '';
    t.true(regex.test(string));

    regex = VerEx().startOfLine().multiple('foo', 2).endOfLine();
    string = 'foo';
    t.false(regex.test(string));

    resetLastIndex(regex);
    string = 'foofoo';
    t.true(regex.test(string));

    resetLastIndex(regex);
    string = 'foofoofoo';
    t.true(regex.test(string));

    regex = VerEx().startOfLine().multiple('foo', 2, 5).endOfLine();

    for (let i = 0; i <= 6; i++) {
        resetLastIndex(regex);
        string = 'foo'.repeat(i);

        if (i < 2 || i > 5) {
            t.false(regex.test(string));
        } else {
            t.true(regex.test(string));
        }
    }
});

// Capture groups //

test('capture groups', (t) => {
    let regex = VerEx().find('foo').beginCapture().then('bar');
    let string = 'foobar';

    t.true(regex.test(string), 'Expressions with incomplete capture groups should work');

    regex = regex.endCapture().then('baz');
    string = 'foobarbaz';
    t.true(regex.test(string));

    resetLastIndex(regex);
    const matches = regex.exec(string);
    t.is(matches[1], 'bar');
});

// Miscellaneous //

test('replace', (t) => {
    const regex = VerEx().find(' ');
    const string = 'foo bar baz';

    t.is(regex.replace(string, '_'), 'foo_bar_baz');
});

test('toRegExp', (t) => {
    const regex = VerEx().anything();
    const converted = regex.toRegExp();

    t.is(converted.toString(), regex.toString(), 'Converted regex should have same behaviour');
});
