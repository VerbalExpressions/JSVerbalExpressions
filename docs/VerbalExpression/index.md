---
title: VerbalExpression
---

# `VerbalExpression`

A class that extends [`RegExp`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) and wraps all VerbalExpressions functionality.

## Table of Contents

- [Constructor](../VerbalExpression/constructor/)
    - [`constructor`](../VerbalExpression/constructor/#constructor)
- [Utilities](../VerbalExpression/utilities/)
    - [`static sanitize`](../VerbalExpression/utilities/#static)
    - [`add`](../VerbalExpression/utilities/#add)
- [Rules](../VerbalExpression/rules/)
    - [`startOfLine`](../VerbalExpression/rules/#startOfLine)
    - [`endOfLine`](../VerbalExpression/rules/#endOfLine)
    - [`then`](../VerbalExpression/rules/#then)
    - [`find`](../VerbalExpression/rules/#find)
    - [`maybe`](../VerbalExpression/rules/#maybe)
    - [`or`](../VerbalExpression/rules/#or)
    - [`anything`](../VerbalExpression/rules/#anything)
    - [`anythingBut`](../VerbalExpression/rules/#anythingBut)
    - [`something`](../VerbalExpression/rules/#something)
    - [`somethingBut`](../VerbalExpression/rules/#somethingBut)
    - [`anyOf`](../VerbalExpression/rules/#anyOf)
    - [`any`](../VerbalExpression/rules/#any)
    - [`range`](../VerbalExpression/rules/#range)
- [Special Characters](../VerbalExpression/special-characters/)
    - [`lineBreak`](../VerbalExpression/special-characters/#lineBreak)
    - [`br`](../VerbalExpression/special-characters/#br)
    - [`tab`](../VerbalExpression/special-characters/#tab)
    - [`word`](../VerbalExpression/special-characters/#word)
    - [`digit`](../VerbalExpression/special-characters/#digit)
    - [`whitespace`](../VerbalExpression/special-characters/#whitespace)
- [Modifiers](../VerbalExpression/modifiers/)
    - [`addModifier`](../VerbalExpression/modifiers/#addModifier)
    - [`removeModifier`](../VerbalExpression/modifiers/#removeModifier)
    - [`withAnyCase`](../VerbalExpression/modifiers/#withAnyCase)
    - [`stopAtFirst`](../VerbalExpression/modifiers/#stopAtFirst)
    - [`searchOneLine`](../VerbalExpression/modifiers/#searchOneLine)
    - [`repeatPrevious`](../VerbalExpression/modifiers/#repeatPrevious)
- [Loops](../VerbalExpression/loops/)
    - [`oneOrMore`](../VerbalExpression/loops/#oneOrMore)
    - [`multiple`](../VerbalExpression/loops/#multiple)
- [Capture Groups](../VerbalExpression/capture-groups/)
    - [`beginCapture`](../VerbalExpression/capture-groups/#beginCapture)
    - [`endCapture`](../VerbalExpression/capture-groups/#endCapture)
- [Miscellaneous](../VerbalExpression/miscellaneous/)
    - [`replace`](../VerbalExpression/miscellaneous/#replace)
    - [`toRegExp`](../VerbalExpression/miscellaneous/#toRegExp)
