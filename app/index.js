$(function() {
    var appConfig = {
        templatesSelector : '#templates',
        mapSelector : '#map',
        listSelector : '#list',
        datalayersSelector : '[data-map-layer]'
    }

    Mosaic.AppConfigurator.addResourceView({
        dataSetType : Mosaic.TilesDataSet,
        viewType : 'MapActivePopupView',
        event : 'activateResource',
        dataSets : 'spots'
    });

    var application = new Mosaic.AppConfigurator(appConfig);
    application.start();

    application.app.getDataSet('spots').on('activateResource', function(r) {
	console.log('activateResource', r);
   });

    var updateSearchCriteria = (function(app) {
        var searchCriteria = {};
        var prevSearchCriteria = '';
        function toStr(o) {
            return JSON.stringify(o);
        }
        var startSearch = _.debounce(function() {
            var str = toStr(searchCriteria);
            if (str != prevSearchCriteria) {
                prevSearchCriteria = str;
                var dataSet = app.getDataSet('spots');
                var criteria = searchCriteria['spots'];
                if (criteria) {
                    console.log('criteria:', criteria);
                    dataSet.on('search:end', function() {
                        // TODO : check why number of search increases over
                        // time when adding/removing filters
                        console.log('search finished');
                    });
                    dataSet.search(criteria);
                }
            }
        }, 250);
        return function(el) {
            // TODO: check
            var dataSetId = 'spots';
            if (el) {
                var active = el.hasClass('active');
                var value = el.data('search-value');
                var key = el.data('search-trigger');
                var criteria = searchCriteria[dataSetId] = searchCriteria[dataSetId] || {};
                var array = criteria[key] = criteria[key] || [];
                if (!active) {
                    criteria[key] = _.filter(array, function(oldVal) {
                        return oldVal != value;
                    })
                } else {
                    array.push(value);
                    array.sort();
                }
            }

            searchCriteria[dataSetId] = searchCriteria[dataSetId] || {};
            searchCriteria[dataSetId]['q'] = $('#search-input').val().toString();
            startSearch();
        }
    })(application.app);

    $('[data-search-trigger]').each(function() {
        var elm = $(this);
        elm.on('ifClicked', function() {
            elm.toggleClass('active');
            updateSearchCriteria(elm);
        })
        // updateSearchCriteria(elm);
    });

    $('.icon-loupe').on('click', function(evt) {
        updateSearchCriteria();
    });

    $('#search-input').keypress(function(e) {
        if (e.which == 13) {
            updateSearchCriteria();
        }
    });

    $('.icon-reset').on('click', function(evt) {
        var value = $('#search-input').val();
        if (value && value.length) {
            $('#search-input').val('');
            updateSearchCriteria();
        }

    });

});
