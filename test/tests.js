/* eslint-disable new-cap */

test('something', function somethingTest() {
    var testRegex = VerEx().something();
    var testString = '';

    ok(!testRegex.test(testString), 'Empty string doesn\'t have something');

    testRegex.lastIndex = 0;
    testString = 'a';
    ok(testRegex.test(testString), 'a is something');
});

test('anything', function anythingTest() {
    var testRegex = VerEx().startOfLine().anything();
    var testString = 'what';

    ok(testRegex.test(testString), 'Contains anything');
});

test('anythingBut', function anythingButTest() {
    var testRegex = VerEx().startOfLine().anythingBut('w');
    var testString = 'what';

    ok(testRegex.test(testString), 'Starts with a w');
});

test('somethingBut', function somethingButTest() {
    var testRegex = VerEx().somethingBut('a');
    var testString = '';

    ok(!testRegex.test(testString), 'Empty string doesn\'t have something');

    testRegex.lastIndex = 0;
    testString = 'b';
    ok(testRegex.test(testString), 'Doesn\'t start with an a');

    testRegex.lastIndex = 0;
    testString = 'a';
    ok(!testRegex.test(testString), 'Starts with an a');
});

test('startOfLine', function startOfLineTest() {
    var testRegex = VerEx().startOfLine().then('a');
    var testString = 'a';

    ok(testRegex.test(testString), 'Starts with an a');

    testRegex.lastIndex = 0;
    testString = 'ba';
    ok(!testRegex.test(testString), 'Doesn\'t start with an a');
});

test('endOfLine', function endOfLineTest() {
    var testRegex = VerEx().find('a').endOfLine();
    var testString = 'a';

    ok(testRegex.test(testString), 'Ends with an a');

    testRegex.lastIndex = 0;
    testString = 'ab';
    ok(!testRegex.test(testString), 'Doesn\'t end with an a');
});

test('maybe', function maybeTest() {
    var testRegex = VerEx().startOfLine().then('a').maybe('b');
    var testString = 'acb';

    ok(testRegex.test(testString), 'Maybe has a b after an a');

    testRegex.lastIndex = 0;
    testString = 'abc';
    ok(testRegex.test(testString), 'Maybe has a b after an a');
});

test('anyOf', function anyOfTest() {
    var testRegex = VerEx().startOfLine().then('a').anyOf('xyz');
    var testString = 'ay';

    ok(testRegex.test(testString), 'Has an x, y, or z after an a');

    testRegex.lastIndex = 0;
    testString = 'abc';
    ok(!testRegex.test(testString), 'Doesn\'t have an x, y, or z after an a');
});

test('or', function orTest() {
    var testRegex = VerEx().startOfLine().then('abc').or('def');
    var testString = 'defzzz';

    ok(testRegex.test(testString), 'Starts with an abc or a def');

    testRegex.lastIndex = 0;
    testString = 'xyzabc';
    ok(!testRegex.test(testString), 'Doesn\'t start with an abc or a def');
});

test('lineBreak', function lineBreakTest() {
    var testRegex = VerEx().startOfLine().then('abc').lineBreak().then('def');
    var testString = 'abc\r\ndef';

    ok(testRegex.test(testString), 'abc,then a line break and then def');

    testRegex.lastIndex = 0;
    testString = 'abc\ndef';
    ok(testRegex.test(testString), 'abc, then a line break and then def');

    testRegex.lastIndex = 0;
    testString = 'abc\r\n def';
    ok(!testRegex.test(testString), 'abc, then a line break, then a space and then def');
});

test('br', function brTest() {
    var testRegex = VerEx().startOfLine().then('abc').lineBreak().then('def');
    var testString = 'abc\r\ndef';

    ok(testRegex.test(testString), 'abc, then a line break and then def');

    testRegex.lastIndex = 0;
    testString = 'abc\ndef';
    ok(testRegex.test(testString), 'abc, then a line break and then def');

    testRegex.lastIndex = 0;
    testString = 'abc\r\n def';
    ok(!testRegex.test(testString), 'abc, then a line break, then a space and then def');
});

test('tab', function tabTest() {
    var testRegex = VerEx().startOfLine().tab().then('abc');
    var testString = '\tabc';

    ok(testRegex.test(testString), 'tab then abc');

    testRegex.lastIndex = 0;
    testString = 'abc';
    ok(!testRegex.test(testString), 'No tab then abc');
});

test('withAnyCase', function withAnyCaseTest() {
    var testRegex = VerEx().startOfLine().then('a');
    var testString = 'A';

    ok(!testRegex.test(testString), 'Not case-insensitive');

    testRegex = VerEx().startOfLine().then('a').withAnyCase();
    testString = 'A';
    ok(testRegex.test(testString), 'Case-insensitive');

    testRegex.lastIndex = 0;
    testString = 'a';
    ok(testRegex.test(testString), 'Case-insensitive');
});

test('whitespace', function whitespaceTest() {
    var testRegex = VerEx().startOfLine().then('a').whitespace().then('z');
    var testString = 'a z';

    ok(testRegex.test(testString), 'a, then a space and then z');

    testRegex.lastIndex = 0;
    testString = 'a_z';
    ok(!testRegex.test(testString), 'a, then no whitespace and then z');
});

test('searchOneLine', function searchOneLineTest() {
    var testRegex = VerEx().startOfLine().then('a').br().then('b').endOfLine();
    var testString = 'a\nb';

    ok(testRegex.test(testString), 'b is on the second line');

    testRegex = VerEx().startOfLine().then('a').br().then('b').endOfLine().searchOneLine();
    testString = 'a\nb';
    ok(testRegex.test(testString), 'b is on the second line, but we are only searching the first');
});

test('sanitize', function sanitizeTest() {
    var testRegex = VerEx().startOfLine().then('$a^b\\c|d(e)f[g]h{i}j.k*l+m?').endOfLine();
    var testString = '$a^b\\c|d(e)f[g]h{i}j.k*l+m?';

    ok(testRegex.test(testString), 'Special character sanitization');
});

test('oneOrMore', function oneOrMoreTest() {
    var testRegex = VerEx().startOfLine().then('foo').oneOrMore();
    var testString = 'foo';

    ok(testRegex.test(testString), 'Contains \'foo\' at least once ');

    testRegex.lastIndex = 0;
    testString = 'foofoo';
    ok(testRegex.test(testString), 'Contains \'foo\' at least once in \'foofoo\'');

    testRegex.lastIndex = 0;
    testString = 'bar';
    ok(!testRegex.test(testString), 'Contains \'foo\' at least once');
});

test('multiple', function multipleTest() {
    var testRegex = VerEx().startOfLine().multiple('foo');
    var testString = 'foo';

    ok(testRegex.test(testString), 'Contains \'foo\' at least once');

    testRegex = VerEx().startOfLine().multiple('foo', 2);
    testString = 'foo';
    ok(!testRegex.test(testString), 'Should contain \'foo\' at least twice');

    testRegex = VerEx().startOfLine().multiple('foo', 2);
    testString = 'foofoo';
    ok(testRegex.test(testString), 'Should contain \'foo\' at least twice');

    testRegex = VerEx().startOfLine().multiple('foo', 2, 5);
    testString = 'foofoofoofoo';
    ok(testRegex.test(testString), 'Should be \'foo\' repeated two to five times');

    testRegex = VerEx().startOfLine().multiple('foo', 2, 5);
    testString = 'foo';
    ok(!testRegex.test(testString), 'Should be \'foo\' repeated two to five times');
});


test('word', function multipleTest() {
    var testRegex = VerEx().word();
    var testString = 'azertyuiopqsdfghjklmwxcvbn0123456789_';
    var i;
    var len;

    ok(testRegex.test(testString), 'Should match word');

    testString = '. @[]|,&~-';
    for (i = 0, len = testString.length; i < len; i++) {
        ok(!testRegex.test(testString[i]), 'Should not match word (' + testString[i] + ')');
    }
});

test('digit', function multipleTest() {
    var testRegex = VerEx().digit();
    var testString = '0123456789';
    var i;
    var len;

    ok(testRegex.test(testString), 'Should match digit');

    testString = '-.azertyuiopqsdfghjklmwxcvbn @[]|,_&~';
    for (i = 0, len = testString.length; i < len; i++) {
        ok(!testRegex.test(testString[i]), 'Should not match digit (' + testString[i] + ')');
    }
});
