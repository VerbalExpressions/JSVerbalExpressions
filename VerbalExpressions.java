import java.util.regex.Pattern;

class VerbalExpressions {
    private String prefixes, source, suffixes, pattern = "";
    int modifiers = Pattern.MULTILINE;
    Pattern p;

    public VerbalExpressions() {

    }

    private String sanitize(String value) {
        if(value != null) return value;
        return Pattern.quote(value);
    }

    public VerbalExpressions add(String value) {
        this.source = this.source != null ? this.source + value : value;
        if (this.source != null) {
            this.p = Pattern.compile(this.prefixes + this.source + this.suffixes, this.modifiers);
            this.pattern = this.p.pattern();
        }
        return this;
    }

    public VerbalExpressions startOfLine(boolean enable) {
        this.prefixes = enable ? "^" : "";
        this.add( "" );
        return this;
    }

    public VerbalExpressions startOfLine() {
        return startOfLine(true);
    }

    public VerbalExpressions endOfLine(boolean enable) {
        this.suffixes = enable ? "$" : "";
        this.add( "" );
        return this;
    }

    public VerbalExpressions endOfLine() {
        return endOfLine(true);
    }

    public VerbalExpressions then(String value) {
        value = sanitize(value);
        this.add( "(" + value + ")" );
        return this;
    }

    public VerbalExpressions find(String value) {
        this.then(value);
        return this;
    }

    public VerbalExpressions maybe(String value) {
        value = sanitize(value);
        this.add( "(" + value + ")?" );
        return this;
    }

    public VerbalExpressions anything() {
        this.add( "(.*)" );
        return this;
    }

    public VerbalExpressions anythingBut(String value) {
        value = sanitize(value);
        this.add( "([^" + value + "]*)" );
        return this;
    }

    public VerbalExpressions replace(String source, String value) {
        this.add( "" );
        this.source.replaceAll(pattern,value);
        return this;
    }

    public VerbalExpressions lineBreak() {
        this.add( "(\\n|(\\r\\n))" );
        return this;
    }

    public VerbalExpressions br() {
        this.lineBreak();
        return this;
    }

    public VerbalExpressions tab() {
        this.add( "\\t" );
        return this;
    }

    public VerbalExpressions word() {
        this.add( "\\w+" );
        return this;
    }

    public VerbalExpressions anyOf(String value) {
        value = sanitize(value);
        this.add( "[" + value + "]" );
        return this;
    }

    public VerbalExpressions any(String value) {
        this.anyOf(value);
        return this;
    }

    public VerbalExpressions range(Object[] args) {
        String value = "[";
        for(int _from = 0; _from < args.length; _from += 2) {
            int _to = _from+1;
            if (args.length <= _to) break;
            int from = Integer.getInteger(sanitize((String)args[_from]));
            int to = Integer.getInteger(sanitize((String)args[_to]));

            value += from + "-" + to;
        }

        value += "]";

        this.add(value);
        return this;
    }

    public VerbalExpressions addModifier(char modifier) {
        switch (modifier) {
            case 'd':
                modifiers |= Pattern.UNIX_LINES;
                break;
            case 'i':
                modifiers |= Pattern.CASE_INSENSITIVE;
                break;
            case 'x':
                modifiers |= Pattern.COMMENTS;
                break;
            case 'm':
                modifiers |= Pattern.MULTILINE;
                break;
            case 's':
                modifiers |= Pattern.DOTALL;
                break;
            case 'u':
                modifiers |= Pattern.UNICODE_CASE;
                break;
            case 'U':
                modifiers |= Pattern.UNICODE_CHARACTER_CLASS;
                break;
            default:
                break;
        }

        this.add( "" );
        return this;
    }

    public VerbalExpressions removeModifier(char modifier) {
        switch (modifier) {
            case 'd':
                modifiers ^= Pattern.UNIX_LINES;
                break;
            case 'i':
                modifiers ^= Pattern.CASE_INSENSITIVE;
                break;
            case 'x':
                modifiers ^= Pattern.COMMENTS;
                break;
            case 'm':
                modifiers ^= Pattern.MULTILINE;
                break;
            case 's':
                modifiers ^= Pattern.DOTALL;
                break;
            case 'u':
                modifiers ^= Pattern.UNICODE_CASE;
                break;
            case 'U':
                modifiers ^= Pattern.UNICODE_CHARACTER_CLASS;
                break;
            default:
                break;
        }

        this.add( "" );
        return this;
    }

    public VerbalExpressions withAnyCase(boolean enable) {
        if (enable) this.addModifier( 'i' );
        else this.removeModifier( 'i' );
        this.add( "" );
        return this;
    }

    public VerbalExpressions withAnyCase() {
        return withAnyCase(true);
    }

    public VerbalExpressions searchOneLine(boolean enable) {
        if (enable) this.removeModifier( 'm' );
        else this.addModifier( 'm' );
        this.add( "" );
        return this;
    }

    public VerbalExpressions multiple(String value) {
        value = this.sanitize(value);
        switch (value.charAt(0)) {
            case '*':
            case '+':
                break;
            default:
                value += '+';
        }
        this.add(value);
        return this;
    }

    public VerbalExpressions or(String value) {
        if (this.prefixes.indexOf("(") == -1) this.prefixes += "(";
        if (this.suffixes.indexOf(")") == -1) this.suffixes = ")" + this.suffixes;

        this.add( ")|(" );
        if (value != null) this.then(value);
        return this;
    }

    public boolean test(String toTest) {
        this.add( "" );
        return Pattern.matches(this.pattern, toTest);
    }

    public String toString() {
        this.add( "" );
        return this.pattern.toString();
    }
}
