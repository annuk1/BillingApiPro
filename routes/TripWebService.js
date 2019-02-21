var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var request = require('request');
var ObjDB = require("./DataAccess.js");
var ObjectDB = new ObjDB();

exports.Ws_get_trip_details = function(request, response) {
    var objutil = require("./Utility.js");

    var failure = objutil.Failure;

    request.getConnection(function(error, connection) {

        if (error) {
            console.log("Error while connecting DB :" + error);
            response.send(error);
            return;
        } else {
            ObjectDB.get_trip_details(connection, function(callback) {
                if (callback) {
                    data = callback;
                    var Arr_Temp = data;
                    var newsubstr = JSON.stringify(Arr_Temp);
                    if (newsubstr.indexOf("status") > -1 && newsubstr.indexOf("500") > -1 && newsubstr.indexOf("Internal server error") > -1) {
                        response.send(error);
                        return;
                    } else {
                        if (data.length > 0) {
                            Result = '{"trip_details" : ' + JSON.stringify(data) + '}';
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

exports.Ws_get_trip_detail_by_id = function(request, response) {
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
            var trip_id = reqJsonString.trip_id;
            if (trip_id == "" || trip_id == null || trip_id == undefined) {
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
            ObjectDB.get_trip_detail_by_id(trip_id, connection, function(callback) {
                if (callback) {
                    data = callback;
                    var newsubstr = JSON.stringify(data);
                    if (newsubstr.indexOf("status") > -1 && newsubstr.indexOf("500") > -1 && newsubstr.indexOf("Internal server error") > -1) {
                        response.send(error);
                        return;
                    } else {
                        if (data.length > 0) {
                            Result = '{"trip_details" : ' + JSON.stringify(data) + '}';
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

exports.Ws_set_trip_detail = function(request, response) {

    var objutil = require("./Utility.js");

    var failure = objutil.Failure;
    var invalidData = objutil.invalidData;

    if (request.body.data) {
        try {
            var reqJsonString = request.body.data;

            var trip_date = reqJsonString.trip_date;
            var vehicle_id = reqJsonString.vehicle_id;
            var loading_place = reqJsonString.loading_place;
            var unloading_place = reqJsonString.unloading_place;
            var material_qty = reqJsonString.material_qty;
            var driver_id = reqJsonString.driver_id;
            var driver_expenses_amount = reqJsonString.driver_expenses_amount;
            var diesel_expenses_amount = reqJsonString.diesel_expenses_amount;
            var toll_charges = reqJsonString.toll_charges;
            var worker_charges = reqJsonString.worker_charges;
            var washing_charges = reqJsonString.washing_charges;
            var maintenance_charges = reqJsonString.maintenance_charges;

            if (trip_date == "" || trip_date == null || trip_date == undefined ||
                vehicle_id == "" || vehicle_id == null || vehicle_id == undefined ||
                loading_place == "" || loading_place == null || loading_place == undefined ||
                unloading_place == "" || unloading_place == null || unloading_place == undefined ||
                material_qty == "" || material_qty == null || material_qty == undefined ||
                driver_id == "" || driver_id == null || driver_id == undefined) {
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
            ObjectDB.set_trip_detail(trip_date, vehicle_id, loading_place, unloading_place, material_qty, driver_id, driver_expenses_amount, diesel_expenses_amount, toll_charges, worker_charges, washing_charges, maintenance_charges, connection, function(callback) {
                if (callback) {

                    if (callback.affectedRows < 1) {
                        response.send(error);
                        return;
                    } else {

                        if (callback.insertId > 0) {
                            Result = '{"status":200' + ',' + '"message" :"Trip detail added successfully."' + '}';
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


exports.Ws_update_trip_detail = function(request, response) {

    var objutil = require("./Utility.js");
    var failure = objutil.Failure;
    var invalidData = objutil.invalidData;

    if (request.body.data) {
        try {
            var reqJsonString = request.body.data;
            console.log("TRIP " + JSON.stringify(reqJsonString));
            var trip_id = reqJsonString.trip_id;
            var trip_date = reqJsonString.trip_date;
            var vehicle_id = reqJsonString.vehicle_id;
            var loading_place = reqJsonString.loading_place;
            var unloading_place = reqJsonString.unloading_place;
            var material_qty = reqJsonString.material_qty;
            var driver_id = reqJsonString.driver_id;
            var driver_expenses_amount = reqJsonString.driver_expenses_amount;
            var diesel_expenses_amount = reqJsonString.diesel_expenses_amount;
            var toll_charges = reqJsonString.toll_charges;
            var worker_charges = reqJsonString.worker_charges;
            var washing_charges = reqJsonString.washing_charges;
            var maintenance_charges = reqJsonString.maintenance_charges;

            if (trip_date == "" || trip_date == null || trip_date == undefined ||
                vehicle_id == "" || vehicle_id == null || vehicle_id == undefined ||
                loading_place == "" || loading_place == null || loading_place == undefined ||
                unloading_place == "" || unloading_place == null || unloading_place == undefined ||
                material_qty == "" || material_qty == null || material_qty == undefined ||
                driver_id == "" || driver_id == null || driver_id == undefined) {
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
            ObjectDB.update_trip_detail(trip_id, trip_date, vehicle_id, loading_place, unloading_place, material_qty, driver_id, driver_expenses_amount, diesel_expenses_amount, toll_charges, worker_charges, washing_charges, maintenance_charges, connection, function(callback) {
                if (callback) {
                    if (callback.affectedRows < 1) {
                        response.send(error);
                        return;
                    } else {
                        if (callback.affectedRows > 0) {
                            Result = '{"status":200' + ',' + '"message" :"Trip detail updated successfully."' + '}';
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


exports.Ws_delete_trip_detail = function(request, response) {

    var objutil = require("./Utility.js");
    var failure = objutil.Failure;
    var invalidData = objutil.invalidData;

    if (request.body.data) {
        try {
            var reqJsonString = request.body.data;

            var trip_id = reqJsonString.trip_id;
            if (trip_id == "" || trip_id == null || trip_id == undefined) {
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
            ObjectDB.delete_trip_detail(trip_id, connection, function(callback) {
                if (callback) {
                    if (callback.code === 'ER_ROW_IS_REFERENCED_2') {
                        deleteError = '{"status":501' + ',' + '"message" :"Cannot delete trip details as it is used in Invoicing."' + '}';
                        response.send(deleteError);
                        return;
                    } else {
                        if (callback.affectedRows > 0) {
                            Result = '{"status":200' + ',' + '"message" :"Trip detail deleted successfully."' + '}';
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