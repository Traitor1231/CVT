/*
	jQuery autoGrowInput v1.0.3
    Copyright (c) 2014 Simon Steinberger / Pixabay
    Based on stackoverflow.com/questions/931207 (James Padolsey)
    GitHub: https://github.com/Pixabay/jQuery-autoGrowInput
	License: http://www.opensource.org/licenses/mit-license.php
*/


(function($){
    var event = 'oninput' in document.createElement('input') ? 'input' : 'keydown';

    $.fn.autoGrowInput = function(options){
        var o = $.extend({ maxWidth: 500, minWidth: 20, comfortZone: 0 }, options);

        this.each(function(){
            var input = $(this),
                val = ' ',
                comfortZone = (options && 'comfortZone' in options) ? o.comfortZone : parseInt(input.css('fontSize')),
                span = $('<span/>').css({
                    position: 'absolute',
                    top: -9999,
                    left: -9999,
                    width: 'auto',
                    fontSize: input.css('fontSize'),
                    fontFamily: input.css('fontFamily'),
                    fontWeight: input.css('fontWeight'),
                    letterSpacing: input.css('letterSpacing'),
                    textTransform: input.css('textTransform'),
                    whiteSpace: 'nowrap',
                    ariaHidden: true
                }).appendTo('body'),
                check = function(e){
                    if (val === (val = input.val()) && e.type !== 'autogrow') return;
                    if (!val) val = input.attr('placeholder') || '';
                    span.html(val.replace(/&/g, '&amp;').replace(/\s/g, '&nbsp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'));
                    var newWidth = span.width() + comfortZone, mw = typeof(o.maxWidth) == "function" ? o.maxWidth() : o.maxWidth;
                    if (newWidth > mw) newWidth = mw;
                    else if (newWidth < o.minWidth) newWidth = o.minWidth;
                    if (newWidth != input.width()) input.width(newWidth);
                };
            input.on(event+'.autogrow autogrow', check);
            // init on page load
            check();
        });
        return this;
    }
}(jQuery));


$('#email').autoGrowInput({ minWidth: 85, maxWidth: function(){ return $('#grow-email').width()+85; }, comfortZone: 2 });
$(window).resize(function(){$('#email').trigger('autogrow'); });

$('#phone').autoGrowInput({ minWidth: 92, maxWidth: function(){ return $('#grow-phone').width()+92; }, comfortZone: 2 });
$(window).resize(function(){$('#phone').trigger('autogrow'); });

$('#Name').autoGrowInput({ minWidth: 135, maxWidth: function(){ return $('#grow-Name').width()+135; }, comfortZone: 2 });
$(window).resize(function(){$('#Name').trigger('autogrow'); });

$("input").attr("autocomplete", "off");
                    
