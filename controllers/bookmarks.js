// API to interact with MongoDB //

const express = require('express');
const router = express.Router();
const Bookmark = require('../models/bookmark.js');

// Checking from mongo cli
// show dbs
// use meancrud
// show collections
// db.bookmarks.find().pretty()

///////////////////////////
//***** CRUD Routes *****//
///////////////////////////

//* CREATE Route *//
// test: curl -X POST -H "Content-Type: application/json" -d '{"title":"Google", "url":"https://www.google.com"}' http://localhost:3000/bookmarks
// result: {"_id":"5cd9a8b2c7fd6f7d30e6deb4",blahblahblah}
router.post('/', function(req, res) {
    Bookmark.create(req.body, function(err, createdBookmark) {
        // .json() will send proper headers in response so client
        // knows it's json coming back
        res.json(createdBookmark);
    });
});

//* READ Route *//
// test: curl http://localhost:3000/bookmarks
router.get('/', function(req, res) {
    // res.send('index');
    Bookmark.find({}, function(err, foundBookmarks) {
        res.json(foundBookmarks);
    });
});

//* UPDATE Route *//
// test: curl -X PUT -H "Content-Type: application/json" -d '{"name":"Bambi","species":"deer"}' http://localhost:3000/bookmarks/5cd9a8b2c7fd6f7d30e6deb4
router.put('/:id', function(req, res) {
    console.log('req body: ', req.body);
    console.log('req id: ', req.params.id);
    Bookmark.findByIdAndUpdate(req.params.id, req.body, {new:true}, function(err, updatedBookmark) {
        res.json(updatedBookmark);
    });
});

//* DELETE Route *//
// test: curl -X DELETE http://localhost:3000/bookmarks/5cda2b57cda6ff916033868c
router.delete('/:id', function(req, res) {
    Bookmark.findByIdAndRemove(req.params.id, function(err, deletedBookmark) {
        res.json(deletedBookmark);
    });
});

module.exports = router;
