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

exports.Ws_get_invoices = function(request, response) {

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

            ObjectDB.Ws_get_invoices(connection, function(callback) {
                if (callback) {
                    var newsubstr = JSON.stringify(callback);

                    if (newsubstr.indexOf("status") > -1 && newsubstr.indexOf("500") > -1 && newsubstr.indexOf("Internal server error") > -1) {
                        response.send(error);
                        return;
                    } else {
                        if (newsubstr.length > 0) {
                            Result = '{"invoices" : ' + JSON.stringify(callback) + '}';
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

exports.Ws_get_invoice_by_id = function(request, response) {

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

            var inv_id = reqJsonString.inv_id;
            if (inv_id == "" || inv_id == null || inv_id == undefined) {
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
            ObjectDB.get_invoice_by_id(inv_id, connection, function(callback) {
                if (callback) {
                    var newsubstr = JSON.stringify(callback);

                    if (newsubstr.indexOf("status") > -1 && newsubstr.indexOf("500") > -1 && newsubstr.indexOf("Internal server error") > -1) {
                        response.send(error);
                        return;
                    } else {
                        if (callback.length > 0) {
                            Result = '{"invoices" : ' + JSON.stringify(callback) + '}';
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
            })
        }
    })
}

//This web service is use to set customer details .
exports.Ws_set_invoice = function(request, response) {

    var objutil = require("./Utility.js");

    var outPutData = "";
    var success = objutil.Save;
    var failure = objutil.Failure;
    var invalidData = objutil.invalidData;
    var delete1 = objutil.delete1;
    var error = objutil.error;
    var Update = objutil.Update;


    var reqJsonString;

    if (request.body.data) {
        try {
            var reqJsonString = request.body.data;
            console.log("Invoice request:" + JSON.stringify(reqJsonString));
            var inv_date = reqJsonString.inv_date;
            var cust_id = reqJsonString.inv_cust_id;
            var inv_total = reqJsonString.inv_total_amount;
            var inv_without_tax = reqJsonString.inv_without_tax;
            var inv_products = reqJsonString.inv_products;

            if (inv_date == "" || inv_date == null || inv_date == undefined ||
                cust_id == "" || cust_id == null || cust_id == undefined ||
                inv_total == "" || inv_total == null || inv_total == undefined ||
                inv_products == null || inv_products == undefined) {
                console.log("Invoice Date" + inv_date);
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
    request.getConnection(function(error, connection) {
        if (error) {
            console.log("Error while connecting DB :" + error);
            response.send(error);
            return;
        } else {
            ObjectDB.Ws_set_invoice_detail(inv_date, cust_id, inv_total, inv_without_tax, inv_products, connection, function(callback) {
                if (callback) {
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

exports.Ws_get_invoice_products_by_id = function(request, response) {

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
            var inv_id = reqJsonString.inv_id;
            if (inv_id == "" || inv_id == null || inv_id == undefined) {
                response.send(invalidData);
                return;
            }
        } catch (err) {
            var errMessage = err.message;
            response.send(error);

            return;
        }
    }

    request.getConnection(function(err, connection) {

        if (err) {
            response.send(error);
            return;
        } else {
            ObjectDB.get_invoice_products_by_id(inv_id, connection, function(callback) {
                if (callback) {
                    data = callback;
                    var Arr_Temp = data;
                    var newsubstr = JSON.stringify(Arr_Temp);

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