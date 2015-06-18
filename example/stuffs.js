var prongodb = require('../prongodb'),
	router = require('express').Router(),
	db;

prongodb.db().then(function(mongodb) {
	db = mongodb;
});

router.get('/', function(req, resp) {
	if(!db) {
		resp.status(404).send('no db');
	} else {
		var coll = db.collection('foo');
		coll.find({}).toArrayAsync().then(function(stats) {
			resp.status(200).send(stats);
		}).catch(function(err) {
			resp.sendStatus(500);
		});
	}
});

module.exports = router;