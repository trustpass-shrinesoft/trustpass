/* Custom General jQuery
/*--------------------------------------------------------------------------------------------------------------------------------------*/
;(function($, window, document, undefined) {
	//Genaral Global variables
	//"use strict";
	var $win = $(window);
	var $doc = $(document);
	var $winW = function(){ return $(window).width(); };
	var $winH = function(){ return $(window).height(); };
	var $screensize = function(element){  
			$(element).width($winW()).height($winH());
		};
		
		var screencheck = function(mediasize){
			if (typeof window.matchMedia !== "undefined"){
				var screensize = window.matchMedia("(max-width:"+ mediasize+"px)");
				if( screensize.matches ) {
					return true;
				}else {
					return false;
				}
			} else { // for IE9 and lower browser
				if( $winW() <=  mediasize ) {
					return true;
				}else {
					return false;
				}
			}
		};

		$doc.ready(function() {
		/*--------------------------------------------------------------------------------------------------------------------------------------*/		
		// Remove No-js Class
		$("html").removeClass('no-js').addClass('js');
		
		
		
		/* Get Screen size
		---------------------------------------------------------------------*/
		$win.load(function(){
			$win.on('resize', function(){
				$screensize('your selector');	
			}).resize();	
		});
		
		
		/* Menu ICon Append prepend for responsive
		---------------------------------------------------------------------*/
		$(window).on('resize', function(){
			if (screencheck(1023)) {
				if(!$('#menu').length){
					$('#mainmenu').prepend('<a href="#" id="menu" class="menulines-button"><span class="menulines"></span></a>');
				}
				$(document).on('click',"#mainmenu li a", function(){
					$('#menu').removeClass('menuopen');
					$(this).parents('ul').slideUp('normal');
					return false;
				});
			} else {
				$("#menu").remove();
			}
		}).resize();

		
		/* Tab Content box 
		---------------------------------------------------------------------*/
		var tabBlockElement = $('.tab-data');
			$(tabBlockElement).each(function() {
				var $this = $(this),
					tabTrigger = $this.find(".tabnav li"),
					tabContent = $this.find(".tabcontent");
					var textval = [];
					tabTrigger.each(function() {
						textval.push( $(this).text() );
					});	
				$this.find(tabTrigger).first().addClass("active");
				$this.find(tabContent).first().show();

				
				$(tabTrigger).on('click',function () {
					$(tabTrigger).removeClass("active");
					$(this).addClass("active");
					$(tabContent).hide().removeClass('visible');
					var activeTab = $(this).find("a").attr("data-rel");
					$this.find('#' + activeTab).fadeIn('normal').addClass('visible');
								
					return false;
				});
			
				var responsivetabActive =  function(){
				if (screencheck(767)){
					if( !$('.tabMobiletrigger').length ){
						$(tabContent).each(function(index) {
							$(this).before("<h2 class='tabMobiletrigger'>"+textval[index]+"</h2>");	
							$this.find('.tabMobiletrigger:first').addClass("rotate");
						});
						$('.tabMobiletrigger').click('click', function(){
							var tabAcoordianData = $(this).next('.tabcontent');
							if($(tabAcoordianData).is(':visible') ){
								$(this).removeClass('rotate');
								$(tabAcoordianData).slideUp('normal');
								//return false;
							} else {
								$this.find('.tabMobiletrigger').removeClass('rotate');
								$(tabContent).slideUp('normal');
								$(this).addClass('rotate');
								$(tabAcoordianData).not(':animated').slideToggle('normal');
							}
							return false;
						});
					}
						
				} else {
					if( $('.tabMobiletrigger').length ){
						$('.tabMobiletrigger').remove();
						tabTrigger.removeClass("active");
						$this.find(tabTrigger).removeClass("active").first().addClass('active');
						$this.find(tabContent).hide().first().show();				
					}		
				}
			};
			$(window).on('resize', function(){
				if(!$this.hasClass('only-tab')){
					responsivetabActive();
				}
			}).resize();
		});
		
		/* Accordion box JS
		---------------------------------------------------------------------*/
		$('.accordion-databox').each(function() {
			var $accordion = $(this),
				$accordionTrigger = $accordion.find('.accordion-trigger'),
				$accordionDatabox = $accordion.find('.accordion-data');
				
				$accordionTrigger.first().addClass('open');
				$accordionDatabox.first().show();
				
				$accordionTrigger.on('click',function (e) {
					var $this = $(this);
					var $accordionData = $this.next('.accordion-data');
					if( $accordionData.is($accordionDatabox) &&  $accordionData.is(':visible') ){
						$this.removeClass('open');
						$accordionData.slideUp(400);
						e.preventDefault();
					} else {
						$accordionTrigger.removeClass('open');
						$this.addClass('open');
						$accordionDatabox.slideUp(400);
						$accordionData.slideDown(400);
					}
				});
		});
		
		
		/* MatchHeight Js
		-------------------------------------------------------------------------*/
		if($('.catblockbox').length){
			$('.catblockbox').matchHeight({
				byRow: false
			});
		}
		
		/*Mobile menu click
		---------------------------------------------------------------------*/
		$(document).on('click',"#menu", function(){
			$(this).toggleClass('menuopen');
			$(this).next('ul').slideToggle('normal');
			return false;
		});

		/* Go to next screen
		---------------------------------------------------------------------*/
		$('.scrolldown').click(function(){
			var getOffset = $('#main').offset().top;
			if($(window).width() < 1373){
				$("html:not(:animated),body:not(:animated)").animate({ scrollTop:getOffset-88},550)
			} else {
				$("html:not(:animated),body:not(:animated)").animate({ scrollTop:getOffset-109},550);
			}
			return false;
		});

		/*Mobile App Slider
		---------------------------------------------------------------------*/
		$('.mobileappsliderwrapper').slick({
			dots: false,
			prevArrow:'<a class="slicknavbtn slickprevbtn"><img src="images/slickprev.svg" alt=""></a>',
            nextArrow:'<a class="slicknavbtn slicknextbtn"><img src="images/slicknext.svg" alt=""></a>'
		});

		$('.slicknavbtn').appendTo('.slickarrowswrapper');
		
		/*Customer Logo Slider
		---------------------------------------------------------------------*/
		$('.customerlogoslider').slick({
			infinite: true,
			slidesToShow: 6,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 2000,
			pauseOnHover: false,
			pauseOnFocus: false,
			arrows: false,
			dots: false,
			responsive: [
				{
				  breakpoint: 768,
				  settings: {
					slidesToShow: 4,
					slidesToScroll: 1,
				  }
				},
				{
				  breakpoint: 568,
				  settings: {
					slidesToShow: 3,
					slidesToScroll: 1
				  }
				}
			  ]
		});

		/*Scrollyspy menu JS
		---------------------------------------------------------------------*/
		var lastId;
		var topMenu = $("#mainmenu");
		var topMenuHeight = 70;
		// All list items
		var menuItems = topMenu.find('li').find("a");
		// Anchors corresponding to menu items                
		var scrollItems = menuItems.map(function(){                    
			if( $(this).attr('href').indexOf('#') > -1 ){
				var hrf = $(this).attr('href').split('#');
				var item = $('#'+hrf[1]);
				if( item.length ) {                            
					return item; 
				}
			}
		});
		
		// Bind click handler to menu items
		// so we can get a fancy scroll animation
		menuItems.on('click', function(e){
			if( $(this).attr('href').indexOf('#') > -1 ){
				var hrf = $(this).attr('href').split('#'),
				offsetTop = hrf[1] === "#" ? 0 : $('#'+hrf[1]).offset().top-topMenuHeight+1;
				$('html, body').stop().animate({ 
					scrollTop: offsetTop
				}, 800);                        
				e.preventDefault();
			}
		});

		// Bind to scroll
		$(window).on('scroll', function(){
			// Get container scroll position
			var fromTop = $(this).scrollTop() + topMenuHeight;
			// Get id of current scroll item
			var cur = scrollItems.map(function(){                        
				if( $(this).offset().top < fromTop ) {
					return this;
				}
			});
			// Get the id of the current element
			cur = cur[cur.length-1];
			var id = cur && cur.length ? cur[0].id : "";
			 if( lastId !== id ) {
				lastId = id;
				// Set/remove active class                        
				menuItems.parent().removeClass("active").end().filter('a[href*="#'+id+'"]').parent().addClass("active");                        
			} else if( id == '' && lastId == '') {
				menuItems.parents('ul').find('li').removeClass("active");
			}                    
		});

		$('.backtotop').on('click', function(e) {
			$('html, body').animate({scrollTop:0}, '1500');
			return false;
		});

		if($(window).width() > 1025){
			AOS.init({
				once:true
			});	
		}

		if($(window).width() < 1024){
			$('.flexitem.txtalignright').removeClass('txtalignright');
		}

		/* sticky sidebar
		---------------------------------------------------------------------*/
		if($('.sticky').length){
			$('.sticky').Stickyfill();			
		}

		
/*--------------------------------------------------------------------------------------------------------------------------------------*/		
	});	

/*All function need to define here for use strict mode
----------------------------------------------------------------------------------------------------------------------------------------*/

	
/*--------------------------------------------------------------------------------------------------------------------------------------*/
})(jQuery, window, document);