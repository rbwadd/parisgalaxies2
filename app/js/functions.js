// nicolas
$(document).ready(function() {

    // sidebar
    function sidebarheight() {
        var $sidebar = $('.slimscroll-sidebar');
        var $topBar = $('.top-zone');
        var $map = $('#map');

        var topBarHeight = $topBar.outerHeight();
        var sidebarHeight = $sidebar.outerHeight();
        var mapHeight = $map.height();

        if (mapHeight - topBarHeight >= sidebarHeight) {
            $sidebar.css('max-height', mapHeight - topBarHeight);
            $sidebar.css('height', mapHeight - topBarHeight);
        } else {
            $sidebar.css('max-height', mapHeight - topBarHeight);
            $sidebar.css('height', 'auto');
        }

        var $places = $('.places');
        var filtersHeight = $('.filters').outerHeight();
        var placesHeight = mapHeight - topBarHeight - filtersHeight;
        $places.css('height', placesHeight);

    }

    // Events
    $(window).on('resize', function() {
        sidebarheight();

        // $('.slimscroll-sidebar').slimScroll({
        // railVisible: false,
        // railOpacity: 1,
        // size: '8px',
        // color: '#fff',
        // railColor: '#C7C7C7'
        // });
    });

    sidebarheight();

    // $('.slimscroll-sidebar').slimScroll({
    // railVisible: false,
    // railOpacity: 1,
    // size: '8px',
    // color: '#fff',
    // railColor: '#C7C7C7'
    // });

    $('.switcher .toggle-sidebar').on('click', function() {
        if ($('.left-zone-content').hasClass('open')) {
            $('.left-zone-content').removeClass('open');
            $('.toggle-sidebar').html('LIST');
        } else {
            $('.left-zone-content').addClass('open');
            $('.toggle-sidebar').html('MAP');
        }
    });

    $(window).on('resize', function() {
        if ($(window).width() >= 768) {
            $('.left-zone-content').addClass('open');

        }
    });

    // icheck
    $('.checkb input').iCheck({
        checkboxClass : 'icheckbox_square-blue',
        radioClass : 'iradio_square-blue',
        increaseArea : '20%'
    });

    $('.icon-reset').on('click', function(evt) {
        $('#search-input').attr('value', '');
    });
    
    $('.propose-spot').on('click', function(e) {
        modal.open('modal-landing'); 
    });
    
    $('.embed-map').on('click', function(e) {
        modal.open('modal-embed'); 
    });
    
    function updateSize() {
        var win = $(window);
        var width = win.width();
        var height = win.height();
        console.log('updating size...')
        $('.full-height').each(function() {
            var e = $(this);
            var top = e.offset().top;
            e.height(height - top);
        })
    }
    $(window).resize(updateSize);
    $(updateSize);

});