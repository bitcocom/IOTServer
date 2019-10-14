var express = require('express');
var router = express.Router();

var mongoDB=require("mongodb").MongoClient;
var url="mongodb://127.0.0.1:27017/iot";
var dbObj=null;
mongoDB.connect(url, function(err, db){
	dbObj=db;
	console.log("DB Connect.......");
});

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

// Android APP에서 추가된 부분
router.get('/:device/:sensor', function(req, res, next){	
	var sensorLogs=null;
	if(req.params.sensor=="dht11"){
		sensorLogs=dbObj.collection('dht11');
	}else{
		//sensorLogs=dbObj.collection('mq2');
	}
    sensorLogs.find({}).limit(10).sort({created_at:-1}).toArray(function(err, results){
        if(err) res.send(JSON.stringify(err));		            	 
        else res.send(JSON.stringify(results));
   });		
});
module.exports = router;

