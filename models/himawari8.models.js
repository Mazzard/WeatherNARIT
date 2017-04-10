var request = require('request');
var fs = require('fs');
var path = require('path');
var WeatherSituationURL;

const imagemin = require('imagemin');
const imageminGiflossy = require('imagemin-giflossy');
const imageminJpegoptim = require('imagemin-jpegoptim');

function GetSatellitePic(callback)
{
  
      // var stream = request.get('http://www.sattmet.tmd.go.th/satmet/thai/loop/enh/anigif.gif')
      var stream = request.get('http://www.sattmet.tmd.go.th/satmet/thai/loop/ir/anigif.gif')
                  .on('error', function(err) 
                  {
                    console.log(err)
                  })
                  .pipe(fs.createWriteStream(path.join(__dirname, '/../public/images/Himawari8Satellite.gif')));

                  stream.on('finish', function ()
                  {                                                                      
                        OriginFile1 = fs.createReadStream('./public/images/Himawari8Satellite.gif');
                        DuplicateFile1 = fs.createWriteStream('./public/images/TempHimawari8Satellite.gif');  
                        OriginFile1.pipe(DuplicateFile1);     
                        OriginFile1.on('end', function()
                        { 
                              // console.log('Clone1 Ready') 
                              // imagemin(['./public/images/Himawari8Satellite.gif'], './public/images/', {use: [imageminGiflossy({lossy: 1000})]}).then(() => 
                              // {
                              //     console.log('GIF Images optimized');
                              // });
                        });  
                        console.log("Get SatellitePic Complete");
                  });

}

function GetSituationPic(callback)
{
      CalculateURL();
      var stream = request.get(WeatherSituationURL)
                .on('error', function(err) 
                {
                  console.log(err)
                })
                .pipe(fs.createWriteStream(path.join(__dirname, '/../public/images/WeatherSituation.jpg')));

                stream.on('finish', function ()
                { 			

                      OriginFile2 = fs.createReadStream('./public/images/WeatherSituation.jpg');
                      DuplicateFile2 = fs.createWriteStream('./public/images/TempWeatherSituation.jpg');  
                      OriginFile2.pipe(DuplicateFile2);     
                      OriginFile2.on('end', function()
                      { 
                            // console.log('Clone2 Ready') 
                            
                            // imagemin(['./public/images/WeatherSituation.jpg'], './public/images/', {
                            //     use: [
                            //         imageminJpegoptim({max:65})
                            //     ]
                            // }).then(() => {
                            //     console.log('JPEG Images optimized');
                            // });
                      });                     
                    console.log("Get SituationPic Complete");
                     
                });
}

module.exports = {
   GetSatellitePic,
   GetSituationPic
}

function CalculateURL()
{
          var d1 = new Date ();
          var d2 = new Date ( d1 );
          d2.setHours ( d1.getHours());
          // d2.setHours ( d1.getHours() - 5 );  //Local Times

          var WeatherSituationLink;
          var WeatherSituationDate = Number(d2.toJSON().slice(11,13));

          if(WeatherSituationDate < 19)
          {
              if(WeatherSituationDate < 13)
              {
                  if(WeatherSituationDate < 7)
                  {
                      WeatherSituationDateLink = "_TopChart_01.jpg";
                  }
                  else
                  {
                      WeatherSituationDateLink = "_TopChart_07.jpg";
                  }
              }
              else
              {
                  WeatherSituationDateLink = "_TopChart_13.jpg";
              }   
          }
          else
          {
              WeatherSituationDateLink = "_TopChart_19.jpg";
          }


          WeatherSituationURL = "https://www.tmd.go.th/programs/uploads/maps/"+d1.toJSON().slice(0,10)+WeatherSituationDateLink;

          // console.log(WeatherSituationURL);
}

