var express = require('express');
var app = express();
var device = require('express-device');
app.use(device.capture());
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

//connect to MongoDB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/interview', {
  useMongoClient: true
});//here interview is my database name
var db = mongoose.connection;

//error handling while connecting todb
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function ()
 {
  // we're connected!
});

//sessions for tracking logins
app.use(session({
  secret: 'sessioninterview',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/frontend'));

// including routes
var routes = require('./routes/router');
app.use('/', routes);


app.use(function (req, res, next) 
{
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});


app.use(function (err, req, res, next) 
{
  res.status(err.status || 500);
  res.send(err.message);
});


//localhost:3000
app.listen(3000, function () 
{
  console.log('Express app listening on port 3000');
});