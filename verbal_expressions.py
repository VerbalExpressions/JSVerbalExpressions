import re
import inspect

def re_escape(fn):
    def arg_escaped(this, *args):
        t = [isinstance(a, VerEx) and a.s or re.escape(a) for a in args]
        return fn(this, *t)
    return arg_escaped

class VerEx(object):
    '''
    --- VerbalExpressions class ---
    the following methods behave different from the original js lib. BE CAREFUL!

    - end_of_line
    - start_of_line
    - or
    when you say you want `$`, `^` and `|`, we just insert it right there.
    No other tricks.

    And any string you inserted will be automatically grouped
    excepte `tab` and `add`.
    '''
    def __init__(self):
        self.s = ''
        self.modifiers = { 'I': 0,
                           'M': 0 }

    def __getattr__(self, attr):
        ''' any other function will be sent to the regex object '''
        regex = self.regex()
        return getattr(regex, attr)

    def add(self, value):
        self.s += value
        return self


    def anything(self):
        return self.add('(.*)')

    @re_escape
    def anything_but(self, value):
        return self.add('([^' + value + ']*)')

    def end_of_line(self):
        return self.add('$')

    @re_escape
    def maybe(self, value):
        return self.add("(" + value + ")?")

    def start_of_line(self):
        return self.add('^')

    @re_escape
    def find(self, value):
        return self.add('(' + value + ')')
    then = find

    # special characters and groups

    @re_escape
    def any(self, value):
        return self.add("([" + value + "])")
    any_of = any

    def line_break(self):
        return self.add("(\\n|(\\r\\n))")
    br = line_break

    @re_escape
    def range(self, *args):
        from_tos =  [args[i:i+n] for i in range(0, len(args), n)]
        return self.add(''.join(['-'.join(i) for i in from_tos]))

    def tab(self):
        return self.add('\\t')

    def word(self):
        return self.add("(\\w+)")

    # ---------------------------------------

    def with_any_case(self, value=False):
        self.modifiers['I'] = re.I if value else 0
        return self

    def search_one_line(self, value=False):
        self.modifiers['M'] = re.M if value else 0
        return self

    # no global option. It depends on which method
    # you called on the regex object.

    def OR(self, value=None):
        ''' `or` is a python keyword so we use `OR` instead. '''
        self.add("|")
        return self.find(value) if value else self

    def regex(self):
        ''' get a regular expression object. '''
        return re.compile(self.s, self.modifiers['I'] | self.modifiers['M'])
    compile = regex

    def source(self):
        ''' return the raw string'''
        return self.s
    raw = value = source

    def replace(self, string, repl):
        return self.sub(repl, string)
