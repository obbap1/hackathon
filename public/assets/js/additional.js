/*!
 * jQuery Validation Plugin
 */
(function (factory) {
    if (typeof define === "function" && define.amd) {
        define(["jquery", "./jquery.validate"], factory);
    } else if (typeof module === "object" && module.exports) {
        module.exports = factory(require("jquery"));
    } else {
        factory(jQuery);
    }
}(function ($) {

    function stripHtml(value) {

        // Remove html tags and space chars
        return value.replace(/<.[^<>]*?>/g, " ").replace(/&nbsp;|&#160;/gi, " ")

        // Remove punctuation
        .replace(/[.(),;:!?%#$'\"_+=\/\-“”’]*/g, "");
    }

    $.validator.addMethod( "emailregex", function( value, element ) {
    	return this.optional( element ) || /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/i.test( value );
    }, "Please enter a valid email." );

    $.validator.addMethod("valueNotEquals", function(value, element, arg){
    	  return arg !== value;
    }, "Please select a value.");

    return $;
}));
