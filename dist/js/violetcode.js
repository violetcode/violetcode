/*!
 * VioletCode v0.1.8 (Built with UnderTasker)
 */

if (typeof jQuery === 'undefined') { throw new Error('UnderTasker\'s JavaScript requires jQuery') }

/*!
 * Put things here.
 */

$(function() {

	$("#slideshow > div:gt(0)").hide();

	setInterval(function() {
	  $('#slideshow > div:first')
	    .fadeOut(1000)
	    .next()
	    .fadeIn(1000)
	    .end()
	    .appendTo('#slideshow');
	},  3000);

});