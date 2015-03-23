var express = require('express');
var router = express.Router();
var pg = require('pg');
var connString = "postgres://postgres:1MirPan!@localhost/goals_development"

/* GET users listing. */
router.get('/', function(req, res, next) {
  pg.connect(connString, function(err, client, done){
    if (err) {
      return console.error('error fetching data', err);
    }

    client.query('select g.id, g.measurement, u.description as "unit", a.description as "activity", t.description as "timeframe" from goals g ' +
                 'join activities a on a.id = g.activity_id ' +
                 'join timeframes t on t.id = g.timeframe_id ' +
                 'join units u on u.id = g.unit_id', function(err, result){
      done();
      res.send(result);
    })
  })
  //res.send('respond with a resource');
});

module.exports = router;
