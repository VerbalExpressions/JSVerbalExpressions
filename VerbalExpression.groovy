import java.util.regex.Pattern

class VerbalExpression {
    String prefixes, source, suffixes, pattern = ""
    int modifiers = Pattern.MULTILINE
    Pattern p

    String sanitize(String value) {
        if(value) return value
        return value.replaceAll("/[^\\w]/g", { character -> "\\" + character })
    }

    VerbalExpression add(String value) {
        this.source = this.source ? this.source + value : value
        if (this.source) {
            String pattern = ""
            if (this.prefixes) pattern += this.prefixes
            if (this.source) pattern += this.source
            if (this.suffixes) pattern += this.suffixes
            this.p = Pattern.compile(pattern, this.modifiers)
            this.pattern = this.p.pattern()
        }
        return this
    }

    VerbalExpression startOfLine(boolean enable = true) {
        this.prefixes = enable ? "^" : ""
        this.add( "" )
        return this
    }

    VerbalExpression endOfLine(boolean enable = true) {
        this.suffixes = enable ? "\$" : ""
        this.add( "" )
        return this
    }

    VerbalExpression then(String value) {
        value = sanitize(value)
        this.add( "(" + value + ")" )
        return this
    }

    VerbalExpression find(String value) {
        this.then(value)
        return this
    }

    VerbalExpression maybe(String value) {
        value = sanitize(value)
        this.add( "(" + value + ")?" )
        return this
    }

    VerbalExpression anything() {
        this.add( "(.*)" )
        return this
    }

    VerbalExpression anythingBut(String value) {
        value = sanitize(value)
        this.add( "([^" + value + "]*)" )
        return this
    }

    VerbalExpression replace(String source, String value) {
        this.add( "" )
        this.source.replaceAll(pattern,value)
        return this
    }

    VerbalExpression lineBreak() {
        this.add( "(\\n|(\\r\\n))" )
        return this
    }

    VerbalExpression br() {
        this.lineBreak()
        return this
    }

    VerbalExpression tab() {
        this.add( "\\t" )
        return this
    }

    VerbalExpression word() {
        this.add( "\\w+" )
        return this
    }

    VerbalExpression anyOf(String value) {
        value = sanitize(value)
        this.add( "[" + value + "]" )
        return this
    }

    VerbalExpression any(String value) {
        this.anyOf(value)
        return this
    }

    VerbalExpression range(Object[] args) {
        String value = "["
        for(int _from = 0; _from < args.length; _from += 2) {
            int _to = _from+1
            if (args.length <= _to) break
            int from = sanitize(args[_from])
            int to = sanitize(args[_to])

            value += from + "-" + to
        }

        value += "]"

        this.add(value)
        return this
    }

    VerbalExpression addModifier(String modifier) {
        switch (modifier) {
            case "d":
                modifiers |= Pattern.UNIX_LINES
                break
            case "i":
                modifiers |= Pattern.CASE_INSENSITIVE
                break
            case "x":
                modifiers |= Pattern.COMMENTS
                break
            case "m":
                modifiers |= Pattern.MULTILINE
                break
            case "s":
                modifiers |= Pattern.DOTALL
                break
            case "u":
                modifiers |= Pattern.UNICODE_CASE
                break
            case "U":
                modifiers |= Pattern.UNICODE_CHARACTER_CLASS
                break
            default:
                break
        }

        this.add( "" )
        return this
    }

    VerbalExpression removeModifier(String modifier) {
        switch (modifier) {
            case "d":
                modifiers ^= Pattern.UNIX_LINES
                break
            case "i":
                modifiers ^= Pattern.CASE_INSENSITIVE
                break
            case "x":
                modifiers ^= Pattern.COMMENTS
                break
            case "m":
                modifiers ^= Pattern.MULTILINE
                break
            case "s":
                modifiers ^= Pattern.DOTALL
                break
            case "u":
                modifiers ^= Pattern.UNICODE_CASE
                break
            case "U":
                modifiers ^= Pattern.UNICODE_CHARACTER_CLASS
                break
            default:
                break
        }

        this.add( "" )
        return this
    }

    VerbalExpression withAnyCase(boolean enable = true) {
        if (enable) this.addModifier( "i" )
        else this.removeModifier( "i" )
        this.add( "" )
        return this
    }

    VerbalExpression stopAtFirst(boolean enable = true) {
        if (enable) this.removeModifier( "g" )
        else this.addModifier( "g" )
        this.add( "" )
        return this
    }

    VerbalExpression searchOneLine(boolean enable = true) {
        if (enable) this.removeModifier( "m" )
        else this.addModifier( "m" )
        this.add( "" )
        return this
    }

    VerbalExpression multiple(String value) {
        value = this.sanitize(value)
        switch (value.substring(-1)) {
            case "*":
            case "+":
                break
            default:
                value += "+"
        }
        this.add(value)
        return this
    }

    VerbalExpression or(String value) {
        if (this.prefixes.indexOf("(") == -1) this.prefixes += "("
        if (this.suffixes.indexOf(")") == -1) this.suffixes = ")" + this.suffixes

        this.add( ")|(" )
        if (value) this.then(value)
        return this
    }

    boolean test(String toTest) {
        this.add( "" )
        return Pattern.matches(this.pattern, toTest)
    }

    String toString() {
        this.add( "" )
        return this.pattern.toString()
    }
}
