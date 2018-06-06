//Declaration
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var request = require('request');
var dateformat = require('dateformat');
app.use(bodyParser.json()); // Body parser use JSON data

var http = require('http');

var ObjDB = require("./DataAccess.js");
var ObjectDB = new ObjDB();

exports.Ws_get_invoices = function (request, response) {

    var objutil = require("./Utility.js");

    var outPutData = "";
    var success = objutil.Save;
    var failure = objutil.Failure;
    var invalidData = objutil.invalidData;
    var delete1 = objutil.delete1;
    var error = objutil.error;
    var Update = objutil.Update;


    request.getConnection(function (err, connection) {

        if (err) {
            console.log("Error while connecting DB :" + err);
            response.send(error);
            return;
        } else {

            ObjectDB.Ws_get_invoices(connection, function (callback) {
                if (callback) {
                    data = callback;
                    var Arr_Temp = data;
                    var newsubstr = JSON.stringify(Arr_Temp);

                    if (newsubstr.indexOf("status") > -1 && newsubstr.indexOf("500") > -1 && newsubstr.indexOf("Internal server error") > -1) {
                        response.send(error);
                        return;
                    } else {
                        if (data.length > 0) {
                            Result = '{"invoices" : ' + JSON.stringify(data) + '}';
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

//This web service is use to set customer details .
exports.Ws_set_invoice = function (request, response) {

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
            var reqJsonString = request.body.data;

            var inv_date = reqJsonString.inv_date;
            var cust_id = reqJsonString.inv_cust_id;
            var inv_total = reqJsonString.inv_total_amount;
            var inv_products = reqJsonString.inv_products;

            if (inv_date == "" || inv_date == null || inv_date == undefined ||
                cust_id == "" || cust_id == null || cust_id == undefined ||
                inv_total == "" || inv_total == null || inv_total == undefined ||
                inv_products == null || inv_products == undefined) {
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
    request.getConnection(function (err, connection) {

        if (err) {
            console.log("Error while connecting DB :" + err);
            response.send(error);
            return;
        } else {
            ObjectDB.Ws_set_invoice_detail(inv_date, cust_id, inv_total, inv_products, connection, function (callback) {
                if (callback) {
                    console.log("data is :" + JSON.stringify(callback));
                    data = JSON.stringify(callback);
                    if (callback.affectedRows < 1) {
                        response.send(error);
                        return;
                    } else {
                        if (callback.insertId > 0) {
                            Result = '{"status":200' + ',' + '"message" :"Invoice added successfully."' + '}';
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

exports.Ws_get_invoice_products_by_id = function (request, response) {

    var objutil = require("./Utility.js");

    var outPutData = "";
    var success = objutil.Save;
    var failure = objutil.Failure;
    var invalidData = objutil.invalidData;
    var delete1 = objutil.delete1;
    var error = objutil.error;
    var Update = objutil.Update;

    if (request.body.data) {
        try {
            var reqJsonString = request.body.data;

            var pur_id = reqJsonString.pur_id;
            console.log("Get Invoice Products :" + pur_id);
            if (pur_id == "" || pur_id == null || pur_id == undefined) {
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

    request.getConnection(function (err, connection) {

        if (err) {
            console.log("Error while connecting DB :" + err);
            response.send(error);
            return;
        } else {
            ObjectDB.Ws_get_invoice_products_by_id(pur_id, connection, function (callback) {
                if (callback) {
                    data = callback;
                    var Arr_Temp = data;
                    var newsubstr = JSON.stringify(Arr_Temp);
                    console.log("Get Invoice Products :" + newsubstr);

                    if (newsubstr.indexOf("status") > -1 && newsubstr.indexOf("500") > -1 && newsubstr.indexOf("Internal server error") > -1) {
                        response.send(error);
                        return;
                    } else {
                        if (data.length > 0) {
                            Result = '{"products" : ' + JSON.stringify(data) + '}';
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