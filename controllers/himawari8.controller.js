var Himawari8 = require('../models/himawari8.models.js');

function Gather(callback) 
{
    Himawari8.GetSatellitePic(function(error,data)
    {       
        if(!error)
        {
            callback(undefined,"Image from Himawari8 - Latest Sync on : "+ new Date().toJSON().slice(0,19)+"UTC");          
        }
        else
        {
            callback(undefined,"Image receive failed !!");
        }       
    });  

    Himawari8.GetSituationPic(function(error,data)
    {       
        if(!error)
        {
            //callback(undefined,"Image from Himawari8 - Latest Sync on : "+ new Date().toJSON().slice(0,19));          
        }
        else
        {
            callback(undefined,"Image receive failed !!");
        }       
    }); 
}
module.exports = Gather;



// Interval GetPicHimawari8 every 5 mins
setInterval(function() 
{ 
        Himawari8.GetSatellitePic(function(error,data)
        {      
            if(error)
            { 
              console.log(error); 
            }
            else
            {
               console.log("Image from Himawari8 - Latest Sync on : "+ new Date().toJSON().slice(0,19)+"UTC");
            }
        }); 
           
}, 900000); 

// Interval GetPicSituation every 60 mins
setInterval(function() 
{ 
        Himawari8.GetSituationPic(function(error,data)
        { 
            if(error){ console.log(error); }
        }); 
           
}, 1800000); 
