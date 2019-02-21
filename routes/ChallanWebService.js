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

exports.Ws_get_challans = function(request, response) {

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
            ObjectDB.get_challans(connection, function(callback) {
                if (callback) {
                    var newsubstr = JSON.stringify(callback);
                    if (newsubstr.indexOf("status") > -1 && newsubstr.indexOf("500") > -1 && newsubstr.indexOf("Internal server error") > -1) {
                        response.send(error);
                        return;
                    } else {
                        if (newsubstr.length > 0) {
                            Result = '{"challans" : ' + JSON.stringify(callback) + '}';
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

exports.Ws_get_challan_by_id = function(request, response) {

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
            var challanId = reqJsonString.chal_id;

            if (challanId == "" || challanId == null || challanId == undefined) {
                response.send(invalidData);
                return;
            }
        } catch (error) {
            var errMessage = error.message;
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
            ObjectDB.get_challan_by_id(challanId, connection, function(callback) {
                if (callback) {
                    var newsubstr = JSON.stringify(callback);

                    if (newsubstr.indexOf("status") > -1 && newsubstr.indexOf("500") > -1 && newsubstr.indexOf("Internal server error") > -1) {
                        response.send(error);
                        return;
                    } else {
                        if (newsubstr.length > 0) {
                            Result = '{"challans" : ' + JSON.stringify(callback) + '}';
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

//This web service is use to set challan details
exports.Ws_set_challan = function(request, response) {

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
            var chal_date = reqJsonString.chal_date;
            var chal_no = reqJsonString.chal_no;
            var cust_id = reqJsonString.chal_cust_id;
            var prod_id = reqJsonString.chal_prod_id;
            var veh_id = reqJsonString.chal_veh_id;
            var chal_qty = reqJsonString.chal_quantity;
            var is_invoice_created = reqJsonString.chal_is_invoice_created;
            if (chal_date == "" || chal_date == null || chal_date == undefined ||
                chal_no == "" || chal_no == null || chal_no == undefined ||
                cust_id == "" || cust_id == null || cust_id == undefined ||
                prod_id == "" || prod_id == null || prod_id == undefined ||
                veh_id == "" || veh_id == null || veh_id == undefined ||
                chal_qty == "" || chal_qty == null || chal_qty == undefined) {
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
            response.send(error);
            return;
        } else {
            ObjectDB.set_challan_detail(chal_no, chal_date, chal_qty, cust_id, prod_id, veh_id, is_invoice_created, connection, function(callback) {
                if (callback) {
                    data = JSON.stringify(callback);

                    if (callback.affectedRows < 1) {
                        response.send(error);
                        return;
                    } else {
                        if (callback.insertId > 0) {
                            Result = '{"status":200' + ',' + '"message" :"Challan added successfully."' + '}';
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

//This web service is use to set challan details
exports.Ws_update_challan = function(request, response) {

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
            var chal_id = reqJsonString.chal_id;
            var chal_date = reqJsonString.chal_date;
            var chal_no = reqJsonString.chal_no;
            var cust_id = reqJsonString.chal_cust_id;
            var prod_id = reqJsonString.chal_prod_id;
            var veh_id = reqJsonString.chal_veh_id;
            var chal_qty = reqJsonString.chal_quantity;
            if (chal_id == "" || chal_id == null || chal_id == undefined ||
                chal_date == "" || chal_date == null || chal_date == undefined ||
                chal_no == "" || chal_no == null || chal_no == undefined ||
                cust_id == "" || cust_id == null || cust_id == undefined ||
                prod_id == "" || prod_id == null || prod_id == undefined ||
                veh_id == "" || veh_id == null || veh_id == undefined ||
                chal_qty == "" || chal_qty == null || chal_qty == undefined) {
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
            response.send(error);
            return;
        } else {
            ObjectDB.update_challan_detail(chal_id, chal_no, chal_date, chal_qty, cust_id, prod_id, veh_id, connection, function(callback) {
                if (callback) {
                    if (callback.affectedRows < 1) {
                        response.send(error);
                        return;
                    } else {
                        if (callback.affectedRows > 0) {
                            Result = '{"status":200' + ',' + '"message" :"Challan updated successfully."' + '}';
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

exports.Ws_get_challans_by_customer_id = function(request, response) {

    var objutil = require("./Utility.js");

    var outPutData = "";
    var success = objutil.Save;
    var failure = objutil.Failure;
    var invalidData = objutil.invalidData;
    var delete1 = objutil.delete1;
    var error = objutil.error;
    var Update = objutil.Update;

    var reqJsonString;
    var customerId;

    if (request.body.data) {
        try {
            reqJsonString = request.body.data;
            customerId = reqJsonString.chal_cust_id;

            if (customerId == "" || customerId == null || customerId == undefined) {
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
            console.log("Error while connecting DB :" + err);
            response.send(error);
            return;
        } else {
            ObjectDB.get_challans_by_customer_id(customerId, connection, function(callback) {
                if (callback) {
                    var newsubstr = JSON.stringify(callback);

                    if (newsubstr.indexOf("status") > -1 && newsubstr.indexOf("500") > -1 && newsubstr.indexOf("Internal server error") > -1) {
                        response.send(error);
                        return;
                    } else {
                        if (callback.length > 0) {
                            Result = '{"challans" : ' + JSON.stringify(callback) + '}';
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