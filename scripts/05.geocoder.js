#!/usr/bin/node

var _ = require('underscore');
var MosaicDistil = require('mosaic-distil');
var Utils = require('mosaic-distil/transform-utils');
var Q = require('q');
var Geocoder = require('geocoder');
var FS = require('fs');
var dataFolder = '../data';

var listener = new MosaicDistil.WriteListener({
    dataFolder : dataFolder
});

listener._getDestFile = function(info) {
    return this._setExtension(info.fileName, '.geo.json');
}

listener = new MosaicDistil.LogListener({
    listener : listener,
});

var dataSets = [ Config() ];
var dataProvider = new MosaicDistil.JsonDataProvider({
    dataSets : dataSets,
    dataFolder : dataFolder,
    forceDownload : true
})
return dataProvider.handleAll(listener).fail(function(err) {
    console.log(err.stack);
}).done();

function geocode(obj) {
    var props = obj.properties;
    var addr = props.location;
    if (!addr) {
        console.log('\n******************* NO_ADDRESS : ', obj.properties.label);
        FS.appendFileSync('../data/geo-errors.txt', obj.properties.label+'\n');
        return Q(props);
    } else {
        addr = addr.replace(/\n/gim,', ');
        console.log(addr);
        //return Q(props);
        return Q.ninvoke(Geocoder, 'geocode', addr).then(function(geoData) {
            var geom = geoData.results[0];
            if (geom && geom.geometry && geom.geometry.location) {
                var lat = geom.geometry.location.lat;
                var lng = geom.geometry.location.lng;
                obj.geometry = {
                    type : 'Point',
                    coordinates : [ lng, lat ]
                };
            } else {
                FS.appendFileSync('../data/geo-errors.txt', obj.properties.label+',' + addr+ '\n');        
            }
            return Q.delay(500).then(function() {
                return obj;
            });
        });
        
    }
}

function Config() {
    return Utils.newDataSet({
        "path" : "PG-DATAMAP3+IMAGES.clean.json",
        transform : function(object) {
            return geocode(object);
            return Q(props);
        },
    });
}
