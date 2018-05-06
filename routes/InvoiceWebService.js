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

exports.Ws_getCustomer = function(request, response) {

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

            console.log("Database connection" + connection);

            ObjectDB.Get_customers(connection, function(callback) {
                if (callback) {
                    console.log("data is :" + callback)
                    data = callback;
                    var Arr_Temp = data;
                    console.log("Arr_Temp" + JSON.stringify(Arr_Temp));
                    var newsubstr = JSON.stringify(Arr_Temp);

                    if (newsubstr.indexOf("status") > -1 && newsubstr.indexOf("500") > -1 && newsubstr.indexOf("Internal server error") > -1) {
                        response.send(error);
                        return;
                    } else {

                        if (data.length > 0) {
                            Result = '{"data" : ' + JSON.stringify(data) + '}';
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

//This web service is use to set customer details .
exports.Ws_set_customer = function(request, response) {

    var objutil = require("./Utility.js");

    var outPutData = "";
    var success = objutil.Save;
    var failure = objutil.Failure;
    var invalidData = objutil.invalidData;
    var delete1 = objutil.delete1;
    var error = objutil.error;
    var Update = objutil.Update;


    var reqJsonObj, reqJsonString, lastupdateddatetime, p_username;

    if (request.body.data) {
        try {
            console.log("Request Parameters" + request);
            var reqJsonString = request.body.data;
            console.log('Input Parameters :' + JSON.stringify(reqJsonString));


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
    request.getConnection(function(err, connection) {

        if (err) {
            console.log("Error while connecting DB :" + err);
            response.send(error);
            return;
        } else {

            console.log("Database connection" + connection);
            ObjectDB.set_customer_detail(cust_name, cust_contact, cust_email, cust_address, connection, function(callback) {
                if (callback) {
                    console.log("data is :" + JSON.stringify(callback));
                    data = JSON.stringify(callback);

                    if (callback.affectedRows < 1) {
                        response.send(error);
                        return;
                    } else {

                        if (callback.insertId > 0) {

                            Result = '{"data" : ' + JSON.stringify(callback) + '}';
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
exports.Ws_get_vendor = function(request, response) {

    var objutil = require("./Utility.js");

    var outPutData = "";
    var success = objutil.Save;
    var failure = objutil.Failure;
    var invalidData = objutil.invalidData;
    var delete1 = objutil.delete1;
    var error = objutil.error;
    var Update = objutil.Update;


    var reqJsonObj, reqJsonString, lastupdateddatetime, p_meeting_ID, vis_fname, vis_mname, vis_lname, vis_imgurl, vis_comp, vis_mobnum, vis_emailID, vis_age, vis_ID, vis_IDnum, vis_AssetStr;

    request.getConnection(function(err, connection) {

        if (err) {
            console.log("Error while connecting DB :" + err);
            response.send(error);
            return;
        } else {

            console.log("Database connection" + connection);

            ObjectDB.get_vendor_details(connection, function(callback) {
                if (callback) {
                    console.log("data is :" + callback)
                    data = callback;
                    var Arr_Temp = data;
                    console.log("Arr_Temp" + JSON.stringify(Arr_Temp));
                    var newsubstr = JSON.stringify(Arr_Temp);

                    if (newsubstr.indexOf("status") > -1 && newsubstr.indexOf("500") > -1 && newsubstr.indexOf("Internal server error") > -1) {
                        response.send(error);
                        return;
                    } else {

                        if (data.length > 0) {
                            Result = '{"data" : ' + JSON.stringify(data) + '}';
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

exports.Ws_set_vendor = function(request, response) {
    var objutil = require("./Utility.js");

    var outPutData = "";
    var success = objutil.Save;
    var failure = objutil.Failure;
    var invalidData = objutil.invalidData;
    var delete1 = objutil.delete1;
    var error = objutil.error;
    var Update = objutil.Update;


    var reqJsonObj, reqJsonString, lastupdateddatetime, p_username;

    if (request.body.data) {
        try {
            console.log("Request Parameters" + request);
            var reqJsonString = request.body.data;
            console.log('Input Parameters :' + reqJsonString);

            var vend_name = reqJsonString.vend_name;
            var vend_contact = reqJsonString.vend_contact;
            var vend_email = reqJsonString.vend_email;
            var vend_address = reqJsonString.vend_address;
            if (vend_name == "" || vend_name == null || vend_name == undefined ||
                vend_contact == "" || vend_contact == null || vend_contact == undefined ||
                vend_email == "" || vend_email == null || vend_email == undefined ||
                vend_address == "" || vend_address == null || vend_address == undefined) {
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
            console.log("Error while connecting DB :" + err);
            response.send(error);
            return;
        } else {

            console.log("Database connection" + connection);

            ObjectDB.set_vendor_details(vend_name, vend_contact, vend_email, vend_address, connection, function(callback) {
                if (callback) {
                    console.log("data is :" + callback)
                    if (callback.affectedRows < 1) {
                        response.send(error);
                        return;
                    } else {

                        if (callback.insertId > 0) {

                            Result = '{"data" : ' + JSON.stringify(callback) + '}';
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