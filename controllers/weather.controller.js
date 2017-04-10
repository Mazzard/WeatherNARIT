var GraphData;
var JSONBarometerData;
var JSONWindSpeedData;
var JSONSolarData;
var JSONUVData;
var JSONRainRateData;

var weather = require('../models/weather.models.js');

function GatherData(callback) // All Factor From Davis.txt
{
    if(GraphData != null)
    {        
           callback(undefined,GraphData);  
    }
    else
    {
          weather.graph(function(error,data,JSONBarometer,JSONWindSpeed,JSONSolar,JSONUV,JSONRainRate)
          {
              GraphData = data;
              JSONBarometerData = JSONBarometer;
              JSONWindSpeedData = JSONWindSpeed;    
              JSONSolarData = JSONSolar;  
              JSONUVData = JSONUV; 
              JSONRainRateData = JSONRainRate;  

              callback(undefined,data); 
          });  
    }
  
}

function MoreGraph(callback)
{
    if(GraphData !=null)
    {
       callback(undefined,JSONBarometerData,JSONWindSpeedData,JSONSolarData,JSONUVData,JSONRainRateData);
    }    
    else
    {
          weather.graph(function(error,data,JSONBarometer,JSONWindSpeed,JSONSolar,JSONUV,JSONRainRate)
          {
              GraphData = data;
              JSONBarometerData = JSONBarometer;
              JSONWindSpeedData = JSONWindSpeed;    
              JSONSolarData = JSONSolar; 
              JSONUVData = JSONUV;   
              JSONRainRateData = JSONRainRate;              

              callback(undefined,JSONBarometerData,JSONWindSpeedData,JSONSolarData,JSONUVData,JSONRainRateData); 
          });  
    }
}

module.exports = {
   GatherData,
   MoreGraph
}


//Gather  Weather Data Interval every 3 mins
setInterval(function() 
{ 
  weather.graph(function(error,data)
  {
    GraphData = data;   
  }); 

}, 180000);
