var pg = require('pg');
    var connectionString = "pg://postgres:5432@localhost/prm"
    pg.connect(connectionString, function(err, client, done) {
        client.query('SELECT nom FROM etablissements_techonmap ', null, function(err, result) {
          //assert.equal('brianc', result.rows[0].name);
           console.log(result)
          done();
        });
    });