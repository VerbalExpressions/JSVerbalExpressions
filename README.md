VerbalExpressions v0.1
=====================

## JavaScript Regular expressions made easy
VerbalExpressions is a JavaScript library that helps to construct hard regular expressions.

## How to get started

Include the library and you're good to go!
```HTML
<script type="text/javascript" src="VerbalExpressions.js"></script>
```

## Examples

Here's a couple of simple examples to give an idea of how VerbalExpressions work:

### Testing if we have valid URL

```javascript
// Create an example of how to test for correctly formed URLs
var tester = VerEx()
            .startOfLine()
            .then( "http" )
            .maybe( "s" )
            .then( "://" )
            .maybe( "www." )
            .anythingBut( " " )
            .endOfLine();

// Create an example URL
var testMe = "https://www.google.com";

// Use RegExp object's native test() -function
if( tester.test( testMe ) ) alert( "We have a correct URL "); // This output will fire
else alert( "The URL is incorrect" );

console.log( tester ); // Ouputs the actual expression used: /^(http)(s)?(\:\/\/)(www\.)?([^\ ]*)$/ 
```

### Replacing strings

```javascript
// Create a test string
var replaceMe = "Replace bird with a duck";

// Create an expression that seeks for word "bird"
var expression = VerEx().find( "bird" );

// Execute the expression like a normal RegExp object
var result = replaceMe.replace( expression, "duck" );

alert( result ); // Outputs "Replace duck with a duck"
```

### Shorthand for string replace:

```javascript
var result = VerEx().find( "red" ).replace( "We have a red house", "blue" );
alert( result ); // Outputs "We have a blue house"
```

## API documentation

You can find the API documentation at the [wiki pages](https://github.com/jehna/VerbalExpressions/wiki).

## A little word for a big help
I'd like to promote a special thank-you to [Ben Nadel][ben-nadel] for his [great article about extending native JS objects][extending]

## Contributions
Clone the repo and fork:
`git clone https://github.com/jehna/VerbalExpressions.git`.

Pull requests are warmly welcome!

[ben-nadel]:http://www.bennadel.com/
[extending]:http://www.bennadel.com/blog/2292-Extending-JavaScript-Arrays-While-Keeping-Native-Bracket-Notation-Functionality.htm
