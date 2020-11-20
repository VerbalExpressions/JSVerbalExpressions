# VerbalExpressions

[![Build Status](https://travis-ci.org/VerbalExpressions/JSVerbalExpressions.svg)](https://travis-ci.org/VerbalExpressions/JSVerbalExpressions)
[![Latest Version](https://img.shields.io/npm/v/verbal-expressions.svg)](https://www.npmjs.com/package/verbal-expressions)
[![jsDelivr](https://img.shields.io/badge/dynamic/json.svg?label=jsDelivr&url=https%3A%2F%2Fdata.jsdelivr.com%2Fv1%2Fpackage%2Fnpm%2Fverbal-expressions&query=%24..tags.latest&colorB=blue&prefix=v)](https://www.jsdelivr.com/package/npm/verbal-expressions)
[![License](https://img.shields.io/github/license/VerbalExpressions/JSVerbalExpressions.svg)](LICENSE)

## JavaScript Regular Expressions made easy

VerbalExpressions is a JavaScript library that helps construct difficult regular expressions.

## How to get started

### In the browser

```html
<script src="VerbalExpressions.js"></script>
```

Or use the [jsDelivr CDN](https://www.jsdelivr.com/package/npm/verbal-expressions).

### On the server (node.js)

Install:

```sh
npm install verbal-expressions
```

Require:

```js
const VerEx = require('verbal-expressions');
```

Or use ES6's `import`:

```js
import VerEx from 'verbal-expressions';
```

## Running tests

```sh
npm test
```

(or)

```sh
npm run test:verbose
```

## Creating a minified version

```sh
npm run build
```

This will run [Babel](https://babeljs.io) on `VerbalExpressions.js` and output the result to `dist/verbalexpressions.js`. A minified version of the same will also be written to `dist/verbalexpressions.min.js`.

A source map will also be created in `dist`, so you can use the original "un-babelified", unminified source file for debugging purposes.

## Building the docs/ folder

The `docs/` folder uses Jekyll for building the static HTML and is hosted at
gh-pages.

To install the Ruby dependencies, run:

```
cd docs/
bundle install
```

This installs all needed Ruby dependencies locally

After you've installed dependencies, you can run:

```
bundle exec jekyll build
```

This builds all static files to `docs/_site/` folder.

If you want to develop the files locally, you can run:

```
bundle exec jekyll serve
```

This starts a local development web server and starts watching your files for
changes.

## API documentation

You can find the API documentation at [verbalexpressions.github.io/JSVerbalExpressions](https://verbalexpressions.github.io/JSVerbalExpressions). You can find the source code for the docs in [`docs`](docs/).

## Examples

Here are some simple examples to give an idea of how VerbalExpressions works:

### Testing if we have a valid URL

```js
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

```js
// Create a test string
const replaceMe = 'Replace bird with a duck';

// Create an expression that seeks for word "bird"
const expression = VerEx().find('bird');

// Execute the expression like a normal RegExp object
const result = expression.replace(replaceMe, 'duck');

// Outputs "Replace duck with a duck"
alert(result);
```

### Shorthand for string replace

```js
const result = VerEx().find('red').replace('We have a red house', 'blue');

// Outputs "We have a blue house"
alert(result);
```

## Contributions

Pull requests are warmly welcome!

Clone the repo and fork:

```sh
git clone https://github.com/VerbalExpressions/JSVerbalExpressions.git
```

### Style guide

The [Airbnb](https://github.com/airbnb/javascript) style guide is loosely used as a basis for creating clean and readable JavaScript code. Check [`.eslintrc`](.eslintrc).

Check out these slide decks for handy Github & git tips:

- [Git and Github Secrets](https://zachholman.com/talk/git-github-secrets/)
- [More Git and Github Secrets](https://zachholman.com/talk/more-git-and-github-secrets/)

## Tools

- <https://verbalregex.com> - it's a wrapper of JSVerbalExpressions; users can write down the code and compile to regex
- <https://jsbin.com/metukuzowi/edit?js,console> - JSBin Playground

## Other Implementations

You can see an up to date list of all ports on [VerbalExpressions.github.io](https://VerbalExpressions.github.io).

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
