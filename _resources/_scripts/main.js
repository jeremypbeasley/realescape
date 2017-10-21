$(document).ready(function() {

// BACK TO TOP BUTTON

$('.BackToTop').click(function(){
    $('html, body').animate({scrollTop : 0},200);
    return false;
  });

// FORCE LINKS IN BLOG POST TO OPEN IN BLANK window

$('.BlogContainer p a').attr('target', '_blank');

// STAGGER IN PHOTOS

$('.featphoto, .EventsThumbnail').velocity("transition.slideDownIn", {
        delay: 200,
        duration: 500,
        stagger: 500,
});

// DONATE: INFO ABOUT MONTHLY GIFTS

$("#DonateRecurringMonthly").click(function(){
  $(".DonateRecurringWarning").addClass("Open");
});

$("#DonateRecurringOnce").click(function(){
  $(".DonateRecurringWarning").removeClass("Open");
});

$("#DonateRecurringMonthly").click(function(){
  $(".DonateOnce").prop( "checked", false );
  $(".DonateMonthly").prop( "checked", true);
});

$("#DonateRecurringOnce").click(function(){
  $(".DonateOnce").prop( "checked", true );
  $(".DonateMonthly").prop( "checked", false);
});

// testing 3243

// DONATE: AUTO TAB FUNCTIONALITY IN DONATE

$('.autotab').keypress(function (event) {

    var maxLen = this.maxLength;
    var currentLen = this.value.length;
    var numberKeys = "1,2,3,4,5,6,7,8,9,0";
    var key = String.fromCharCode(event.which);

    console.log("key pressed");

    if (numberKeys.indexOf(key) != -1) {
      if (maxLen === currentLen) {
        //$(this).next().focus();
        $(this).parent().next().find('input').focus();
        console.log("next!")
      }
    }
});

// $('.DonateCheckbox').change(function() {
//     $('.DonatePerson').toggleClass("open");
// });

  /* LINKING ENTIRE DIVS */

  $(".linked").click(function(){
    window.location=$(this).find("a").attr("href");
    console.log('clicked');
    return false;
  });

  // MENU FUNCTIONALITY

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
      // logo.addClass('hidden');
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
      // logo.removeClass('hidden');
      navItems.hide();

      $('body').removeClass('state-menu-open');


    }

  });

// DONATE - POPULATES SUBMIT BUTTON WITH AMOUNT FROM FIELD

$(".DonateAmount").keyup(function () {
   var value = $(this).val();
   if (value) {
     $(".DonateSubmit").text("Give $" + value);
   }
   else {
     $(".DonateSubmit").text("Give");
   };
   //console.log(value);
 }).keyup();

// DONATE - POPULATES CONFIRMATION WITH AMOUNT AND NAME

$(".DonateAmount").keyup(function () {
   var value = $(this).val();
   if (value) {
     $(".DonateConfirmationAmount").text(value);
   }
 }).keyup();

$(".DonateName").keyup(function () {
   var value = $(this).val();
   var FirstName = value.split(" ", 1);
   if (value) {
     $(".DonateConfirmationName").text(FirstName);
   }
 }).keyup();

$(".DonateEmail").keyup(function () {
   var value = $(this).val();
   if (value) {
     $(".DonateConfirmationEmail").text(value);
   }
 }).keyup();

    // TEMP TOOL TO SHOW CONFIRMATION WITHOUT FORM SUBMISSION

    // $(".DonateSubmit").click(function(){
    //   $('.DonateConfirmation').css("display", "block");
    //   $('.DonateConfirmation').css("opacity", "1");
    // });

    var $interval = $('input[name="planInterval"]');

    $interval.on('change',function(){

        var value = $(this).val();
        var $interval = $('#planIntervalCount');

        if('month' == value){
            $interval.val(1);
        }else{
            $interval.val(0);
        }

    });

    var key = $('#publishable').data('key');

    Stripe.setPublishableKey(key);
    $(this).charge('#payment-form', '#payment-errors');


});
