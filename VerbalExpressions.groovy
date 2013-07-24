import java.util.regex.Pattern

class VerbalExpressions {
    String prefixes, source, suffixes, pattern = ""
    int modifiers = Pattern.MULTILINE
    Pattern p

    String sanitize(String value) {
        if(value) return value
        return Pattern.quote(value)
    }

    VerbalExpressions add(String value) {
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

    VerbalExpressions startOfLine(boolean enable = true) {
        this.prefixes = enable ? "^" : ""
        this.add( "" )
        return this
    }

    VerbalExpressions endOfLine(boolean enable = true) {
        this.suffixes = enable ? "\$" : ""
        this.add( "" )
        return this
    }

    VerbalExpressions then(String value) {
        value = sanitize(value)
        this.add( "(" + value + ")" )
        return this
    }

    VerbalExpressions find(String value) {
        this.then(value)
        return this
    }

    VerbalExpressions maybe(String value) {
        value = sanitize(value)
        this.add( "(" + value + ")?" )
        return this
    }

    VerbalExpressions anything() {
        this.add( "(.*)" )
        return this
    }

    VerbalExpressions anythingBut(String value) {
        value = sanitize(value)
        this.add( "([^" + value + "]*)" )
        return this
    }

    VerbalExpressions something() {
        this.add( "(.+)" )
        return this
    }

    VerbalExpressions somethingBut(String value) {
        value = sanitize(value)
        this.add( "([^" + value + "]+)" )
        return this
    }
	
    VerbalExpressions replace(String source, String value) {
        this.add( "" )
        this.source.replaceAll(pattern,value)
        return this
    }

    VerbalExpressions lineBreak() {
        this.add( "(\\n|(\\r\\n))" )
        return this
    }

    VerbalExpressions br() {
        this.lineBreak()
        return this
    }

    VerbalExpressions tab() {
        this.add( "\\t" )
        return this
    }

    VerbalExpressions word() {
        this.add( "\\w+" )
        return this
    }

    VerbalExpressions anyOf(String value) {
        value = sanitize(value)
        this.add( "[" + value + "]" )
        return this
    }

    VerbalExpressions any(String value) {
        this.anyOf(value)
        return this
    }

    VerbalExpressions range(Object[] args) {
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

    VerbalExpressions addModifier(String modifier) {
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

    VerbalExpressions removeModifier(String modifier) {
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

    VerbalExpressions withAnyCase(boolean enable = true) {
        if (enable) this.addModifier( "i" )
        else this.removeModifier( "i" )
        this.add( "" )
        return this
    }

    VerbalExpressions searchOneLine(boolean enable = true) {
        if (enable) this.removeModifier( "m" )
        else this.addModifier( "m" )
        this.add( "" )
        return this
    }

    VerbalExpressions multiple(String value) {
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

    VerbalExpressions or(String value) {
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
