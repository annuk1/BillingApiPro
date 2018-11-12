var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var request = require('request');
var dateformat = require('dateformat');
app.use(bodyParser.json()); // Body parser use JSON data

var http = require('http');

var ObjDB = require("./DataAccess.js");
var ObjectDB = new ObjDB();

exports.Ws_get_employees = function(request, response) {

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
            ObjectDB.get_employees(connection, function(callback) {
                if (callback) {
                    var newsubstr = JSON.stringify(callback);

                    if (newsubstr.indexOf("status") > -1 && newsubstr.indexOf("500") > -1 && newsubstr.indexOf("Internal server error") > -1) {
                        response.send(error);
                        return;
                    } else {
                        if (newsubstr.length > 0) {
                            Result = '{"employees" : ' + JSON.stringify(callback) + '}';
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

exports.Ws_get_employee_by_id = function(request, response) {
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
            var emp_id = reqJsonString.emp_id;
            if (emp_id == "" || emp_id == null || emp_id == undefined) {
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
            ObjectDB.get_employee_by_id(emp_id, connection, function(callback) {
                if (callback) {
                    var newsubstr = JSON.stringify(callback);
                    if (newsubstr.indexOf("status") > -1 && newsubstr.indexOf("500") > -1 && newsubstr.indexOf("Internal server error") > -1) {
                        response.send(error);
                        return;
                    } else {
                        if (callback.length > 0) {
                            Result = '{"employees" : ' + JSON.stringify(callback) + '}';
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

//This web service is used to set employee details
exports.Ws_set_employee = function(request, response) {

    var objutil = require("./Utility.js");

    var outPutData = "";
    var success = objutil.Save;
    var failure = objutil.Failure;
    var invalidData = objutil.invalidData;
    var delete1 = objutil.delete1;
    var error = objutil.error;
    var Update = objutil.Update;
    console.log("Add Employee data ", +request);
    if (request.body.data) {
        try {
            var reqJsonString = request.body.data;
            var emp_name = reqJsonString.emp_name;
            var emp_age = reqJsonString.emp_age;
            var emp_contact = reqJsonString.emp_contact;
            var emp_address = reqJsonString.emp_address;
            var date_of_joining = reqJsonString.date_of_joining;
            var emp_adhar_no = reqJsonString.emp_adhar_no;
            var emp_role = reqJsonString.emp_role;
            var employment_type = reqJsonString.employment_type;
            if (emp_name == "" || emp_name == null || emp_name == undefined ||
                emp_age == "" || emp_age == null || emp_age == undefined ||
                emp_contact == "" || emp_contact == null || emp_contact == undefined ||
                emp_address == "" || emp_address == null || emp_address == undefined ||
                date_of_joining == "" || date_of_joining == null || date_of_joining == undefined ||
                emp_adhar_no == "" || emp_adhar_no == null || emp_adhar_no == undefined ||
                emp_role == "" || emp_role == null || emp_role == undefined ||
                employment_type == "" || employment_type == null || employment_type == undefined) {
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
            ObjectDB.set_employee_detail(emp_name, emp_age, emp_contact, emp_address, date_of_joining, emp_adhar_no, emp_role, employment_type, connection, function(callback) {
                if (callback) {
                    data = JSON.stringify(callback);

                    if (callback.affectedRows < 1) {
                        response.send(error);
                        return;
                    } else {
                        if (callback.insertId > 0) {
                            Result = '{"status":200' + ',' + '"message" :"Employee added successfully."' + '}';
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
exports.Ws_update_employee = function(request, response) {

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
            console.log("Update Employee ", +JSON.stringify(reqJsonString));
            var emp_name = reqJsonString.emp_name;
            var emp_age = reqJsonString.emp_age;
            var emp_contact = reqJsonString.emp_contact;
            var emp_address = reqJsonString.emp_address;
            var date_of_joining = reqJsonString.date_of_joining;
            var emp_adhar_no = reqJsonString.emp_adhar_no;
            var emp_role = reqJsonString.emp_role;
            var employment_type = reqJsonString.employment_type;
            if (emp_name == "" || emp_name == null || emp_name == undefined ||
                emp_age == "" || emp_age == null || emp_age == undefined ||
                emp_contact == "" || emp_contact == null || emp_contact == undefined ||
                emp_address == "" || emp_address == null || emp_address == undefined ||
                date_of_joining == "" || date_of_joining == null || date_of_joining == undefined ||
                emp_adhar_no == "" || emp_adhar_no == null || emp_adhar_no == undefined ||
                emp_role == "" || emp_role == null || emp_role == undefined ||
                employment_type == "" || employment_type == null || employment_type == undefined) {
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
            ObjectDB.update_employee_detail(emp_id, emp_name, emp_age, emp_contact, emp_address, date_of_joining, emp_adhar_no, emp_role, employment_type, connection, function(callback) {
                if (callback) {
                    if (callback.affectedRows < 1) {
                        response.send(error);
                        return;
                    } else {
                        if (callback.affectedRows > 0) {
                            Result = '{"status":200' + ',' + '"message" :"Employee updated successfully."' + '}';
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


exports.Ws_delete_employee = function(request, response) {

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
            var emp_id = reqJsonString.emp_id;
            if (emp_id == "" || emp_id == null || emp_id == undefined) {
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
            ObjectDB.delete_employee_detail(emp_id, connection, function(callback) {
                if (callback) {
                    if (callback.code === 'ER_ROW_IS_REFERENCED_2') {
                        deleteError = '{"status":501' + ',' + '"message" :"Cannot delete employee as it is used in Invoicing."' + '}';
                        response.send(deleteError);
                        return;
                    } else {
                        if (callback.affectedRows > 0) {
                            Result = '{"status":200' + ',' + '"message" :"Employee deleted successfully."' + '}';
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