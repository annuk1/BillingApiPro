var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var request = require('request');
var ObjDB = require("./DataAccess.js");
var ObjectDB = new ObjDB();

exports.Ws_get_card_details = function(request, response) {
    var objutil = require("./Utility.js");

    var failure = objutil.Failure;

    request.getConnection(function(error, connection) {

        if (error) {
            console.log("Error while connecting DB :" + error);
            response.send(error);
            return;
        } else {
            ObjectDB.get_card_details(connection, function(callback) {
                if (callback) {
                    data = callback;
                    var Arr_Temp = data;
                    var newsubstr = JSON.stringify(Arr_Temp);
                    if (newsubstr.indexOf("status") > -1 && newsubstr.indexOf("500") > -1 && newsubstr.indexOf("Internal server error") > -1) {
                        response.send(error);
                        return;
                    } else {
                        if (data.length > 0) {
                            Result = '{"card_details" : ' + JSON.stringify(data) + '}';
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

exports.Ws_get_card_detail_by_id = function(request, response) {
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
            var card_id = reqJsonString.card_id;
            if (card_id == "" || card_id == null || card_id == undefined) {
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
            ObjectDB.get_card_detail_by_id(card_id, connection, function(callback) {
                if (callback) {
                    data = callback;
                    var newsubstr = JSON.stringify(data);
                    if (newsubstr.indexOf("status") > -1 && newsubstr.indexOf("500") > -1 && newsubstr.indexOf("Internal server error") > -1) {
                        response.send(error);
                        return;
                    } else {
                        if (data.length > 0) {
                            Result = '{"card_details" : ' + JSON.stringify(data) + '}';
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

exports.Ws_set_card_detail = function(request, response) {

    var objutil = require("./Utility.js");

    var failure = objutil.Failure;
    var invalidData = objutil.invalidData;

    if (request.body.data) {
        try {
            var reqJsonString = request.body.data;
            var card_date = reqJsonString.card_date;
            var vehicle_id = reqJsonString.vehicle_id;
            var rto_pune_amount = reqJsonString.rto_pune_amount;
            var rto_pcmc_amount = reqJsonString.rto_pcmc_amount;
            var police_shirval_amount = reqJsonString.police_shirval_amount;
            var police_chakan_amount = reqJsonString.police_chakan_amount;
            var police_other_amount = reqJsonString.police_other_amount;

            if (card_date == "" || card_date == null || card_date == undefined ||
                vehicle_id == "" || vehicle_id == null || vehicle_id == undefined) {
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
            ObjectDB.set_card_detail(card_date, vehicle_id, rto_pune_amount, rto_pcmc_amount, police_shirval_amount, police_chakan_amount, police_other_amount, connection, function(callback) {
                if (callback) {

                    if (callback.affectedRows < 1) {
                        response.send(error);
                        return;
                    } else {

                        if (callback.insertId > 0) {
                            Result = '{"status":200' + ',' + '"message" :"Card detail added successfully."' + '}';
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


exports.Ws_update_card_detail = function(request, response) {

    var objutil = require("./Utility.js");
    var failure = objutil.Failure;
    var invalidData = objutil.invalidData;

    if (request.body.data) {
        try {
            var reqJsonString = request.body.data;
            console.log("EMI req " + JSON.stringify(reqJsonString));
            var card_id = reqJsonString.card_id;
            var card_date = reqJsonString.card_date;
            var vehicle_id = reqJsonString.vehicle_id;
            var rto_pune_amount = reqJsonString.rto_pune_amount;
            var rto_pcmc_amount = reqJsonString.rto_pcmc_amount;
            var police_shirval_amount = reqJsonString.police_shirval_amount;
            var police_chakan_amount = reqJsonString.police_chakan_amount;
            var police_other_amount = reqJsonString.police_other_amount;

            if (card_date == "" || card_date == null || card_date == undefined ||
                vehicle_id == "" || vehicle_id == null || vehicle_id == undefined) {
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
            ObjectDB.update_card_detail(card_id, card_date, vehicle_id, rto_pune_amount, rto_pcmc_amount, police_shirval_amount, police_chakan_amount, police_other_amount, connection, function(callback) {
                if (callback) {
                    if (callback.affectedRows < 1) {
                        response.send(error);
                        return;
                    } else {
                        if (callback.affectedRows > 0) {
                            Result = '{"status":200' + ',' + '"message" :"Card detail updated successfully."' + '}';
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


exports.Ws_delete_card_detail = function(request, response) {

    var objutil = require("./Utility.js");
    var failure = objutil.Failure;
    var invalidData = objutil.invalidData;

    if (request.body.data) {
        try {
            var reqJsonString = request.body.data;

            var card_id = reqJsonString.card_id;
            if (card_id == "" || card_id == null || card_id == undefined) {
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
            ObjectDB.delete_card_detail(card_id, connection, function(callback) {
                if (callback) {
                    if (callback.code === 'ER_ROW_IS_REFERENCED_2') {
                        deleteError = '{"status":501' + ',' + '"message" :"Cannot delete card as it is used in Invoicing."' + '}';
                        response.send(deleteError);
                        return;
                    } else {
                        if (callback.affectedRows > 0) {
                            Result = '{"status":200' + ',' + '"message" :"Card detail deleted successfully."' + '}';
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