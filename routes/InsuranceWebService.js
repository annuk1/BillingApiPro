var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var request = require('request');
var dateformat = require('dateformat');
app.use(bodyParser.json());

var http = require('http');

var ObjDB = require("./DataAccess.js");
var ObjectDB = new ObjDB();

exports.Ws_get_insurance_details = function(request, response) {

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
            response.send(error);
            return;
        } else {
            ObjectDB.get_insurance_details(connection, function(callback) {
                if (callback) {
                    var newsubstr = JSON.stringify(callback);

                    if (newsubstr.indexOf("status") > -1 && newsubstr.indexOf("500") > -1 && newsubstr.indexOf("Internal server error") > -1) {
                        response.send(error);
                        return;
                    } else {
                        if (newsubstr.length > 0) {
                            Result = '{"insurance_details" : ' + JSON.stringify(callback) + '}';
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

exports.Ws_get_insurance_detail_by_id = function(request, response) {
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
            var insurance_id = reqJsonString.insurance_id;
            if (insurance_id == "" || insurance_id == null || insurance_id == undefined) {
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
            ObjectDB.get_insurance_detail_by_id(insurance_id, connection, function(callback) {
                if (callback) {
                    var newsubstr = JSON.stringify(callback);
                    if (newsubstr.indexOf("status") > -1 && newsubstr.indexOf("500") > -1 && newsubstr.indexOf("Internal server error") > -1) {
                        response.send(error);
                        return;
                    } else {
                        if (callback.length > 0) {
                            Result = '{"insurance_details" : ' + JSON.stringify(callback) + '}';
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

//This web service is used to set customer details
exports.Ws_set_insurance_detail = function(request, response) {

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

            var policy_no = reqJsonString.policy_no;
            var issued_date = reqJsonString.policy_issued_date;
            var vehicle_id = reqJsonString.vehicle_id;
            var premium_amount = reqJsonString.premium_amount;
            var insurance_company = reqJsonString.insurance_company;
            var nominee_name = reqJsonString.nominee_name;
            var additional_comments = reqJsonString.additional_comments;
            if (policy_no == "" || policy_no == null || policy_no == undefined ||
                issued_date == "" || issued_date == null || issued_date == undefined ||
                vehicle_id == "" || vehicle_id == null || vehicle_id == undefined ||
                premium_amount == "" || premium_amount == null || premium_amount == undefined ||
                insurance_company == "" || insurance_company == null || insurance_company == undefined ||
                nominee_name == "" || nominee_name == null || nominee_name == undefined ||
                additional_comments == "" || additional_comments == null || additional_comments == undefined) {
                response.send(invalidData);
                console.log("Error " + JSON.stringify(reqJsonString));
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
            ObjectDB.set_insurance_detail(policy_no, issued_date, vehicle_id, premium_amount, insurance_company, nominee_name, additional_comments, connection, function(callback) {
                if (callback) {
                    data = JSON.stringify(callback);

                    if (callback.affectedRows < 1) {
                        response.send(error);
                        return;
                    } else {
                        if (callback.insertId > 0) {
                            Result = '{"status":200' + ',' + '"message" :"Insurance detail added successfully."' + '}';
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
exports.Ws_update_insurance_detail = function(request, response) {

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
            var insurance_id = reqJsonString.insurance_id;
            var policy_no = reqJsonString.policy_no;
            var issued_date = reqJsonString.policy_issued_date;
            var vehicle_id = reqJsonString.vehicle_id;
            var premium_amount = reqJsonString.premium_amount;
            var insurance_company = reqJsonString.insurance_company;
            var nominee_name = reqJsonString.nominee_name;
            var additional_comments = reqJsonString.additional_comments;
            if (insurance_id == "" || insurance_id == null || insurance_id == undefined ||
                policy_no == "" || policy_no == null || policy_no == undefined ||
                issued_date == "" || issued_date == null || issued_date == undefined ||
                vehicle_id == "" || vehicle_id == null || vehicle_id == undefined ||
                premium_amount == "" || premium_amount == null || premium_amount == undefined ||
                insurance_company == "" || insurance_company == null || insurance_company == undefined ||
                nominee_name == "" || nominee_name == null || nominee_name == undefined ||
                additional_comments == "" || additional_comments == null || additional_comments == undefined) {
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
            ObjectDB.update_insurance_detail(insurance_id, policy_no, issued_date, vehicle_id, premium_amount, insurance_company, nominee_name, additional_comments, connection, function(callback) {
                if (callback) {
                    if (callback.affectedRows < 1) {
                        response.send(error);
                        return;
                    } else {
                        if (callback.affectedRows > 0) {
                            Result = '{"status":200' + ',' + '"message" :"Insurance detail updated successfully."' + '}';
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


exports.Ws_delete_insurance_detail = function(request, response) {

    var objutil = require("./Utility.js");

    var success = objutil.Save;
    var failure = objutil.Failure;
    var invalidData = objutil.invalidData;
    var delete1 = objutil.delete1;
    var error = objutil.error;
    var Update = objutil.Update;

    if (request.body.data) {
        try {
            var reqJsonString = request.body.data;
            var insurance_id = reqJsonString.insurance_id;
            if (insurance_id == "" || insurance_id == null || insurance_id == undefined) {
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
            response.send(error);
            return;
        } else {
            ObjectDB.delete_insurance_detail(insurance_id, connection, function(callback) {
                if (callback) {
                    if (callback.code === 'ER_ROW_IS_REFERENCED_2') {
                        deleteError = '{"status":501' + ',' + '"message" :"Cannot delete insurance detail as it is used in Invoicing."' + '}';
                        response.send(deleteError);
                        return;
                    } else {
                        if (callback.affectedRows > 0) {
                            Result = '{"status":200' + ',' + '"message" :"Insurance detail deleted successfully."' + '}';
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