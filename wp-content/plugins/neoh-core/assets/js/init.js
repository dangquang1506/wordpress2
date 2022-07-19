(function($, fnFrontend){
	"use strict";
	
	
	
	var FrenifyNeoh = {
		
		isAdmin: false,
		adminBarH: 0,
		
		init: function() {
			
			if($('body').hasClass('admin-bar')){
				FrenifyNeoh.isAdmin 		= true;
				FrenifyNeoh.adminBarH 	= $('#wpadminbar').height();
			}

			var widgets = {
				'frel-gallery.default' : FrenifyNeoh.allGalleryFunctions,
				'frel-down-button.default' : FrenifyNeoh.downButtonFunction,
				'frel-roadmaps.default' : FrenifyNeoh.timeLine,
				'frel-video.default' : FrenifyNeoh.videoFunction,
				'frel-buttons.default' : FrenifyNeoh.ImgToSVG,
				'frel-team-member.default' : FrenifyNeoh.teamMemberFunction,
			};

			$.each( widgets, function( widget, callback ) {
				fnFrontend.hooks.addAction( 'frontend/element_ready/' + widget, callback );
			});
		},
		
		teamMemberFunction: function(){
			FrenifyNeoh.ImgToSVG();	
			FrenifyNeoh.BgImg();	
		},
		
		videoFunction: function(){
			$('.popup-youtube, .popup-vimeo').each(function() { // the containers for all your galleries
				$(this).magnificPopup({
					disableOn: 700,
					type: 'iframe',
					mainClass: 'mfp-fade',
					removalDelay: 160,
					preloader: false,
					fixedContentPos: true,
					callbacks: {
						open: function() {
						  $.magnificPopup.instance.close = function() {
							// Call the original close method to close the popup
							$.magnificPopup.proto.close.call(this);
						  };
						}
				  	}
				});
			});
			FrenifyNeoh.ImgToSVG();
		},
		
		timeLine: function(){
			var allContentItems 	= $('.neoh_fn_timeline .timeline_item');
			var progressLine		= $('.neoh_fn_timeline .progress_line');
			var allProgressItems 	= $('.neoh_fn_timeline .progress_line li');
			var activeProgressItem 	= $('.neoh_fn_timeline .progress_line .active');
			var activeLine 			= $('.neoh_fn_timeline .progress_line .active_line');
			var allProgressButtons	= $('.neoh_fn_timeline .progress_line a');
			var initialSpace		= 110;
			var spaceBetweenItems	= 230;
			
			FrenifyNeoh.timelineClasses(allContentItems,allProgressItems,'initial');
			
			$.each(allProgressItems, function(i,e){
				$(e).find('a').css({left: (initialSpace + (spaceBetweenItems * i)) + 'px'});
			});
			
			activeLine.css({width: (initialSpace + (activeProgressItem.index()*spaceBetweenItems) + activeProgressItem.find('a').width()/2) + 'px'});
			progressLine.css({width: (initialSpace*2 + (spaceBetweenItems * (allProgressItems.length-1)) + allProgressItems.last().find('a').width()/2) + 'px'});
			
			
			allProgressButtons.off().on('click',function(){
				var e = $(this);
				var p = e.parent();
				if(!p.hasClass('active')){
					var timeline 	= e.closest('.neoh_fn_timeline');
					var activeIndex = p.data('index');
					FrenifyNeoh.timelineClasses(allContentItems,allProgressItems,activeIndex);
					
					allProgressItems.removeClass('active');
					p.addClass('active');
					activeLine.css({width: (initialSpace + ((activeIndex-1)*spaceBetweenItems) + e.width()/2) + 'px'});
					allContentItems.removeClass('active');
					timeline.find('.timeline_item[data-index="'+activeIndex+'"]').addClass('active');
				}
				return false;
			});
			
			var space	= 0;
			var nextActive = true;
			var prevActive = true;
			var prevButton = $('.neoh_fn_timeline .nav_prev');
			var nextButton = $('.neoh_fn_timeline .nav_next');
			nextButton.off().on('click',function(){
				space += spaceBetweenItems*2*(-1);
				if((space) < (progressLine.parent().width() - progressLine.width())){
					space = progressLine.parent().width() - progressLine.width();
					nextActive = false;
				}else{
					nextActive = true;
				}
				if(space<0){
					prevActive = true;
				}
				if(!prevActive){
					prevButton.addClass('inactive');
				}else if(prevActive){
					prevButton.removeClass('inactive');
				}
				if(!nextActive){
					nextButton.addClass('inactive');
				}else if(nextActive){
					nextButton.removeClass('inactive');
				}
				progressLine.css({transform: 'translateX('+space+'px)'});
				return false;
			});
			prevButton.off().on('click',function(){
				nextActive = true;
				nextButton.removeClass('inactive');
				space += spaceBetweenItems*2;
				if(space > 0){
					space = 0;
					prevActive = false;
				}else if(prevActive){
					prevActive = true;
				}
				if(!prevActive){
					prevButton.addClass('inactive');
				}else{
					prevButton.removeClass('inactive');
				}
				progressLine.css({transform: 'translateX('+space+'px)'});
				return false;
			});
		},
		
		timelineClasses: function(allContentItems,allProgressItems,activeIndex){
			var isActive 	= false;
			var extraActiveIndex;
			$.each(allContentItems, function(i,e){
				$(e).removeClass('previous next');
				if(activeIndex === 'initial'){
					if($(e).hasClass('active')){
						isActive = true;
						return;
					}
				}else{
					if($(e).data('index') === activeIndex){
						isActive = true;
						return;
					}
				}
					
				if(isActive){
					$(e).addClass('next');
				}else{
					$(e).addClass('previous');
				}
			});
			isActive 	= false;
			if(activeIndex === 'initial'){
				extraActiveIndex = $('.neoh_fn_timeline .progress_line .active').data('index');
			}else{
				extraActiveIndex = activeIndex;
			}
			$.each(allProgressItems, function(i,e){
				$(e).removeClass('previous next').find('.circle').css({filter: 'none'});
				if(activeIndex === 'initial'){
					if($(e).hasClass('active')){
						isActive = true;
						return;
					}
				}else{
					if($(e).data('index') === activeIndex){
						isActive = true;
						return;
					}
				}
				if(isActive){
					$(e).addClass('next');
				}else{
					$(e).addClass('previous').find('.circle').css({filter: 'brightness('+(100*(i+1))/extraActiveIndex+'%)'});
				}
			});	
		},
		
		downButtonFunction: function(){
			$('.neoh_fn_down').on('click',function(){
				var e 		= $(this),
					href 	= e.attr('href');
				if(this.pathname === window.location.pathname || href.indexOf("#") !== -1){
					if($(href).length){
						$([document.documentElement, document.body]).animate({
							scrollTop: $(href).offset().top
						}, 600);
						return false;
					}
				}
			});
			FrenifyNeoh.ImgToSVG();
		},
		
		
		
		allGalleryFunctions: function(){
			FrenifyNeoh.lightGallery();
			FrenifyNeoh.justifiedGallery();
			FrenifyNeoh.galleryMasonry();
			FrenifyNeoh.BgImg();
			FrenifyNeoh.gallerySlider();
			FrenifyNeoh.collageCarousel();
			FrenifyNeoh.isotopeFunction();
			FrenifyNeoh.inlineStyle();
			FrenifyNeoh.gallerySlider2();
			setTimeout(function(){
				FrenifyNeoh.isotopeFunction();
			},2000);
		},
		
		gallerySlider2: function(){
			// slider
			var section		= $('.fn_cs_gallery_slider_2 .swiper-container');
			section.each(function(){
				var element				= $(this);
				if(element.hasClass('ready')){return false;}element.addClass('ready');
				var transform 			= 'Y';
				var direction 			= 'horizontal';
				var	interleaveOffset 	= 0.5;
				if(direction === 'horizontal'){
					transform 			= 'X';
				}
				// Main Slider
				var mainSliderOptions 	= {
					loop: true,
					speed: 1500,
					autoplay:{
						delay: 5000,
						disableOnInteraction: false,
					},
					slidesPerView: 1,
					direction: direction,
					loopAdditionalSlides: 10,
					watchSlidesProgress: true,
					on: {
						init: function(){
							this.autoplay.stop();
						},
						imagesReady: function(){
							this.autoplay.start();
						},
						progress: function(){
							var swiper = this;
							for (var i = 0; i < swiper.slides.length; i++) {
								var slideProgress 	= swiper.slides[i].progress,
								innerOffset 		= swiper.width * interleaveOffset,
								innerTranslate 		= slideProgress * innerOffset;
								$(swiper.slides[i]).find(".main_image").css({transform: "translate"+transform+"(" + innerTranslate + "px)"});
							}
						},
						touchStart: function() {
							var swiper = this;
							for (var i = 0; i < swiper.slides.length; i++) {
								swiper.slides[i].style.transition = "";
							}
						},
						setTransition: function(speed) {
							var swiper = this;
							for (var i = 0; i < swiper.slides.length; i++) {
								swiper.slides[i].style.transition = speed + "ms";
								swiper.slides[i].querySelector(".main_image").style.transition =
								speed + "ms";
							}
						}
					}
				};
				new Swiper(element, mainSliderOptions);
			});
			FrenifyNeoh.BgImg();
		},
		
		inlineStyle: function(){
			var style = '';
			$('.neoh_fn_style').each(function(){
				var element = $(this),
					value	= element.val();
				element.val('');
				style += value;
			});
			$('body').append(style);
		},
		
		collageCarousel: function(){
			var carousel 	= $('.fn_cs_gallery_collage_a .owl-carousel');
			var rtlMode		= false;
			if($('body').hasClass('rtl')){
				rtlMode		= true;
			}
			
			carousel.each(function(){
				var e		= $(this);
				var myNav	= false;
				var gutter	= parseInt(e.closest('.fn_cs_gallery_collage_a').data('gutter'));
				
				e.owlCarousel({
					items: 4,
					lazyLoad: true,
					loop:true,
					rtl: rtlMode,
					animateOut: 'fadeOut',
					animateIn: 'fadeIn',
					autoWidth:true,
					autoplay: true,
					autoplayTimeout: 70000,
					smartSpeed: 2000,
					margin: gutter,
					dots: true,
					nav: myNav,
					navSpeed: true
				});	
			});
		},
		
		gallerySlider: function(){
			$('.fn_cs_gallery_slider .inner').each(function(){
				var element 	= $(this);
				if(element.hasClass('gogogo')){
					return false;
				}element.addClass('gogogo');
				var container 	= element.find('.swiper-container');
				
				
				var pagination		= element.closest('.fn_cs_gallery_slider').data('pag');
				var paginationClass = 'fn_cs_swiper__progress';
				var type 			= 'custom';
				var clickable		= false;
				if(pagination === 'dots'){
					paginationClass = 'fn_cs_swiper__dots';
					type 			= 'bullets';
					clickable 		= true;
				}
				
				
				var mySwiper 	= new Swiper (container, {
					loop: true,
					slidesPerView: 1,
					spaceBetween: 70,
					loopAdditionalSlides: 50,
					speed: 800,
					autoplay: {
						delay: 8000,
					},
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
				  	},
					on: {
						init: function(){
							element.closest('.fn_cs_gallery_slider').addClass('ready');
						},
						autoplayStop: function(){
							mySwiper.autoplay.start();
						},
				  	},
					pagination: {
						el: '.'+paginationClass,
						type: type, // progressbar
						clickable: clickable,
						renderCustom: function (swiper,current,total) {
							if(pagination === 'fill' || pagination === 'scrollbar'){
								// progress animation
								var scale,translateX;
								var progressDOM	= container.find('.fn_cs_swiper__progress');
								if(progressDOM.hasClass('fill')){
									translateX 	= '0px';
									scale		= parseInt((current/total)*100)/100;
								}else{
									scale 		= parseInt((1/total)*100)/100;
									translateX 	= (current-1) * parseInt((100/total)*100)/100 + 'px';
								}


								progressDOM.find('.all span').css({transform:'translate3d('+translateX+',0px,0px) scaleX('+scale+') scaleY(1)'});
								if(current<10){current = '0' + current;}
								if(total<10){total = '0' + total;}
								progressDOM.find('.current').html(current);
								progressDOM.find('.total').html(total);
							}
						},
						renderBullet: function (index, className) {
							return '<span class="' + className + ' fn_dots"></span>';
					  	}
				  	},
			  	});
			});
			FrenifyNeoh.BgImg();
		},
		
		galleryMasonry: function(){
			FrenifyNeoh.lightGallery();
			FrenifyNeoh.isotopeFunction();
		},
		
		justifiedGallery: function(){
			FrenifyNeoh.lightGallery();
			var justified = $(".fn_cs_gallery_justified");
			justified.each(function(){
				var element 	= $(this);
				var height		= parseInt(element.attr('data-height'));
				var gutter		= parseInt(element.attr('data-gutter'));
				if(!height || height === 0){height = 400;}
				if(!gutter || gutter === 0){gutter = 10;}
				if($().justifiedGallery){
					element.justifiedGallery({
						rowHeight : height,
						lastRow : 'nojustify',
						margins : gutter,
						refreshTime: 500,
						refreshSensitivity: 0,
						maxRowHeight: null,
						border: 0,
						captions: false,
						randomize: false
					});
				}
			});
		},
		
		
		/* COMMMON FUNCTIONS */
		BgImg: function(){
			var div = $('*[data-fn-bg-img]');
			div.each(function(){
				var element = $(this);
				var attrBg	= element.attr('data-fn-bg-img');
				var dataBg	= element.data('fn-bg-img');
				if(typeof(attrBg) !== 'undefined'){
					element.addClass('frenify-ready');
					element.css({backgroundImage:'url('+dataBg+')'});
				}
			});
			var div2 = $('*[data-bg-img]');
			div2.each(function(){
				var element = $(this);
				var attrBg	= element.attr('data-bg-img');
				var dataBg	= element.data('bg-img');
				if(typeof(attrBg) !== 'undefined'){
					element.addClass('frenify-ready');
					element.css({backgroundImage:'url('+dataBg+')'});
				}
			});
		},
		
		ImgToSVG: function(){
			
			$('img.fn__svg').each(function(){
				var $img 		= $(this);
				var imgClass	= $img.attr('class');
				var imgURL		= $img.attr('src');

				$.get(imgURL, function(data) {
					var $svg = $(data).find('svg');
					if(typeof imgClass !== 'undefined') {
						$svg = $svg.attr('class', imgClass+' replaced-svg');
					}
					$img.replaceWith($svg);

				}, 'xml');

			});
		},
		
		jarallaxEffect: function(){
			$('.jarallax').each(function(){
				var element			= $(this);
				var	customSpeed		= element.data('speed');

				if(customSpeed !== "undefined" && customSpeed !== ""){
					customSpeed = customSpeed;
				}else{
					customSpeed 	= 0.5;
				}
				element.jarallax({
					speed: customSpeed,
					automaticResize: true
				});
			});
		},
		
		isotopeFunction: function(){
			var masonry = $('.fn_cs_masonry');
			if($().isotope){
				masonry.each(function(){
					$(this).isotope({
					  itemSelector: '.fn_cs_masonry_in',
					  masonry: {}
					});
					$(this).isotope( 'reloadItems' ).isotope();
				});
			}
			var items = $('.fn_cs_project_category .posts_list');
			if($().isotope){
				items.each(function() {
					$(this).isotope({
					  itemSelector: 'li',
					  masonry: {}
					});
				});
			}
		},
		
		lightGallery: function(){
			if($().lightGallery){
				// FIRST WE SHOULD DESTROY LIGHTBOX FOR NEW SET OF IMAGES
				var gallery = $('.fn_cs_lightgallery');

				gallery.each(function(){
					var element = $(this);
					element.lightGallery(); // binding
					if(element.length){element.data('lightGallery').destroy(true); }// destroying
					$(this).lightGallery({
						selector: ".lightbox",
						thumbnail: 1,
						loadYoutubeThumbnail: !1,
						loadVimeoThumbnail: !1,
						showThumbByDefault: !1,
						mode: "lg-fade",
						download:!1,
						getCaptionFromTitleOrAlt:!1,
					});
				});
			}	
		},
	};
	
	$( window ).on( 'elementor/frontend/init', FrenifyNeoh.init );
	
	
	$( window ).on('resize',function(){
		FrenifyNeoh.isotopeFunction();
		setTimeout(function(){
			FrenifyNeoh.isotopeFunction();
		},700);
	});
	$( window ).on('load',function(){
		FrenifyNeoh.isotopeFunction();
	});
	
	$(window).on('scroll',function(){
		
	});
	
})(jQuery, window.elementorFrontend);