var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var request = require('request');
var ObjDB = require("./DataAccess.js");
var ObjectDB = new ObjDB();

exports.Ws_get_emi_details = function(request, response) {
    var objutil = require("./Utility.js");

    var failure = objutil.Failure;

    request.getConnection(function(error, connection) {

        if (error) {
            console.log("Error while connecting DB :" + error);
            response.send(error);
            return;
        } else {
            ObjectDB.get_emi_details(connection, function(callback) {
                if (callback) {
                    data = callback;
                    var Arr_Temp = data;
                    var newsubstr = JSON.stringify(Arr_Temp);
                    if (newsubstr.indexOf("status") > -1 && newsubstr.indexOf("500") > -1 && newsubstr.indexOf("Internal server error") > -1) {
                        response.send(error);
                        return;
                    } else {
                        if (data.length > 0) {
                            Result = '{"emi_details" : ' + JSON.stringify(data) + '}';
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

exports.Ws_get_emi_detail_by_id = function(request, response) {
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
            var emi_id = reqJsonString.emi_id;
            if (emi_id == "" || emi_id == null || emi_id == undefined) {
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
            ObjectDB.get_emi_detail_by_id(emi_id, connection, function(callback) {
                if (callback) {
                    data = callback;
                    var newsubstr = JSON.stringify(data);
                    if (newsubstr.indexOf("status") > -1 && newsubstr.indexOf("500") > -1 && newsubstr.indexOf("Internal server error") > -1) {
                        response.send(error);
                        return;
                    } else {
                        if (data.length > 0) {
                            Result = '{"emi_details" : ' + JSON.stringify(data) + '}';
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

exports.Ws_set_emi_detail = function(request, response) {

    var objutil = require("./Utility.js");

    var failure = objutil.Failure;
    var invalidData = objutil.invalidData;

    if (request.body.data) {
        try {
            var reqJsonString = request.body.data;

            var emi_date = reqJsonString.emi_date;
            var vehicle_id = reqJsonString.vehicle_id;
            var emi_month_year = reqJsonString.emi_month_year;
            var emi_amount = reqJsonString.emi_amount;
            var payment_mode = reqJsonString.payment_mode;
            var cheque_date = reqJsonString.cheque_date;
            var cheque_no = reqJsonString.cheque_no;
            var cheque_bank = reqJsonString.cheque_bank;

            if (emi_date == "" || emi_date == null || emi_date == undefined ||
                vehicle_id == "" || vehicle_id == null || vehicle_id == undefined ||
                emi_amount == "" || emi_amount == null || emi_amount == undefined ||
                emi_month_year == "" || emi_month_year == null || emi_month_year == undefined ||
                payment_mode == "" || payment_mode == null || payment_mode == undefined) {
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
            ObjectDB.set_emi_detail(emi_date, vehicle_id, emi_month_year, emi_amount, payment_mode, cheque_date, cheque_no, cheque_bank, connection, function(callback) {
                if (callback) {

                    if (callback.affectedRows < 1) {
                        response.send(error);
                        return;
                    } else {

                        if (callback.insertId > 0) {
                            Result = '{"status":200' + ',' + '"message" :"EMI detail added successfully."' + '}';
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


exports.Ws_update_emi_detail = function(request, response) {

    var objutil = require("./Utility.js");
    var failure = objutil.Failure;
    var invalidData = objutil.invalidData;

    if (request.body.data) {
        try {
            var reqJsonString = request.body.data;
            var emi_id = reqJsonString.emi_id;
            var emi_date = reqJsonString.emi_date;
            var vehicle_id = reqJsonString.vehicle_id;
            var emi_month_year = reqJsonString.emi_month_year;
            var emi_amount = reqJsonString.emi_amount;
            var payment_mode = reqJsonString.payment_mode;
            var cheque_date = reqJsonString.cheque_date;
            var cheque_no = reqJsonString.cheque_no;
            var cheque_bank = reqJsonString.cheque_bank;

            if (emi_id == "" || emi_id == null || emi_id == undefined ||
                emi_date == "" || emi_date == null || emi_date == undefined ||
                vehicle_id == "" || vehicle_id == null || vehicle_id == undefined ||
                emi_amount == "" || emi_amount == null || emi_amount == undefined ||
                emi_month_year == "" || emi_month_year == null || emi_month_year == undefined ||
                payment_mode == "" || payment_mode == null || payment_mode == undefined) {
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
            ObjectDB.update_emi_detail(emi_id, emi_date, vehicle_id, emi_month_year, emi_amount, payment_mode, cheque_date, cheque_no, cheque_bank, connection, function(callback) {
                if (callback) {
                    if (callback.affectedRows < 1) {
                        response.send(error);
                        return;
                    } else {
                        if (callback.affectedRows > 0) {
                            Result = '{"status":200' + ',' + '"message" :"EMI detail updated successfully."' + '}';
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


exports.Ws_delete_emi_detail = function(request, response) {

    var objutil = require("./Utility.js");
    var failure = objutil.Failure;
    var invalidData = objutil.invalidData;

    if (request.body.data) {
        try {
            var reqJsonString = request.body.data;

            var emi_id = reqJsonString.emi_id;
            if (emi_id == "" || emi_id == null || emi_id == undefined) {
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
            ObjectDB.delete_emi_detail(emi_id, connection, function(callback) {
                if (callback) {
                    if (callback.code === 'ER_ROW_IS_REFERENCED_2') {
                        deleteError = '{"status":501' + ',' + '"message" :"Cannot delete emi details as it is used in Invoicing."' + '}';
                        response.send(deleteError);
                        return;
                    } else {
                        if (callback.affectedRows > 0) {
                            Result = '{"status":200' + ',' + '"message" :"EMI detail deleted successfully."' + '}';
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