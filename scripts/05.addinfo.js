#!/usr/bin/node

var _ = require('underscore');
var dataFolder = '../data';
var FS = require('fs');

var features = JSON.parse(FS.readFileSync(dataFolder + '/PG-DATAMAP3+IMAGES.clean.geo.json'));
var count = 1;

_.each(features, function(feature) {
    if (feature.properties) {
        feature.properties.number = count;
        if (count < 10)
            feature.properties.dx = 0;
        else if (count < 100)
            feature.properties.dx = 1;
        else
            feature.properties.dx = 2;
        count++;
    } else {
        console.log(feature);
    }
});

FS.writeFileSync(dataFolder + '/pg-data.geo.json', JSON.stringify(features, null, 2));
