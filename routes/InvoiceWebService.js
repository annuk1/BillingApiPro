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

    var failure = objutil.Failure;
    var error = objutil.error;

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

    var failure = objutil.Failure;
    var invalidData = objutil.invalidData;
    var error = objutil.error;

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

//This web service is use to set invoice details
exports.Ws_set_invoice = function(request, response) {

    var objutil = require("./Utility.js");

    var failure = objutil.Failure;
    var invalidData = objutil.invalidData;
    var error = objutil.error;

    if (request.body.data) {
        try {
            var reqJsonString = request.body.data;
            var inv_date = reqJsonString.inv_date;
            var cust_id = reqJsonString.inv_cust_id;
            var product_total = reqJsonString.inv_product_total;
            var total_tax = reqJsonString.inv_total_tax;
            var inv_total = reqJsonString.inv_total_amount;
            var round_off = reqJsonString.inv_round_off;
            var inv_without_tax = reqJsonString.inv_without_tax;
            var gst_id = reqJsonString.gst_id;
            var inv_products = reqJsonString.inv_products;

            if (inv_date == "" || inv_date == null || inv_date == undefined ||
                cust_id == "" || cust_id == null || cust_id == undefined ||
                inv_total == 0 || inv_total == undefined ||
                product_total == 0 || product_total == undefined ||
                gst_id == "" || gst_id == null || gst_id == undefined ||
                inv_products == null || inv_products == undefined) {
                response.send(invalidData);
                return;
            }
        } catch (error) {
            var errMessage = error.message;
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
            ObjectDB.Ws_set_invoice_detail(inv_date, cust_id, product_total, total_tax, inv_total, round_off, inv_without_tax, gst_id, inv_products, connection, function(callback) {
                if (callback) {
                    if (callback.affectedRows < 1) {
                        response.send(error);
                        return;
                    } else {
                        if (callback.affectedRows > 0) {
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
                    var newsubstr = JSON.stringify(data);

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