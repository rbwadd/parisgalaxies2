$(document).ready(function(){

    modal = {
        place : function(){
            var $window = jQuery(window);
            var $container = jQuery('.modal-container:visible');

            var wh = $window.height();

            var ch = $container.outerHeight();

            var t = (wh - ch)/2;
            if(t < 0 ){ var t = 0; }


            $container.css({
                'margin-top'  : t
            });
        },
        open : function (className){

            if (typeof className == 'string' || className instanceof String){
                var $modal = jQuery('.'+className+'');
            }
            else{
                var $modal = $(className);
            }
            var $container = $modal.find('.modal-container');

            $modal.fadeIn();
            jQuery('body').addClass('modal-open');
            $container.css('display', 'block');
            $container.trigger('modal-open');

            modal.place();
        },
        change : function (className){
            var $current = jQuery('.modal-container:visible');
            var $next = jQuery('.'+className+' .modal-container');

            $current.fadeOut(400, function(){
                $next.trigger('modal-open');
                $next.fadeIn(300);
                modal.place();
            });
            $current.trigger('modal-close');
        },
        close : function (){
            var $modal = jQuery('.modal-bg:visible');

            jQuery($modal).fadeOut(400, function(){
                jQuery('body').removeClass('modal-open');
                
                $modal.css('display', 'none');
                $modal.trigger('modal-close');
            });
        }
    }

    /*events*/
    jQuery(document).on('click', '.modal-trigger', function(e){
        e.preventDefault();
        modal.open(jQuery(this).data('modal'));
    });

    jQuery(document).on('click', '.modal-next' ,function(e){
        e.preventDefault();
        modal.change(jQuery(this).data('next'));
    });

    jQuery(document).on('click', '.modal-bg, .modal-close', function(e){
        if(e.target != this) return; /* http://tinyurl.com/c6re4ck */
        modal.close();
        e.preventDefault();
    });
    $(document).off('keydown').on('keydown', function(e) {
        if(e.keyCode == 27) {
            modal.close();
        }
    });

    jQuery(window).on("throttledresize", function(){
        modal.place();
    });


});