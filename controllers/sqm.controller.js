var GraphData;

var sqm = require('../models/sqm.models.js');

function Gather(callback) 
{
  if(GraphData != null)
  {        
         callback(undefined,GraphData);  
  }
  else
  {
        sqm.graph(function(error,data)
        {
          GraphData = data;
          callback(undefined,data); 
          // console.log(data);
        });  
  }
  
}
module.exports = Gather;


//Gather  SQM Data Interval every 3 mins
// setInterval(function() 
// { 
//   sqm.graph(function(error,data)
//   {
//       GraphData = data;   
//   }); 

// }, 180000);