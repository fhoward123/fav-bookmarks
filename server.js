const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const db = mongoose.connection;

// Environment Variables
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/forum'
const PORT = process.env.PORT || 3000
const secret = process.env.SECRET

//Express listener
app.listen(PORT, ()=> {
    console.log(`App listening on port ${PORT}...`);
});

// Log HTTP requests
app.use(morgan('tiny'));
app.use(express.static('public'));
app.use(express.json()); //use .json(), not .urlencoded()

const bookmarkController = require('./controllers/bookmarks.js');
app.use('/bookmarks', bookmarkController);

//////////////////////////////////
//          Mongoose
/////////////////////////////////
// Connect to Mongo
mongoose.connect(mongoURI, { useNewUrlParser: true },
    () => console.log('MongoDB connection established:', mongoURI)
);
// Error / Disconnection
db.on('error', err => console.log(err.message + ' is Mongod running?'))
db.on('disconnected', () => console.log('mongo disconnected'))

//404 error
app.get('*', (req, res) => {
    res.status(404).json('DOH!, page not found')
})
