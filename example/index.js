var express = require('express'),
	prongodb = require('../prongodb'),
	app = express();

app.use('/stuffs', require('./stuffs'));

app.listen(3000, function() {

	prongodb.connect('mongodb://localhost/foo');
	console.log("let's go");
});