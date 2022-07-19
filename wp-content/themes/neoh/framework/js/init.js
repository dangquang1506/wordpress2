/*
 * Copyright (c) 2022 Frenify
 * Author: Frenify
 * This file is made for CURRENT THEME
*/


/*

	@Author: Frenify
	@URL: http://themeforest.net/user/frenify


	This file contains the jquery functions for the actual theme, this
	is the file you need to edit to change the structure of the
	theme.

	This files contents are outlined below.

*/

var NeohAjax			= NeohAjaxObject;
var NeohListLimit		= NeohAjax.list_limit;
var NeohBody			= jQuery('body');
var NeohWrapper			= jQuery('.neoh-fn-wrapper');
var NeohCollection		= jQuery('.neoh_fn_collection');
var NeohFilterArray		= [];

// All other theme functions
(function ($){

	"use strict";
	
    var NeohInit 		= {
		
		
		
		pageNumber: 1,
		
        init: function () {
			this.cursor();
			this.blog_info();
			this.url_fixer();
			this.hamburgerOpener__Mobile();
			this.submenu__Mobile();
			this.imgToSVG();
			this.isotopeMasonry();
			this.dataFnBgImg();
			this.dataFnStyle();
			this.estimateWidgetHeight();
			this.categoryHook();	
			this.toTopJumper();
			this.prev_next_posts();
			this.widget__pages();
			this.widget__archives();
			this.portfolioContentHeight();
			this.inputCheckBoxInComment();
			
			
			// since Neoh
			this.animatedText();
			this.navFixer();
			this.headerTrigger();
			this.totop();
			this.progressTotop();
			this.movingBlog();
			this.menuFixer();
			this.widgetTriangle();
			this.widgetTitle();
			this.productModal();
			this.applyFilter();
			this.filterItems();
			this.pagedFilter();
			this.subscribe_form();
			this.roadmapScroll();
			this.fixAdminBar();
			this.minHeightPages();
			
        },
		
		minHeightPages: function(){
			var adminBar 		= $('#wpadminbar');
			var adminBarHeight 	= 0;
			var footer 			= $('.neoh_fn_footer');
			var footerHeight	= 0;
			if(adminBar.length){
				adminBarHeight = adminBar.height();
			}
			if (window.matchMedia('(max-width: 600px)').matches) {
				adminBarHeight = 0;
			}
			if(footer.length){
				footerHeight = footer.height();
			}
			$('.neoh_fn_page_ajax').css({minHeight: ($(window).height() - adminBarHeight - footerHeight) + 'px'});
		},
		
		fixAdminBar: function(){
			if(NeohBody.hasClass('admin-bar')){
				$('html').addClass('frenify-html');
			}
			if($('.neoh_fn_author_info .info_img img').length){
				$('.neoh_fn_author_info .info_in').css({marginTop: 0});
			}
		},
		
		
		preloader: function(){
			$('.neoh_fn_preloader').addClass('ready');
		},
		
		roadmapScroll: function(){
			if($('.neoh_fn_roadmaplist').length){
				var roadIn		= $('.road_in');
				var moveIt		= $('.neoh_fn_roadmaplist .moveit');
				var moveLine	= $('.neoh_fn_roadmaplist .moveline');
				var scrollTop 	= $(window).scrollTop();
				var roadOffset	= roadIn.offset().top;
				var height		= roadIn.height();
				var whHalf		= $(window).height()/2;
				var difference	= scrollTop - roadOffset + whHalf;
				var percentage	= (difference*100)/height;
				if((difference > 0) && (difference < height)){
					moveIt.css({transform: 'translateY('+(difference)+'px)',opacity: difference/height});
					moveLine.css({height: percentage + '%'});
				}
				
			}	
		},
		
		subscribe_form: function(){
			$('.neoh_fn_widget_subscribers a').on('click',function() {
				var e		= $(this);
				var p		= e.closest('.neoh_fn_widget_subscribers');
				var m		= p.find('.message');
				var i		= p.find('input');
				var email	= i.val();
				m.removeClass('error success');
				if(e.hasClass('loading')){
					m.addClass('error').html(m.data('loading')).slideDown(500).delay(2000).slideUp(500);
					return false;
				}
				e.addClass('loading');
				// conditions
				if(email === ''){
					m.addClass('error').html(m.data('no-email')).slideDown(500).delay(2000).slideUp(500);
					e.removeClass('loading');
					return false;
				}
				
				var emailRegex	= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				if(!emailRegex.test(email)){
					m.addClass('error').html(m.data('invalid-email')).slideDown(500).delay(2000).slideUp(500);
					e.removeClass('loading');
					return false;
				}
				
				var requestData = {
					action: 'neoh_fn_subsribe__add_email',
					security: NeohAjax.nonce,
					email: email
				};
				
				$.ajax({
					type: 'POST',
					url: NeohAjax.ajax_url,
					cache: false,
					data: requestData,
					success: function(data) {
						var fnQueriedObj 	= $.parseJSON(data);
						var status			= fnQueriedObj.status;
						if(status === 'old'){
							m.addClass('success').html(m.data('old-email')).slideDown(500).delay(2000).slideUp(500);
							i.val('');
							e.removeClass('loading');
						}else if(status === 'new'){
							m.addClass('success').html(m.data('success')).slideDown(500).delay(2000).slideUp(500);
							i.val('');
							e.removeClass('loading');
						}else if(status === 'invalid_email'){
							m.addClass('error').html(m.data('invalid-email')).slideDown(500).delay(2000).slideUp(500);
							e.removeClass('loading');
							return false;
						}
					},
					error: function() {
						
					}
				});
				return false;
			 });	
		},
		
		isotopeCollection: function(){
			$('.grid').isotope({
				itemSelector: 'li', // .element-item
				layoutMode: 'fitRows'
			});
		},
		
		
		applyFilter: function(){
			
			// initialization isotope function to our items
			NeohInit.isotopeCollection();
			// left filter on click function
			$('.neoh_fn_filters .checkbox').off().on('click',function(){
				
					// our clicked filter
				var element 	= $(this),
					
					// detect selected filter ID
					id 			= element.data('id');
				
				
				if(NeohCollection.hasClass('loading')){return false;}
				
				
				// if clicked item has clicked first time
				if(!element.hasClass('selected')){
					
					// attach 'selected' class to our filter
					element.addClass('selected');
					
					// add new filter id into our filters array in order to apply isotope filter for items next
					NeohFilterArray.push(id);
					
					// call Ajax function
					NeohInit.filterAjaxCall(element,1,'add',0);
					
				}
				// if clicked item has already clicked and clicked second time
				else{
					
					// remove attached 'selected' class
					element.removeClass('selected');
					
					// remove new filter ID from our filters array in order to apply isotope filter for items next
					var index = NeohFilterArray.indexOf(id);
					if(index !== -1){
						NeohFilterArray.splice(index, 1);
					}
					
					// call Ajax function
					NeohInit.filterAjaxCall(element,1,'remove',0);
				}
				
				return false;
			});
			
			// call remove filter function
			NeohInit.removeFilter();
		},
		
		
		filterAjaxCall: function(element,page,action,translate){
			NeohCollection.removeClass('ready').addClass('loading');
			var preloader = $('.neoh_fn_product_preloader');
			preloader.addClass('loading');
			
			
			if(action !== 'clear'){
				// get category name
				var category 	= element.data('category');

				// get filter name
				var filterName	= element.find('.text').text();

				// detect selected filter ID
				var id 			= element.data('id');
			}

			// filter result box
			var resultBox	= NeohCollection.find('.neoh_fn_result_box');
					
			// filter counter wrapper
			var filterCount = resultBox.find('.filter_count span');
			
			var requestData = {
				action: 'neoh_fn_ajax_portfolio',
				categories: NeohFilterArray.join(','),
				security: NeohAjax.nonce,
				page: page
			};
			


			$.ajax({
				type: 'POST',
				url: NeohAjax.ajax_url,
				cache: false,
				data: requestData,
				success: function(data) {
					var fnQueriedObj 	= $.parseJSON(data);
					var html			= fnQueriedObj.list;
					var pagination		= fnQueriedObj.pagination;
					
					// append new items into grid 
					NeohCollection.find('.grid').html(html);
					NeohInit.recallGridAfterFiltering();
					
					if(translate === 0){
						var scrollTop		= $(window).scrollTop();
						var elementOffset	= $(".neoh_fn_collectionpage").offset().top;
						var difference	 	= Math.abs(scrollTop-elementOffset) * 0.8;

						if(difference < 200){difference = 200;}
						if(difference > 1000){difference = 1000;}
						$([document.documentElement, document.body]).animate({
							scrollTop: $(".neoh_fn_collectionpage").offset().top
						}, difference);
					}
						
					
					if($('.neoh_fn_pagination').length){
						$('.neoh_fn_pagination').remove();
					}
					NeohCollection.find('.neoh_fn_result_list').append(pagination);
					
					
					
					if(action === 'add'){
						// add 'clear all' button to our result box if there was no any filters early
						if(resultBox.find('.result_item').length === 0){
							resultBox.append('<a href="#" class="clear_all">'+NeohAjax.clear_all_text+'</a>');
						}
						
						// find our 'clear all' button and add our new filter before the button
						resultBox.find('.clear_all').before('<div class="result_item" data-id="'+id+'"><a href="#" title="Remove Filter">' + category + ': '+'<span>' + filterName + '</span>' + '<img src="'+NeohAjax.cancel_svg+'" alt="" class="fn__svg"></a></div>');
					
						// change selected filter checkbox value into 'checked'
						element.find('input[type="checkbox"]').prop('checked','checked');
						
						// increase filter count and insert into our counter wrapper
						filterCount.text(parseInt(filterCount.text())+1);
						
					}else if(action === 'remove'){
						
					
						// remove this filter from result box
						NeohCollection.find('.result_item[data-id="'+id+'"]').remove();

						// remove 'clear all' button if removed filter was the only one (alone)
						if(resultBox.find('.result_item').length === 0){
							resultBox.find('.clear_all').remove();
						}
					
						// change selected filter checkbox value into 'not checked'
						element.find('input[type="checkbox"]').prop('checked','');

						// decrease filter count and insert into our counter wrapper
						filterCount.text(parseInt(filterCount.text())-1);
						
					}else if(action === 'clear'){
						
						
						$('.neoh_fn_filters .checkbox').removeClass('selected').find('input[type="checkbox"]').prop('checked','');
						
						// remove all filters from result box
						NeohCollection.find('.result_item').remove();
						
						// remove 'clear all' button
						resultBox.find('.clear_all').remove();
						
						// clear filter count
						filterCount.text(0);
					}
						
					
					
					// recall some functions
					NeohInit.imgToSVG();
					NeohInit.removeFilter();
					NeohInit.productModal();
					NeohInit.pagedFilter();
					
					preloader.removeClass('loading');
					NeohCollection.removeClass('loading').addClass('ready');
				},
				error: function(xhr, textStatus, errorThrown){
					console.log(errorThrown);
					console.log(textStatus);
					console.log(xhr);
				}
			});
		},
		
		pagedFilter: function(){
			$('.neoh_fn_collectionpage .neoh_fn_pagination a').off().on('click',function(){
				if(NeohCollection.hasClass('loading')){return false;}
				var element		= $(this),
					page		= element.find('input').val();
				if(!element.hasClass('current')){
					NeohInit.filterAjaxCall(element,page,'page',0);
				}
				return false;
			});
		},
		
		removeFilter: function(){
			$('.neoh_fn_result_box .result_item a').off().on('click',function(){
				if(NeohCollection.hasClass('loading')){return false;}
				var e 			= $(this),
					id 			= e.closest('.result_item').data('id'),
					element		= $('.neoh_fn_filters .checkbox[data-id="'+id+'"]');
				// remove new filter ID from our filters array in order to apply isotope filter for items next
				var index = NeohFilterArray.indexOf(id);
				if(index !== -1){
					NeohFilterArray.splice(index, 1);
				}
					
				// call Ajax function
				NeohInit.filterAjaxCall(element,1,'remove',1);
				return false;
			});
			
			$('.neoh_fn_result_box .clear_all').off().on('click',function(){
				if(NeohCollection.hasClass('loading')){return false;}
				var e 			= $(this);
				
				NeohFilterArray = [];	
				// call Ajax function
				NeohInit.filterAjaxCall(e,1,'clear',1);
				return false;
			});
		},
		
		recallGridAfterFiltering: function(){
			var $grid = $('.grid').isotope({
				itemSelector: 'li', // .element-item
				layoutMode: 'fitRows'
			});
			
			setTimeout(function(){
				$grid.isotope( 'reloadItems' ).isotope();
			}, 200);
		},
		
		filterItems: function(){
			$('.filter_item__header a').off().on('click',function(){
				$(this).closest('.filter_item').toggleClass('closed');
				return false;
			});
		},
		
		productModal: function(){
			var modal = $('.neoh_fn_modal.product_modal');
			$('.neoh_fn_drops .item a').off().on('click', function(){
				var element		= $(this);
				var parent		= element.closest('.item');
				var image		= parent.data('modal-image');
				var title		= parent.data('modal-title');
				var description	= parent.data('modal-description');
				var permalink	= parent.data('modal-permalink');
				
				modal.find('.buttons').html(parent.find('.hidden_btns').html());
				modal.find('.img_item').html('<img src="'+image+'" />');
				modal.find('.neoh_fn_title .fn_title').text(title);
				modal.find('.desc p').text(description).append('<a href="'+permalink+'">'+NeohAjax.read_more_nft+'</a>');
				
				
				modal.addClass('opened');
				return false;
			});
			
			modal.find('.modal_closer a').off().on('click', function(){
				modal.removeClass('opened');
				return false;
			});
			
			modal.find('.modal_ux_closer').off().on('click', function(){
				modal.removeClass('opened');
				return false;
			});
		},
		
		widgetTitle: function(){
			$('.wp-block-group__inner-container > h1,.wp-block-group__inner-container > h2,.wp-block-group__inner-container > h3,.wp-block-group__inner-container > h4,.wp-block-group__inner-container > h5,.wp-block-group__inner-container > h6').each(function(){
				var e = $(this);
				e.after('<div class="wid-title"><span class="text">'+e.text()+'</span><span class="icon"></span></div>');
				e.remove();
			});
			NeohInit.widgetTriangle();
		},
		
		widgetTriangle: function(){
			$('.wid-title .text').each(function(){
				var e = $(this);
				e.closest('.wid-title').css('--th',e.outerHeight() + 'px');
			});
		},
		
		animatedText: function(){
			$('.fn_animated_text').each(function(){
				var element = $(this);
				var letters = element.text().split('');
				var time 	= element.data('wait');
				if(!time){time = 0;}
				var speed	= element.data('speed');
				if(!speed){speed = 4;}
				speed = speed / 100;
				element.html('<em>321...</em>').addClass('ready');
				
				element.waypoint({
					handler: function(){
						if(!element.hasClass('stop')){
							element.addClass('stop');
							setTimeout(function(){
							element.text('');
								$.each(letters,function(e,i){
									var span = document.createElement("span");
									span.textContent = i;
									span.style.animationDelay = e * speed + 's';
									element.append(span);
								});
							},time);
						}
					},
					offset:'90%'	
				});
					
			});
		},
		
		menuFixer: function (){
			var menu	 		= $('.neoh_fn_header');
			var WinOffset		= $(window).scrollTop();

			if(WinOffset > 150){
				menu.addClass('fixer');
			}else{
				menu.removeClass('fixer');
			}
		},
		
		movingBlog: function(){
			var blog = $('.neoh_fn_moving_blog');
			if(blog.length){
				if(!$('.neoh_fn_moving_box').length){
					$('body').append('<div class="neoh_fn_moving_box">');
				}
				var movingBox		= $('.neoh_fn_moving_box');
				var list			= $('.neoh_fn_moving_blog .item');	
				list.on('mouseenter',function(event){
					var element			= $(this);
					if(!element.hasClass('active')){
						list.removeClass('active');
						element.addClass('active');
						movingBox.addClass('active');
						var imgURL		= element.find('.img_holder img').attr('src');
						movingBox.css({backgroundImage: 'url('+imgURL+')'});
						movingBox.css({left: (event.clientX + 15)+'px',top: (event.clientY + 15) +'px'});
					}
				}).on('mouseleave',function(){
					list.removeClass('active');
					movingBox.removeClass('active');
				}).on('mousemove',function(event){
					movingBox.css({left: (event.clientX + 15)+'px',top: (event.clientY + 15) + 'px'});
				});
			}	
		},
		
		totop: function (){
			var minSpeed 		= 500;
			var maxSpeed		= 1500;
			$(".neoh_fn_totop").off().on('click', function(e) {
				e.preventDefault();
				var speed		= ($(window).scrollTop()-$(window).height())/2;
				if(speed < minSpeed){speed = minSpeed;}
				if(speed > maxSpeed){speed = maxSpeed;}
				$("html, body").animate({ scrollTop: 0 }, speed);
				return false;
			});
		},
		
		progressTotop: function(){
			var adminBar		= $('#wpadminbar');
			var adminBarHeight 	= 0;
			if(adminBar.length){
				adminBarHeight 	= adminBar.height();
			}
			var winScroll 		= window.pageYOffset;
			var height 			= document.body.clientHeight;
			var scrolled 		= parseInt((winScroll / (height-window.innerHeight + adminBarHeight)) * 300);
			var totop			= $('.neoh_fn_totop');
			if(winScroll > 0){
				totop.addClass('active');
			}else{
				totop.removeClass('active');
			}
			totop.find('.stroke-solid').css('stroke-dashoffset',300 - scrolled);
		},
		
		navFixer: function(){
			var navFooter		= $('.neoh_fn_nav .nav_footer');
			var adminBar		= $('#wpadminbar');
			var adminBarHeight 	= 0;
			if(adminBar.length){
				adminBarHeight 	= adminBar.height();
			}
			if(navFooter.length){
				var footerHeight = navFooter.outerHeight();
				$('.neoh_fn_nav .nav_content').css({height: ($(window).height() - footerHeight - adminBarHeight) + 'px' });
			}
			$('.admin-bar .neoh_fn_nav').css({height: ($(window).height() - adminBarHeight) + 'px'});
		},
		
		headerTrigger: function(){
			var trigger 		= $('.neoh_fn_header .trigger');
			var navOverlay		= $('.nav_overlay');
			var rightNav		= $('.neoh_fn_nav');
			var trigger2 		= rightNav.find('.trigger');
			var links			= $('.neoh_fn_nav .nav_menu a');
			var bottom			= $('.neoh_fn_nav .nav_bottom');
			var footer			= $('.neoh_fn_nav .nav_footer');

			var menuItems		= $('.neoh_fn_nav .neoh_fn_main_nav > li');

			$.each(menuItems, function(i,e){
				$(e).css({transform: 'translateX('+(i+1)*30+'px)',opacity: 0});
			});
			var a				= menuItems.length * 200;
			var waitForMe		= null;
			trigger.on('click',function(){
				if(!trigger.hasClass('is-active')){
					clearTimeout(waitForMe);
					trigger.addClass('is-active');
					rightNav.find('.trigger').addClass('is-active');
					navOverlay.addClass('go');
					rightNav.addClass('go');
					waitForMe = setTimeout(function(){
						
						$.each(menuItems, function(i,e){
							setTimeout(function(){
								$(e).css({transform: 'translateX(0px)',opacity: 1});
							},i*200);
						});
					},2000);
					waitForMe = setTimeout(function(){
						trigger2.addClass('opened');
					},2000 + a);
					waitForMe = setTimeout(function(){
						bottom.addClass('ready');
						footer.addClass('ready');
					},2200 + (menuItems.length * 200));
				}
				return false;
			});
			trigger2.on('click',function(){
				if(trigger2.hasClass('is-active')){
					trigger2.removeClass('opened');
					clearTimeout(waitForMe);
					$.each(menuItems, function(i,e){
						$(e).css({transform: 'translateX('+(i+1)*30+'px)',opacity: 0});
					});
					trigger2.removeClass('is-active');
					trigger.removeClass('is-active');
					navOverlay.removeClass('go');
					rightNav.removeClass('go');
					bottom.removeClass('ready');
					footer.removeClass('ready');
				}
				return false;
			});
			navOverlay.on('click',function(){
				if(trigger.hasClass('is-active')){
					trigger2.removeClass('opened');
					clearTimeout(waitForMe);
					$.each(menuItems, function(i,e){
						$(e).css({transform: 'translateX('+(i+1)*30+'px)',opacity: 0});
					});
					trigger.removeClass('is-active');
					trigger2.removeClass('is-active');
					navOverlay.removeClass('go');
					rightNav.removeClass('go');
					bottom.removeClass('ready');
					footer.removeClass('ready');
				}
				return false;
			});
			
			links.off().on('click',function(){
				var link = $(this);
				var submenu	= link.siblings('.sub-menu');
				var parent	= link.parent();
				// check for sub-menu
				if(submenu.length){
					if(!parent.hasClass('opened')){
						parent.addClass('opened');
						submenu.slideDown();
						parent.siblings('.opened').removeClass('opened').find('.sub-menu').slideUp();
					}else{
						parent.removeClass('opened');
						submenu.slideUp();
					}
					return false;
				}
				link.closest('.menu-item').addClass('active');
				if(trigger2.hasClass('is-active')){
					trigger2.removeClass('opened');
					$.each(menuItems, function(i,e){
						if(!$(e).hasClass('active')){
							$(e).css({transform: 'translateX('+(i+1)*30+'px)',opacity: 0});
						}
					});
					bottom.removeClass('ready');
					footer.removeClass('ready');
					setTimeout(function(){
						trigger2.removeClass('is-active');
						trigger.removeClass('is-active');
						navOverlay.removeClass('go');
						rightNav.removeClass('go');
					},500);
					setTimeout(function(){
						window.open(link.attr('href'), "_self");
					},1500);
				}
				return false;
			});
		},
		
		
		
		
		// ************************************************************************
		// ************************************************************************
		// ************************************************************************
		blog_info: function(){
			if($('.blog_info').height() === 0){
				$('.neoh_fn_comment').addClass('margin-no-top');
			}
			if($('.wp-calendar-nav').length){
				$('.wp-calendar-nav').each(function(){
					var e = $(this);
					if(!e.find('a').length){
						e.remove();
					}
				});
			}
		},
		
		projectPopup: function(){
			$('.neoh_popup_gallery').each(function() { // the containers for all your galleries
				$(this).magnificPopup({
					delegate: 'a.zoom', // the selector for gallery item
					type: 'image',
					gallery: {
					  enabled:true
					},
					removalDelay: 300,
					mainClass: 'mfp-fade'
				});

			});
			$('.neoh_popup_youtube, .neoh_popup_vimeo').each(function() { // the containers for all your galleries
				$(this).magnificPopup({
					disableOn: 700,
					type: 'iframe',
					mainClass: 'mfp-fade',
					removalDelay: 160,
					preloader: false,
					fixedContentPos: false
				});
			});

			$('.neoh_popup_soundcloude').each(function(){
				$(this).magnificPopup({
					type : 'image',
					gallery: {
						enabled: true, 
					},
				});	
			});
		},
		
		
		
		inputCheckBoxInComment: function(){
			if($('p.comment-form-cookies-consent input[type=checkbox]').length){
				$('p.comment-form-cookies-consent input[type=checkbox]').wrap('<label class="fn_checkbox"></label>').after('<span></span>');
			}
		},
		
		portfolioContentHeight: function(){
			var portfolio = $('.neoh_fn_portfolio_page .portfolio_content');
			if(portfolio.height() === 0){
				portfolio.css({display: 'none'});
			}
		},
		
		url_fixer: function(){
			$('a[href*="fn_ex_link"]').each(function(){
				var oldUrl 	= $(this).attr('href'),
					array   = oldUrl.split('fn_ex_link/'),
					newUrl  = NeohAjax.siteurl + "/" + array[1];
				$(this).attr('href', newUrl);
			});
			if($('.neoh-fn-protected').length){
				$('.neoh_fn_pagein').css({paddingTop: 0});
			}
		},
		
		
		
		portfolioFilter: function(){
			var self					= this;
			$('.neoh_fn_portfolio_page .fn_ajax_more a').off().on('click',function(){
				var thisButton 			= $(this);
				var more				= thisButton.closest('.fn_ajax_more');
				var input				= more.find('input');
				var abb					= thisButton.closest('.neoh_fn_portfolio_page');
				var filter_page			= parseInt(input.val());
				if(thisButton.hasClass('active')){
					return false;
				}
				if(!abb.hasClass('go') && !more.hasClass('disabled')){
					abb.addClass('go');
					
					var requestData = {
						action: 'neoh_fn_ajax_portfolio',
						filter_page: filter_page,
					};

					
					$.ajax({
						type: 'POST',
						url: NeohAjax.ajax_url,
						cache: false,
						data: requestData,
						success: function(data) {
							var fnQueriedObj 	= $.parseJSON(data);
							var html			= fnQueriedObj.data;
							var $grid			= abb.find('.posts_list');
							var $items;
							$items = $(html);
							input.val(filter_page+1);
							input.change();
							
							if(fnQueriedObj.disabled === 'disabled'){
								more.addClass('disabled');
							}
						 	$grid.append( $items ).isotope( 'appended', $items );
							setTimeout(function(){
								$grid.isotope({
									itemSelector: 'li',
									masonry: {},
									stagger: 30
								});
							},500);
							self.dataFnBgImg();
							self.dataFnStyle();
							abb.removeClass('go');
						},
						error: function(xhr, textStatus, errorThrown){
							abb.removeClass('go');
						}
					});
				}
					
				
				return false;
			});	
		},
		
		projectCategoryFitler: function(){
			if($().isotope){
				var items = $('.neoh_fn_ajax_portfolio');
				items.each(function() {
					var thisItem 	= $(this);
					var list 		= thisItem.find('.posts_list');
					var filter 		= thisItem.find('.posts_filter');
					
					list.isotope({
					  	itemSelector: 'li',
						masonry: {},
						stagger: 30
					});

					// Isotope Filter 
					filter.find('a').off().on('click', function() {
						var element		= $(this);
						var selector 	= element.attr('data-filter');
						list 			= thisItem.find('.posts_list');
						filter.find('li').removeClass('current');
						element.parent().addClass('current');
						list.isotope({
							filter: selector,
							animationOptions: {
								duration: 750,
								easing: 'linear',
								queue: false
							}
						});
						return false;
					});

				});
			}
			
		},
		
		cursor: function () {
			var myCursor = $('.frenify-cursor');
			if (myCursor.length) {
				if ($("body").length) {
					const e = document.querySelector(".cursor-inner"),
						t 	= document.querySelector(".cursor-outer");
					var n, i = 0,W = 0,intro = 0,
						o = !1;
					if($('.neoh_fn_intro').length){intro=1;}
					
					var buttons = ".modal_ux_closer, .neoh_fn_nav .trigger,.neoh_fn_header .trigger,.fn_cs_intro_testimonials .prev, .fn_cs_intro_testimonials .next, .fn_cs_swiper_nav_next, .fn_cs_swiper_nav_prev, .fn_dots, .swiper-button-prev, .swiper-button-next, .fn_cs_accordion .acc_head, .neoh_fn_popupshare .share_closer, .neoh_fn_header .fn_finder, .neoh_fn_header .fn_trigger, a, input[type='submit'], .cursor-link, button";
					var sliders = ".owl-carousel, .swiper-container, .cursor-link";
					// link mouse enter + move
					window.onmousemove = function(s) {
						o || (t.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)"), e.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)", n = s.clientY, i = s.clientX
					}, $("body").on("mouseenter", buttons, function() {
						e.classList.add("cursor-hover"), t.classList.add("cursor-hover")
					}), $("body").on("mouseleave", buttons, function() {
						$(this).is("a") && $(this).closest(".cursor-link").length || (e.classList.remove("cursor-hover"), t.classList.remove("cursor-hover"))
					}), e.style.visibility = "visible", t.style.visibility = "visible";
					
					
					// slider mouse enter
					NeohBody.on('mouseenter', sliders, function(){
						e.classList.add('cursor-slider');
						t.classList.add('cursor-slider');
					}).on('mouseleave', sliders,function(){
						e.classList.remove('cursor-slider');
						t.classList.remove('cursor-slider');
					});
					
					// slider mouse hold
					NeohBody.on('mousedown', sliders, function(){
						e.classList.add('mouse-down');
						t.classList.add('mouse-down');
					}).on('mouseup', sliders, function(){
						e.classList.remove('mouse-down');
						t.classList.remove('mouse-down');
					});
				}
			}
		},
		
		widget__archives: function(){
			$('.widget_archive li').each(function(){
				var e = $(this);
				var a = e.find('a').clone();
				NeohBody.append('<div class="frenify_hidden_item"></div>');
				$('.frenify_hidden_item').html(e.html());
				$('.frenify_hidden_item').find('a').remove();
				var suffix = $('.frenify_hidden_item').html().match(/\d+/); // 123456
				$('.frenify_hidden_item').remove();
				suffix = parseInt(suffix);
				if(isNaN(suffix)){
					return false;
				}
				suffix = '<span class="count">'+suffix+'</span>';
				e.html(a);
				e.append(suffix);
			});
		},
		
		prev_next_posts: function(){
			if($('.neoh_fn_siblings')){
				$(document).keyup(function(e) {
					if(e.key.toLowerCase() === 'p') {
						var a = $('.neoh_fn_siblings').find('a.previous_project_link');
						if(a.length){
							window.location.href = a.attr('href');
							return false;
						}
					}
					if(e.key.toLowerCase() === 'n') {
						var b = $('.neoh_fn_siblings').find('a.next_project_link');
						if(b.length){
							window.location.href = b.attr('href');
							return false;
						}
					}
				});
			}
		},
		
		
		
		
		categoryHook: function(){
			var self = this;
			var list = $('.wp-block-archives li, .widget_neoh_custom_categories li, .widget_categories li, .widget_archive li');
			list.each(function(){
				var item = $(this);
				if(item.find('ul').length){
					item.addClass('has-child');
				}
			});
			
			
			var html = $('.neoh_fn_hidden.more_cats').html();
			var cats = $('.widget_categories,.widget_archive,.widget_neoh_custom_categories');
			if(cats.length){
				cats.each(function(){
					var element = $(this);
					element.find('.block_inner').append(html);
					var li = element.find('ul:not(.children) > li');
					if(li.length > NeohListLimit){
						var h = 0;
						li.each(function(i,e){
							if(i < NeohListLimit){
								h += $(e).outerHeight(true,true);
							}else{
								return false;
							}
						});
						element.find('ul:not(.children)').css({height: h + 'px'});
						element.find('.neoh_fn_more_categories .fn_count').html('('+(li.length-NeohListLimit)+')');
					}else{
						element.addClass('all_active');
					}
				});
				self.categoryHookAction();
			}
			var cats2 = $('.wp-block-categories-list,.wp-block-archives-list');
			if(cats2.length){
				cats2.each(function(){
					var element = $(this);
					element.after(html);
					var li = element.children();
					if(li.length > NeohListLimit){
						var h = 0;
						li.each(function(i,e){
							if(i < NeohListLimit){
								h += $(e).outerHeight(true,true);
							}else{
								return false;
							}
						});
						element.css({height: h + 'px'});
						element.closest('.widget_block').find('.neoh_fn_more_categories .fn_count').html('('+(li.length-NeohListLimit)+')');
					}else{
						element.addClass('all_active');
					}
				});
				self.categoryHookAction();
			}
		},
		
		categoryHookAction: function(){
			$('.neoh_fn_more_categories').find('a').off().on('click',function(){
				var e 			= $(this);
				var myLimit		= NeohListLimit;
				var parent 		= e.closest('.widget_block');
				var li 			= parent.find('ul:not(.children) > li');
				var liHeight	= li.outerHeight(true,true);
				var h			= liHeight*NeohListLimit;
				var liLength	= li.length;
				var speed		= (liLength-NeohListLimit)*50;
				e.toggleClass('show');
				if(e.hasClass('show')){
					myLimit		= liLength;
					h			= liHeight*liLength;
					e.find('.text').html(e.data('less'));
					e.find('.fn_count').html('');
				}else{
					e.find('.text').html(e.data('more'));
					e.find('.fn_count').html('('+(liLength-NeohListLimit)+')');
				}
				
				
				var H = 0;
				li.each(function(i,e){
					if(i < myLimit){
						H += $(e).outerHeight(true,true);
					}else{
						return false;
					}
				});
				
				speed = (speed > 300) ? speed : 300;
				speed = (speed < 1500) ? speed : 1500;
				parent.find('ul:not(.children)').animate({height:H},speed);
				
				
				
				return false;
			});
		},
		
		
		
		
		toTopJumper: function(){
			var totop		= $('.neoh_fn_footer .footer_totop a,a.neoh_fn_totop,.neoh_fn_footer .footer_right_totop a');
			if(totop.length){
				totop.on('click', function(e) {
					e.preventDefault();		
					$("html, body").animate(
						{ scrollTop: 0 }, 'slow');
					return false;
				});
			}
		},
		
		
		widget__pages: function(){
			var nav 						= $('.widget_pages ul');
			nav.each(function(){
				$(this).find('a').off().on('click', function(e){
					var element 			= $(this);
					var parentItem			= element.parent('li');
					var parentItems			= element.parents('li');
					var parentUls			= parentItem.parents('ul.children');
					var subMenu				= element.next();
					var allSubMenusParents 	= nav.find('li');

					allSubMenusParents.removeClass('opened');

					if(subMenu.length){
						e.preventDefault();

						if(!(subMenu.parent('li').hasClass('active'))){
							if(!(parentItems.hasClass('opened'))){parentItems.addClass('opened');}

							allSubMenusParents.each(function(){
								var el = $(this);
								if(!el.hasClass('opened')){el.find('ul.children').slideUp();}
							});

							allSubMenusParents.removeClass('active');
							parentUls.parent('li').addClass('active');
							subMenu.parent('li').addClass('active');
							subMenu.slideDown();


						}else{
							subMenu.parent('li').removeClass('active');
							subMenu.slideUp();
						}
						return false;
					}
				});
			});
		},
		
		submenu__Mobile: function(){
			var nav 						= $('ul.vert_menu_list, .widget_nav_menu ul.menu');
			var mobileAutoCollapse			= NeohWrapper.data('mobile-autocollapse');
			nav.each(function(){
				$(this).find('a').off().on('click', function(e){
					var element 			= $(this);
					var parentItem			= element.parent('li');
					var parentItems			= element.parents('li');
					var parentUls			= parentItem.parents('ul.sub-menu');
					var subMenu				= element.next();
					var allSubMenusParents 	= nav.find('li');

					allSubMenusParents.removeClass('opened');

					if(subMenu.length){
						e.preventDefault();

						if(!(subMenu.parent('li').hasClass('active'))){
							if(!(parentItems.hasClass('opened'))){parentItems.addClass('opened');}

							allSubMenusParents.each(function(){
								var el = $(this);
								if(!el.hasClass('opened')){el.find('ul.sub-menu').slideUp();}
							});

							allSubMenusParents.removeClass('active');
							parentUls.parent('li').addClass('active');
							subMenu.parent('li').addClass('active');
							subMenu.slideDown();


						}else{
							subMenu.parent('li').removeClass('active');
							subMenu.slideUp();
						}
						return false;
					}
					if(mobileAutoCollapse === 'enable'){
						if(nav.parent().parent().hasClass('opened')){
							nav.parent().parent().removeClass('opened').slideUp();
							$('.neoh_fn_mobilemenu_wrap .hamburger').removeClass('is-active');
						}
					}
				});
			});
		},
		
		hamburgerOpener__Mobile: function(){
			var hamburger		= $('.neoh_fn_mobilemenu_wrap .hamburger');
			hamburger.off().on('click',function(){
				var element 	= $(this);
				var menupart	= $('.neoh_fn_mobilemenu_wrap .mobilemenu');
				if(element.hasClass('is-active')){
					element.removeClass('is-active');
					menupart.removeClass('opened');
					menupart.slideUp(500);
				}else{
					element.addClass('is-active');
					menupart.addClass('opened');
					menupart.slideDown(500);
				}return false;
			});
		},
		
		
		
		imgToSVG: function(){
			$('img.fn__svg').each(function(){
				var img 		= $(this);
				var imgClass	= img.attr('class');
				var imgURL		= img.attr('src');

				$.get(imgURL, function(data) {
					var svg 	= $(data).find('svg');
					if(typeof imgClass !== 'undefined') {
						svg 	= svg.attr('class', imgClass+' replaced-svg');
					}
					img.replaceWith(svg);

				}, 'xml');

			});	
		},
		
		
		dataFnStyle: function(){
			$('[data-fn-style]').each(function(){
				var el		= $(this);
				var s 		= el.attr('data-fn-style');
				$.each(s.split(';'),function(i,e){
					el.css(e.split(':')[0],e.split(':')[1]);
				});
			});
		},
		
		dataFnBgImg: function(){
			var bgImage 	= $('*[data-fn-bg-img]');
			bgImage.each(function(){
				var element = $(this);
				var attrBg	= element.attr('data-fn-bg-img');
				var bgImg	= element.data('fn-bg-img');
				if(typeof(attrBg) !== 'undefined'){
					element.addClass('frenify-ready');
					if(bgImg === ''){
						return;
					}
					element.css({backgroundImage:'url('+bgImg+')'});
				}
			});
			var bgImage2 	= $('*[data-bg-img]');
			bgImage2.each(function(){
				var element = $(this);
				var attrBg	= element.attr('data-bg-img');
				var bgImg	= element.data('bg-img');
				if(typeof(attrBg) !== 'undefined'){
					element.addClass('frenify-ready');
					if(bgImg === ''){
						return;
					}
					element.css({backgroundImage:'url('+bgImg+')'});
				}
			});
		},
		
		isotopeMasonry: function(){
			var masonry = $('.fn__masonry');
			if($().isotope){
				masonry.each(function(){
					$(this).isotope({
						itemSelector: '.mas__in',
						masonry: {}
					});
				});
			}
		},
		
		estimateWidgetHeight: function(){
			var est 	= $('.neoh_fn_widget_estimate');
			est.each(function(){
				var el 	= $(this);
				var h1 	= el.find('.helper1');
				var h2 	= el.find('.helper2');
				var h3 	= el.find('.helper3');
				var h4 	= el.find('.helper4');
				var h5 	= el.find('.helper5');
				var h6 	= el.find('.helper6');
				var eW 	= el.outerWidth();
				var w1 	= Math.floor((eW * 80) / 300);
				var w2 	= eW-w1;
				var e1 	= Math.floor((w1 * 55) / 80);
				h1.css({borderLeftWidth:	w1+'px', borderTopWidth: e1+'px'});
				h2.css({borderRightWidth:	w2+'px', borderTopWidth: e1+'px'});
				h3.css({borderLeftWidth:	w1+'px', borderTopWidth: w1+'px'});
				h4.css({borderRightWidth:	w2+'px', borderTopWidth: w1+'px'});
				h5.css({borderLeftWidth:	w1+'px', borderTopWidth: w1+'px'});
				h6.css({borderRightWidth:	w2+'px', borderTopWidth: w1+'px'});
			});
		},
    };
	
	
	
	// ready functions
	$(document).ready(function(){
		NeohInit.init();
	});
	
	// resize functions
	$(window).on('resize',function(e){
		e.preventDefault();
		NeohInit.isotopeMasonry();
		NeohInit.navFixer();
		NeohInit.projectCategoryFitler();
		NeohInit.estimateWidgetHeight();
		NeohInit.progressTotop();
		NeohInit.widgetTriangle();
		NeohInit.roadmapScroll();
		NeohInit.minHeightPages();
	});
	
	// scroll functions
	$(window).on('scroll', function(e) {
		e.preventDefault();
		NeohInit.progressTotop();
		NeohInit.menuFixer();
		NeohInit.roadmapScroll();
    });
	
	// load functions
	$(window).on('load', function(e) {
		e.preventDefault();
		NeohInit.preloader();
		NeohInit.isotopeMasonry();
		NeohInit.projectCategoryFitler();
		setTimeout(function(){
			NeohInit.projectCategoryFitler();
		},100);
	});
	
	
	window.addEventListener("load", function(){
		NeohInit.preloader();
	});
	
})(jQuery);