var parse = require('csv-parse');
var stringify = require('csv-stringify');
var FS = require('fs');
var _ = require('underscore');
var Iconv = require('iconv').Iconv;

// var input = '#Welcome\n"1","2\nhehehehhe","3","4"\n"a","b","c","d"';

var input = FS.readFileSync('../data/PG-DATAMAP3+IMAGES.csv', {
    encoding : 'utf8'
});

var converter = new Iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE');

FS.writeFileSync('../data/PG-DATAMAP3+IMAGES.clean.csv', '');

parse(input, {
    comment : '#'
}, function(err, output) {
    console.log(output.length);
    var entries = [];
    _.each(output, function(spot) {
        var line = '';
        var counter = 0;
        _.each(spot, function(field) {
            field = field.replace(/\n/gim, '\\n');
            if (counter <= 1) {
                var paths = field.split(',');
                var newPaths = [];
                _.each(paths, function(path) {
                    path = path.toLowerCase();
                    var newPath = converter.convert(path).toString();
                    newPath = newPath.replace(/'/gim, '');
                    newPath = newPath.replace(/`/gim, '');
                    newPath = newPath.replace(/^/gim, '');
                    newPath = newPath.replace(/_/gim, '-');
                    newPath = newPath.replace(/(\s+[-]*\s*)/gim, '-').toLowerCase();
                    newPath = newPath.replace(/&/gim, '-').toLowerCase();
                    newPath = newPath.replace(/--/gim, '-').toLowerCase();
                    newPath = newPath.replace(/--/gim, '-').toLowerCase();
                    newPaths.push(newPath);
                });

                field = newPaths.join(',');
            }
            counter++;
            line += '"' + field + '",';
        })
        line = line.substring(0, line.length - 1);

        FS.appendFileSync('../data/PG-DATAMAP3+IMAGES.clean.csv', line + '\n');

    });

    // stringify(output, function(err, clean){
    //
    // console.log(clean);
    // });
});
