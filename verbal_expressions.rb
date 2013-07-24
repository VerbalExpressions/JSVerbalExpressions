# Ruby Verbal Expressions, based on the awesome JavaScript repo by @jehna: https://github.com/jehna/VerbalExpressions

# For documentation and install instructions, 
# see the main Ruby repo: https://github.com/ryan-endacott/VerbalExpressions.rb

class VerEx < Regexp
    
  def initialize(&block)
    @prefixes = ""
    @source = ""
    @suffixes = ""
    @modifiers = "" # TODO: Ruby Regexp option flags
    @self_before_instance_eval = eval "self"
    instance_eval &block
    super(@prefixes + @source + @suffixes, @modifiers)
  end
  
  def method_missing(method, *args, &block)
    @self_before_instance_eval.send method, *args, &block
  end
  
  # We try to keep the syntax as
  # user-friendly as possible.
  # So we can use the "normal"
  # behaviour to split the "sentences"
  # naturally.
  # TODO: then is reserved in ruby, so use find or think of a better name
  def find(value)
    value = sanitize(value)
    add("(#{value})")
  end
  
  # start or end of line
  
  def start_of_line(enable = true)
    @prefixes = '^' if enable
  end
        
  def end_of_line(enable = true)
    @suffixes = '$' if enable
  end
  
  # Maybe is used to add values with ?
  def maybe(value)
    value = sanitize(value)
    add("(#{value})?")
  end
        
  # Any character any number of times
  def anything
    add("(.*)")
  end

  # Anything but these characters
  def anything_but(value)
    value = sanitize(value)
    add("([^#{value}]*)")
  end

  # Any character at least one time
  def something
    add("(.+)")
  end

  # Any character at least one time except for these characters
  def something_but(value)
    value = sanitize(value)
    add("([^#{value}]+)")
  end
  
  # Regular expression special chars
  
  
  def line_break
    add("(\\n|(\\r\\n))")
  end
  
  # And a shorthand for html-minded
  alias_method :br, :line_break

  def tab
    add("\\t")
  end
  
  # Any alphanumeric
  def word
    add("\\w+")
  end
  
  # Any given character
  def any_of(value)
    value = sanitize(value)
    add("[#{value}]")
  end
  
  alias_method :any, :any_of
  
  # Usage: range( from, to [, from, to ... ] )
  def range(*args)
    value = "["
    args.each_slice(2) do |from, to|
      from = sanitize(from)
      to = sanitize(to)
      value += "#{from}-#{to}"
    end
    value += "]"
    add(value)
  end
  
  # Loops
  
  def multiple(value)
    value = sanitize(value)
    value += "+" unless ["+", "*"].include?(value.chars.first)
    add(value)
  end

  # Adds alternative expressions
  # TODO: or is a reserved keyword in ruby, think of better name
  def alternatively(value = nil)
    @prefixes += "(" unless @prefixes.include?("(")
    @suffixes = ")" + @suffixes unless @suffixes.include?(")")
    add(")|(")
    find(value) if value
  end
  
  private
    
    # Sanitation function for adding
    # anything safely to the expression
    def sanitize(value)
      case value
      when Regexp, VerEx
        value.source
      else
        value.gsub(/([^\w])/) { "\\#{$1}" } # Escape non word chars
      end
    end
    
    # Function to add stuff to the
    # expression. Also compiles the
    # new expression so it's ready to
    # be used.
    def add(value = '')
      @source += value
    end
    
end
