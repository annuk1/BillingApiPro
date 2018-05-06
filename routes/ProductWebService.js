var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var request = require('request');
var ObjDB = require("./DataAccess.js");
var ObjectDB = new ObjDB();

exports.Ws_get_products = function(request, response) {
    var objutil = require("./Utility.js");

    var outPutData = "";
    var success = objutil.Save;
    var failure = objutil.Failure;
    var invalidData = objutil.invalidData;
    var delete1 = objutil.delete1;
    var error = objutil.error;
    var Update = objutil.Update;
    request.getConnection(function(err, connection) {

        if (err) {
            console.log("Error while connecting DB :" + err);
            response.send(error);
            return;
        } else {

            console.log("Database connection" + connection);

            ObjectDB.Get_products(connection, function(callback) {
                if (callback) {
                    console.log("data is :" + callback)
                    data = callback;
                    var Arr_Temp = data;
                    console.log("Arr_Temp" + JSON.stringify(Arr_Temp));
                    var newsubstr = JSON.stringify(Arr_Temp);
                    if (newsubstr.indexOf("status") > -1 && newsubstr.indexOf("500") > -1 && newsubstr.indexOf("Internal server error") > -1) {
                        response.send(error);
                        return;
                    } else {

                        if (data.length > 0) {
                            Result = '{"data" : ' + JSON.stringify(data) + '}';
                            Result = Result.substring(0, Result.length - 1);
                            Result = Result + ',' + '"status":200';
                            Result = Result + ',' + '"message" :"success"' + '}';

                            response.send(Result);
                            return;


                        } else {
                            Result = failure;
                            response.send(Result);
                            return;
                        }



                    }
                }
            });
        }
    })


}

exports.Ws_set_products = function(request, response) {

    var objutil = require("./Utility.js");

    var outPutData = "";
    var success = objutil.Save;
    var failure = objutil.Failure;
    var invalidData = objutil.invalidData;
    var delete1 = objutil.delete1;
    var error = objutil.error;
    var Update = objutil.Update;


    var reqJsonObj, reqJsonString, lastupdateddatetime, p_username;

    if (request.body.data) {
        try {
            console.log("Request Parameters" + request);
            var reqJsonString = request.body.data;
            console.log('Input Parameters :' + JSON.stringify(reqJsonString));


            var prod_name = reqJsonString.prod_name;
            var prod_desc = reqJsonString.prod_desc;
            var prod_unit = reqJsonString.prod_unit;
            var prod_rate = reqJsonString.prod_rate;
            if (prod_name == "" || prod_name == null || prod_name == undefined ||
                prod_desc == "" || prod_desc == null || prod_desc == undefined ||
                prod_unit == "" || prod_unit == null || prod_unit == undefined ||
                prod_rate == "" || prod_rate == null || prod_rate == undefined) {
                response.send(invalidData);
                return;
            }


        } catch (err) {
            var errMessage = err.message;
            console.log("Error in data :" + errMessage);
            response.send(error);
            return;
        }
    }
    request.getConnection(function(err, connection) {

        if (err) {
            console.log("Error while connecting DB :" + err);
            response.send(error);
            return;
        } else {

            console.log("Database connection" + connection);
            ObjectDB.set_product_detail(prod_name, prod_desc, prod_unit, prod_rate, connection, function(callback) {
                if (callback) {
                    console.log("data is :" + JSON.stringify(callback));
                    data = JSON.stringify(callback);

                    if (callback.affectedRows < 1) {
                        response.send(error);
                        return;
                    } else {

                        if (callback.insertId > 0) {

                            Result = '{"data" : ' + JSON.stringify(callback) + '}';
                            Result = Result.substring(0, Result.length - 1);
                            Result = Result + ',' + '"status":200';
                            Result = Result + ',' + '"message" :"success"' + '}';

                            response.send(Result);
                            return;


                        } else {
                            Result = failure;
                            response.send(Result);
                            return;
                        }



                    }
                }
            });
        }
    })
};