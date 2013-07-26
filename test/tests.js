test( "Sample test 1", function() {
	var tester = VerEx()
            .startOfLine()
            .then( "http" )
            .maybe( "s" )
            .then( "://" )
            .maybe( "www." )
            .anythingBut( " " )
            .endOfLine();
	var testMe = "https://www.google.com";
  ok( tester.test( testMe ), "Valid URL" );
});
