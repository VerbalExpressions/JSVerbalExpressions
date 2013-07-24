<?php
/**
 * Verbal Expressions v0.1 (https://github.com/jehna/VerbalExpressions) ported in PHP
 * @author Mihai Ionut Vilcu (ionutvmi@gmail.com)
 * 22.July.2013
 */


// // some tests

// $regex = new VerEx;

// $regex 	->startOfLine()
// 		->then( "http" )
// 		->maybe( "s" )
// 		->then( "://" )
// 		->maybe( "www." )
// 		->anythingBut( " " )
// 		->endOfLine();


// if($regex->test("http://github.com"))
// 	echo "valid url";
// else
// 	echo "invalid url";

// if (preg_match($regex, 'http://github.com')) {
// 	echo 'valid url';
// } else {
// 	echo 'invalud url';
// }

// echo "<pre>". $regex->getRegex() ."</pre>";


// echo $regex ->clean(array("modifiers"=> "m","replaceLimit"=>4))
// 			->find(' ')
// 			->replace("This is a small test http://somesite.com and some more text.", "-");


class VerEx {

	var $prefixes = "";
	var $source = "";
	var $suffixes = "";
	var $modifiers = "m"; // default to global multiline matching
	var $replaceLimit = 1; // the limit of preg_replace when g modifier is not set

	/**
	 * Sanitation function for adding anything safely to the expression
	 * @param  string $value the to be added
	 * @return string        escaped value
	 */
	function sanitize( $value ) {
		if(!$value) 
			return $value;
		return preg_quote($value, "/");
	}
	/**
	 * Add stuff to the expression 
	 * @param string $value the stuff to be added
	 */
	function add( $value ) {
		$this->source .= $value;
		return $this;
	}
	/**
	 * Mark the expression to start at the beginning of the line.
	 * @param  boolean $enable Enables or disables the line starting. Default value: true
	 */
	function startOfLine( $enable = true ) {
		$this->prefixes = $enable ? "^" : "";
		return $this;
	}
	/**
	 * Mark the expression to end at the last character of the line.
	 * @param  boolean $enable Enables or disables the line ending. Default value: true
	 */
	function endOfLine( $enable = true ) {
		$this->suffixes = $enable ? "$" : "";
		return $this;
	}
	/**
	 * Add a string to the expression
	 * @param  string $value The string to be looked for
	 */
	function then( $value ) {
		$this->add("(".$this->sanitize($value).")");
		return $this;
	}

	/**
	 * alias for then()
	 * @param  string $value The string to be looked for
	 */
	function find( $value ) {
		return $this->then($value);
	}
	/**
	 *  Add a string to the expression that might appear once (or not).
	 * @param  string $value The string to be looked for
	 */
	function maybe( $value ) {
		$this->add("(".$this->sanitize($value).")?");
		return $this;
	}
	/**
	 * Accept any string 
	 */
	function anything() {
		$this->add("(.*)");
		return $this;
	}
	/**
	 * Anything but this chars
	 * @param  string $value The unaccepted chars
	 */
	function anythingBut( $value ) {
		$this->add("([^". $this->sanitize($value) ."]*)");
		return $this;
	}
	/**
	 * Accept any non-empty string 
	 */
	function something() {
		$this->add("(.+)");
		return $this;
	}
	/**
	 * Anything non-empty except for these chars
	 * @param  string $value The unaccepted chars
	 */
	function anythingBut( $value ) {
		$this->add("([^". $this->sanitize($value) ."]+)");
		return $this;
	}
	/**
	 * Shorthand for preg_replace()
	 * @param  string $source the string that will be affected(subject)
	 * @param  string $value  the replacement
	 */
	function replace($source, $value) {
		// php doesn't have g modifier so we remove it if it's there and we remove limit param
		if(strpos($this->modifiers, 'g') !== false){
			$this->modifiers = str_replace('g', '', $this->modifiers);
			return preg_replace($this->getRegex(), $value, $source);
		}		
		return preg_replace($this->getRegex(), $value, $source, $this->replaceLimit);
	}
	/**
	 * Match line break
	 */
	function lineBreak() {
		$this->add("(\\n|(\\r\\n))");
		return $this;
	}
	/**
	 * Shorthand for lineBreak
	 */
	function br() {
		return $this->lineBreak();
	}
	/**
	 * Match tabs.
	 */
	function tab() {
		$this->add("\\t");
		return $this;
	}
	/**
	 * Match any alfanumeric
	 */
	function word() {
		$this->add("\\w+");
		return $this;
	}
	/**
	 * Any of the listed chars
	 * @param  string $value The chars looked for
	 */
	function anyOf( $value ) {
		$this->add("["+ value +"]");
		return $this;
	}
	/**
	 * Shorthand for anyOf
	 * @param  string $value The chars looked for
	 */
	function any( $value ) {
		return $this->anyOf($value);
	}
	/**
	 * Adds a range to our expresion ex: range(a,z) => a-z, range(a,z,0,9) => a-z0-9
	 */
	function range() {

		$arg_num = func_num_args();
		if($arg_num%2 != 0)
			throw new Exception("Number of args must be even", 1);
		$value = "[";
		$arg_list = func_get_args();
		for($i = 0; $i < $arg_num;)
			$value .= $this->sanitize($arg_list[$i++]) . " - " . $this->sanitize($arg_list[$i++]);
		$value .= "]";

		$this->add($value);

		return $this;
	}
	/**
	 * Adds a modifier
	 */
	function addModifier( $modifier ) {
		if(strpos($this->modifiers, $modifier) === false)
			$this->modifiers .= $modifier;

		return $this;
	}
	/**
	 * Removes a modifier
	 */
	function removeModifier( $modifier ) {

		$this->modifiers = str_replace($modifier, '', $modifier);

		return $this;
	}
	/**
	 * Match case insensitive or sensitive based on $enable value
	 * @param  boolean $enable Enables or disables case sensitive. Default true
	 */
	function withAnyCase( $enable = true ) {
		if($enable)
			$this->addModifier('i');
		else
			$this->removeModifier('i');

		return $this;
	}
	/**
	 * Toggles g modifier
	 * @param  boolean $enable Enables or disables g modifier. Default true
	 */
	function stopAtFirst( $enable = true ) {
		if($enable)
			$this->addModifier('g');
		else
			$this->removeModifier('g');
		return $this;
	}
	/**
	 * Toggles m modifier
	 * @param  boolean $enable Enables or disables m modifier. Default true
	 */
	function searchOneLine( $enable = true ) {
		if($enable)
			$this->addModifier('m');
		else
			$this->removeModifier('m');

		return $this;
	}
	/**
	 * Adds the multiple modifier at the end of your expresion
	 * @param  string $value Your expresion
	 */
	function multiple( $value ) {
		
		$value = $this->sanitize($value);

		switch (substr($value, -1)) {
			case '+':
			case '*':
				break;
			
			default:
				$value += '+';
				break;
		}

		$this->add($value);

		return $this;
	}

	/**
	 * Wraps the current expresion in an `or` with $value
	 * @param  string $value new expression
	 */
	function _or( $value ) {
		if(strpos($this->prefixes, "(") === false)
			$this->prefixes .= "(";
		if(strpos($this->suffixes, ")") === false)
			$this->suffixes .= ")";

		$this->add(")|(");
		if($value)
			$this->add($value);

		return $this;

	}

	/**
	 * PHP Magic method to return a string representation of the object.
	 *
	 * @return string
	 */
	public function __toString() {
		return $this->getRegex();
	}

	/**
	 * Creates the final regex.
	 * @return string The final regex
	 */
	function getRegex() {
		return "/".$this->prefixes . $this->source . $this->suffixes. "/" . $this->modifiers;
	}

	/**
	 * tests the match of a string to the current regex
	 * @param  string $value The string to be tested
	 * @return boolean        true if it's a match
	 */
	function test($value) {
		// php doesn't have g modifier so we remove it if it's there and call preg_match_all()
		if(strpos($this->modifiers, 'g') !== false){
			$this->modifiers = str_replace('g', '', $this->modifiers);
			return preg_match_all($this->getRegex(), $value);
		}
		return preg_match($this->getRegex(), $value);
	}

	/**
	 * deletes the current regex for a fresh start
	 */
	function clean($options = array()) {
		$options = array_merge(array("prefixes"=> "", "source"=>"", "suffixes"=>"", "modifiers"=>"gm","replaceLimit"=>"1"), $options);
		$this->prefixes = $options['prefixes'];
		$this->source = $options['source'];
		$this->suffixes = $options['suffixes'];
		$this->modifiers = $options['modifiers']; // default to global multiline matching
		$this->replaceLimit = $options['replaceLimit']; // default to global multiline matching

		return $this;
	}

}


