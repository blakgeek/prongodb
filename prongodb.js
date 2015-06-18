(function(){
    'use strict';

    var mongo = require('mongodb'),
        MongoClient = mongo.MongoClient,
        Collection = mongo.Collection,
        Db = mongo.Db,
        Cursor = mongo.Cursor,
        Promise = require('bluebird'),
        mongodb,
        deferred = Promise.defer();
    
    Promise.promisifyAll(MongoClient);
    Promise.promisifyAll(Collection.prototype);
    Promise.promisifyAll(Db.prototype);
    Promise.promisifyAll(Cursor.prototype);
    
    module.exports =  {
        connect: function(dburl, options) {
            MongoClient.connectAsync(dburl, options).then(function(db) {
                Promise.promisifyAll(db);
                deferred.resolve(db);
            });
            return deferred.promise;
        },
        db: function() {
            return deferred.promise;
        },
        close: function() {
            mongodb.close();
        }
    };
})();