/*!
 * VerbalExpressions JavaScript Library v0.1
 * https://github.com/jehna/VerbalExpressions
 *
 *
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-07-19
 * 
 */

// Define the collection class.
window.VerbalExpression = (function(){

    // I am the constructor function.
    function VerbalExpression(){
        var verbalExpression = Object.create( RegExp.prototype );
        
        // Initialize 
        verbalExpression = (RegExp.apply( verbalExpression, arguments ) || verbalExpression);
     
        // Add all the class methods
        VerbalExpression.injectClassMethods( verbalExpression );

        // Return the new object.
        return( verbalExpression );
    }
 
 
    // Define the static methods.
    VerbalExpression.injectClassMethods = function( verbalExpression ){
 
        // Loop over all the prototype methods
        for (var method in VerbalExpression.prototype){
 
            // Make sure this is a local method.
            if (VerbalExpression.prototype.hasOwnProperty( method )){
 
                // Add the method
                verbalExpression[ method ] = VerbalExpression.prototype[ method ];
 
            }
 
        }
        
        return( verbalExpression );
 
    };
 
 
    // Define the class methods.
    VerbalExpression.prototype = {
        
        _source : "",
        
        lol: function( value ){
            console.log( "loL" );
            this.compile( value );
            return( this );
        },
        
        sanitize : function( value ) {
            return value.replace(/[^\w]/g, function(character) { return "\\" + character; });
        },
        
        startOfLine: function() {
            if(this.source.indexOf( "^" ) !== 0) this._source = "^" + this._source;
            this.add( "" );
            return( this );
        },
        
        add: function( value ) {
            this._source += value || "";
            this.compile(this._source);
            return( this );
        },
        
        then : function( value ) {
            value = this.sanitize(value);
            this.add( "(" + value + ")" );
            return( this );
        },
        
        find : function( value ) {
            return( this.then( value ) );
        },
        
        maybe : function( value ) {
            value = this.sanitize(value);
            this.add( "(" + value + ")?" );
            return( this );
        },
        
        anything : function() {
            this.add( "(.*)" );
            return( this );
        },
        
        endOfLine : function() {
            this.add( "$" );
            return( this );
        },
        
        anythingBut : function( value ) {
            value = this.sanitize(value);
            this.add( "([^" + value + "]*)" );
            return( this );
        },
        
        replace : function( source, value ) {
            source = source.toString();
            return source.replace( this, value );
        }
 
    };
 
 
    // Return the constructor.
    return( VerbalExpression );
 
 
}).call( {} );

// Create shorthand
(function(w) { 
    w.VerEx = function() {
        return new VerbalExpression();
    };
})(window);