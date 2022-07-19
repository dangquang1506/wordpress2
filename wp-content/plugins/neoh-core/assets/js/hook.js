/* Elementor hooks - editor - frontend */
( function ( $, w ) {
	'use strict';
	
	var fn_js_object = fn_object;
    
    var $window = $( w );

    $window.on( 'elementor/frontend/init', function() {


        var SectionExtends = elementorModules.frontend.handlers.Base.extend( {

            onInit: function onInit() {

                elementorModules.frontend.handlers.Base.prototype.onInit.apply( this, arguments );
                this.initSectionExtends();

            },
			
			imgSVG: function(){
			
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
			
			onElementChange: function(changedProp){
				this.imgSVG();
				var self	= this;
				var html 	= '';
				
				var ft		= 'frenify_shape_divider_top',
					fb		= 'frenify_shape_divider_bottom',
					sht		= '.frenify-shape-divider-top',
					shb		= '.frenify-shape-divider-bottom',
					time	= 20; // in milliseconds for svg wait
				// TOP DIVIDER
				if(changedProp === ft)
				{
					var topDivider 	= this.getElementSettings( ft );
				
					if(topDivider !== '')
					{
						html = this.getShapeDivider(topDivider, 'top');
						
						this.$element.find(sht).remove();
						this.$element.append(html);
						this.imgSVG();
						setTimeout(function(){
							self.changeColorsOnTypeChange(ft,ft,fb,sht,shb);
						},time);
					}
					else
					{
						this.$element.find(sht).remove();
					}
					
				}
				
				// BOTTOM DIVIDER
				if(changedProp === fb)
				{
					var bottomDivider 	= this.getElementSettings( fb );
				
					if(bottomDivider !== '')
					{
						html = this.getShapeDivider(bottomDivider, 'bottom');
						
						this.$element.find(shb).remove();
						this.$element.append(html);
						this.imgSVG();
						setTimeout(function(){
							self.changeColorsOnTypeChange(fb,ft,fb,sht,shb);
						},time);
					}
					else
					{
						this.$element.find(shb).remove();
					}
				}
				
				// #1 Divider position
				if(changedProp === fb+'_divider1_pos'){
					var bottom_pos = this.getElementSettings( fb+'_divider1_pos' );
					if(bottom_pos === 'left'){this.$element.find(shb).attr('data-pos','left');}
					if(bottom_pos === 'right'){this.$element.find(shb).attr('data-pos','right');}
				}else if(changedProp === ft+'_divider1_pos'){
					var top_pos = this.getElementSettings( ft+'_divider1_pos' );
					if(top_pos === 'left'){this.$element.find(sht+'').attr('data-pos','left');}
					if(top_pos === 'right'){this.$element.find(sht+'').attr('data-pos','right');}
				}
				
				// #1 Divider color
				if(changedProp === fb+'_divider1_1_color'){
					this.$element.find(shb+'[data-pos="right"] .shape_a').css({borderBottomColor: this.getElementSettings( fb+'_divider1_1_color')});
					this.$element.find(shb+'[data-pos="left"] .shape_a').css({borderLeftColor: this.getElementSettings( fb+'_divider1_1_color')});
				}else if(changedProp === fb+'_divider1_2_color'){
					this.$element.find(shb+'[data-pos="right"] .shape_b').css({borderBottomColor: this.getElementSettings( fb+'_divider1_1_color')});
					this.$element.find(shb+'[data-pos="left"] .shape_b').css({borderLeftColor: this.getElementSettings( fb+'_divider1_1_color')});
				}else if(changedProp === ft+'_divider1_1_color'){
					this.$element.find(sht+'[data-pos="right"] .shape_a').css({borderBottomColor: this.getElementSettings( ft+'_divider1_1_color')});
					this.$element.find(sht+'[data-pos="left"] .shape_a').css({borderLeftColor: this.getElementSettings( ft+'_divider1_1_color')});
				}else if(changedProp === ft+'_divider1_2_color'){
					this.$element.find(sht+'[data-pos="right"] .shape_b').css({borderBottomColor: this.getElementSettings( ft+'_divider1_1_color')});
					this.$element.find(sht+'[data-pos="left"] .shape_b').css({borderLeftColor: this.getElementSettings( ft+'_divider1_1_color')});
				}
				
				// #2 Divider Color
				if(changedProp === fb+'_divider2_color'){
					this.$element.find(shb+' svg').css({color: this.getElementSettings( fb+'_divider2_color' )});
				}else if(changedProp === ft+'_divider2_color'){
					this.$element.find(sht+' svg').css({color: this.getElementSettings( ft+'_divider2_color' )});
				}
				
				// #3 Divider color
				if(changedProp === fb+'_divider3_1_color'){
					this.$element.find(shb+' .st0').css({fill: this.getElementSettings( fb+'_divider3_1_color')});
				}else if(changedProp === fb+'_divider3_2_color'){
					this.$element.find(shb+' .st1').css({fill: this.getElementSettings( fb+'_divider3_2_color')});
				}else if(changedProp === ft+'_divider3_1_color'){
					this.$element.find(sht+' .st0').css({fill: this.getElementSettings( ft+'_divider3_1_color')});
				}else if(changedProp === ft+'_divider3_2_color'){
					this.$element.find(sht+' .st1').css({fill: this.getElementSettings( ft+'_divider3_2_color')});
				}
				
				// #4 Divider Color
				if(changedProp === fb+'_divider4_color'){
					this.$element.find(shb+' .st0').css({fill: this.getElementSettings( fb+'_divider4_color' )});
				}else if(changedProp === ft+'_divider4_color'){
					this.$element.find(sht+' .st0').css({fill: this.getElementSettings( ft+'_divider4_color' )});
				}
				
				// #5 Divider Color
				if(changedProp === fb+'_divider5_color'){
					this.$element.find(shb+' .st0').css({fill: this.getElementSettings( fb+'_divider5_color' )});
				}else if(changedProp === ft+'_divider5_color'){
					this.$element.find(sht+' .st0').css({fill: this.getElementSettings( ft+'_divider5_color' )});
				}
				
				// #6 Divider Color
				if(changedProp === fb+'_divider6_color'){
					this.$element.find(shb+' .st0').css({fill: this.getElementSettings( fb+'_divider6_color' )});
				}else if(changedProp === ft+'_divider6_color'){
					this.$element.find(sht+' .st0').css({fill: this.getElementSettings( ft+'_divider6_color' )});
				}
				
				// #7 Divider Color
				if(changedProp === fb+'_divider7_color'){
					this.$element.find(shb+' .st0').css({fill: this.getElementSettings( fb+'_divider7_color' )});
				}else if(changedProp === ft+'_divider7_color'){
					this.$element.find(sht+' .st0').css({fill: this.getElementSettings( ft+'_divider7_color' )});
				}
				
				// #8 Divider color
				if(changedProp === fb+'_divider8_1_color'){
					this.$element.find(shb+' .st0').css({fill: this.getElementSettings( fb+'_divider8_1_color')});
				}else if(changedProp === fb+'_divider8_2_color'){
					this.$element.find(shb+' .st1').css({fill: this.getElementSettings( fb+'_divider8_2_color')});
				}else if(changedProp === ft+'_divider8_1_color'){
					this.$element.find(sht+' .st0').css({fill: this.getElementSettings( ft+'_divider8_1_color')});
				}else if(changedProp === ft+'_divider8_2_color'){
					this.$element.find(sht+' .st1').css({fill: this.getElementSettings( ft+'_divider8_2_color')});
				}
				
				// #9 Divider color
				if(changedProp === fb+'_divider9_1_color'){
					this.$element.find(shb+' .st0').css({fill: this.getElementSettings( fb+'_divider9_1_color')});
				}else if(changedProp === fb+'_divider9_2_color'){
					this.$element.find(shb+' .st1').css({fill: this.getElementSettings( fb+'_divider9_2_color')});
				}else if(changedProp === ft+'_divider9_1_color'){
					this.$element.find(sht+' .st0').css({fill: this.getElementSettings( ft+'_divider9_1_color')});
				}else if(changedProp === ft+'_divider9_2_color'){
					this.$element.find(sht+' .st1').css({fill: this.getElementSettings( ft+'_divider9_2_color')});
				}
				
				// #10 Divider color
				if(changedProp === fb+'_divider10_color'){
					this.$element.find(shb+' svg').css({color: this.getElementSettings( fb+'_divider10_color' )});
				}else if(changedProp === ft+'_divider10_color'){
					this.$element.find(sht+' svg').css({color: this.getElementSettings( ft+'_divider10_color' )});
				}
			},
			changeColorsOnTypeChange: function(e,ft,fb,sht,shb){
				var d = this.getElementSettings(e);
				 if(d === 'divider1'){
					if(e === ft){
						this.$element.find(sht+'[data-pos="right"] .shape_a').css({borderBottomColor: this.getElementSettings( ft+'_divider1_1_color')});
						this.$element.find(sht+'[data-pos="left"] .shape_a').css({borderLeftColor: this.getElementSettings( ft+'_divider1_1_color')});
						this.$element.find(sht+'[data-pos="right"] .shape_b').css({borderBottomColor: this.getElementSettings( ft+'_divider1_1_color')});
						this.$element.find(sht+'[data-pos="left"] .shape_b').css({borderLeftColor: this.getElementSettings( ft+'_divider1_1_color')});
					}else if(e === fb){
						this.$element.find(shb+'[data-pos="right"] .shape_a').css({borderBottomColor: this.getElementSettings( fb+'_divider1_1_color')});
						this.$element.find(shb+'[data-pos="left"] .shape_a').css({borderLeftColor: this.getElementSettings( fb+'_divider1_1_color')});
						this.$element.find(shb+'[data-pos="right"] .shape_b').css({borderBottomColor: this.getElementSettings( fb+'_divider1_1_color')});
						this.$element.find(shb+'[data-pos="left"] .shape_b').css({borderLeftColor: this.getElementSettings( fb+'_divider1_1_color')});
					}
				 }else if(d === 'divider2'){
					if(e === ft){
						this.$element.find(sht+' svg').css({color: this.getElementSettings( ft+'_divider2_color' )});
					}else if(e === fb){
						this.$element.find(shb+' svg').css({color: this.getElementSettings( fb+'_divider2_color' )});
					}
				}else if(d === 'divider3'){
					if(e === ft){
						this.$element.find(sht+' .st0').css({fill: this.getElementSettings( ft+'_divider3_1_color')});
						this.$element.find(sht+' .st1').css({fill: this.getElementSettings( ft+'_divider3_2_color')});
					}else if(e === fb){
						this.$element.find(shb+' .st0').css({fill: this.getElementSettings( fb+'_divider3_1_color')});
						this.$element.find(shb+' .st1').css({fill: this.getElementSettings( fb+'_divider3_2_color')});
					}
				}else if(d === 'divider4'){
					if(e === ft){
						this.$element.find(sht+' .st0').css({fill: this.getElementSettings( ft+'_divider4_color' )});
					}else if(e === fb){
						this.$element.find(shb+' .st0').css({fill: this.getElementSettings( fb+'_divider4_color' )});
					}
				}else if(d === 'divider5'){
					if(e === ft){
						this.$element.find(sht+' .st0').css({fill: this.getElementSettings( ft+'_divider5_color' )});
					}else if(e === fb){
						this.$element.find(shb+' .st0').css({fill: this.getElementSettings( fb+'_divider5_color' )});
					}
				}else if(d === 'divider6'){
					if(e === ft){
						this.$element.find(sht+' .st0').css({fill: this.getElementSettings( ft+'_divider6_color' )});
					}else if(e === fb){
						this.$element.find(shb+' .st0').css({fill: this.getElementSettings( fb+'_divider6_color' )});
					}
				}else if(d === 'divider7'){
					if(e === ft){
						this.$element.find(sht+' .st0').css({fill: this.getElementSettings( ft+'_divider7_color' )});
					}else if(e === fb){
						this.$element.find(shb+' .st0').css({fill: this.getElementSettings( fb+'_divider7_color' )});
					}
				}else if(d === 'divider8'){
					if(e === ft){
						this.$element.find(sht+' .st0').css({fill: this.getElementSettings( ft+'_divider8_1_color')});
						this.$element.find(sht+' .st1').css({fill: this.getElementSettings( ft+'_divider8_2_color')});
					}else if(e === fb){
						this.$element.find(shb+' .st0').css({fill: this.getElementSettings( fb+'_divider8_1_color')});
						this.$element.find(shb+' .st1').css({fill: this.getElementSettings( fb+'_divider8_2_color')});
					}
				}else if(d === 'divider9'){
					if(e === ft){
						this.$element.find(sht+' .st0').css({fill: this.getElementSettings( ft+'_divider9_1_color')});
						this.$element.find(sht+' .st1').css({fill: this.getElementSettings( ft+'_divider9_2_color')});
					}else if(e === fb){
						this.$element.find(shb+' .st0').css({fill: this.getElementSettings( fb+'_divider9_1_color')});
						this.$element.find(shb+' .st1').css({fill: this.getElementSettings( fb+'_divider9_2_color')});
					}
				}else if(d === 'divider10'){
					if(e === ft){
						this.$element.find(sht+' svg').css({fill: this.getElementSettings( ft+'_divider10_color' )});
					}else if(e === fb){
						this.$element.find(shb+' svg').css({fill: this.getElementSettings( fb+'_divider10_color' )});
					}
				}
			},
			
			initSectionExtends: function() {
            
				var html 			= ''; 
				var topDivider 		= this.getElementSettings( 'frenify_shape_divider_top' );
				var bottomDivider 	= this.getElementSettings( 'frenify_shape_divider_bottom' );
				
				
				// TOP DIVIDER
				if(topDivider !== '')
				{
					html = this.getShapeDivider(topDivider, 'top');
					
					this.$element.find('.frenify-shape-divider-top').remove();
					this.$element.append(html);
					this.imgSVG();
				}
				else
				{
					this.$element.find('.frenify-shape-divider-top').remove();
				}
				
				
				// BOTTOM DIVIDER
				if(bottomDivider !== '')
				{
					html = this.getShapeDivider(bottomDivider, 'bottom');
					
					this.$element.find('.frenify-shape-divider-bottom').remove();
					this.$element.append(html);
					this.imgSVG();
				}
				else
				{
					this.$element.find('.frenify-shape-divider-bottom').remove();
				}
				
				
				// this.isEdit
				
            },
			
			getShapeDivider: function(type, pos){
				var pos1 = '';
				if(type === 'divider1'){
					pos1 = this.getElementSettings( 'frenify_shape_divider_'+pos+'_divider1_pos' );
				}
				var html 	= '<div class="frenify-shape-divider frenify-shape-'+type+' frenify-shape-divider-'+pos+'" data-pos="'+pos1+'">';
				var svg_url = fn_js_object.svg_url;
				
				switch(type){
					case 'divider1': 
						html += '<span class="fn__shape"><span class="shape_a"></span><span class="shape_b"></span></span>';
						break;
						
					case 'divider2':
					case 'divider3': 
					case 'divider4': 
					case 'divider5': 
					case 'divider6': 
					case 'divider7': 
					case 'divider8': 
					case 'divider9': 
					case 'divider10': 
						html += '<img src="'+svg_url+type+'.svg" class="fn__svg" />';
						break;
						
					default: 
						html += '';
						break;
				}
				
				html += '</div>';
				
				return html;
				
			},


        } );

        

        var handlersList = {
            'section': SectionExtends, 
        };
		
		

        $.each( handlersList, function( widgetName, handlerClass ) {

            elementorFrontend.hooks.addAction( 'frontend/element_ready/' + widgetName, function( $scope ) {
                
                elementorFrontend.elementsHandler.addHandler( handlerClass, { $element: $scope } );

            } );

        } );

    } ); 

    

} ( jQuery, window ) );