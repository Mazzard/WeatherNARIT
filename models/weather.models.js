var request = require('request');

module.exports = 
{
      graph: function(callback) 
      {           
            request.get('http://1.179.136.234/weather/NARIT/nationalobs/downld02.txt', function (error, response, data) 
            // request.get('http://1.179.136.234:8017/test/downld02.txt', function (error, response, data) 
            {
                if (!error && response.statusCode == 200) 
                {  
                      var textdata;
                      var textline;

                      var TempDewPoint_DataFormat = '[';  
                      var Barometer_DataFormat = '[';
                      var WindSpeed_DataFormat = '[';
                      var Solar_DataFormat = '[';
                      var UV_DataFormat = '[';
                      var RainRate_DataFormat = '[';

                      var date;
                      var time;
                      var temp;
                      var humid;
                      var dewpoint;
                      var RainRate;
                      var AirPressure;
                      var WindSpeed;
                      var WindDirection;
                      var Solar;
                      var UV;

                      var JSONdata;

                        textdata = data.toString().split(/\n/);
                                             
                                for (var i = 3; i < textdata.length-1 ; i++)  //start read after line 3
                                {                                                    
                                   textline = textdata[i].split(/[\s]+/g);   

                                   if(textline[0] !='')
                                   {
                                      date = textline[0];  
                                      time = textline[1];
                                      temp = textline[2];                                    
                                      humid = textline[5];
                                      dewpoint = textline[6];
                                      WindSpeed = textline[7];
                                      WindDirection = textline[8];
                                      AirPressure = textline[16];
                                      RainRate = textline[18];
                                      Solar = textline[19];
                                      UV = textline[23];
                                      //console.log(date);
                                   }
                                   else
                                   {
                                      date = textline[1];  
                                      time = textline[2];
                                      temp = textline[3];                                    
                                      humid = textline[6];
                                      dewpoint = textline[7];
                                      WindSpeed = textline[8];
                                      WindDirection = textline[9];
                                      AirPressure = textline[17];
                                      RainRate = textline[19];
                                      Solar = textline[20];
                                      UV = textline[24]
                                      //console.log(time);
                                   }
                                                                      
                                                                
                                   if(time.length < 5)
                                   {
                                      time = '0'+time;
                                   }
                                   if(date.length < 8)
                                   {
                                      date = '0'+date;
                                   }    

                                            
                                   if(humid !="---"&&temp !="---"&&dewpoint !="---")
                                   {
                                        TempDewPoint_DataFormat = TempDewPoint_DataFormat + '{"date": "'+date+' '+time+'","Humid": '+humid+',"Temp": '+temp+',"DewPoint": '+dewpoint+',"BreakDown": '+temp+'},';        
                                   }
                                 
                                   Barometer_DataFormat = Barometer_DataFormat + '{"date": "'+date+' '+time+'","AirPressure": '+AirPressure+'},';   
                                   WindSpeed_DataFormat = WindSpeed_DataFormat + '{"date": "'+date+' '+time+'","WindSpeed": '+WindSpeed+'},';  
                                   Solar_DataFormat = Solar_DataFormat + '{"date": "'+date+' '+time+'","Solar": '+Solar+'},'; 
                                   UV_DataFormat = UV_DataFormat +'{"date": "'+date+' '+time+'","UV": '+UV+'},'; 
                                   RainRate_DataFormat = RainRate_DataFormat +'{"date": "'+date+' '+time+'","RainRate": '+RainRate+'},'; 
                                } 

                                if(humid !="---"&&temp !="---"&&dewpoint !="---")
                                {
                                     TempDewPoint_DataFormat = TempDewPoint_DataFormat + '{"date": "'+date+' '+time+'","Humid": '+humid+',"Temp": '+temp+',"DewPoint": '+dewpoint+',"BreakDown": '+temp+'}]';
                                }
                               
                                Barometer_DataFormat = Barometer_DataFormat +  '{"date": "'+date+' '+time+'","AirPressure": '+AirPressure+'}]';  
                                WindSpeed_DataFormat = WindSpeed_DataFormat + '{"date": "'+date+' '+time+'","WindSpeed": '+WindSpeed+'}]';  
                                Solar_DataFormat = Solar_DataFormat + '{"date": "'+date+' '+time+'","Solar": '+Solar+'}]';
                                UV_DataFormat = UV_DataFormat +'{"date": "'+date+' '+time+'","UV": '+UV+'}]';   
                                RainRate_DataFormat = RainRate_DataFormat +'{"date": "'+date+' '+time+'","RainRate": '+RainRate+'}]'; 


                    console.log('Temp:'+temp+'|DewPoint:'+dewpoint+'|Humidity:'+humid+'|Wind:'+WindSpeed+'|WindDirection:'+WindDirection+'|AirPressure:'+AirPressure+'|RainRate:'+RainRate+'|Solar:'+Solar+'|UV:'+UV+'|Update:'+ date +' - '+time);
                                     

                    JSONdata = new Array(TempDewPoint_DataFormat,temp,dewpoint,humid,RainRate,AirPressure,WindSpeed,WindDirection,Solar,UV,date,time); 
                    JSONBarometer = new Array(Barometer_DataFormat);
                    JSONWindSpeed = new Array(WindSpeed_DataFormat);
                    JSONSolar = new Array(Solar_DataFormat);
                    JSONUV = new Array(UV_DataFormat);
                    JSONRainRate = new Array(RainRate_DataFormat);

                    // console.log(JSONRainRate);
                    callback(undefined,JSONdata,JSONBarometer,JSONWindSpeed,JSONSolar,JSONUV,JSONRainRate);                         
                }
                else
                {                       
                    console.log(error);                 
                }
            });
      }
};