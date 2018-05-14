$(document).ready(function() {

	// Site Prompt aka site_prompt

	$('.site_prompt_close').click(function() {
		$('.site_prompt').hide();
	});

	// "Back To Top" Button
	$('.BackToTop').click(function() {
		$('html, body').animate({
			scrollTop: 0
		}, 200);
		return false;
	});

	// Force all links in a blog post to open in new window
	$('.BlogContainer p a').attr('target', '_blank');

	// Stagger in images on page
	$('.featphoto, .EventsThumbnail').velocity("transition.slideDownIn", {
		delay: 200,
		duration: 500,
		stagger: 500,
	});

	// Link entire divs
	$(".linked").click(function() {
		window.location = $(this).find("a").attr("href");
		console.log('clicked');
		return false;
	});

	// Global navigation
	var menuHit = $(".menuHit");
	var nav = $("nav.miniMenu");
	var navItems = $("nav li");
	var body = $("body");
	var logo = $(".logo");
	var menuStatus = false;
	menuHit.hammer().bind("tap", function(event) {
		event.preventDefault();
		if (!menuStatus) {
			menuStatus = true;
			console.log("tapped and menu is now on");
			$(this).find(".menuBtn div").addClass('open');
			nav.removeClass('hidden visuallyhidden');
			body.addClass('locked');
			$('.DonateButtonBigParent').addClass('open');
			navItems.velocity("transition.fadeIn", {
				duration: 200,
				stagger: 20,
			});
			$('body').addClass('state-menu-open');
		} else {
			menuStatus = false;
			console.log("tapped and menu is now off")
			$(this).find(".menuBtn div").removeClass('open');
			nav.addClass('hidden visuallyhidden');
			body.removeClass('locked');
			$('.DonateButtonBigParent').removeClass('open');
			navItems.hide();
			$('body').removeClass('state-menu-open');
		}
	});

});
