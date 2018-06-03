var express = require('express');
var mysql = require('mysql');

function getData() {
    return (null);
}

var ObjDb = require("./Utility.js");
var error = ObjDb.error;

getData.prototype.get_customers = function (connection, callback) {

    var sql = "SELECT * FROM customers";
    connection.query(sql, function (err, rows) {
        if (err) {
            console.log('Error in query' + err);
            callback(error);
        } else {
            callback(rows);
        }
    });
};

getData.prototype.set_customer_detail = function (cust_name, cust_contact, cust_email, cust_address, connection, callback) {

    var sql = "INSERT INTO customers VALUES (null,'" + cust_name + "','" + cust_contact + "','" + cust_email + "','" + cust_address + "')";
    connection.query(sql, function (err, rows) {
        if (err) {
            callback(error);
        } else {
            callback(rows);
        }
    })
};

getData.prototype.update_customer_detail = function (cust_id, cust_name, cust_contact, cust_email, cust_address, connection, callback) {

    var sql = "UPDATE customers VALUES (null,'" + cust_name + "','" + cust_contact + "','" + cust_email + "','" + cust_address + "')";
    connection.query(sql, function (err, rows) {
        if (err) {
            callback(error);
        } else {
            callback(rows);
        }
    })
};

getData.prototype.delete_customer_detail = function (cust_id, cust_name, cust_contact, cust_email, cust_address, connection, callback) {

    var sql = "UPDATE customers VALUES (null,'" + cust_name + "','" + cust_contact + "','" + cust_email + "','" + cust_address + "')";
    connection.query(sql, function (err, rows) {
        if (err) {
            callback(error);
        } else {
            callback(rows);
        }
    })
};
getData.prototype.get_customer_by_id = function (customerId, connection, callback) {

    var sql = "SELECT * FROM customers WHERE CUST_ID = '" + customerId + "'";
    connection.query(sql, function (err, rows) {
        if (err) {
            console.log('Error in query' + err);
            callback(error);
        } else {
            callback(rows);
        }
    });
};

getData.prototype.get_vendor_details = function (connection, callback) {

    var sql = "SELECT * FROM vendors";
    connection.query(sql, function (err, rows) {
        if (err) {
            callback(error);
        } else {
            callback(rows);
        }
    })
};

getData.prototype.set_vendor_details = function (vend_name, vend_contact, vend_email, vend_address, connection, callback) {

    var sql = "INSERT INTO vendors VALUES (null,'" + vend_name + "','" + vend_contact + "','" + vend_email + "','" + vend_address + "')";
    connection.query(sql, function (err, rows) {
        if (err) {
            callback(error);
        } else {
            callback(rows);
        }
    })
};

getData.prototype.update_vendor_details = function (vend_name, vend_contact, vend_email, vend_address, connection, callback) {

    var sql = "INSERT INTO vendors VALUES (null,'" + vend_name + "','" + vend_contact + "','" + vend_email + "','" + vend_address + "')";
    connection.query(sql, function (err, rows) {
        if (err) {
            callback(error);
        } else {
            callback(rows);
        }
    })
};
getData.prototype.delete_vendor_details = function (vend_name, vend_contact, vend_email, vend_address, connection, callback) {

    var sql = "INSERT INTO vendors VALUES (null,'" + vend_name + "','" + vend_contact + "','" + vend_email + "','" + vend_address + "')";
    connection.query(sql, function (err, rows) {
        if (err) {
            callback(error);
        } else {
            callback(rows);
        }
    })
};

getData.prototype.get_products = function (connection, callback) {

    var sql = "SELECT * FROM products";
    connection.query(sql, function (err, rows) {
        if (err) {
            callback(error);
        } else {
            callback(rows);
        }
    })
};

getData.prototype.set_product_detail = function (prod_name, prod_desc, prod_unit, prod_rate, connection, callback) {

    var sql = "INSERT INTO products VALUES (null,'" + prod_name + "','" + prod_desc + "','" + prod_unit + "','" + prod_rate + "')";
    connection.query(sql, function (err, rows) {
        if (err) {
            callback(error);
        } else {
            callback(rows);
        }
    })
};

getData.prototype.update_product_detail = function (prod_name, prod_desc, prod_unit, prod_rate, connection, callback) {

    var sql = "INSERT INTO products VALUES (null,'" + prod_name + "','" + prod_desc + "','" + prod_unit + "','" + prod_rate + "')";
    connection.query(sql, function (err, rows) {
        if (err) {
            callback(error);
        } else {
            callback(rows);
        }
    })
};

getData.prototype.delete_product_detail = function (prod_name, prod_desc, prod_unit, prod_rate, connection, callback) {

    var sql = "INSERT INTO products VALUES (null,'" + prod_name + "','" + prod_desc + "','" + prod_unit + "','" + prod_rate + "')";
    connection.query(sql, function (err, rows) {
        if (err) {
            callback(error);
        } else {
            callback(rows);
        }
    })
};

getData.prototype.get_challans = function (connection, callback) {

    var sql = "SELECT challans.chal_id, challans.chal_quantity, customers.cust_name AS chal_cust_name, customers.cust_address AS chal_cust_address, products.prod_name AS chal_prod_name, products.prod_unit AS chal_prod_unit, vehicles.veh_number AS chal_veh_no FROM challans, customers, products, vehicles WHERE challans.chal_cust_id=customers.cust_id && challans.chal_prod_id=products.prod_id && challans.chal_veh_id=vehicles.veh_id";

    connection.query(sql, function (err, rows) {
        if (err) {
            callback(error);
        } else {
            callback(rows);
        }
    })
};

getData.prototype.set_challan_detail = function (cust_id, prod_id, veh_id, chal_qty, connection, callback) {

    var sql = "INSERT INTO challans VALUES (null,'" + chal_qty + "','" + cust_id + "','" + prod_id + "','" + veh_id + "')";
    connection.query(sql, function (err, rows) {
        if (err) {
            callback(error);
        } else {
            callback(rows);
        }
    })
};

getData.prototype.get_challans_by_customer_id = function (customerId, connection, callback) {

    var sql = "SELECT * FROM challans WHERE chal_cust_id = '" + customerId + "'";
    connection.query(sql, function (err, rows) {
        if (err) {
            callback(error);
        } else {
            callback(rows);
        }
    })
};

getData.prototype.get_quatations = function (connection, callback) {

    var sql = "select quatations.quat_id, quatations.quat_date, customers.cust_name AS quat_customer, customers.cust_address AS quat_address, customers.cust_contact AS quat_contact, customers.cust_contact_person AS quat_contact_person from customers, quatations where customers.cust_id=quatations.quat_cust_id";
    connection.query(sql, function (err, rows) {
        if (err) {
            callback(error);
        } else {
            callback(rows);
        }
    })
};

getData.prototype.set_quatation_detail = function (quat_date, quat_cust_id, quat_products, connection, callback) {

    connection.beginTransaction(function (error) {
        if (error) {
            callback(error);
        }
        else {
            var sql = "INSERT INTO quatations VALUES (null,'" + quat_date + "','" + quat_cust_id + "')";
            connection.query(sql, function (error, result) {
                if (error) {
                    return connection.rollback(function () {
                        callback(error);

                    })
                }
                console.log("result...." + JSON.stringify(result));
                var quat_id = result.insertId;
                var pro_arr = quat_products;
                console.log("pro_arr" + JSON.stringify(pro_arr));
                for (var i = 0; i < pro_arr.length; i++) {
                    var prod_id = pro_arr[i].prod_id;
                    var sql1 = "INSERT INTO quatation_products VALUES (null,'" + prod_id + "','" + quat_id + "')";
                    connection.query(sql1, function (err, rows) {
                        if (err) {
                            return connection.rollback(function () {
                                callback(error);

                            })
                        } else {
                            connection.commit()
                            console.log("rows.." + JSON.stringify(rows));
                            callback(rows);
                        }
                    })
                }
            });
        };
    });
};

getData.prototype.set_quatation_products = function (prod_id, quat_id, connection, callback) {

    var sql = "INSERT INTO quatation_products VALUES (null,'" + prod_id + "','" + quat_id + "')";
    connection.query(sql, function (err, rows) {
        if (err) {
            callback(error);
        } else {
            callback(rows);
        }
    })
};

getData.prototype.Ws_get_quatation_products = function (connection, callback) {

    var sql = "SELECT products.prod_name, products.prod_unit, products.prod_rate FROM products, quatation_products WHERE products.prod_id = quatation_products.prod_id";
    connection.query(sql, function (err, rows) {
        if (err) {
            callback(error);
        } else {
            callback(rows);
        }
    })
};

getData.prototype.Ws_get_quatation_products_by_id = function (quat_id, connection, callback) {

    var sql = "SELECT products.prod_name, products.prod_unit, products.prod_rate FROM products, quatation_products WHERE products.prod_id = quatation_products.prod_id && quat_id = '" + quat_id + "'";
    connection.query(sql, function (err, rows) {
        if (err) {
            callback(error);
        } else {
            callback(rows);
        }
    })
};

// Purchase queries
getData.prototype.get_purchases = function (connection, callback) {

    var sql = "select purchases.pur_id, purchases.pur_date, vendors.vend_name AS pur_vendor, vendors.vend_address AS pur_address, vendors.vend_contact AS pur_contact, vendors.vend_contact_person AS pur_contact_person from vendors, purchases where vendors.vend_id=purchases.pur_vendor_id";
    connection.query(sql, function (err, rows) {
        if (err) {
            callback(error);
        } else {
            callback(rows);
        }
    })
};

getData.prototype.set_purchase_detail = function (pur_date, pur_cust_id, connection, callback) {

    var sql = "INSERT INTO purchases VALUES (null,'" + pur_date + "','" + pur_cust_id + "')";
    connection.query(sql, function (err, rows) {
        if (err) {
            callback(error);
        } else {
            callback(rows);
        }
    })
};

getData.prototype.set_purchase_products = function (prod_id, pur_id, connection, callback) {

    var sql = "INSERT INTO purchase_products VALUES (null,'" + prod_id + "','" + pur_id + "')";
    connection.query(sql, function (err, rows) {
        if (err) {
            callback(error);
        } else {
            callback(rows);
        }
    })
};

getData.prototype.Ws_get_purchase_products = function (connection, callback) {

    var sql = "SELECT products.prod_name, products.prod_unit, products.prod_rate FROM products, purchase_products WHERE products.prod_id = purchase_products.prod_id";
    connection.query(sql, function (err, rows) {
        if (err) {
            callback(error);
        } else {
            callback(rows);
        }
    })
};

getData.prototype.Ws_get_purchase_products_by_id = function (pur_id, connection, callback) {

    var sql = "SELECT challans.chal_id, challans.chal_date, challans.chal_quantity AS prod_qty, challans.chal_veh_id AS veh_id, vehicles.veh_number, challans.chal_prod_id AS prod_id, products.prod_name, products.prod_unit, products.prod_rate FROM challans, vehicles, products, purchase_products WHERE products.prod_id = purchase_products.prod_id && challans.chal_prod_id = products.prod_id && challans.chal_veh_id = vehicles.veh_id && pur_id =  '" + pur_id + "'";
    connection.query(sql, function (err, rows) {
        if (err) {
            callback(error);
        } else {
            callback(rows);
        }
    })
};

// Get invoice
getData.prototype.Ws_get_invoices = function (connection, callback) {

    var sql = "select invoices.inv_id, invoices.inv_date, invoices.inv_cust_id, customers.cust_name AS inv_customer, customers.cust_contact_person AS inv_contact_person, customers.cust_contact AS inv_contact, customers.cust_address AS inv_address from invoices, customers where invoices.inv_cust_id=customers.cust_id";
    connection.query(sql, function (err, rows) {
        if (err) {
            callback(error);
        } else {
            callback(rows);
        }
    })
};

getData.prototype.Ws_set_invoice_detail = function (pur_date, pur_cust_id, connection, callback) {

    var sql = "INSERT INTO invoices VALUES (null,'" + pur_date + "','" + pur_cust_id + "')";
    connection.query(sql, function (err, rows) {
        if (err) {
            callback(error);
        } else {
            callback(rows);
        }
    })
};

getData.prototype.Ws_set_invoice_products = function (prod_id, pur_id, connection, callback) {

    var sql = "INSERT INTO invoice_products VALUES (null,'" + prod_id + "','" + pur_id + "')";
    connection.query(sql, function (err, rows) {
        if (err) {
            callback(error);
        } else {
            callback(rows);
        }
    })
};

getData.prototype.Ws_get_invoice_products_by_id = function (pur_id, connection, callback) {

    var sql = "SELECT challans.chal_id, challans.chal_date, challans.chal_quantity AS prod_qty, challans.chal_veh_id AS veh_id, vehicles.veh_number, challans.chal_prod_id AS prod_id, products.prod_name, products.prod_unit, products.prod_rate FROM challans, vehicles, products, purchase_products WHERE products.prod_id = purchase_products.prod_id && challans.chal_prod_id = products.prod_id && challans.chal_veh_id = vehicles.veh_id && pur_id =  '" + pur_id + "'";
    connection.query(sql, function (err, rows) {
        if (err) {
            callback(error);
        } else {
            callback(rows);
        }
    })
};

getData.prototype.get_vehicles = function (connection, callback) {

    var sql = "SELECT * FROM vehicles";
    connection.query(sql, function (err, rows) {
        if (err) {
            callback(error);
        } else {
            callback(rows);
        }
    })
};

exports = module.exports = getData;