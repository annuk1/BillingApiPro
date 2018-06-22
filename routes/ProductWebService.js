var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var request = require('request');
var ObjDB = require("./DataAccess.js");
var ObjectDB = new ObjDB();

exports.Ws_get_products = function (request, response) {
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
            ObjectDB.get_products(connection, function (callback) {
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
}

exports.Ws_get_products_by_id = function (request, response) {
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
            console.log("Request "+reqJsonString);
            var prod_id = reqJsonString.prod_id;
            if (prod_id == "" || prod_id == null || prod_id == undefined ) {
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
            ObjectDB.get_products_by_id(prod_id, connection, function (callback) {
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
}

exports.Ws_set_product = function (request, response) {

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

            var prod_name = reqJsonString.prod_name;
            var prod_desc = reqJsonString.prod_desc;
            var prod_unit = reqJsonString.prod_unit;
            var prod_rate = reqJsonString.prod_rate;
            if (prod_name == "" || prod_name == null || prod_name == undefined ||
                prod_unit == "" || prod_unit == null || prod_unit == undefined ||
                prod_rate == "" || prod_rate == null || prod_rate == undefined) {
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
            ObjectDB.set_product_detail(prod_name, prod_desc, prod_unit, prod_rate, connection, function (callback) {
                if (callback) {

                    if (callback.affectedRows < 1) {
                        response.send(error);
                        return;
                    } else {

                        if (callback.insertId > 0) {
                            Result = '{"status":200' + ',' + '"message" :"Product added successfully."' + '}';
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


exports.Ws_update_product = function (request, response) {

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
            var prod_id = reqJsonString.prod_id;
            var prod_name = reqJsonString.prod_name;
            var prod_desc = reqJsonString.prod_desc;
            var prod_unit = reqJsonString.prod_unit;
            var prod_rate = reqJsonString.prod_rate;
            if (prod_id == "" || prod_id == null || prod_id == undefined ||
                prod_name == "" || prod_name == null || prod_name == undefined ||
                prod_unit == "" || prod_unit == null || prod_unit == undefined ||
                prod_rate == "" || prod_rate == null || prod_rate == undefined) {
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
            ObjectDB.update_product_detail(prod_id, prod_name, prod_desc, prod_unit, prod_rate, connection, function (callback) {
                if (callback) {
                    if (callback.affectedRows < 1) {
                        response.send(error);
                        return;
                    } else {
                        if (callback.affectedRows > 0) {
                            Result = '{"status":200' + ',' + '"message" :"Product updated successfully."' + '}';
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


exports.Ws_delete_product = function (request, response) {

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

            var prod_id = reqJsonString.prod_id;
            if (prod_id == "" || prod_id == null || prod_id == undefined) {
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
            ObjectDB.delete_product_detail(prod_id, connection, function (callback) {
                if (callback) {
                    if (callback.affectedRows < 1) {
                        response.send(error);
                        return;
                    } else {
                        if (callback.affectedRows > 0) {
                            Result = '{"status":200' + ',' + '"message" :"Product deleted successfully."' + '}';
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