var request = require('request');
var juliandate = require('JulianDate');
var moment = require('moment');
var math = require('mathjs');

// var SeeinglogURL = "http://192.168.20.161/Seeing_Log/seeing_log_"+new Date().toJSON().slice(0,10)+".log";
// var SeeinglogURL = "http://192.168.20.161/Seeing_Log/seeing_log_2016-11-12.log";

module.exports = 
{
      graph: function(callback) 
      {           
            request.get('http://1.179.136.234/weather/NARIT/seeing/dimm/DIMM_KM44.txt', function (error, response, data) 
            // request.get(SeeinglogURL, function (error, response, data) 
            {
                if (!error && response.statusCode == 200) 
                {  
                      var textdata;
                      var textline;
                      var time;
                      var date;
                      var FWHM;                      
                      var TempSeeing='[';

                      var JSONdata = "";

                      var jd;
                      var tempjd;
                      var jdate;
                      var localdate;

                      var sumFWHM = new Array();


                        textdata = data.toString().split(/\n/);

                                             
                                for (var i = 13; i < textdata.length-1 ; i++)  //start read after line 3
                                {                                                    
                                   textline = textdata[i].split(/[\s]+/g);

                                   // console.log(textline[0]);   // < Begin JD Date
                                   // console.log(textline[2]);    // < EndDate JD Date

                                   // console.log(textline[8]);  //    < Seeing (Arcsec)

                                   // jd.valueOf(textline[2]);
                                   jd = new juliandate(textline[2]);
                                   tempjd = jd.toString();

                                   localdate = new Date(tempjd);


                                   // console.log(moment(localdate).format('YYYY-MM-DD HH:mm:SS'));

                                   // jdate = localdate.split('" "');
                                   
                                   time = moment(localdate).format('HH:mm:SS');
                                   date = moment(localdate).format('YYYY-MM-DD');
                                   FWHM = textline[8];

                                   // console.log(i+":"+time+" - "+FWHM);
    
                                    if(FWHM != 0)
                                    {
                                         if(i==textdata.length-2)
                                         {
                                             TempSeeing = TempSeeing +'{"date": "'+date+' '+time+'","FWHM": '+FWHM+'}';
                                         }   
                                         else
                                         {
                                              TempSeeing = TempSeeing +'{"date": "'+date+' '+time+'","FWHM": '+FWHM+'},';
                                         } 

                                         sumFWHM.push( (parseFloat(FWHM)).toFixed(2) );                    
                                    }                                
                                }  

                                // console.log("Seeing Log rows count : "+i);
                                // console.log(textdata);
                                  TempSeeing = TempSeeing +']';

                                  // console.log(sumFWHM);

                                  // var res = sumFWHM.reduce(function(prev, curr){
                                  //     return (Number(prev) || 0) + (Number(curr) || 0);
                                  // });

                                  // console.log("sum FWHM : " + res.toFixed(4));
                                  // console.log("count FWHM : " + sumFWHM.length);

                                  // var avg = res.toFixed(4)/sumFWHM.length;

                                  // console.log("Avg FWHM : " + avg.toFixed(4));

                                  // console.log(math.median(sumFWHM));

                                  var MedianFWHM = math.median(sumFWHM);


                    JSONdata = new Array(TempSeeing,MedianFWHM.toFixed(2)); 

                    callback(undefined,JSONdata);                         
                }
                else
                {                       
                    console.log(error);                 
                }
            });
      }
};