#!/usr/bin/env node

var _ = require('underscore');
var MosaicDistil = require('mosaic-distil');
var Utils = require('mosaic-distil/transform-utils');
var Q = require('q');
var dataFolder = '../data';

var dbWriter = new MosaicDistil.DbWriteListener({
    url : "postgres://postgres:postgres@localhost/paris-galaxies",
    rebuildDb : true
});

listener = new MosaicDistil.LogListener({
    listener : dbWriter,
});
function close() {
    dbWriter.close();
}

var dataSets = [ CciConfig() ];
var dataProvider = new MosaicDistil.JsonDataProvider({
    dataSets : dataSets,
    dataFolder : dataFolder,
    forceDownload : true
})
return dataProvider.handleAll(listener).fail(function(err) {
    console.log(err.stack);
}).done();

function CciConfig() {
    return Utils.newDataSet({
        "path" : "pg-data.geo.json",
        transform : function(object) {
            return Q(object);
        },
    });
}
