test( "something", function() {
    var testRegex = VerEx().something();
    var testString;

    testString = "";
    ok( ! testRegex.test( testString ), "empty string doesn't have something" );

    testRegex.lastIndex = 0;
    testString = "a";
    ok( testRegex.test( testString ), "a is something" );
} );

test( "anything", function() {
    var testRegex = VerEx().startOfLine().anything();
    var testString = "what";
    ok( testRegex.test( testString ), "Passes!" );
} );

test( "anythingBut", function() {
    var testRegex = VerEx().startOfLine().anythingBut( "w" );
    var testString = "what";
    ok( testRegex.test( testString ), "starts with w" );
} );

test( "somethingBut", function() {
    var testRegex = VerEx().somethingBut("a");
    var testString;

    testString = "";
    ok( ! testRegex.test( testString ), "empty string doesn't have something" );

    testRegex.lastIndex = 0;
    testString = "b";
    ok( testRegex.test( testString ), "doesn't start with a" );

    testRegex.lastIndex = 0;
    testString = "a";
    ok( ! testRegex.test( testString ), "starts with a" );
} );

test( "startOfLine", function() {
    var testRegex = VerEx().startOfLine().then( "a" );
    var testString;

    testString = "a";
    ok( testRegex.test( testString ), "Starts with a" );

    testRegex.lastIndex = 0;
    testString = "ba";
    ok( ! testRegex.test( testString ), "Doesn't start with a" );
} );

test( "endOfLine", function() {
    var testRegex = VerEx().find( "a" ).endOfLine();
    var testString;

    testString = "a";
    ok( testRegex.test( testString ), "Ends with a" );

    testRegex.lastIndex = 0;
    testString = "ab";
    ok( ! testRegex.test( testString ), "Doesn't end with a" );
} );

test( "maybe", function() {
    var testRegex = VerEx().startOfLine().then( "a" ).maybe( "b" );
    var testString;

    testString = "acb";
    ok( testRegex.test( testString ), "Maybe has a b after an a" );

    testRegex.lastIndex = 0;
    testString = "abc";
    ok( testRegex.test( testString ), "Maybe has a b after an a" );
} );

test( "anyOf", function() {
    var testRegex = VerEx().startOfLine().then( "a" ).anyOf( "xyz" );
    var testString;

    testString = "ay";
    ok( testRegex.test( testString ), "Has an x, y, or z after a" );

    testRegex.lastIndex = 0;
    testString = "abc";
    ok( ! testRegex.test( testString ), "Doesn't have an x, y, or z after a" );
} );

test( "or", function() {
    var testRegex = VerEx().startOfLine().then( "abc" ).or( "def" );
    var testString;

    testString = "defzzz";
    ok( testRegex.test( testString ), "Starts with abc or def" );

    testRegex.lastIndex = 0;
    testString = "xyzabc";
    ok( ! testRegex.test( testString ), "Doesn't start with abc or def" );
} );

test( "lineBreak", function() {
    var testRegex;
    var testString;

    testRegex = VerEx().startOfLine().then( "abc" ).lineBreak().then( "def" );
    testString = "abc\r\ndef";
    ok( testRegex.test( testString ), "abc then line break then def" );

    testRegex.lastIndex = 0;
    testString = "abc\ndef";
    ok( testRegex.test( testString ), "abc then line break then def" );

    testRegex.lastIndex = 0;
    testString = "abc\r\n def";
    ok( ! testRegex.test( testString ), "abc then line break then space then def" );
} );

test( "br", function() {
    var testRegex;
    var testString;

    testRegex = VerEx().startOfLine().then( "abc" ).lineBreak().then( "def" );
    testString = "abc\r\ndef";
    ok( testRegex.test( testString ), "abc then line break then def" );

    testRegex.lastIndex = 0;
    testString = "abc\ndef";
    ok( testRegex.test( testString ), "abc then line break then def" );

    testRegex.lastIndex = 0;
    testString = "abc\r\n def";
    ok( ! testRegex.test( testString ), "abc then line break then space then def" );
} );

test( "tab", function() {
    var testRegex;
    var testString;

    testRegex = VerEx().startOfLine().tab().then( "abc" );
    testString = "\tabc";
    ok( testRegex.test( testString ), "tab then abc" );

    testRegex.lastIndex = 0;
    testString = "abc";
    ok( ! testRegex.test( testString ), "no tab then abc" );
} );

test( "withAnyCase", function() {
    var testRegex;
    var testString;

    testRegex = VerEx().startOfLine().then( "a" );
    testString = "A";
    ok( ! testRegex.test( testString ), "not case insensitive" );

    testRegex = VerEx().startOfLine().then( "a" ).withAnyCase();
    testString = "A";
    ok( testRegex.test( testString ), "case insensitive" );

    testRegex.lastIndex = 0;
    testString = "a";
    ok( testRegex.test( testString ), "case insensitive" );
} );

test( "searchOneLine", function() {
    var testRegex;
    var testString;

    testRegex = VerEx().startOfLine().then( "a" ).br().then( "b" ).endOfLine();
    testString = "a\nb";
    ok( testRegex.test( testString ), "b is on the second line" );

    testRegex = VerEx().startOfLine().then( "a" ).br().then( "b" ).endOfLine().searchOneLine();
    testString = "a\nb";
    ok( testRegex.test( testString ), "b is on the second line but we are only searching the first" );
} );

test( "sanitize", function() {
    var testRegex;
    var testString;

    testRegex = VerEx().startOfLine().then( "$a^b\\c|d(e)f[g]h{i}j.k*l+m?" ).endOfLine();
    testString = "$a^b\\c|d(e)f[g]h{i}j.k*l+m?";
    ok( testRegex.test( testString ), "special characters sanitization" );
} );

test( "multiple", function() {
    var testRegex, testString;

    testRegex = VerEx().startOfLine().multiple("foo");
    testString = "foo";
    ok( testRegex.test( testString ), "contains 'foo' atleast once ");

    testRegex =  VerEx().startOfLine().multiple("foo", 2);
    testString = "foo";
    ok( ! testRegex.test( testString ), " should contains 'foo' atleast twice" );

    testRegex =  VerEx().startOfLine().multiple("foo", 2);
    testString = "foofoo";
    ok( testRegex.test( testString ), " should contains 'foo' atleast twice" );

    testRegex =  VerEx().startOfLine().multiple("foo", 2, 5);
    testString = "foofoofoofoo";
    ok( testRegex.test( testString ), " should contains 'foo' repeated two to five times" );

    testRegex =  VerEx().startOfLine().multiple("foo", 2, 5);
    testString = "foo";
    ok( ! testRegex.test( testString ), " should contains 'foo' repeated two to five times" );

} );
