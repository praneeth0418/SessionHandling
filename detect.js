var express = require('express');
var app = express();
var device = require('express-device');
app.use(device.capture());

app.get('/',function(req,res) {
  res.send("Hi you are using "+req.device.type.toUpperCase());
});

app.listen(3000);
console.log("Listening to Port 3000");
