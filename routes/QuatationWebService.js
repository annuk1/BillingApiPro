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

exports.Ws_get_quatations = function (request, response) {

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
            ObjectDB.get_quatations(connection, function (callback) {
                if (callback) {
                    data = callback;
                    var Arr_Temp = data;
                    var newsubstr = JSON.stringify(Arr_Temp);

                    if (newsubstr.indexOf("status") > -1 && newsubstr.indexOf("500") > -1 && newsubstr.indexOf("Internal server error") > -1) {
                        response.send(error);
                        return;
                    } else {
                        if (data.length > 0) {
                            Result = '{"quatations" : ' + JSON.stringify(data) + '}';
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

//This web service is used to set quatation details
exports.Ws_set_quatation = function (request, response) {

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

            var quat_date = reqJsonString.quat_date;
            var quat_cust_id = reqJsonString.quat_cust_id;
            var quat_products = reqJsonString.quat_products;

            if (quat_date == "" || quat_date == null || quat_date == undefined ||
                quat_cust_id == "" || quat_cust_id == null || quat_cust_id == undefined) {
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
        console.log("input data connection");
        if (err) {
            response.send(error);
            return;
        } else {
            ObjectDB.set_quatation_detail(quat_date, quat_cust_id, quat_products, connection, function (callback) {
                if (callback) {
                    data = JSON.stringify(callback);

                    if (callback.affectedRows < 1) {
                        response.send(error);
                        return;
                    } else {
                        if (callback.insertId > 0) {
                            Result = '{"status":200' + ',' + '"message" :"Quatation added successfully."' + '}';
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



exports.Ws_get_quatation_products = function (request, response) {

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
            ObjectDB.Ws_get_quatation_customer(connection, function (callback) {
                if (callback) {
                    data = callback;
                    var Arr_Temp = data;
                    var newsubstr = JSON.stringify(Arr_Temp);

                    if (newsubstr.indexOf("status") > -1 && newsubstr.indexOf("500") > -1 && newsubstr.indexOf("Internal server error") > -1) {
                        response.send(error);
                        return;
                    } else {
                        if (data.length > 0) {
                            Result = '{"quatation" : ' + JSON.stringify(data) + '}';
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

exports.Ws_get_quatation_products_by_id = function (request, response) {

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

            var quat_id = reqJsonString.quat_id;

            if (quat_id == "" || quat_id == null || quat_id == undefined) {
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
            ObjectDB.Ws_get_quatation_products_by_id(quat_id, connection, function (callback) {
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