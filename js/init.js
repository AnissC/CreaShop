$(function() {
  "use strict";
  /******************************
  *         Preloader           *
  ******************************/
  $(window).load(function() { 
  	$('.loader').fadeOut();
  	$('#preloader').delay(350).fadeOut('slow');
  	$('body').delay(350).css({'overflow':'visible'});
  });

  /***********************************
  *   Lazy load images               *
  ************************************/
  $('.lazy').Lazy();

  /***********************************
  *          Menu offset target      *
  ************************************/
  //set offset
  var offset = $('.navbar').height();
    // offset = 150;
  $("body").scrollspy({target: ".navbar", offset: offset});
  $(".navbar li a").on('click', function(event) {
    // Prevent default anchor click behavior
    event.preventDefault();
    $('.navbar-collapse').collapse('hide');

    var hash = this.hash;
    var scrollPos = $(hash).offset().top - (offset - 1);
    $('html, body').animate({
      scrollTop: scrollPos
    }, 800);
  });


  /********************************
  *         back to top           *
  *********************************/
  $("#BackToTop").on("click", function(e) {
      e.preventDefault();
      $("html,body").animate({scrollTop: 0}, 800);
  });

  /***********************************
  *             Reviews              *
  ***********************************/

  // $('#reviews').carousel({
  //   interval: false, //10000,
  //   ride: false,
  // });


  /***********************************
  *             Counts               *
  *     start count when appeared    *
  ***********************************/
    $('.counts').each(function() {
      $(this).appear().on('appear', function() {
        if( $(this).html() == 0 ) {
          $(this).countTo({
              speed: 3000
          });
        }
        // $(this).removeAttr("data-form").removeAttr("data-to");
      });
    });


  	/*******************************
  	*	appointment
  	********************************/
  	$("#appointment .form-control").focus(function(){
  		$(this).parent().addClass("focus");
  	  }).blur(function(){
  	  	$(this).parent().removeClass("focus");
  	});


  /**********************************
  *         WOW script init         *
  **********************************/
    new WOW({
        animateClass: 'animated',
        // offset:       100,
        mobile:       true,
        live:         true,
        callback:     function(box) {
          // console.log("WOW: animating <" + box.tagName.toLowerCase() + ">")
        }
      }
    ).init();

    /**********************************
    *   owl carousel/main slider init *
    **********************************/

    $('#slides').owlCarousel({
        animateIn: 'fadeIn',
        /*animateOut: 'fadeOut',*/
        items:1,
        lazyLoad:true,
        dots:false,
        nav: true,
        navText: ["<i class='icon-left'></i>","<i class='icon-right'></i>"],
        loop:true,
        autoplay: true,
        autoplayTimeout:10000,
        onChanged: function (event) {
            setTimeout(function(){
                $('.active').addClass('animating').siblings().removeClass('animating')
            }, 100);
        }
    });

  /***************************
  *       sticky nav          *
  ****************************/
  $(window).scroll(function () {
      if ($(this).scrollTop() > 668) {
          $('body').addClass("nav-is-sticky");
          $('#navbar').addClass("slideFromTop");
      } else {
          $('body').removeClass("nav-is-sticky");
          $('#navbar').removeClass("slideFromTop");

      }
  });

/**********************************
*         Smooth scroll to link   *
**********************************/
    $('a[href*="#"]:not([href="#"],[class="nav-link"],[data-toggle])').on('click', function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        var target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000);
          return false;
        }
      }
    });
  /***************************
  *       Project Js         *
  ****************************/

  if (typeof Isotope == 'function') {


    var $container = $('#creations .list')
    // initialize Isotope
    $container.isotope({
      itemSelector: '.col-12',
      gutter: 0,
      transitionDuration: "0.5s",
      percentPosition: true,
      masonry: {
          // use outer width of grid-sizer for columnWidth
          columnWidth: '.col-12',
      }
    });
   
    /* bind filter button click*/
    $('.creations-filter').on( 'click', 'button', function() {
        var filterValue = $( this ).attr('data-filter');
      $container.isotope({ filter: filterValue });
    });

    /* change is-checked class on buttons*/
    $('.creations-filter').each( function( i, buttonGroup ) {
      var $buttonGroup = $( buttonGroup );
      $buttonGroup.on( 'click', 'button', function() {
        $( this ).addClass('btn-active').removeClass('btn-link').siblings().removeClass('btn-active').addClass('btn-link')
      });
    });
	  
	  // layout Isotope after each image loads
		$container.imagesLoaded().progress( function() {
		  $container.isotope('layout');
		}); 
  };


  /***************************************
  *               Datepicker
  ****************************************/
    /*instantiate dateoucjer*/
    $('input[name="date"]').datepicker({
        language: 'en',
        view: 'days',
        dateFormat: 'yyyy-mm-dd',
        // startDate: '+1d',
        minDate: new Date(),
        // maxDate: '+1M',
        autoClose: true,
        showOtherYears: false,
        selectOtherYears: false
    });

    /********************
    *   pricing toggler *
    ********************/
    var prcToggler = $('#prc-toggler');
    var prcTarget = $('#pricing');

    prcToggler.on('click', function(e) {
        e.preventDefault();
        prcTarget.toggleClass('monthly yearly');
    });
    
    /* add/remove focus class on form group addon */
    $( ".form-control" ).focus(function() {
        //alert( "Handler for .focus() called." );
        $(this).parent().addClass('focus');
    });

    $( ".form-control" ).focusout(function() {
        $(this).parent().removeClass('focus');
    });
    
    /**************************
    *     Cookine notice      *
    **************************/
    // if( Cookies.get('boka') == false ){
    //     alert('cookie not set');
    //     $("#cookie").removeClass('invisible').addClass("animated slideInUp");
    // }
    if( Cookies.get('boka') ){
      $("#cookie").addClass("invisible");
    }

    $('#cookieBtn').on( 'click', function() {
        var value = $.now();
        var options = {
            expires: 365
        };
        Cookies.set('boka', value, options);
        $("#cookie").addClass("animated slideOutDown");
    });



    /*details*/
    var stripTrigger = $('.stripTrigger');
        stripTrigger.on('click', function() {
        /*alert("stripTrigger was clicked.");*/
         $(this).addClass('active').siblings().removeClass('active');
        var target = $(this).attr('data-target');
        //alert(target);
        $('#strip').find(target).addClass('active').siblings().removeClass('active');
    });


    // magnificPopup

    $('.video').magnificPopup({type:'iframe'});
    
  /******************************
  *   Contact/Appoointment from *
  ******************************/
     /*fuctions*/
    function showResponse(responseText, statusText, xhr, $form)  { 
        /*alert('status: ' + statusText + '\n\nresponseText: \n' + responseText + */
        alert(responseText.msg);
    //                responseArea.removeClass('hidden').text( responseText.msg );
    }
    /*vars*/
    var form = $('#form');
    var responseArea = $('#response');
    form.validate({
        errorPlacement: function (error, element) {
            /*error.appendTo( element.parent("td").next("td") );*/
            error.appendTo( false );
        },
        highlight: function(element, errorClass, validClass) {
            $(element).addClass(errorClass).removeClass(validClass);
            /*$(element.form).find(".form-group").addClass(errorClass);*/
            $(element).closest(".form-group").addClass(errorClass).removeClass(validClass);
            $(element).closest(".form-group").addClass('animated').addClass('shake');
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).removeClass(errorClass).addClass(validClass);
            /*$(element.form).find(".form-group").removeClass(errorClass);*/
            $(element).closest(".form-group").addClass(validClass).removeClass(errorClass);
            $(element).closest(".form-group").removeClass('animated').removeClass('shake');
        },
        rules: {
            email: {
              email: true
            }
        },
        submitHandler: function(form) {
//            $(this).ajaxSubmit(options);
            $(form).ajaxSubmit({
//                target: '#response',
                success:    function(responseText, statusText, xhr) { 
                    /*alert('Thanks for your comment!'); */
                    if(responseText.status = true){
                        responseArea.removeClass('d-none').addClass('text-success').html(responseText.msg);
                        form.resetForm();
                    } else {
                        responseArea.removeClass('d-none').addClass('text-warning').html(responseText.msg);
                    }
                }
                
            });
        }
    });
    
});


/***********************************
*       Browser Smooth Scrolling for safari *
***********************************/
SmoothScroll();

/*** Bouton devis ***/

$(document).ready(function(){
    $(".devis-btn").mouseenter(function() {
        $(this).removeClass("animated fadeInRight");
        $(this).addClass("animated bounce")
    });

    $(".devis-btn").on("webkitAnimationEnd mozAnimationEnd oAnimationEnd animationEnd", function(event) {
        $(this).removeClass("animated bounce");
    });

    $("#offres .block .btn").click(function(e) {
        e.preventDefault();
        $("#offres .block").addClass("animated fadeOutUp");
        $($(this).data("target")).addClass("toShow");
    });

    $("#offres .block").on("webkitAnimationEnd mozAnimationEnd oAnimationEnd animationEnd", function(event) {
        $("#offres .block").hide();
        $("#offres .block").removeClass("animated fadeOutUp");
        $("#offres .toShow").addClass("animated fadeInDown").show();
    });

    /*$("#offres .toShow").on("webkitAnimationEnd mozAnimationEnd oAnimationEnd animationEnd", function(event) {
        console.log("test");
        $(this).removeClass("toShow fadeInDown");
    });*/

    $(document).on('click','#offres .toShow .btn', function(e) {
        e.preventDefault();
        console.log("test");
        $(this).closest(".toShow").removeClass("toShow fadeInDown");
        //$(this).closest(".detail").addClass("animated fadeOutUp toHide");
    });

    $("#offres .toHide").on("webkitAnimationEnd mozAnimationEnd oAnimationEnd animationEnd", function(event) {
        //$(this).hide();
        /*$(this).removeClass("toShow fadeOutUp");
        $("#offres .block").addClass("animated fadeInDown").show();*/
    });

    /*$("#offres .detail .btn").click(function(e) {
        console.log("test");
        e.preventDefault();
        $(this).removeClass("toShow fadeInDown");
        $("#offres .detail").removeClass("toShow").addClass("animated fadeOutDown toHide");
        $("#offres .block").show();
    });*/

    /*$("#offres .toHide").on("webkitAnimationEnd mozAnimationEnd oAnimationEnd animationEnd", function(event) {
        $("#offres .block").hide();
    });*/
});
