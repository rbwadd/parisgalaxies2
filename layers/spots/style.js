var Utils = require('../common-styles');
var _ = require('underscore');

var maxZoom = 13;
var size = 32;
var zoomLevels = Utils.getMarkerZoomLevels({
    'marker-width' : size,
    'marker-opacity' : 1,
    'marker-line-width' : 2,
    'marker-line-opacity' : 0.8,
}, {
    maxZoom : maxZoom
});

var style = Utils.extendStyle({
    'marker-line-color' : 'white',
    'marker-placement' : 'point',
    'marker-type' : 'ellipse',
    'marker-opacity' : 1,
    'marker-allow-overlap' : true,
    'marker-file' : 'url(./icons/picto-2.svg)',

}, zoomLevels, {

    '[zoom>=1]' : {
        'marker-allow-overlap' : true,
        '[type="Spot/Architecture (urbanisme)"]' : {
            'marker-file' : 'url(./icons/picto-1.svg)'
        },
        '[type="Spot/Monument"]' : {
            'marker-file' : 'url(./icons/picto-1.svg)'
        },
        '[type="Spot/Patrimoine"]' : {
            'marker-file' : 'url(./icons/picto-1.svg)'
        },

        '[type="Spot/Arts Visuels"]' : {
            'marker-file' : 'url(./icons/picto-2.svg)'
        },
        '[type="Spot/Art Contemporain"]' : {
            'marker-file' : 'url(./icons/picto-2.svg)'
        },
        '[type="Spot/Arts"]' : {
            'marker-file' : 'url(./icons/picto-2.svg)'
        },
        '[type="Spot/Exposition"]' : {
            'marker-file' : 'url(./icons/picto-2.svg)'
        },
        '[type="Spot/Exhibition"]' : {
            'marker-file' : 'url(./icons/picto-2.svg)'
        },

        '[type="Spot/Cinema"]' : {
            'marker-file' : 'url(./icons/picto-3.svg)'
        },
        '[type="Spot/Film"]' : {
            'marker-file' : 'url(./icons/picto-3.svg)'
        },

        '[type="Spot/Spectacle vivant"]' : {
            'marker-file' : 'url(./icons/picto-4.svg)'
        },
        '[type="Spot/Spectacle Vivant"]' : {
            'marker-file' : 'url(./icons/picto-4.svg)'
        },
        '[type="Spot/Spectacle"]' : {
            'marker-file' : 'url(./icons/picto-4.svg)'
        },
        '[type="Spot/Danse"]' : {
            'marker-file' : 'url(./icons/picto-4.svg)'
        },
        '[type="Spot/Théâtre"]' : {
            'marker-file' : 'url(./icons/picto-4.svg)'
        },
        '[type="Spot/Performance"]' : {
            'marker-file' : 'url(./icons/picto-4.svg)'
        },

        '[type="Spot/Food"]' : {
            'marker-file' : 'url(./icons/picto-6.svg)'
        },
        '[type="Spot/Fooding"]' : {
            'marker-file' : 'url(./icons/picto-6.svg)'
        },
        '[type="Spot/Restaurant"]' : {
            'marker-file' : 'url(./icons/picto-6.svg)'
        },
        '[type="Spot/Café"]' : {
            'marker-file' : 'url(./icons/picto-6.svg)'
        },

        '[type="Spot/Musique"]' : {
            'marker-file' : 'url(./icons/picto-5.svg)'
        },
        '[type="Spot/Concerts"]' : {
            'marker-file' : 'url(./icons/picto-5.svg)'
        },
        '[type="Spot/Fêtes"]' : {
            'marker-file' : 'url(./icons/picto-5.svg)'
        },
        '[type="Spot/Parties"]' : {
            'marker-file' : 'url(./icons/picto-5.svg)'
        },
        '[type="Spot/Nuit"]' : {
            'marker-file' : 'url(./icons/picto-5.svg)'
        },
        '[type="Spot/Boîte de Nuit"]' : {
            'marker-file' : 'url(./icons/picto-5.svg)'
        },
        '[type="Spot/Nightclub"]' : {
            'marker-file' : 'url(./icons/picto-5.svg)'
        },
        '[type="Spot/Salle de Fête"]' : {
            'marker-file' : 'url(./icons/picto-5.svg)'
        },

        '[type="Spot/Education"]' : {
            'marker-file' : 'url(./icons/picto-7.svg)'
        },
        '[type="Spot/Workshop"]' : {
            'marker-file' : 'url(./icons/picto-7.svg)'
        },
        '[type="Spot/Ateliers"]' : {
            'marker-file' : 'url(./icons/picto-7.svg)'
        },
        '[type="Spot/Ecole"]' : {
            'marker-file' : 'url(./icons/picto-7.svg)'
        },
        '[type="Spot/School"]' : {
            'marker-file' : 'url(./icons/picto-7.svg)'
        },

        '[type="Spot/Design"]' : {
            'marker-file' : 'url(./icons/picto-8.svg)'
        },
        '[type="Spot/Innovation"]' : {
            'marker-file' : 'url(./icons/picto-8.svg)'
        },
        '[type="Spot/Jeux Video"]' : {
            'marker-file' : 'url(./icons/picto-8.svg)'
        },
    },


    '[zoom>=13]' : {

        'text-name' : '[label]',
        'text-face-name' : '"Open Sans Regular"',
        'text-fill' : 'white',
        'text-opacity' : 1,
        'text-placement-type' : 'simple',
        'text-allow-overlap' : true,
        'text-halo-radius' : 2,
        'text-halo-fill' : '#d62fe8',
        'text-dy' : -30,
        'text-dx' : 10,
        'text-placement-type' : 'dummy',
        'text-horizontal-alignment' : 'right',
	'text-wrap-width': 120,
        'text-wrap-before': false,        
        
        'shield-name' : '[number]',
        'shield-face-name' : '"Open Sans Regular"',
        'shield-fill' : 'white',
        'shield-opacity' : 1,
        'shield-placement-type' : 'simple',
        'shield-allow-overlap' : true,
        'shield-halo-radius' : 1,
        'shield-halo-fill' : 'black',
        'shield-placement-type' : 'dummy',
        'shield-horizontal-alignment' : 'middle',
        'shield-file' : 'url(./icons/pix.png)',
        'shield-text-dy' : -10,
        
        '[dx="0"]' : {
            'shield-text-dx' : -2,
        },

        '[dx="1"]' : {
            'shield-text-dx' : -3,
        },
        '[dx="2"]' : {
            'shield-text-dx' : -4,
        },


        '[type="Spot/Architecture (urbanisme)"]' : {
            'marker-file' : 'url(./icons/picto-1.svg)',
            'text-halo-fill' : '#560b4d',
        },
        '[type="Spot/Monument"]' : {
            'marker-file' : 'url(./icons/picto-1.svg)'
        },
        '[type="Spot/Patrimoine"]' : {
            'marker-file' : 'url(./icons/picto-1.svg)'
        },

        '[type="Spot/Arts Visuels"]' : {
            'marker-file' : 'url(./icons/picto-2.svg)',
            'text-halo-fill' : '#d62fe8',

        },
        '[type="Spot/Art Contemporain"]' : {
            'marker-file' : 'url(./icons/picto-2.svg)',
            'text-halo-fill' : '#d62fe8',
        },
        '[type="Spot/Arts"]' : {
            'marker-file' : 'url(./icons/picto-2.svg)',
            'text-halo-fill' : '#d62fe8',
        },
        '[type="Spot/Exposition"]' : {
            'marker-file' : 'url(./icons/picto-2.svg)',
            'text-halo-fill' : '#d62fe8',
        },
        '[type="Spot/Exhibition"]' : {
            'marker-file' : 'url(./icons/picto-2.svg)',
            'text-halo-fill' : '#d62fe8',
        },

        '[type="Spot/Cinema"]' : {
            'marker-file' : 'url(./icons/picto-3.svg)',
            'text-halo-fill' : '#a95460',
        },
        '[type="Spot/Film"]' : {
            'marker-file' : 'url(./icons/picto-3.svg)',
            'text-halo-fill' : '#a95460',
        },

        '[type="Spot/Spectacle vivant"]' : {
            'marker-file' : 'url(./icons/picto-4.svg)',
            'text-halo-fill' : '#ef3926',
        },
        '[type="Spot/Spectacle Vivant"]' : {
            'marker-file' : 'url(./icons/picto-4.svg)'
        },
        '[type="Spot/Spectacle"]' : {
            'marker-file' : 'url(./icons/picto-4.svg)'
        },
        '[type="Spot/Danse"]' : {
            'marker-file' : 'url(./icons/picto-4.svg)'
        },
        '[type="Spot/Théâtre"]' : {
            'marker-file' : 'url(./icons/picto-4.svg)'
        },
        '[type="Spot/Performance"]' : {
            'marker-file' : 'url(./icons/picto-4.svg)'
        },

        '[type="Spot/Food"]' : {
            'marker-file' : 'url(./icons/picto-6.svg)',
            'text-halo-fill' : '#dae02c',
        },
        '[type="Spot/Fooding"]' : {
            'marker-file' : 'url(./icons/picto-6.svg)',
            'text-halo-fill' : '#dae02c',
        },
        '[type="Spot/Restaurant"]' : {
            'marker-file' : 'url(./icons/picto-6.svg)',
            'text-halo-fill' : '#dae02c',
        },
        '[type="Spot/Café"]' : {
            'marker-file' : 'url(./icons/picto-6.svg)',
            'text-halo-fill' : '#dae02c',
        },

        '[type="Spot/Musique"]' : {
            'marker-file' : 'url(./icons/picto-5.svg)',
            'text-halo-fill': '#f3962b'
        },
        '[type="Spot/Concerts"]' : {
            'marker-file' : 'url(./icons/picto-5.svg)',
            'text-halo-fill': '#f3962b'
        },
        '[type="Spot/Fêtes"]' : {
            'marker-file' : 'url(./icons/picto-5.svg)',
            'text-halo-fill': '#f3962b'
        },
        '[type="Spot/Parties"]' : {
            'marker-file' : 'url(./icons/picto-5.svg)',
            'text-halo-fill': '#f3962b'
        },
        '[type="Spot/Nuit"]' : {
            'marker-file' : 'url(./icons/picto-5.svg)',
            'text-halo-fill': '#f3962b'
        },
        '[type="Spot/Boîte de Nuit"]' : {
            'marker-file' : 'url(./icons/picto-5.svg)',
            'text-halo-fill': '#f3962b'
        },
        '[type="Spot/Nightclub"]' : {
            'marker-file' : 'url(./icons/picto-5.svg)',
            'text-halo-fill': '#f3962b'
        },
        '[type="Spot/Salle de Fête"]' : {
            'marker-file' : 'url(./icons/picto-5.svg)',
            'text-halo-fill': '#f3962b'
        },

        '[type="Spot/Education"]' : {
            'marker-file' : 'url(./icons/picto-7.svg)',
            'text-halo-fill': 'darkgray'
            
        },
        '[type="Spot/Workshop"]' : {
            'marker-file' : 'url(./icons/picto-7.svg)',
            'text-halo-fill': 'darkgray'
        },
        '[type="Spot/Ateliers"]' : {
            'marker-file' : 'url(./icons/picto-7.svg)',
            'text-halo-fill': '#e9fca2'
        },
        '[type="Spot/Ecole"]' : {
            'marker-file' : 'url(./icons/picto-7.svg)',
            'text-halo-fill': '#e9fca2'
        },
        '[type="Spot/School"]' : {
            'marker-file' : 'url(./icons/picto-7.svg)',
            'text-halo-fill': '#e9fca2'
        },

        '[type="Spot/Design"]' : {
            'marker-file' : 'url(./icons/picto-8.svg)',
            'text-halo-fill': '#857f66'
        },
        '[type="Spot/Innovation"]' : {
            'marker-file' : 'url(./icons/picto-8.svg)',
            'text-halo-fill': '#857f66'
        },
        '[type="Spot/Jeux Video"]' : {
            'marker-file' : 'url(./icons/picto-8.svg)',
            'text-halo-fill': '#857f66'
        },

    }
});

module.exports = {
    '#objects' : style,
    'Map' : {
        'font-directory' : 'url(../fonts)',
        'buffer-size' : 512
    },
}
