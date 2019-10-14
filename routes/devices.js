var express = require('express');
var router = express.Router();

var mqtt=require("mqtt"); 
var client=mqtt.connect("mqtt://172.30.1.15");

/* GET home page. */
router.post('/led/:flag', function(req, res, next) {
   res.set('Content-Type', 'text/json');	
   if(req.params.flag=="on"){
	   // MQTT->led : 1
	   client.publish("led", '1');
	   res.send(JSON.stringify({led:'on'}));
   }else{
	   client.publish("led", '2');
	   res.send(JSON.stringify({led:'off'}));
   }
});

module.exports = router;

