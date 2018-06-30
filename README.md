VerbalExpressions
=================

[![Build Status](https://travis-ci.org/VerbalExpressions/JSVerbalExpressions.svg)](https://travis-ci.org/VerbalExpressions/JSVerbalExpressions)

## JavaScript Regular Expressions made easy

VerbalExpressions is a JavaScript library that helps to construct difficult regular expressions.

## How to get started

### In the browser

```html
<script src="VerbalExpressions.js"></script>
```

Or use the [jsDelivr CDN](http://www.jsdelivr.com/projects/jsverbalexpressions).

### On the server (node.js)

Install:

```sh
$ npm install verbal-expressions
```

Require:

```javascript
const VerEx = require('verbal-expressions');
```

Or use ES6's `import`:

```javascript
import VerEx from 'verbal-expressions';
```

## Running tests

```sh
$ npm test
```

(or)

```sh
$ npm run test:verbose
```

## Creating a minified version

```sh
$ npm run build
```

This will run [Babel](https://babeljs.io) on `VerbalExpressions.js` and output the result to `dist/verbalexpressions.js`. A minified version of the same will also be written to `dist/verbalexpressions.min.js`.

A source map will also be created in `dist`, so you can use the original "un-babelified", unminified source file for debugging purposes.

## API documentation

You can find the API documentation at the [wiki pages](https://github.com/VerbalExpressions/JSVerbalExpressions/wiki).

## Examples

Here are some simple examples to give an idea of how VerbalExpressions works:

### Testing if we have a valid URL

```javascript
// Create an example of how to test for correctly formed URLs
const tester = VerEx()
    .startOfLine()
    .then('http')
    .maybe('s')
    .then('://')
    .maybe('www.')
    .anythingBut(' ')
    .endOfLine();

// Create an example URL
const testMe = 'https://www.google.com';

// Use RegExp object's native test() function
if (tester.test(testMe)) {
    alert('We have a correct URL'); // This output will fire
} else {
    alert('The URL is incorrect');
}

console.log(tester); // Outputs the actual expression used: /^(http)(s)?(\:\/\/)(www\.)?([^\ ]*)$/
```

### Replacing strings

```javascript
// Create a test string
const replaceMe = 'Replace bird with a duck';

// Create an expression that seeks for word "bird"
const expression = VerEx().find('bird');

// Execute the expression like a normal RegExp object
const result = expression.replace(replaceMe, 'duck');

// Outputs "Replace duck with a duck"
alert(result);
```

### Shorthand for string replace:

```javascript
const result = VerEx().find('red').replace('We have a red house', 'blue');

// Outputs "We have a blue house"
alert(result);
```

## A little word for a big help

I'd like to promote a special thank-you to [Ben Nadel][ben-nadel] for his [great article about extending native JS objects][extending]

## Contributions

Pull requests are warmly welcome!

Clone the repo and fork:

```sh
git clone https://github.com/jehna/VerbalExpressions.git
```

### Style guide

The [Airbnb](https://github.com/airbnb/javascript) style guide is loosely used as a basis for creating clean and readable JavaScript code. Check [`.eslintrc`](.eslintrc).

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

If you would like to contribute another port (which would be awesome!), please [open an issue](https://github.com/VerbalExpressions/implementation/issues/new) specifying the language in the [VerbalExpressions/implementation repo](https://github.com/VerbalExpressions/implementation/issues). Please don't open PRs for other languages against this repo.
