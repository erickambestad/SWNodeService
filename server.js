var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var seed = require('./seed');

// // Connect to the DB
var mongoose   = require('mongoose');

// use bluebird for promises
mongoose.Promise = require('bluebird');
mongoose.connect("mongodb://localhost/staywell", function (err) {
    if (!err) {
        // Remove the data and reseed
        mongoose.connection.dropDatabase(function (err) {
            if (!err) seed();
        });
    }
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true, }));
app.use(bodyParser.json());

// Routes
var routes = require('./app/routes');

// Our endpoints
app.use('/', routes);

app.listen(port);

// eslint-disable-next-line
console.log('Service running on port ' + port);
