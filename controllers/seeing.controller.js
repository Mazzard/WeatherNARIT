var GraphData;

var seeing = require('../models/seeing.models.js');

function Gather(callback) 
{
  if(GraphData != null)
  {        
         callback(undefined,GraphData);  
  }
  else
  {
        seeing.graph(function(error,data)
        {
          GraphData = data;
          callback(undefined,data); 
          // console.log(data);
        });  
  }
  
}
module.exports = Gather;


//Gather  seeing Data Interval every 3 mins
setInterval(function() 
{ 
  seeing.graph(function(error,data)
  {
      GraphData = data;   
  }); 

}, 180000);