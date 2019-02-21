var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var request = require('request');
var ObjDB = require("./DataAccess.js");
var ObjectDB = new ObjDB();

exports.Ws_get_account_details = function(request, response) {
    var objutil = require("./Utility.js");

    var outPutData = "";
    var success = objutil.Save;
    var failure = objutil.Failure;
    var invalidData = objutil.invalidData;
    var delete1 = objutil.delete1;
    var error = objutil.error;
    var Update = objutil.Update;
    request.getConnection(function(error, connection) {

        if (error) {
            console.log("Error while connecting DB :" + error);
            response.send(error);
            return;
        } else {
            ObjectDB.get_account_details(connection, function(callback) {
                if (callback) {
                    data = callback;
                    var Arr_Temp = data;
                    var newsubstr = JSON.stringify(Arr_Temp);
                    if (newsubstr.indexOf("status") > -1 && newsubstr.indexOf("500") > -1 && newsubstr.indexOf("Internal server error") > -1) {
                        response.send(error);
                        return;
                    } else {
                        if (data.length > 0) {
                            Result = '{"account_details" : ' + JSON.stringify(data) + '}';
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

exports.Ws_get_account_detail_by_id = function(request, response) {
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
            var account_id = reqJsonString.account_id;
            if (account_id == "" || account_id == null || account_id == undefined) {
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
            ObjectDB.get_account_detail_by_id(account_id, connection, function(callback) {
                if (callback) {
                    data = callback;
                    var newsubstr = JSON.stringify(data);
                    if (newsubstr.indexOf("status") > -1 && newsubstr.indexOf("500") > -1 && newsubstr.indexOf("Internal server error") > -1) {
                        response.send(error);
                        return;
                    } else {
                        if (data.length > 0) {
                            Result = '{"account_details" : ' + JSON.stringify(data) + '}';
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

exports.Ws_set_account_detail = function(request, response) {

    var objutil = require("./Utility.js");
    var failure = objutil.Failure;
    var invalidData = objutil.invalidData;

    if (request.body.data) {
        try {
            var reqJsonString = request.body.data;

            var account_no = reqJsonString.account_number;
            var bank_name = reqJsonString.bank_name;
            var bank_address = reqJsonString.bank_address;
            var account_type = reqJsonString.account_type;

            if (account_no == "" || account_no == null || account_no == undefined ||
                bank_name == "" || bank_name == null || bank_name == undefined ||
                bank_address == "" || bank_address == null || bank_address == undefined ||
                account_type == "" || account_type == null || account_type == undefined) {
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
            ObjectDB.set_account_detail(account_no, bank_name, bank_address, account_type, connection, function(callback) {
                if (callback) {

                    if (callback.affectedRows < 1) {
                        response.send(error);
                        return;
                    } else {

                        if (callback.insertId > 0) {
                            Result = '{"status":200' + ',' + '"message" :"Account information added successfully."' + '}';
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


exports.Ws_update_account_detail = function(request, response) {

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
            var account_id = reqJsonString.account_id;
            var account_no = reqJsonString.account_number;
            var bank_name = reqJsonString.bank_name;
            var bank_address = reqJsonString.bank_address;
            var account_type = reqJsonString.account_type;

            if (account_id == "" || account_id == null || account_id == undefined ||
                account_no == "" || account_no == null || account_no == undefined ||
                bank_name == "" || bank_name == null || bank_name == undefined ||
                bank_address == "" || bank_address == null || bank_address == undefined ||
                account_type == "" || account_type == null || account_type == undefined) {
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
            ObjectDB.update_account_detail(account_id, account_no, bank_name, bank_address, account_type, connection, function(callback) {
                if (callback) {
                    if (callback.affectedRows < 1) {
                        response.send(error);
                        return;
                    } else {
                        if (callback.affectedRows > 0) {
                            Result = '{"status":200' + ',' + '"message" :"Account information updated successfully."' + '}';
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


exports.Ws_delete_account_detail = function(request, response) {

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

            var account_id = reqJsonString.account_id;
            if (account_id == "" || account_id == null || account_id == undefined) {
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
            ObjectDB.delete_account_detail(account_id, connection, function(callback) {
                if (callback) {
                    if (callback.code === 'ER_ROW_IS_REFERENCED_2') {
                        deleteError = '{"status":501' + ',' + '"message" :"Cannot delete account as it is used in Invoicing."' + '}';
                        response.send(deleteError);
                        return;
                    } else {
                        if (callback.affectedRows > 0) {
                            Result = '{"status":200' + ',' + '"message" :"Account details deleted successfully."' + '}';
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