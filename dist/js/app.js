/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
particlesJS.load('particles-js', 'dist/js/particles.json', function() {
  console.log('callback - particles.js config loaded');
});

$("#bio").hide();
$("#projects").hide();

$("#home-button").click(function(){
	$("#bio").hide();
	$("#projects").hide();
	$("#home").fadeIn("slow");
	$("#bio-button span").removeClass("active");
	$("#proj-button span").removeClass("active");
	$("#home-button span").addClass("active");
	
});

$("#bio-button").click(function(){
	$("#projects").hide();
	$("#home").hide();
	$("#bio").fadeIn("slow");
	$("#home-button span").removeClass("active");
	$("#proj-button span").removeClass("active");
	$("#bio-button span").addClass("active");
});

$("#proj-button").click(function(){
	$("#bio").hide();
	$("#home").hide();
	$("#projects").fadeIn("slow");
	$("#home-button span").removeClass("active");
	$("#bio-button span").removeClass("active");
	$("#proj-button span").addClass("active");
});