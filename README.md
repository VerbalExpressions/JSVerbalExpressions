VerbalExpressions v0.3.0
=====================

[![Build Status](https://travis-ci.org/VerbalExpressions/JSVerbalExpressions.svg)](https://travis-ci.org/VerbalExpressions/JSVerbalExpressions)

## JavaScript Regular Expressions made easy
VerbalExpressions is a JavaScript library that helps to construct difficult regular expressions.

## How to get started
### In the browser
```HTML
<script src="VerbalExpressions.js"></script>
```
Or use the [jsDelivr CDN](http://www.jsdelivr.com/projects/jsverbalexpressions).
### On the server (node.js)
Install:
```
npm install verbal-expressions
```
Require:
```javascript
var VerEx = require('verbal-expressions');
```

## Running tests

    $ npm run grunt
    (or)
    $ npm test

## Creating a minified version

This will generate a minified version of VerbalExpressions.js (aptly named VerbalExpressions.min.js) in a _dist_ folder.

    $ npm run build

A source map will also be created in the same folder, so you can use the original unminified source file (copied to _dist_ as well) for debugging purposes.

## Examples

Here's a couple of simple examples to give an idea of how VerbalExpressions works:

### Testing if we have a valid URL

```javascript
// Create an example of how to test for correctly formed URLs
var tester = VerEx()
    .startOfLine()
    .then('http')
    .maybe('s')
    .then('://')
    .maybe('www.')
    .anythingBut(' ')
    .endOfLine();

// Create an example URL
var testMe = 'https://www.google.com';

// Use RegExp object's native test() function
if (tester.test(testMe)) {
    alert('We have a correct URL '); // This output will fire}
} else {
    alert('The URL is incorrect');
}

console.log(tester); // Outputs the actual expression used: /^(http)(s)?(\:\/\/)(www\.)?([^\ ]*)$/
```

### Replacing strings

```javascript
// Create a test string
var replaceMe = 'Replace bird with a duck';

// Create an expression that seeks for word "bird"
var expression = VerEx().find('bird');

// Execute the expression like a normal RegExp object
var result = expression.replace(replaceMe, 'duck');

// Outputs "Replace duck with a duck"
alert(result);
```

### Shorthand for string replace:

```javascript
var result = VerEx().find('red').replace('We have a red house', 'blue');

// Outputs "We have a blue house"
alert(result);
```

## API documentation

You can find the API documentation at the [wiki pages](https://github.com/VerbalExpressions/JSVerbalExpressions/wiki).

## A little word for a big help
I'd like to promote a special thank-you to [Ben Nadel][ben-nadel] for his [great article about extending native JS objects][extending]

## Contributions
Clone the repo and fork:
`git clone https://github.com/jehna/VerbalExpressions.git`.

### Style guide

The [Airbnb](https://github.com/airbnb/javascript) style guide is loosely used as a basis for creating clean and readable JavaScript code.

Pull requests are warmly welcome!

Check out these slide decks for handy Github & git tips:
- [Git and Github Secrets](http://zachholman.com/talk/git-github-secrets/)
- [More Git and Github Secrets](http://zachholman.com/talk/more-git-and-github-secrets/)

[ben-nadel]:http://www.bennadel.com/
[extending]:http://www.bennadel.com/blog/2292-extending-javascript-arrays-while-keeping-native-bracket-notation-functionality.htm

## Other Implementations
You can see an up to date list of all ports on [VerbalExpressions.github.io](http://VerbalExpressions.github.io).
- [Ruby](https://github.com/ryan-endacott/verbal_expressions)
- [C#](https://github.com/VerbalExpressions/CSharpVerbalExpressions)
- [Python](https://github.com/VerbalExpressions/PythonVerbalExpressions)
- [Java](https://github.com/VerbalExpressions/JavaVerbalExpressions)
- [Groovy](https://github.com/VerbalExpressions/GroovyVerbalExpressions)
- [PHP](https://github.com/VerbalExpressions/PHPVerbalExpressions)
- [Haskell](https://github.com/VerbalExpressions/HaskellVerbalExpressions)
- [Haxe](https://github.com/VerbalExpressions/HaxeVerbalExpressions)
- [C++](https://github.com/VerbalExpressions/CppVerbalExpressions)
- [Objective-C](https://github.com/VerbalExpressions/ObjectiveCVerbalExpressions)
- [Perl](https://github.com/VerbalExpressions/PerlVerbalExpressions)
- [Swift](https://github.com/VerbalExpressions/SwiftVerbalExpressions)

If you would like to contribute another port (which would be awesome!), please open an issue specifying the language.  A repo in the [VerbalExpressions organization](https://github.com/VerbalExpressions) will be created for it.  Please don't open PRs for other languages against this repo.
