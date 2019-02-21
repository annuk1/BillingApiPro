var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var request = require('request');
var dateformat = require('dateformat');
app.use(bodyParser.json()); // Body parser use JSON data

var http = require('http');

var ObjDB = require("./DataAccess.js");
var ObjectDB = new ObjDB();

exports.Ws_get_payment_details = function(request, response) {

    var objutil = require("./Utility.js");

    var failure = objutil.Failure;
    var error = objutil.error;

    request.getConnection(function(err, connection) {

        if (err) {
            console.log("Error while connecting DB :" + err);
            response.send(error);
            return;
        } else {
            ObjectDB.get_payment_details(connection, function(callback) {
                if (callback) {
                    var newsubstr = JSON.stringify(callback);

                    if (newsubstr.indexOf("status") > -1 && newsubstr.indexOf("500") > -1 && newsubstr.indexOf("Internal server error") > -1) {
                        response.send(error);
                        return;
                    } else {
                        if (newsubstr.length > 0) {
                            Result = '{"paymentDetails" : ' + JSON.stringify(callback) + '}';
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

exports.Ws_get_payment_detail_by_id = function(request, response) {
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
            var payment_id = reqJsonString.payment_id;
            if (payment_id == "" || payment_id == null || payment_id == undefined) {
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
            ObjectDB.get_payment_detail_by_id(payment_id, connection, function(callback) {
                if (callback) {
                    var newsubstr = JSON.stringify(callback);
                    if (newsubstr.indexOf("status") > -1 && newsubstr.indexOf("500") > -1 && newsubstr.indexOf("Internal server error") > -1) {
                        response.send(error);
                        return;
                    } else {
                        if (callback.length > 0) {
                            Result = '{"paymentDetails" : ' + JSON.stringify(callback) + '}';
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

//This web service is used to set payment details
exports.Ws_set_payment_detail = function(request, response) {

    var objutil = require("./Utility.js");

    var failure = objutil.Failure;
    var invalidData = objutil.invalidData;
    var error = objutil.error;
    if (request.body.data) {
        try {
            var reqJsonString = request.body.data;
            var payment_date = reqJsonString.payment_date;
            var emp_id = reqJsonString.emp_id;
            var payment_amount = reqJsonString.payment_amount;
            var payment_mode = reqJsonString.payment_mode;
            var payment_type = reqJsonString.payment_type;

            if (payment_date == "" || payment_date == null || payment_date == undefined ||
                emp_id == "" || emp_id == null || emp_id == undefined ||
                payment_amount == "" || payment_amount == null || payment_amount == undefined ||
                payment_mode == "" || payment_mode == null || payment_mode == undefined ||
                payment_type == "" || payment_type == null || payment_type == undefined) {
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
            response.send(error);
            return;
        } else {
            ObjectDB.set_payment_detail(payment_date, emp_id, payment_amount, payment_mode, payment_type, connection, function(callback) {
                if (callback) {
                    if (callback.affectedRows < 1) {
                        response.send(error);
                        return;
                    } else {
                        if (callback.insertId > 0) {
                            Result = '{"status":200' + ',' + '"message" :"Payment detail added successfully."' + '}';
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

//This web service is used to set customer details
exports.Ws_update_payment_detail = function(request, response) {

    var objutil = require("./Utility.js");
    var failure = objutil.Failure;
    var invalidData = objutil.invalidData;
    var error = objutil.error;

    if (request.body.data) {
        try {
            var reqJsonString = request.body.data;
            var payment_id = reqJsonString.payment_id;
            var payment_date = reqJsonString.payment_date;
            var emp_id = reqJsonString.emp_id;
            var payment_amount = reqJsonString.payment_amount;
            var payment_mode = reqJsonString.payment_mode;
            var payment_type = reqJsonString.payment_type;

            if (payment_id == "" || payment_id == null || payment_id == undefined ||
                payment_date == "" || payment_date == null || payment_date == undefined ||
                emp_id == "" || emp_id == null || emp_id == undefined ||
                payment_amount == "" || payment_amount == null || payment_amount == undefined ||
                payment_mode == "" || payment_mode == null || payment_mode == undefined ||
                payment_type == "" || payment_type == null || payment_type == undefined) {
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
            response.send(error);
            return;
        } else {
            ObjectDB.update_payment_detail(payment_id, payment_date, emp_id, payment_amount, payment_mode, payment_type, connection, function(callback) {
                if (callback) {

                    if (callback.affectedRows < 1) {
                        response.send(error);
                        return;
                    } else {
                        if (callback.affectedRows > 0) {
                            Result = '{"status":200' + ',' + '"message" :"Payment detail updated successfully."' + '}';
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


exports.Ws_delete_payment_detail = function(request, response) {

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
            var payment_id = reqJsonString.payment_id;
            if (payment_id == "" || payment_id == null || payment_id == undefined) {
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
            response.send(error);
            return;
        } else {
            ObjectDB.delete_payment_detail(payment_id, connection, function(callback) {
                if (callback) {
                    if (callback.code === 'ER_ROW_IS_REFERENCED_2') {
                        deleteError = '{"status":501' + ',' + '"message" :"Cannot delete payment detail as it is used in Invoicing."' + '}';
                        response.send(deleteError);
                        return;
                    } else {
                        if (callback.affectedRows > 0) {
                            Result = '{"status":200' + ',' + '"message" :"Payment detail deleted successfully."' + '}';
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