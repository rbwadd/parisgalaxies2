$(document).ready(function(){

    // Methods
    var popover = {

        create : function($trigger){
            var event = $trigger.data('popover-event') || 'click';
            var position  = $trigger.data('popover-position') ||'up';
            var popoverId = $trigger.data('popover');
            var $target   = jQuery('.popover-target[data-popover='+popoverId+']');

            $trigger.on(event, function(event){

                event.preventDefault();

                var $pointer  = $target.find('.popover-pointer');

                var pointerWidth  = $pointer.outerWidth();
                var pointerHeight = $pointer.outerHeight();
                
                $target.addClass('popover-'  + position);

                if(position == 'down'){
                    $target.css('padding-top', pointerHeight);
                }
                else{
                    $target.css('padding-bottom', pointerHeight);
                }

                if(!$target.hasClass('popover-active')){
                    popover.place($trigger, $target);
                    popover.show($trigger, $target);
                }
                else{
                    popover.hide($trigger, $target);
                }
            });

            jQuery(window).on('throttledresize', function(){
                if($target.is(':visible')){
                    popover.hide($trigger, $target);
                }
            });

        },

        place : function($trigger, $target){

            var padding = 5;

            var $window = $(window);

            var position = $trigger.data('popover-position');

            var offset = $trigger.offset();

            var windowWidth  = $window.width();

            var targetHeight = $target.outerHeight();
            var targetWidth  = $target.outerWidth();

            var triggerHeight = $trigger.outerHeight();
            var triggerWidth  = $trigger.outerWidth();

            var newLeft     = offset.left - ((targetWidth - triggerWidth)/2);
            var newRight    = newLeft + targetWidth - windowWidth;
            var newTop      = offset.top - targetHeight;
            var newBottom   = offset.top + triggerHeight;

            if(newLeft <= padding){
                newLeft = padding;
            }
            else if(newRight >= padding){
                newLeft = windowWidth - targetWidth - padding;
            }

            if(position == 'down'){
                $target.css({
                    left : newLeft,
                    top : newBottom
                });
            }
            else{
                $target.css({
                    left : newLeft,
                    top : newTop
                }); 
            }

            $target.appendTo('body');

            popover.placePointer($trigger, $target, newLeft);

        },

        placePointer : function($trigger, $target, newLeft){

            var position      = $trigger.data('popover-position') ||'up';

            var $pointer      = $target.find('.popover-pointer');
            var pointerWidth  = $pointer.outerWidth();
            var triggerWidth  = $trigger.outerWidth();
            var offset        = $trigger.offset();

            $pointer.css({
                left :  offset.left - newLeft + triggerWidth/2 - pointerWidth/2
            });
        },

        show : function($trigger, $target){
            $trigger
                .addClass('popover-active');

            $target
                .stop(false, true)
                .fadeIn(200)
                .addClass('popover-active');
        },

        hide : function($trigger, $target){
            $trigger
                .removeClass('popover-active');

            $target
                .stop(false, true)
                .fadeOut(200)
                .removeClass('popover-active');
        }
    }
    // Events
    jQuery('.popover-trigger').each(function(){
        popover.create(jQuery(this));
    });

});