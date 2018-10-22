let express = require('express');
session = require('express-session');
FileStore = require('session-file-store')(session);
secret = 'interviewsession';
port = process.env.PORT || process.argv[2] || 8080;
app = express();
 
app.use(session({
        store: new FileStore({
 
            path: '/'
 
        }),
        name: 'sessioncount',
        secret: secret,
        resave: false,
        saveUninitialized: false,
        cookie: {maxAge: 1000 * 60 * 60 * 24 * 365 * 2}
    }));
 
app.get('/', function (req, res)
 {
    if (!req.session.count)
		{
          req.session.count = 0;
        }
    req.session.count += 1;
    res.json(req.session);
 });
 
app.listen(4000, function ()
 {
    console.log('sessioncount port: 4000');
 });