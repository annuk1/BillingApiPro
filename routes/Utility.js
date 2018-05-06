var bodyParser = require("body-parser");
var http = require('http');

var express = require('express');
var request = require('request');

var Utility = require("./Utility.js");


var objDB = require("./DataAccess.js")
    //var ObjectDB = new objDB();

var result = '';


Utility.FormatData_QRCode = function(Input_Data) {
    var ReturnString = "";

    ReturnString = Input_Data;


    ReturnString = ReturnString.replace('[[', '[');
    ReturnString = ReturnString.replace(']]', ']');
    return ReturnString;

}
Utility.Success = '{"data":{"status":1,"message":"Save successfully"}}';
Utility.Failure = '{"data":{"status":0,"message":"No data found"}}';
//Utility.error = ' {"data":{"status":500,"message":"Internal server error"}}';

Utility.invalidJson = '{"status":401,"message":"Invalid JSON data"}';
Utility.invalidData = '{"status":0,"message":"Invalid input Parameters"}';
Utility.error = '{"status":500,"message":"Internal server error"}';
Utility.Failure_track = '{"status":0,"message":"No data found"}';
Utility.userNotFound_emp = '{"status":401,"message":"Invalid Credentials"}';
Utility.userNotFound = '{"status":401,"message":"Invalid User"}';

Utility.Update = ' {"data":{"status":2,"message":"Updated successfully"}}';
Utility.Delete = ' {"data":{"status":4,"message":"Deleted successfully"}}';
Utility.Exists = ' {"data":{"status":3,"message":"Already exists"}}';

module.exports = Utility;