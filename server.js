const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');

// Log HTTP requests
app.use(morgan('tiny'));
app.use(express.static('public'));
app.use(express.json()); //use .json(), not .urlencoded()

const bookmarkController = require('./controllers/bookmarks.js');
app.use('/bookmarks', bookmarkController);

mongoose.connect('mongodb://localhost:27017/meancrud', { useNewUrlParser: true });
mongoose.connection.once('open', function() {
    console.log('connected to mongoose...');
});

app.listen(3000, ()=>{
    console.log('listening...');
});
