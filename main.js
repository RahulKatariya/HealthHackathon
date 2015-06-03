/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */

/*
A simple node.js application intended to read data from Analog pins on the Intel based development boards such as the Intel(R) Galileo and Edison with Arduino breakout board.

MRAA - Low Level Skeleton Library for Communication on GNU/Linux platforms
Library in C/C++ to interface with Galileo & other Intel platforms, in a structured and sane API with port nanmes/numbering that match boards & with bindings to javascript & python.

Steps for installing MRAA & UPM Library on Intel IoT Platform with IoTDevKit Linux* image
Using a ssh client: 
1. echo "src maa-upm http://iotdk.intel.com/repos/1.1/intelgalactic" > /etc/opkg/intel-iotdk.conf
2. opkg update
3. opkg upgrade

Article: https://software.intel.com/en-us/html5/articles/intel-xdk-iot-edition-nodejs-templates
*/

var mraa = require('mraa'); //require mraa
console.log('MRAA Version: ' + mraa.getVersion()); //write the mraa version to the console

var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '122192',
  key: 'a5f5f9202c7b0ab8ecbd',
  secret: '37f1bf3485400a334f35'
});

var analogPin0 = new mraa.Aio(0); //setup access analog input Analog pin #0 (A0)
var myDigitalPin7 = new mraa.Gpio(7); //setup digital read on Digital pin #6 (D6)
myDigitalPin7.dir(mraa.DIR_IN); //set the gpio direction to input
var myDigitalPin8 = new mraa.Gpio(8); //setup digital read on Digital pin #6 (D6)
myDigitalPin8.dir(mraa.DIR_IN); //set the gpio direction to input

periodicActivity(); //call the periodicActivity function

function periodicActivity() //
{
  var myDigitalValue7 =  myDigitalPin7.read(); //read the digital value of the pin
  var myDigitalValue8 =  myDigitalPin8.read(); //read the digital value of the pin
  if(myDigitalValue7 == 1 || myDigitalValue8 == 1) {
    console.log("!");
  } else {
    var analogValue = analogPin0.read(); //read the value of the analog pin
    pusher.trigger('heartbeat', 'beat', {
      "value": analogValue
    });
  }
  setTimeout(periodicActivity,1000); //call the indicated function after 1 second (1000 milliseconds)
}