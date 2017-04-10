var request = require('request');

module.exports = 
{
      graph: function(callback) 
      {           
            request.get('http://192.168.2.17/test/20170203_000140_NARIT.dat', function (error, response, data) 
            // request.get('http://1.179.136.234:8017/test/downld02.txt', function (error, response, data) 
            {
                if (!error && response.statusCode == 200) 
                {  
                      var textdata;
                      var textline;

                      var SQM_DataFormat = '[';  
                   
                      var date;
                      var time;
                      var celsius;
                      var number;
                      var hz;
                      var mag;

                      var JSONdata;

                        textdata = data.toString().split(/\n/);
                                             
                                for (var i = 35; i < textdata.length-1 ; i++)  //start read after line 3
                                {                             
                                   textline = textdata[i].split(';'); 

                                   date = textline[1].substring(0, 10);
                                   time = textline[1].substring(11, 19);

                                   celsius = textline[2];
                                   number = textline[3];
                                   hz = textline[4];
                                   mag = textline[5];

                                   // console.log('Date : '+date+' , Mag : '+mag);
                                   SQM_DataFormat = SQM_DataFormat +'{"date": "'+date+' '+time+'","sqm": '+mag+'},'; 
                                } 

                                  SQM_DataFormat = SQM_DataFormat +'{"date": "'+date+' '+time+'","sqm": '+mag+'}]'; 

                        JSONdata = new Array(SQM_DataFormat);

                    // console.log(JSONdata);
                    callback(undefined,JSONdata);                         
                }
                else
                {                       
                    console.log(error);                 
                }
            });
      }
};