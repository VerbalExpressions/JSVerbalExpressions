##PHPVerbalExpressions 
- ported from [VerbalExpressions](https://github.com/jehna/VerbalExpressions)

VerbalExpressions is a PHP library that helps to construct hard regular expressions.  


```php

// some tests

$regex = new VerEx;

$regex 	->startOfLine()
		->then( "http" )
		->maybe( "s" )
		->then( "://" )
		->maybe( "www." )
		->anythingBut( " " )
		->endOfLine();


if($regex->test("http://github.com"))
	echo "valid url";
else
	echo "invalid url";


echo "<pre>". $regex->getRegex() ."</pre>";


echo $regex ->clean(array("modifiers"=> "m","replaceLimit"=>4))
			->find(' ')
			->replace("This is a small test http://somesite.com and some more text.", "-");

```
