#!/usr/bin/env node

var FS = require('fs');
var Path = require('path');
var Iconv = require('iconv').Iconv;
var Q = require('q');
var _ = require('underscore');

//var dataFolder = '../app/images/bandeaux';

var dataFolder = '../app/images/vignettes';

function visit(file, visitor) {
    return Q.ninvoke(FS, 'stat', file).then(function(stat) {
        var directory = !!stat && stat.isDirectory();
        return Q().then(function() {
            return visitor(file, directory);
        }).then(function(result) {
            if (result === false || !directory)
                return;
            return Q.ninvoke(FS, 'readdir', file).then(function(list) {
                return Q.all(_.map(list, function(f) {
                    var child = Path.join(file, f);
                    return visit(child, visitor);
                }));
            });
        })
    })
}

var converter = new Iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE');

visit(dataFolder, function(file, directory) {
    if (directory)
        return;
    var ext = Path.extname(file);
    if (ext !== '.jpg')
        return;
    var name = Path.basename(file);
    var newName = converter.convert(name).toString();
    newName = newName.replace(/'/gim, '');
    newName = newName.replace(/`/gim, '');
    newName = newName.replace(/_/gim, '-');
    newName = newName.replace(/(\s+[-]*\s*)/gim, '-').toLowerCase();
    newName = newName.replace(/--/gim, '-').toLowerCase();
    newName = newName.replace(/&/gim, '-').toLowerCase();
    
    
    var newPath = dataFolder + '/' + newName ;
    console.log(name, newPath);
    FS.renameSync(file, newPath);


}).done();
