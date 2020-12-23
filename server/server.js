const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const uri = process.env.crewmeister_mongo_connection_uri;
mongoose.connect(uri, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useCreateIndex: true,
});
mongoose.set('debug', true)

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function() {
  console.log("Connection Successful!");
});

const app = express();

// CORS
app.use(cors());

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use('/api/members', require('./routes/members'));
app.use('/api/absences', require('./routes/absences'));
app.use('/api/health', require('./routes/health'));

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port}`));
