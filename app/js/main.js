$(document).ready(function() {
    var appConfig = {
        // It selects all panels (list, view etc)
        viewsSelector : '[data-panel]',

        // An element containing templates
        templatesSelector : '#templates',

        // List of data sets
        datalayersSelector : '#map [data-map-layer]'
    }
    var application = new Mosaic.AppConfigurator(appConfig);
    application.start();
    app.start();

    function updateSize() {
        var win = $(window);
        var width = win.width();
        var height = win.height();
        $('.full-height').each(function() {
            var e = $(this);
            var top = e.offset().top;
            e.height(height - top);
        })
    }
    $(window).resize(updateSize);
    $(updateSize);
})
