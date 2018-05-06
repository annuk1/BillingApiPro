var express = require('express');

var mysql = require('mysql');



function getData() {
    return (null);
}

var ObjDb = require("./Utility.js");

var error = ObjDb.error;


getData.prototype.Get_customers = function(connection, callback) {

    var sql = "SELECT * FROM customers";

    connection.query(sql, function(err, rows) {
        if (err) {
            console.log('Error in query' + err);

            callback(error);
        } else {

            callback(rows);
        }
    });

};
getData.prototype.set_customer_detail = function(cust_name, cust_contact, cust_email, cust_address, connection, callback) {

    var sql = "INSERT INTO customers VALUES (null,'" + cust_name + "','" + cust_contact + "','" + cust_email + "','" + cust_address + "')";
    console.log("sql .." + sql);
    connection.query(sql, function(err, rows) {
        if (err) {
            console.log('Error in query' + err);

            callback(error);
        } else {

            callback(rows);
        }
    });


};
getData.prototype.get_vendor_details = function(connection, callback) {

    var sql = "SELECT * FROM vendors";
    console.log("sql .." + sql);
    connection.query(sql, function(err, rows) {
        if (err) {
            console.log('Error in query' + err);

            callback(error);
        } else {

            callback(rows);
        }
    });


};

getData.prototype.set_vendor_details = function(vend_name, vend_contact, vend_email, vend_address, connection, callback) {

    var sql = "INSERT INTO vendors VALUES (null,'" + vend_name + "','" + vend_contact + "','" + vend_email + "','" + vend_address + "')";

    connection.query(sql, function(err, rows) {
        if (err) {
            console.log('Error in query' + err);

            callback(error);
        } else {

            callback(rows);
        }
    });

};
getData.prototype.get_vendor_details = function(connection, callback) {

    var sql = "SELECT * FROM vendors";
    console.log("sql .." + sql);
    connection.query(sql, function(err, rows) {
        if (err) {
            console.log('Error in query' + err);

            callback(error);
        } else {

            callback(rows);
        }
    });


};

getData.prototype.Get_products = function(connection, callback) {

    var sql = "SELECT * FROM product ";

    connection.query(sql, function(err, rows) {
        if (err) {
            console.log('Error in query' + err);

            callback(error);
        } else {

            callback(rows);
        }
    });

};

getData.prototype.set_product_detail = function(prod_name, prod_desc, prod_unit, prod_rate, connection, callback) {

    var sql = "INSERT INTO tbl_products VALUES (null,'" + prod_name + "','" + prod_desc + "','" + prod_unit + "','" + prod_rate + "')";

    connection.query(sql, function(err, rows) {
        if (err) {
            console.log('Error in query' + err);

            callback(error);
        } else {

            callback(rows);
        }
    });

};
exports = module.exports = getData;