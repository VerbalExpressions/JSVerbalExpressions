# Capture Groups

Capture groups are used to extract data from within the regular expression match for further processing.

## `beginCapture`

Begin a capture group.

## `endCapture`

End a capture group.

_________________

```js
const phoneNumber = VerEx()
    .find('+')
    .beginCapture()
        .digit().repeatPrevious(2)
    .endCapture()
    .then('-')
    .digit().repeatPrevious(10);

const [, countryCode] = phoneNumber.exec('+91-2223387510');
console.log(countryCode); // => '91'
```
