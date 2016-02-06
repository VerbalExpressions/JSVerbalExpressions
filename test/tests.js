/* eslint-disable new-cap */

/**
* @return {Array} an array of valid URLs
*/
function validUrls() {
    return [
        'http://github.com',
        'http://www.github.com',
        'https://github.com',
        'https://www.github.com',
        'https://github.com/blog',
        'https://foobar.github.com',
    ];
}

/**
* @return {Array} an array of invalid URLs
*/
function invalidUrls() {
    return [
          [' http://github.com'],
          ['foo'],
          ['htps://github.com'],
          ['http:/github.com'],
          ['https://github.com /blog'],
    ];
}

/**
* @return {VerbalExpressions} Get a pre-built pattern for matching valid URLs
*/
function buildUrlPattern() {
    return VerEx().startOfLine().then('http').maybe('s').then(':\/\/').maybe('www.').anythingBut(' ').endOfLine();
}

test('shouldPassWhenValidUrlGiven', function shouldPassWhenValidUrlGivenTest() {
    validUrls().forEach(function loop(validUrl) {
        var
            testRegex = buildUrlPattern()
        ;
        ok(testRegex.test(validUrl), validUrl + ' is a valid URL');
    });
});

test('shouldFailWithInvalidUrls', function shouldFailWithInvalidUrlsTest() {
    invalidUrls().forEach(function loop(invalidUrl) {
        var
            testRegex = buildUrlPattern()
        ;
        ok(!testRegex.test(invalidUrl), invalidUrl + ' is an invalid URL');
    });
});

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

test('startOfLine', function startOfLineTest(assert) {
    var testRegex = VerEx().startOfLine().then('a');
    var testString = 'a';
    var withStartOfLine = '/^(?:a)/gm';
    var withoutStartOfLine = '/(?:a)/gm';

    ok(testRegex.test(testString), 'Starts with an a');

    testRegex.lastIndex = 0;
    testString = 'ba';
    ok(!testRegex.test(testString), 'Doesn\'t start with an a');

    assert.equal((testRegex.toRegExp() + ''), withStartOfLine, 'Start of line matching should be on');
    assert.equal((testRegex.startOfLine(false).toRegExp() + ''), withoutStartOfLine, 'Start of line matching should be off');
    assert.equal((testRegex.startOfLine().toRegExp() + ''), withStartOfLine, 'Start of line matching should be on again');
});

test('endOfLine', function endOfLineTest(assert) {
    var testRegex = VerEx().find('a').endOfLine();
    var testString = 'a';
    var withEndOfLine = '/(?:a)$/gm';
    var withoutEndOfLine = '/(?:a)/gm';

    ok(testRegex.test(testString), 'Ends with an a');

    testRegex.lastIndex = 0;
    testString = 'ab';
    ok(!testRegex.test(testString), 'Doesn\'t end with an a');

    assert.equal((testRegex.toRegExp() + ''), withEndOfLine, 'End of line matching should be on');
    assert.equal((testRegex.endOfLine(false).toRegExp() + ''), withoutEndOfLine, 'End of line matching should be off');
    assert.equal((testRegex.endOfLine().toRegExp() + ''), withEndOfLine, 'End of line matching should be on again');
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

test('or', function orTest(assert) {
    var testRegex = VerEx().startOfLine().then('abc').or('def');
    var testString = 'defzzz';
    var abcdef = '/^(?:(?:abc))|(?:(?:def))/gm';
    var abcdefghi = '/^(?:(?:(?:abc))|(?:(?:def))|(?:(?:ghi)))/gm';
    var abcdefghi_ = '/^(?:(?:(?:(?:abc))|(?:(?:def))|(?:(?:ghi))|(?:)))/gm';

    ok(testRegex.test(testString), 'Starts with an abc or a def');
    testRegex.lastIndex = 0;
    assert.ok(testRegex.test('abc'), 'abc should match');
    testRegex.lastIndex = 0;
    assert.ok(testRegex.test('def'), 'def should match');
    testRegex.lastIndex = 0;
    assert.notOk(testRegex.test('ghi'), 'ghi should not match match');
    assert.equal((testRegex.toRegExp() + ''), abcdef, 'Checking regex');

    testRegex.lastIndex = 0;
    testString = 'xyzabc';
    ok(!testRegex.test(testString), 'Doesn\'t start with an abc or a def');

    testRegex.or('ghi');
    assert.equal((testRegex.toRegExp() + ''), abcdefghi, 'Checking regex');
    testRegex.lastIndex = 0;
    assert.ok(testRegex.test('abc'), 'abc should match');
    testRegex.lastIndex = 0;
    assert.ok(testRegex.test('def'), 'def should match');
    testRegex.lastIndex = 0;
    assert.ok(testRegex.test('ghi'), 'ghi should match');
    testRegex.lastIndex = 0;
    assert.notOk(testRegex.test('jkl'), 'jkl should not match');

    testRegex.or();
    assert.equal((testRegex.toRegExp() + ''), abcdefghi_, 'Checking regex');
    testRegex.lastIndex = 0;
    assert.ok(testRegex.test('ghi'), 'ghi should match');
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

test('withAnyCase', function withAnyCaseTest(assert) {
    var testRegex = VerEx().startOfLine().then('a');
    var testString = 'A';

    assert.notOk(testRegex.test(testString), 'Not case-insensitive');

    testRegex.withAnyCase();
    testRegex.addModifier('i'); // here for lazy coverageness
    assert.ok(testRegex.test(testString), 'Not case-insensitive');
    testRegex.withAnyCase(false);
    assert.notOk(testRegex.test(testString), 'Not case-insensitive');

    testRegex.withAnyCase();
    testRegex.lastIndex = 0;
    testString = 'a';
    assert.ok(testRegex.test(testString), 'Not case-insensitive');
});

test('whitespace', function whitespaceTest() {
    var testRegex = VerEx().startOfLine().then('a').whitespace().then('z');
    var testString = 'a z';

    ok(testRegex.test(testString), 'a, then a space and then z');

    testRegex.lastIndex = 0;
    testString = 'a_z';
    ok(!testRegex.test(testString), 'a, then no whitespace and then z');
});

test('searchOneLine', function searchOneLineTest(assert) {
    var testRegex = VerEx().startOfLine().then('a').br().then('b').endOfLine();
    var testString = 'a\nb';

    ok(testRegex.test(testString), 'b is on the second line');

    testRegex = VerEx().startOfLine().then('a').br().then('b').endOfLine().searchOneLine();
    testString = 'a\nb';
    ok(testRegex.test(testString), 'b is on the second line, but we are only searching the first');


    testRegex = VerEx().startOfLine().then('b').searchOneLine();
    assert.notOk(testRegex.test(testString), 'b is on the second line, but we are only searching the first');

    testRegex.searchOneLine(false);
    assert.ok(testRegex.test(testString), 'b should now be found on the second line');
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

test('getRegex', function getRegexTest(assert) {
    var regex = (
        VerEx().startOfLine().range(0, 9, 'a', 'z', 'A', 'Z').multiple('').word().any('egrx').multiple(5)
    );
    var expecting = '/^[0-9a-zA-Z](?:)*\\w+[egrx](?:5)*/gm';

    assert.equal((regex.toRegExp() + ''), expecting);
    assert.equal((regex + ''), expecting);
});


test('replace', function replaceTest(assert) {
    var regex = VerEx().find('(');
    assert.equal(regex.replace(':(', ')'), ':)', 'Should have replaced changed ":(" to ":)"');
    assert.equal(regex.replace(':(:(', ')'), ':):)', 'Should be to smiles');
    regex.stopAtFirst(true);
    assert.equal(regex.replace(':(:(', ')'), ':):(', 'Should be one smile');
    regex.stopAtFirst(false);
    assert.equal(regex.replace(':(:(', ')'), ':):)', 'Should be to smiles');
});

test('repeatPrevious', function repeatPreviousTest(assert) {
    var testRegex = VerEx().find('a');

    assert.equal((testRegex.toRegExp() + ''), '/(?:a)/gm');

    testRegex.repeatPrevious(0, 1);
    assert.equal((testRegex.toRegExp() + ''), '/(?:a){0,1}/gm');

    testRegex.repeatPrevious('foo', 'bar');
    assert.equal((testRegex.toRegExp() + ''), '/(?:a){0,1}/gm');
});

test('capture', function beginCaptureTest(assert) {
    var testRegex = VerEx().beginCapture().anyOf('abcdefg').endCapture();

    assert.equal((testRegex.toRegExp() + ''), '/([abcdefg])/gm');
});
