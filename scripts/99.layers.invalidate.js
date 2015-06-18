#!/usr/local/bin/node

var Glob = require('glob')
var Path = require('path');
var _ = require('underscore');
var request = require('request');

var layers = [];
var server = 'http://parisgalaxies.ubimix.com';
var invalidate = '/tiles/invalidate/';
var endpoint = server+invalidate;


Glob('../layers/**/*.yml', function (er, files) {

    _.each(files, function(file) {
       layers.push(Path.dirname(file).substring('../'.length)); 
    });

    _.each(layers, function(layer) {
        console.log(endpoint+layer);
        request(endpoint +layer, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            console.log(layer, ':\n', body) // Print the google web page.
          } else {
              console.log(error);
          }
        });

    });
    
})

