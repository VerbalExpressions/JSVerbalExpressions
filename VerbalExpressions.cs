/*!
 * VerbalExpressions .NET Library v0.1
 * https://github.com/psoholt/VerbalExpressions.net
 *
 *
 * Date: 2013-07-25
 * 
 */

using System.Text.RegularExpressions;

namespace VerbalExpression.Net
{
	public class VerbalExpressions : Regex
	{
		private string _prefixes = "";
		private string _source = "";
		private string _suffixes = "";
		private string _pattern = "";

		private RegexOptions _modifiers = RegexOptions.Multiline;
		private Regex p;

		private string Sanitize(string value)
		{
			if (value != null) 
				return value;
			return Escape(value);
		}

		public VerbalExpressions Add(string value)
		{
			_source = _source != null ? _source + value : value;
			if (_source != null)
			{
				p = new Regex(_prefixes + _source + _suffixes, RegexOptions.Multiline);
				_pattern = p.ToString();
			}
			return this;
		}

		public VerbalExpressions StartOfLine(bool enable)
		{
			_prefixes = enable ? "^" : "";
			return this;
		}

		public VerbalExpressions StartOfLine()
		{
			return StartOfLine(true);
		}

		public VerbalExpressions EndOfLine(bool enable)
		{
			_suffixes = enable ? "$" : "";
			return this;
		}

		public VerbalExpressions EndOfLine()
		{
			return EndOfLine(true);
		}

		public VerbalExpressions Then(string value)
		{
			value = Sanitize(value);
			Add("(" + value + ")");
			return this;
		}

		public VerbalExpressions Find(string value)
		{
			Then(value);
			return this;
		}

		public VerbalExpressions Maybe(string value)
		{
			value = Sanitize(value);
			Add("(" + value + ")?");
			return this;
		}

		public VerbalExpressions Anything()
		{
			Add("(.*)");
			return this;
		}

		public VerbalExpressions AnythingBut(string value)
		{
			value = Sanitize(value);
			Add("([^" + value + "]*)");
			return this;
		}

		public VerbalExpressions Replace(string value)
		{
			_source.Replace(_pattern, value);
			return this;
		}

		public VerbalExpressions LineBreak()
		{
			Add("(\\n|(\\r\\n))");
			return this;
		}

		public VerbalExpressions Br()
		{
			LineBreak();
			return this;
		}

		public VerbalExpressions Tab()
		{
			Add("\\t");
			return this;
		}

		public VerbalExpressions Word()
		{
			Add("\\w+");
			return this;
		}

		public VerbalExpressions AnyOf(string value)
		{
			value = Sanitize(value);
			Add("[" + value + "]");
			return this;
		}

		public VerbalExpressions Any(string value)
		{
			AnyOf(value);
			return this;
		}

		public VerbalExpressions Range(object[] args)
		{
			string value = "[";
			for (int _from = 0; _from < args.Length; _from += 2)
			{
				int _to = _from + 1;
				if (args.Length <= _to) break;
				string from = Sanitize((string)args[_from]);
				string to = Sanitize((string)args[_to]);

				value += from + "-" + to;
			}

			value += "]";

			Add(value);
			return this;
		}

		public VerbalExpressions AddModifier(char modifier)
		{
			switch (modifier)
			{
				//case 'd':
				//	_modifiers |= RegexOptions.UNIX_LINES;
				//	break;
				case 'i':
					_modifiers |= RegexOptions.IgnoreCase;
					break;
				//case 'x':
				//	_modifiers |= Pattern.COMMENTS;
				//	break;
				case 'm':
					_modifiers |= RegexOptions.Multiline;
					break;
				//case 's':
				//	_modifiers |= RegexOptions.DOTALL;
				//	break;
				//case 'u':
				//	_modifiers |= Pattern.UNICODE_CASE;
				//	break;
				//case 'U':
				//	_modifiers |= Pattern.UNICODE_CHARACTER_CLASS;
				//	break;
			}

			return this;
		}

		public VerbalExpressions RemoveModifier(char modifier)
		{
			switch (modifier)
			{
				//case 'd':
				//	_modifiers ^= Pattern.UNIX_LINES;
				//	break;
				case 'i':
					_modifiers ^= RegexOptions.IgnoreCase;
					break;
				//case 'x':
				//	_modifiers ^= Pattern.COMMENTS;
				//	break;
				case 'm':
					_modifiers ^= RegexOptions.Multiline;
					break;
				//case 's':
				//	_modifiers ^= Pattern.DOTALL;
				//	break;
				//case 'u':
				//	_modifiers ^= Pattern.UNICODE_CASE;
				//	break;
				//case 'U':
				//	_modifiers ^= Pattern.UNICODE_CHARACTER_CLASS;
				//	break;
				//default:
				//	break;
			}

			return this;
		}

		public VerbalExpressions WithAnyCase(bool enable)
		{
			if (enable) AddModifier('i');
			else RemoveModifier('i');
			return this;
		}

		public VerbalExpressions WithAnyCase()
		{
			return WithAnyCase(true);
		}

		public VerbalExpressions SearchOneLine(bool enable)
		{
			if (enable) RemoveModifier('m');
			else AddModifier('m');
			return this;
		}

		public VerbalExpressions Multiple(string value)
		{
			value = Sanitize(value);
			switch (value[0])
			{
				case '*':
				case '+':
					break;
				default:
					value += '+';
				break;
			}

			Add(value);
			return this;
		}

		public VerbalExpressions Or(string value)
		{
			if (_prefixes.IndexOf("(") == -1) _prefixes += "(";
			if (_suffixes.IndexOf(")") == -1) _suffixes = ")" + _suffixes;

			Add(")|(");
			if (value != null) Then(value);
			return this;
		}

		public bool Test(string toTest)
		{
			return IsMatch(toTest, _pattern);
		}

		public override string ToString()
		{
			return _pattern;
		}
	}
}
