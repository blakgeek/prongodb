(function() {
	'use strict';

	var mongodb = require('mongodb'),
		MongoClient = mongodb.MongoClient,
		Collection = mongodb.Collection,
		Db = mongodb.Db,
		Cursor = mongodb.Cursor,
		Promise = require('bluebird'),
		deferred = Promise.defer(),
		database;

	Promise.promisifyAll(MongoClient);
	Promise.promisifyAll(Collection.prototype);
	Promise.promisifyAll(Db.prototype);
	Promise.promisifyAll(Cursor.prototype);

	module.exports = {
		connect: function(uri, options) {
			MongoClient.connectAsync(uri, options).then(function(db) {
				database = db;
				deferred.resolve(db);
			}).catch(function(err) {

				deferred.reject(err);
			});
			return deferred.promise;
		},
		db: function() {
			return deferred.promise;
		},
		close: function() {
			database.close();
		}
	};
})();