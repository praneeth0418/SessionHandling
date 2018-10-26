var express = require('express');
var router = express.Router();
var app = express();
var User = require('../models/user');
var device = require('express-device');
app.use(device.capture());
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Session = mongoose.model('Session', new Schema(), 'sessions');



router.get('/', function (req, res, next)
 {
  return res.sendFile(path.join(__dirname + '/frontend/index.html'));
});


//updating data
router.post('/', function (req, res, next)
 {
  // password matching
  if (req.body.password !== req.body.passwordConf)
	  {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    res.send("passwords dont match");
    return next(err);
  }

  if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf)
	{

    var userData = 
	{
      email: req.body.email,
      username: req.body.username,
	  sessionid:req.sessionID,
	  device:req.device.type,
      password: req.body.password,
      passwordConf: req.body.passwordConf,
    }

    User.create(userData, function (error, user)
	{
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });

  } else if (req.body.loginput && req.body.logpassword) 
  {
    User.authenticate(req.body.loginput, req.body.logpassword, function (error, user)
	{
      if (error || !user) 
	  {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else 
	  {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });
  } 
  
  
  
  
  
  
  else 
  {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
})


//This happens if you try to open localhost:3000/profile directly before logging in.
router.get('/profile', function (req, res, next) 
{
  User.findById(req.session.userId)
    .exec(function (error, user) 
	{
      if (error) 
	  {
        return next(error);
      } else 
	  {
        if (user === null) 
		{
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else 
		{
          return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<h2>Device: </h2>' + user.device + '<br><h1>your sessionid is:</h1>'+user.sessionid+'<br><a type="button" href="/logout">Logout</a>')
        }
      }
    });
});

// GET for logout
router.get('/logout', function (req, res, next) 
{
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

module.exports = router;