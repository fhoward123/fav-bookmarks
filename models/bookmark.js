const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
    title: {
            type: String,
            unique: true,
            required: [true, 'Required']
        },
    url: {
            type: String,
            unique: true,
            required: [true, 'Required']
        },
});

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

module.exports = Bookmark;
