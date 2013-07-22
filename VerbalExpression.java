import java.util.regex.Pattern;

class VerbalExpression {
    private String prefixes, source, suffixes, pattern = "";
    int modifiers = Pattern.MULTILINE;
    Pattern p;

    public VerbalExpression() {

    }

    private String sanitize(String value) {
        if(value != null) return value;
        return Pattern.quote(value);
    }

    public VerbalExpression add(String value) {
        this.source = this.source != null ? this.source + value : value;
        if (this.source != null) {
            this.p = Pattern.compile(this.prefixes + this.source + this.suffixes, this.modifiers);
            this.pattern = this.p.pattern();
        }
        return this;
    }

    public VerbalExpression startOfLine(boolean enable) {
        this.prefixes = enable ? "^" : "";
        this.add( "" );
        return this;
    }

    public VerbalExpression startOfLine() {
        return startOfLine(true);
    }

    public VerbalExpression endOfLine(boolean enable) {
        this.suffixes = enable ? "$" : "";
        this.add( "" );
        return this;
    }

    public VerbalExpression endOfLine() {
        return endOfLine(true);
    }

    public VerbalExpression then(String value) {
        value = sanitize(value);
        this.add( "(" + value + ")" );
        return this;
    }

    public VerbalExpression find(String value) {
        this.then(value);
        return this;
    }

    public VerbalExpression maybe(String value) {
        value = sanitize(value);
        this.add( "(" + value + ")?" );
        return this;
    }

    public VerbalExpression anything() {
        this.add( "(.*)" );
        return this;
    }

    public VerbalExpression anythingBut(String value) {
        value = sanitize(value);
        this.add( "([^" + value + "]*)" );
        return this;
    }

    public VerbalExpression replace(String source, String value) {
        this.add( "" );
        this.source.replaceAll(pattern,value);
        return this;
    }

    public VerbalExpression lineBreak() {
        this.add( "(\\n|(\\r\\n))" );
        return this;
    }

    public VerbalExpression br() {
        this.lineBreak();
        return this;
    }

    public VerbalExpression tab() {
        this.add( "\\t" );
        return this;
    }

    public VerbalExpression word() {
        this.add( "\\w+" );
        return this;
    }

    public VerbalExpression anyOf(String value) {
        value = sanitize(value);
        this.add( "[" + value + "]" );
        return this;
    }

    public VerbalExpression any(String value) {
        this.anyOf(value);
        return this;
    }

    public VerbalExpression range(Object[] args) {
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

    public VerbalExpression addModifier(char modifier) {
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

    VerbalExpression removeModifier(char modifier) {
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

    public VerbalExpression withAnyCase(boolean enable) {
        if (enable) this.addModifier( 'i' );
        else this.removeModifier( 'i' );
        this.add( "" );
        return this;
    }

    public VerbalExpression withAnyCase() {
        return withAnyCase(true);
    }

    public VerbalExpression searchOneLine(boolean enable) {
        if (enable) this.removeModifier( 'm' );
        else this.addModifier( 'm' );
        this.add( "" );
        return this;
    }

    public VerbalExpression multiple(String value) {
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

    public VerbalExpression or(String value) {
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
