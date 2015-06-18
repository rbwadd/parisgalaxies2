#!/usr/bin/node

var _ = require('underscore');
var MosaicDistil = require('mosaic-distil');
var Utils = require('mosaic-distil/transform-utils');
var Q = require('q');
var dataFolder = '../data';


var listener = new MosaicDistil.WriteListener({
    dataFolder : dataFolder
});
listener = new MosaicDistil.LogListener({
    listener : listener,
});

var dataSets = [ Config() ];
var dataProvider = new MosaicDistil.CsvDataProvider({
    dataSets : dataSets,
    dataFolder : dataFolder,
    forceDownload : true
})
return dataProvider.handleAll(listener).fail(function(err) {
    console.log(err.stack);
}).done();

/* ------------------------------------------------------------ */

function Config() {
    return Utils.newDataSet({
        'path' : 'PG-DATAMAP3+IMAGES.clean.csv',
        csvOptions : {
            delim : ','
        },
        transform : function(props) {
            var that = this;
            var result = {
                type : 'Feature',
                properties : _.extend({
                    type : that.getType(props)
                }, that._toProperties(props, {
                    exclude : [],
                    convert : {
                        'NAME' : 'label',
                        'CITY' : 'city',
                        'DESCRIPTION': 'description',
                        'LOCATION' : 'location',
                        'TRANSPORT' : 'transport',
                        'CONTACT' : 'contact',
                        'SINCE' : 'since',
                        'TIME FROM CHATELET' : 'time',
                        'KEYWORDS' : 'keywords'
                    },
                    dataTypes: {
                        'KEYWORDS' : 'keywords'
                        
                    }
                }))
            };

            return Q(result);
        },
        _toKeywords : function(value) {
            var list = this._toTags(value);
            var result = [];
            _.each(list, function(c) {
                c = c[0].toUpperCase() + c.substring(1).toLowerCase();
                result.push(c);
            })
            return result;
        },
        _toTags : function(value) {
            value = normalize(value);
            var tags = value.split(/[;,]/);
            var result = {};
            _.each(tags, function(tag) {
                tag = normalize(tag);
                tag = tag.replace(/^[.;,]+|[.;,]+$/gim, '');
                if (tag == '')
                    return;
                result[tag] = tag;
            });
            return _.keys(result);
        },

        _toUrlList : function(value) {
            value = normalize(value);
            var list = value.split(/[;\s]+/);
            var result = {};
            var that = this;
            _.each(list, function(item) {
                item = that._toUrl(item);
                if (item == '' || !item)
                    return;
                result[item] = item;
            });
            return _.keys(result);
        },

        _toText : function(value) {
            value = value.toLowerCase();
            var array = value.split('.');
            var result = [];
            _.each(array, function(sentence) {
                sentence = normalize(sentence);
                if (!sentence || sentence == '')
                    return;
                sentence = sentence[0].toUpperCase() + sentence.substring(1);
                result.push(sentence);
            })
            return result.join('. ') + (result.length > 1 ? '.' : '');
        },
        getType : function(props) {
            
            var keywords = this._toKeywords(props.KEYWORDS);
            
            var mainType = 'Spot';
            
            if (keywords && Array.isArray(keywords) && keywords.length>0)
                mainType = mainType+'/'+keywords[0];
            
            return mainType;

        }
    });
}

function normalize(str) {
    str = trim(str);
    str = str.replace(/\s+/gim, ' ');
    return str;
}
function trim(str) {
    if (!str)
        return str;
    str = str.replace(/^\s+|\s+$/gim, '');
    return str;
}
