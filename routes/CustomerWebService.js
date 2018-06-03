var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var request = require('request');
var dateformat = require('dateformat');
app.use(bodyParser.json()); // Body parser use JSON data

var http = require('http');

var ObjDB = require("./DataAccess.js");
var ObjectDB = new ObjDB();

exports.Ws_get_customers = function (request, response) {

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
            ObjectDB.get_customers(connection, function (callback) {
                if (callback) {
                    data = callback;
                    var Arr_Temp = data;
                    var newsubstr = JSON.stringify(Arr_Temp);

                    if (newsubstr.indexOf("status") > -1 && newsubstr.indexOf("500") > -1 && newsubstr.indexOf("Internal server error") > -1) {
                        response.send(error);
                        return;
                    } else {
                        if (data.length > 0) {
                            Result = '{"customers" : ' + JSON.stringify(data) + '}';
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

//This web service is used to set customer details
exports.Ws_set_customer = function (request, response) {

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

            var cust_name = reqJsonString.cust_name;
            var cust_contact = reqJsonString.cust_contact;
            var cust_email = reqJsonString.cust_email;
            var cust_address = reqJsonString.cust_address;
            if (cust_name == "" || cust_name == null || cust_name == undefined ||
                cust_contact == "" || cust_contact == null || cust_contact == undefined ||
                cust_email == "" || cust_email == null || cust_email == undefined ||
                cust_address == "" || cust_address == null || cust_address == undefined) {
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
            response.send(error);
            return;
        } else {
            ObjectDB.set_customer_detail(cust_name, cust_contact, cust_email, cust_address, connection, function (callback) {
                if (callback) {
                    data = JSON.stringify(callback);

                    if (callback.affectedRows < 1) {
                        response.send(error);
                        return;
                    } else {
                        if (callback.insertId > 0) {
                            Result = '{"status":200' + ',' + '"message" :"Customer added successfully."' + '}';
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


//This web service is used to set customer details
exports.Ws_update_customer = function (request, response) {

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
            var cust_id = reqJsonString.cust_id;
            var cust_name = reqJsonString.cust_name;
            var cust_contact = reqJsonString.cust_contact;
            var cust_email = reqJsonString.cust_email;
            var cust_address = reqJsonString.cust_address;
            if (cust_name == "" || cust_name == null || cust_name == undefined ||
                cust_contact == "" || cust_contact == null || cust_contact == undefined ||
                cust_email == "" || cust_email == null || cust_email == undefined ||
                cust_address == "" || cust_address == null || cust_address == undefined) {
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
            response.send(error);
            return;
        } else {
            ObjectDB.update_customer_detail(cust_id, cust_name, cust_contact, cust_email, cust_address, connection, function (callback) {
                if (callback) {
                    data = JSON.stringify(callback);

                    if (callback.affectedRows < 1) {
                        response.send(error);
                        return;
                    } else {
                        if (callback.insertId > 0) {
                            Result = '{"status":200' + ',' + '"message" :"Customer added successfully."' + '}';
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


exports.Ws_delete_customer = function (request, response) {

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
            var cust_id = reqJsonString.cust_id;
            var cust_name = reqJsonString.cust_name;
            var cust_contact = reqJsonString.cust_contact;
            var cust_email = reqJsonString.cust_email;
            var cust_address = reqJsonString.cust_address;
            if (cust_name == "" || cust_name == null || cust_name == undefined ||
                cust_contact == "" || cust_contact == null || cust_contact == undefined ||
                cust_email == "" || cust_email == null || cust_email == undefined ||
                cust_address == "" || cust_address == null || cust_address == undefined) {
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
            response.send(error);
            return;
        } else {
            ObjectDB.delete_customer_detail(cust_id, cust_name, cust_contact, cust_email, cust_address, connection, function (callback) {
                if (callback) {
                    data = JSON.stringify(callback);

                    if (callback.affectedRows < 1) {
                        response.send(error);
                        return;
                    } else {
                        if (callback.insertId > 0) {
                            Result = '{"status":200' + ',' + '"message" :"Customer added successfully."' + '}';
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