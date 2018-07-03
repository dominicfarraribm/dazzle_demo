var express = require('express');
var request = require('request'),
    sys = require('sys');

// Load the Cloudant library.
var Cloudant = require('@cloudant/cloudant');

var Promise = require('bluebird');

var router = express.Router();

// Initialize the library with my account.
/*
var cloudant = Cloudant('https://a3283e3d-ad02-4fee-bbd9-13b620b1ec03-bluemix:ec3150cdcc9932ab891fd976380aac7dbef1b283eb45789494e07ece9d76fb86@a3283e3d-ad02-4fee-bbd9-13b620b1ec03-bluemix.cloudant.com', function(er, cloudant, reply) {
    if (er) {
        throw er;
        console.log('Error Connecting';
    } else {
        console.log('Connected to DB';

    }

});
*/

var addTwoPromise = function(num) {
    return new Promise(
        function (fulfill, reject) {
           fulfill(num + 2);
        }
     );
};

var cloudantconnect = function() {
    return new Promise(
        function (resolve,reject) {
            // Initialize the library with my account.
            var cloudant = Cloudant('https://a3283e3d-ad02-4fee-bbd9-13b620b1ec03-bluemix:ec3150cdcc9932ab891fd976380aac7dbef1b283eb45789494e07ece9d76fb86@a3283e3d-ad02-4fee-bbd9-13b620b1ec03-bluemix.cloudant.com', function(er, cloudant, reply) {
                if (er) {
                    //throw er;
                    console.log('Error Connecting');
                    reject(er);
                } else {
                    console.log('Connected to DB');
                    resolve(cloudant);
                }
            });
        })
};

var cloudantcall = function(url, db) {
    return new Promise(
        function (resolve,reject) {

            // Initialize the Cloudant Connection with my Cludant URL.
            var cloudant = Cloudant(url, function(er, cloudant, reply) {
            //var cloudant = Cloudant('https://a3283e3d-ad02-4fee-bbd9-13b620b1ec03-bluemix:ec3150cdcc9932ab891fd976380aac7dbef1b283eb45789494e07ece9d76fb86@a3283e3d-ad02-4fee-bbd9-13b620b1ec03-bluemix.cloudant.com', function(er, cloudant, reply) {

                if (er) {
                    //throw er;
                    console.log('Error Connecting');
                    reject(er);
                } else {
                    console.log('Connected to DB - Fetching DB list');

                    //cloudant.db.list(function (err, allDbs) {
                    var dbconn = cloudant.db.use(db);
                    dbconn.get("dog", function(err, data) {
                        if (err) {
                            consol.log('Error getting record: ');
                            reject(err);
                        } else {
                            console.log("Found dog:", data);
                            resolve(data);
                        }
                    });

                }
            });

        })
};


/* GET cards page. */
router.get('/', function(req, res, next) {
    //Let's execute the promise
    cloudantcall('https://a3283e3d-ad02-4fee-bbd9-13b620b1ec03-bluemix:ec3150cdcc9932ab891fd976380aac7dbef1b283eb45789494e07ece9d76fb86@a3283e3d-ad02-4fee-bbd9-13b620b1ec03-bluemix.cloudant.com','templates')
        .then(function(result) {
            console.log(result); // will print 7 in the console
            res.render('showcards', { resultofbb: result });
        });
});

module.exports = router;


