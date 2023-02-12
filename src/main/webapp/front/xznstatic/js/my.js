// JavaScript Document
$(document).ready(function () {
	
	$(".procon").hover(function () {
		$(this).find(".hoverbg").slideToggle("slow");
	})
	$(".caseBox").hover(function () {
		$(this).find(".hoverbg").slideToggle();
	})
	$(".team").hover(function () {
		$(this).find(".hoverbg").slideToggle();
	})
})