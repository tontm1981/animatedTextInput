(function($) {
	"use strict";

	/**
	 *	Still not used.
	 */
	var defaults = {
		position: "top"
	};

	/**
	 *	Plugin loader. Element must be the tag that contains input and label (use only one of each)
	 *	It is possible to pass some options, but still not used.
	 */
	function animatedTextInput(element, options) {
		var fixedSettings = {
			allowedInputTags: ['input[type=text]','textarea'], // limit input elements to textarea and input[type=text]
			allowedContainerTags: ['div', 'fieldset'], // inputs and labels are contained by an element (usually fieldset, divs,...). This limit container element tag
			allowedLabelTags: ['div','label','span'], // limit the tags used as input label
			onFocusInputClass: 'input-got-focus', // the class appended to container element when input get focused.
		};
		this.settings = $.extend({}, fixedSettings, defaults, options);
		this._defaultSettings = defaults;

		this.container = element;
		this.label = $(element).find(this.settings.allowedLabelTags.join(',')).first(); // Only ONE label in container
		this.input = $(element).find(this.settings.allowedInputTags.join(',')).first(); // Only ONE input in container

		// This line is needed, because if label is placed before input, when
		// plugin resizes the input, the label will be behind of resized input.
		$(this.container).empty().append(this.input).append(this.label);

		// Get container CSS styles, used in input resize and label positioning
		this.containerCss = this.calculateContainerStyles();
		// Some label CSS styles is used in input resize too
		this.labelCss = this.calculateLabelStyles();
		// Input CSS styles is used to resize and position label
		this.inputCss = this.calculateInputStyles();

		this.init();
	};

	animatedTextInput.prototype = {

		calculateContainerStyles : function() {
			return {
				"width": $(this.container).width(),
				"outerWidth": $(this.container).outerWidth(),
				"height": $(this.container).height(),
				"outerHeight": $(this.container).outerHeight(),
				"borderTop": parseInt( ($(this.container).css("border-top").replace("px","")) ),
				"borderBottom": parseInt( ($(this.container).css("border-bottom").replace("px","")) ),
				"marginTop": parseInt( ($(this.container).css("margin-top")).replace("px","") ),
				"marginBottom": parseInt( ($(this.container).css("margin-bottom")).replace("px","") ),
				"marginLeft": parseInt( ($(this.container).css("margin-left")).replace("px","") ),
				"marginRight": parseInt( ($(this.container).css("margin-right")).replace("px","") ),
				"paddingTop": parseInt( ($(this.container).css("padding-top")).replace("px","") ),
				"paddingBottom": parseInt( ($(this.container).css("padding-bottom")).replace("px","") ),
				"paddingLeft": parseInt( ($(this.container).css("padding-left")).replace("px","") ),
				"paddingRight": parseInt( ($(this.container).css("padding-right")).replace("px","") ),
				"font-size": $(this.container).css("font-size"),
				"backgorundColor":$(this.container).css("background-color"),
			};
		},

		calculateLabelStyles : function() {
			return {
				"width": $(this.label).width(),
				"outerWidth": $(this.label).outerWidth(),
				"height": $(this.label).height(),
				"outerHeight": $(this.label).outerHeight(),
				"borderTop": parseInt( ($(this.label).css("border-top").replace("px","")) ),
				"borderBottom": parseInt( ($(this.label).css("border-bottom").replace("px","")) ),
				"marginTop": parseInt( ($(this.label).css("margin-top")).replace("px","") ),
				"marginBottom": parseInt( ($(this.label).css("margin-bottom")).replace("px","") ),
				"marginLeft": parseInt( ($(this.label).css("margin-left")).replace("px","") ),
				"marginRight": parseInt( ($(this.label).css("margin-right")).replace("px","") ),
				"paddingTop": parseInt( ($(this.label).css("padding-top")).replace("px","") ),
				"paddingBottom": parseInt( ($(this.label).css("padding-bottom")).replace("px","") ),
				"paddingLeft": parseInt( ($(this.label).css("padding-left")).replace("px","") ),
				"paddingRight": parseInt( ($(this.label).css("padding-right")).replace("px","") ),
				"font-size": $(this.label).css("font-size"),
				"backgroundColor": $(this.label).css("background-color"),
			};
		},

		calculateInputStyles : function() {
			return {
				"width": $(this.input).width(),
				"outerWidth": $(this.input).outerWidth(),
				"height": $(this.input).height(),
				"outerHeight": $(this.input).outerHeight(),
				"borderTop": parseInt( ($(this.input).css("border-top-width").replace("px","")) ),
				"borderBottom": parseInt( ($(this.input).css("border-bottom-width").replace("px","")) ),
				"marginTop": parseInt( ($(this.input).css("margin-top")).replace("px","") ),
				"marginBottom": parseInt( ($(this.input).css("margin-bottom")).replace("px","") ),
				"marginLeft": parseInt( ($(this.input).css("margin-left")).replace("px","") ),
				"marginRight": parseInt( ($(this.input).css("margin-right")).replace("px","") ),
				"paddingTop": parseInt( ($(this.input).css("padding-top")).replace("px","") ),
				"paddingBottom": parseInt( ($(this.input).css("padding-bottom")).replace("px","") ),
				"paddingLeft": parseInt( ($(this.input).css("padding-left")).replace("px","") ),
				"paddingRight": parseInt( ($(this.input).css("padding-right")).replace("px","") ),
				"font-size": $(this.input).css("font-size"),
				"backgorundColor": $(this.input).css("background-color"),
			};
		},

		tagName: function(elem) {
			var tag = $(elem).prop("tagName").toLowerCase();
			if(tag=='input') {
				tag += '[type='+$(elem).attr('type')+']';
			}

			return tag.toLowerCase();
		},

		renderLabelTop: function() {
			this.renderDefault();

			if(this.tagName(this.input)=='textarea') {
				this.renderLabelTopTextarea();
			}
			else {
				this.renderLabelTopInput();
			}

			this.renderDefault();


		},

		renderLabelTopInput: function() {
			var container = this.container, label=this.label, input=this.input, settings=this.settings;
			var containerCss = this.containerCss, inputCss = this.inputCss, labelCss = this.labelCss;

			$(input).css({
				"height":inputCss.outerHeight+"px",
				"padding-top": (labelCss.height + (inputCss.paddingTop + (inputCss.borderTop*2)))+"px"
			});
			$(label).css({
				"padding-top": ($(input).val()!=""? (inputCss.borderTop*2)+"px" : (inputCss.paddingTop)+"px"),
				"top": (-(inputCss.outerHeight - (inputCss.borderTop*2) ))+"px",
			});

			$(input).on("focus", function() {
				if( !$(container).hasClass(settings.onFocusInputClass) ) {
					$(container).addClass(settings.onFocusInputClass);
				}
				$(this).css({
					"height":containerCss.outerHeight+"px",
					"padding-top": (labelCss.height + (inputCss.paddingTop + (inputCss.borderTop*2)))+"px",
				});
				$(label).css({
					"padding-top": (inputCss.paddingTop)+"px",
					"top": (-(containerCss.outerHeight - (inputCss.borderTop*2)))+"px",
				});
			});

			$(input).on("blur", function () {
				if( $(container).hasClass(settings.onFocusInputClass) ) {
					$(container).removeClass(settings.onFocusInputClass);
				}
				$(this).css({
					"height":inputCss.outerHeight+"px",
					"padding-top": (labelCss.height + (inputCss.paddingTop + (inputCss.borderTop*2)))+"px",
				});
				$(label).css({
					"padding-top": ($(this).val()!=""? (inputCss.borderTop*2)+"px" : (inputCss.paddingTop)+"px"),
					"top": (-(inputCss.outerHeight - (inputCss.borderTop*2) ))+"px",
					"margin-bottom": 0,
				});

				if($(this).val()!='') {
					$(label).css("opacity","1");
				}
			});
		},

		renderLabelTopTextarea: function() {
			var container = this.container, label=this.label, input=this.input, settings=this.settings;
			var containerCss = this.containerCss, inputCss = this.inputCss, labelCss = this.labelCss;
			var bordBot = $(input).css("border-bottom");

			$(container).empty().append(label).append(input);

			$(input).css({
				"border": "none",
				"height":0,
				"padding-top":0,
				"padding-bottom":0,
			});
			$(container).css({
				"border-bottom": bordBot,
				"height":(labelCss.outerHeight + inputCss.paddingTop + inputCss.paddingTop)+"px",
				"padding-top": (labelCss.outerHeight + (inputCss.paddingTop - inputCss.borderTop))+"px"
			});
			$(label).css({"top":-(labelCss.outerHeight + (inputCss.borderTop*2))+"px",});

			$(container, label).on("click", function() {
				if($(this).is("."+settings.onFocusInputClass)) {
					$(input).focus();
				}
			});

			$(input).on("focus",function() {
				if( !$(container).hasClass(settings.onFocusInputClass) ) {
					$(container).addClass(settings.onFocusInputClass);
				}
				$(container).css({
					"height": (inputCss.outerHeight + inputCss.paddingBottom + inputCss.borderBottom + labelCss.outerHeight)+"px",
					"-webkit-box-shadow": "0 0 8px rgba(82,168,236,0.6)",
					"-moz-box-shadow": "0 0 8px rgba(82,168,236,0.6)",
					"box-shadow": "0 0 8px rgba(82,168,236,0.6)",
					"border-bottom": "1px solid #66afe9",
				});
				$(input).css({
					"height": (inputCss.outerHeight)+"px",
					"border":"none",
					"top":-(labelCss.height-inputCss.borderTop)+"px",
				});
			});

			$(input).on("blur", function() {
				if( $(container).hasClass(settings.onFocusInputClass) ) {
					$(container).removeClass(settings.onFocusInputClass);
				}

				$(input).css({
					"border": "none",
					"height": $(this).val()==''? 0 : (inputCss.outerHeight/2)+"px",
				});
				$(container).css({
					"border-bottom": bordBot,
					"height": $(this).val()==''? (labelCss.outerHeight + inputCss.paddingTop + inputCss.paddingTop)+"px" : ((inputCss.outerHeight/2) + inputCss.paddingBottom + inputCss.borderBottom + labelCss.outerHeight)+"px",
					"padding-top": (labelCss.outerHeight + (inputCss.paddingTop - inputCss.borderTop))+"px",
					"-webkit-box-shadow": "none",
					"-moz-box-shadow": "none",
					"box-shadow": "none",
				});
				$(label).css({"top":-(labelCss.outerHeight + (inputCss.borderTop*2))+"px",});
			});
		},

		renderLabelBottom: function() {
			this.renderDefault();

			if(this.tagName(this.input)=='textarea') {
				this.renderLabelBottomTextarea();
			}
			else {
				this.renderLabelBottomInput();
			}
		},

		renderLabelBottomInput: function() {
			var container = this.container, label=this.label, input=this.input, settings=this.settings;
			var containerCss = this.containerCss, inputCss = this.inputCss, labelCss = this.labelCss;

			$(input).css({
				"height":inputCss.outerHeight+"px",
				"padding-bottom": ((labelCss.height - inputCss.paddingBottom ) + (inputCss.borderBottom*2) )+"px",
			});
			$(label).css({
				"padding-top": 0,
				"bottom": ((labelCss.height - inputCss.paddingBottom ) + (inputCss.borderBottom*2) )+"px",
			});
			$(input).on("focus", function() {
				if( !$(container).hasClass(settings.onFocusInputClass) ) {
					$(container).addClass(settings.onFocusInputClass);
				}
				$(this).css({
					"height":containerCss.outerHeight+"px",
					"padding-bottom": (labelCss.height + (inputCss.paddingTop + (inputCss.borderTop*2)))+"px",
					"box-sizing": "border-box",
					"transition": "0.2s ease-in-out",
				});
				$(label).css({
					"padding-top": (inputCss.paddingTop)+"px",
					"bottom": ((labelCss.height +	 inputCss.paddingBottom ) + (inputCss.borderBottom*2) )+"px",
				});
			});

			$(input).on("blur", function () {
				if( $(container).hasClass(settings.onFocusInputClass) ) {
					$(container).removeClass(settings.onFocusInputClass);
				}
				$(input).css({
					"height":inputCss.outerHeight+"px",
					"padding-bottom": ((labelCss.height - inputCss.paddingBottom ) + (inputCss.borderBottom*2) )+"px",
				});
				$(label).css({
					"padding-top": 0,
					"bottom": ((labelCss.height - inputCss.paddingBottom ) + (inputCss.borderBottom*2) )+"px",
				});

				if($(this).val()!='') {
					$(label).css("opacity","1");
				}
			});
		},

		renderLabelBottomTextarea: function() {
			var container = this.container, label=this.label, input=this.input, settings=this.settings;
			var containerCss = this.containerCss, inputCss = this.inputCss, labelCss = this.labelCss;
			var bordBot = $(input).css("border-bottom");
			$(input).css({
				"border": "none",
				"height":0,
			});

			$(container).css({
				"border-bottom": bordBot,
				"height":(labelCss.outerHeight + inputCss.paddingBottom + inputCss.paddingBottom)+"px",
				"padding-bottom": (labelCss.outerHeight + inputCss.paddingBottom + (inputCss.borderBottom*2))+"px"
			});
			$(label).css({"bottom":0,});

			$(input).on("focus",function() {
				if( !$(container).hasClass(settings.onFocusInputClass) ) {
					$(container).addClass(settings.onFocusInputClass);
				}
				$(container).css({
					"height": (inputCss.outerHeight + inputCss.paddingBottom + inputCss.borderBottom + labelCss.outerHeight)+"px",
					"-webkit-box-shadow": "0 0 8px rgba(82,168,236,0.6)",
					"-moz-box-shadow": "0 0 8px rgba(82,168,236,0.6)",
					"box-shadow": "0 0 8px rgba(82,168,236,0.6)",
					"border-bottom": "1px solid #66afe9",
				});
				$(input).css({
					"height": (inputCss.outerHeight - inputCss.borderBottom)+"px",
					"border":"none"
				});
				$(label).css({
					"bottom":(-(inputCss.paddingBottom))+"px",
				});
			});

			$(input).on("blur", function() {
				if( $(container).hasClass(settings.onFocusInputClass) ) {
					$(container).removeClass(settings.onFocusInputClass);
				}

				$(container).css({
					// "height": (inputCss.outerHeight + inputCss.paddingBottom + inputCss.borderBottom + labelCss.outerHeight)+"px",
					"border-bottom": bordBot,
					"height":($(this).val()==''? (labelCss.outerHeight + inputCss.paddingBottom + inputCss.paddingBottom)+"px" : ((inputCss.height/2)+labelCss.outerHeight + inputCss.paddingTop + inputCss.paddingBottom)+"px"),
					"padding-bottom": (labelCss.outerHeight + inputCss.paddingBottom + (inputCss.borderBottom*2))+"px",
					"-webkit-box-shadow": "none",
					"-moz-box-shadow": "none",
					"box-shadow": "none",
				});
				$(input).css({
					"height": ($(this).val()!=''? (inputCss.height/2)+"px" : 0),
				});
				$(label).css({
					"bottom":0,
				});
			});
		},

		renderDefault: function() {
			$(this.input).css({
				"top":0,
				"left":0,
				"transition": "0.2s ease-in-out",
			});
			$(this.label).css({
				"left":(this.inputCss.paddingLeft)+"px",
				"background-color": this.inputCss.backgorundColor,
				"width": this.inputCss.width+"px",
				"margin-bottom": 0,
				"transition": "0.2s ease-in-out",
			});
		},

		init: function() {
			var render = true;


			if($.inArray(this.tagName(this.container), this.settings.allowedContainerTags) < 0) {
				throw new Error('Container Tag not allowed: '+this.tagName(this.container));
			}

			if($.inArray(this.tagName(this.label), this.settings.allowedLabelTags) < 0) {
				throw new Error('Label Tag not allowed: '+this.tagName(this.label));
			}

			if($.inArray(this.tagName(this.input), this.settings.allowedInputTags) < 0) {
				throw new Error('Input Tag not allowed: '+this.tagName(this.input));
			}

			if(render) {
				$(this.container).attr("data-plugin","floating-label");

				if(this.settings.position=="bottom") { this.renderLabelBottom(); }
				else { this.renderLabelTop(); }
			}
		},
	};

	$.fn["animatedTextInput"] = function(options) {

		return this.each(function() {
			try {
				if (!$.data(this, "plugin_animatedTextInput")) {
	                $.data(this, "plugin_animatedTextInput",
	                new animatedTextInput( this, options ));
	            }
			} catch(err) {
				alert('Plugin "animatedTextInput" failed to initialize.');
			}
		});
	};
})(jQuery);
