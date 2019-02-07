// const express = require('express');
// const router = express.Router();
// const mongo = require('mongodb');
// const assert = require('assert');
// const mongoClient = mongo.MongoClient;
// const Twitter = require('twitter');
// const AhoCorasick = require('ahocorasick');

// var twitterClient = new Twitter({
//   consumer_key: 'rtenIb8G3RvRDbKn12ry1O0lG',
//   consumer_secret: 'TJQs8oA1CwsGSWVzywu0VQzDyqlywdvktpI5qw49qRHJBGJDB4',
//   access_token_key: '878276697044525056-v81JZ3MMuD2BjCGVMBWLXW7Ava2L2Gv',
//   access_token_secret: 'BDrh5kSTQDHwANgTuL5rxhGGwqJ4loZthAtnXVanKGJlj'
// });

// var params = {screen_name: 'VictoriasSecret', count: 100};

// // Connection URL
// const dbUrl = 'mongodb://localhost:27017';

// // Database Name
// const dbName = 'store';

// // collection name
// const collectionName = 'tweets';

// // download tweets
// router.get('/download', function (req, res) {

//   twitterClient.get('statuses/user_timeline', params, function (error, tweets, response) {
//     if (error) throw error;

//     mongoClient.connect(dbUrl, function (err, client) {
//       assert.equal(null, err);
//       const db = client.db(dbName);

//       db.collection(collectionName).remove();

//       tweets.forEach(function (t) {
//         db.collection(collectionName).insertOne({
//           source_id: "" + t.id,
//           text: t.text,
//           user: t.user,
//           created_at: t.created_at
//         }, function (err, dbRes) {
//         });
//       });
//       res.send(true);
//       client.close();
//     });
//   });
// });

// router.post('/search', function (req, res) {
//   var ac = new AhoCorasick(req.body.keywords);

//   mongoClient.connect(dbUrl, function (err, client) {
//     assert.equal(null, err);
//     const db = client.db(dbName);

//     db.collection(collectionName).find().toArray(function (err, dbRes) {
//       if (err) throw err;

//       var matches = [];
//       dbRes.forEach(tweet => {
//         var results = ac.search(tweet.text);
//         if (results.length > 0) {
//           matches.push({tweet: tweet, matches: results});
//         }
//       });
//       res.send(matches);
//     });
//   });
// });

// module.exports = router;