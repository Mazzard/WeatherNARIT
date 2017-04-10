var express = require('express');
var router = express.Router();
var path = require('path');

var WeatherModule = require('../controllers/weather.controller.js');
var seeing = require('../controllers/seeing.controller.js');
var Himawari8 = require('../controllers/himawari8.controller.js');
var GatherSQM = require('../controllers/SQM.controller.js');

var MoreGraphData;

router.get('/weather', function(req, res, next) 
{
  	res.sendFile(path.join(__dirname, '/../views/main.html'));
});

router.get('/iframe', function(req, res, next) 
{
  	res.sendFile(path.join(__dirname, '/../views/iframe.html'));
});

router.get('/gatherData', function(req, res, next) 
{
	 WeatherModule.GatherData(function(error,data)
	 {
	 	res.send(data);  	
	 });	 	 
});

router.get('/MoreGraph', function(req, res, next)
{

	if(MoreGraphData != null)
	{
		res.send(MoreGraphData); 
	}
	else
	{
		WeatherModule.MoreGraph(function(error,data1,data2,data3,data4,data5) 
		{ 
			MoreGraphData = 
			{
				  Barometer: data1,
				  WindSpeed: data2,
				  Solar: data3,
				  UV: data4,
				  RainRate: data5
			};

			res.send(MoreGraphData); 		
		});
	}

});

router.get('/gatherSeeing', function(req, res, next) 
{
	 seeing(function(error,data)
	 {
	 	res.send(data);   	
	 });	 
});

router.get('/gatherSQM', function(req, res, next) 
{
	 GatherSQM(function(error,data)
	 {
	 	res.send(data);  	
	 });	 	 
});

module.exports = router;

// Himawari8controller
Himawari8(function(error,data)
{	
	console.log(data);
});

