var express = require('express');
var mysql = require('mysql');

function getData() {
    return (null);
}

var ObjDb = require("./Utility.js");
var error = ObjDb.error;

getData.prototype.get_customers = function(connection, callback) {
    var sql = "SELECT * FROM customers";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.set_customer_detail = function(cust_name, cust_contact_person, cust_contact, cust_email, cust_address, connection, callback) {
    var sql = "INSERT INTO customers VALUES (null,'" + cust_name + "','" + cust_contact_person + "','" + cust_contact + "','" + cust_email + "','" + cust_address + "')";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.update_customer_detail = function(cust_id, cust_name, cust_contact_person, cust_contact, cust_email, cust_address, connection, callback) {
    var sql = "UPDATE customers SET cust_name='" + cust_name + "', cust_contact_person='" + cust_contact_person + "', cust_contact='" + cust_contact + "', cust_email='" + cust_email + "', cust_address='" + cust_address + "' WHERE cust_id = '" + cust_id + "'";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.delete_customer_detail = function(cust_id, connection, callback) {
    var sql = "DELETE FROM customers WHERE cust_id = '" + cust_id + "'";

    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.get_customer_by_id = function(customerId, connection, callback) {
    var sql = "SELECT * FROM customers WHERE CUST_ID = '" + customerId + "'";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.get_vendor_details = function(connection, callback) {
    var sql = "SELECT * FROM vendors";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.get_vendor_by_id = function(vend_id, connection, callback) {
    var sql = "SELECT * FROM vendors WHERE vend_id = '" + vend_id + "'";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.set_vendor_details = function(vend_name, vend_contact, vend_email, vend_address, vend_contact_person, connection, callback) {
    var sql = "INSERT INTO vendors VALUES (null,'" + vend_name + "','" + vend_contact + "','" + vend_email + "','" + vend_address + "','" + vend_contact_person + "')";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.update_vendor_details = function(vend_id, vend_name, vend_contact, vend_email, vend_address, vend_contact_person, connection, callback) {
    var sql = "UPDATE vendors SET vend_name='" + vend_name + "',vend_contact='" + vend_contact + "', vend_email='" + vend_email + "', vend_address='" + vend_address + "', vend_contact_person='" + vend_contact_person + "' WHERE vend_id = '" + vend_id + "'";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
};

getData.prototype.delete_vendor_details = function(vend_id, connection, callback) {
    var sql = "DELETE FROM vendors WHERE vend_id='" + vend_id + "'";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.get_products = function(connection, callback) {
    var sql = "SELECT products.prod_id, products.prod_name, products.prod_desc, products.prod_unit, products.prod_rate, gst.gst_hsn AS prod_hsn, gst.gst_percentage FROM products, gst WHERE products.prod_gst_id = gst.gst_id";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.get_products_by_id = function(prod_id, connection, callback) {
    var sql = "SELECT products.prod_name, products.prod_desc, products.prod_unit, products.prod_rate, gst.gst_hsn AS prod_hsn, gst.gst_percentage FROM products, gst WHERE products.prod_gst_id = gst.gst_id && products.prod_id = '" + prod_id + "'";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.set_product_detail = function(prod_name, prod_desc, prod_unit, prod_rate, prod_gst_id, connection, callback) {
    var sql = "INSERT INTO products VALUES (null,'" + prod_name + "','" + prod_desc + "','" + prod_unit + "','" + prod_rate + "','" + prod_gst_id + "')";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.update_product_detail = function(prod_id, prod_name, prod_desc, prod_unit, prod_rate, prod_gst_id, connection, callback) {
    var sql = "UPDATE products SET prod_name='" + prod_name + "', prod_desc='" + prod_desc + "',prod_unit='" + prod_unit + "', prod_rate='" + prod_rate + "', prod_gst_id='" + prod_gst_id + "' WHERE prod_id = '" + prod_id + "'";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.delete_product_detail = function(prod_id, connection, callback) {
    var sql = "DELETE FROM products WHERE prod_id ='" + prod_id + "'";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.get_vehicles = function(connection, callback) {
    var sql = "SELECT * FROM vehicles";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.set_vehicle_detail = function(veh_name, veh_number, veh_desc, connection, callback) {
    var sql = "INSERT INTO vehicles VALUES (null,'" + veh_name + "','" + veh_number + "','" + veh_desc + "')";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.update_vehicle_detail = function(veh_id, veh_name, veh_number, veh_desc, connection, callback) {
    var sql = "UPDATE vehicles SET veh_name='" + veh_name + "', veh_number='" + veh_number + "', veh_desc='" + veh_desc + "' WHERE veh_id = '" + veh_id + "'";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.delete_vehicle_detail = function(veh_id, connection, callback) {
    var sql = "DELETE FROM vehicles WHERE veh_id = '" + veh_id + "'";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.get_vehicle_by_id = function(veh_id, connection, callback) {
    var sql = "SELECT * FROM vehicles WHERE veh_id = '" + veh_id + "'";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.get_gst_details = function(connection, callback) {
    var sql = "SELECT * FROM gst";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.set_gst_detail = function(gst_hsn, gst_percentage, gst_desc, connection, callback) {
    var sql = "INSERT INTO gst VALUES (null,'" + gst_hsn + "','" + gst_percentage + "','" + gst_desc + "')";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.update_gst_detail = function(gst_id, gst_hsn, gst_percentage, gst_desc, connection, callback) {
    var sql = "UPDATE gst SET gst_hsn ='" + gst_hsn + "', gst_percentage ='" + gst_percentage + "', gst_desc ='" + gst_desc + "' WHERE gst_id = '" + gst_id + "'";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.delete_gst_detail = function(gst_id, connection, callback) {
    var sql = "DELETE FROM gst WHERE gst_id = '" + gst_id + "'";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.get_gst_detail_by_id = function(gst_id, connection, callback) {
    var sql = "SELECT * FROM gst WHERE gst_id = '" + gst_id + "'";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}


getData.prototype.get_challans = function(connection, callback) {
    var sql = "SELECT challans.chal_id, challans.chal_quantity, customers.cust_name AS chal_cust_name, customers.cust_address AS chal_cust_address, products.prod_name AS chal_prod_name, products.prod_unit AS chal_prod_unit, vehicles.veh_number AS chal_veh_no FROM challans, customers, products, vehicles WHERE challans.chal_cust_id=customers.cust_id && challans.chal_prod_id=products.prod_id && challans.chal_veh_id=vehicles.veh_id";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.get_challan_by_id = function(challanId, connection, callback) {
    var sql = "SELECT challans.chal_id, challans.chal_date, challans.chal_veh_id, challans.chal_quantity, customers.cust_name AS chal_cust_name, customers.cust_address AS chal_cust_address, vehicles.veh_number AS chal_veh_no, products.prod_name AS chal_prod_name, products.prod_unit AS chal_prod_unit FROM challans, customers, vehicles, products WHERE challans.chal_cust_id=customers.cust_id && challans.chal_veh_id = vehicles.veh_id && challans.chal_prod_id = products.prod_id && chal_id = '" + challanId + "'";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.set_challan_detail = function(chal_date, cust_id, prod_id, veh_id, chal_qty, connection, callback) {
    var sql = "INSERT INTO challans VALUES (null,'" + chal_date + "','" + chal_qty + "','" + cust_id + "','" + prod_id + "','" + veh_id + "')";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.get_challans_by_customer_id = function(customerId, connection, callback) {
    var sql = "SELECT challans.chal_id, challans.chal_date, challans.chal_prod_id, challans.chal_veh_id, challans.chal_quantity, vehicles.veh_number, products.prod_unit, products.prod_rate, gst.gst_hsn FROM challans, vehicles, products, gst WHERE challans.chal_veh_id = vehicles.veh_id && challans.chal_prod_id = products.prod_id && products.prod_gst_id = gst.gst_id && chal_is_invoice_created = 0 && chal_cust_id = '" + customerId + "'";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.get_quatations = function(connection, callback) {
    var sql = "select quatations.quat_id, quatations.quat_date, customers.cust_name AS quat_customer, customers.cust_address AS quat_address, customers.cust_contact AS quat_contact, customers.cust_contact_person AS quat_contact_person from customers, quatations WHERE customers.cust_id=quatations.quat_cust_id";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.get_quatation_by_id = function(quat_id, connection, callback) {
    var sql = "select quatations.quat_id, quatations.quat_date, customers.cust_name AS quat_customer, customers.cust_address AS quat_address, customers.cust_contact AS quat_contact, customers.cust_contact_person AS quat_contact_person from customers, quatations WHERE customers.cust_id=quatations.quat_cust_id && quat_id = '" + quat_id + "'";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.set_quatation_detail = function(quat_date, quat_cust_id, quat_products, connection, callback) {

    connection.beginTransaction(function(error) {
        if (error) {
            callback(error);
        } else {
            var sql = "INSERT INTO quatations VALUES (null,'" + quat_date + "','" + quat_cust_id + "')";
            connection.query(sql, function(error, result) {
                if (error) {
                    return connection.rollback(function() {
                        callback(error);
                    })
                }
                var quat_id = result.insertId;
                for (var i = 0; i < quat_products.length; i++) {
                    var prod_id = quat_products[i].prod_id;
                    var sql1 = "INSERT INTO quatation_products VALUES (null,'" + prod_id + "','" + quat_id + "')";
                    connection.query(sql1, function(error, rows) {
                        if (error) {
                            return connection.rollback(function() {
                                callback(error);
                            })
                        } else {
                            connection.commit()
                            callback(rows);
                        }
                    })
                }
            })
        }
    })
}

getData.prototype.get_quatation_products = function(connection, callback) {

    var sql = "SELECT products.prod_name, products.prod_unit, products.prod_rate FROM products, quatation_products WHERE products.prod_id = quatation_products.prod_id";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.get_quatation_products_by_id = function(quat_id, connection, callback) {

    var sql = "SELECT products.prod_name, products.prod_unit, products.prod_rate, products.prod_desc FROM products, quatation_products WHERE products.prod_id = quatation_products.prod_id && quat_id = '" + quat_id + "'";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

// Purchase queries
getData.prototype.get_purchases = function(connection, callback) {

    var sql = "select purchases.pur_id, purchases.pur_date, vendors.vend_id AS pur_vend_id, vendors.vend_name AS pur_vendor, vendors.vend_address AS pur_address, vendors.vend_contact AS pur_contact, vendors.vend_contact_person AS pur_contact_person from vendors, purchases where vendors.vend_id=purchases.pur_vendor_id";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.get_purchase_by_id = function(pur_id, connection, callback) {
    var sql = "SELECT purchases.pur_id, purchases.pur_date, purchases.pur_total_amount, vendors.vend_name AS pur_vendor, vendors.vend_address AS vend_address, vendors.vend_contact AS pur_contact, vendors.vend_contact_person AS pur_contact_person from vendors, purchases WHERE vendors.vend_id=purchases.pur_vendor_id && pur_id = '" + pur_id + "'";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.set_purchase_detail = function(pur_date, pur_total_amount, pur_vend_id, pur_products, connection, callback) {
    connection.beginTransaction(function(error) {
        if (error) {
            callback(error);
        } else {
            var sql = "INSERT INTO purchases VALUES (null,'" + pur_date + "','" + pur_total_amount + "','" + pur_vend_id + "')";
            connection.query(sql, function(error, result) {
                if (error) {
                    return connection.rollback(function() {
                        callback(error);
                    })
                }
                var pur_id = result.insertId;
                for (var i = 0; i < pur_products.length; i++) {
                    var prod_id = pur_products[i].prod_id;
                    var prod_rate = pur_products[i].prod_rate;
                    var prod_qty = pur_products[i].prod_qty;
                    var prod_total = pur_products[i].prod_total;
                    var sql1 = "INSERT INTO purchase_products VALUES (null,'" + prod_id + "','" + prod_rate + "','" + prod_qty + "','" + pur_id + "','" + prod_total + "')";
                    connection.query(sql1, function(error, rows) {
                        if (error) {
                            return connection.rollback(function() {
                                callback(error);
                            })
                        } else {
                            connection.commit()
                            callback(rows);
                        }
                    })
                }
            })
        }
    })
}

getData.prototype.Ws_get_purchase_products = function(connection, callback) {

    var sql = "SELECT products.prod_name, products.prod_unit, products.prod_rate FROM products, purchase_products WHERE products.prod_id = purchase_products.prod_id";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.Ws_get_purchase_products_by_id = function(pur_id, connection, callback) {

    var sql = "SELECT products.prod_name AS pur_prod_name, products.prod_unit AS pur_prod_unit, purchase_products.pur_prod_rate, purchase_products.pur_prod_qty, purchase_products.pur_chal_no, purchase_products.pur_chal_date, purchase_products.pur_veh_no, purchase_products.pur_prod_hsn, purchase_products.pur_prod_total FROM products, purchase_products WHERE products.prod_id = purchase_products.prod_id && pur_id = '" + pur_id + "'";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

// Get invoice
getData.prototype.Ws_get_invoices = function(connection, callback) {

    var sql = "select invoices.inv_id, invoices.inv_date, invoices.inv_cust_id, customers.cust_name AS inv_customer, customers.cust_contact_person AS inv_contact_person, customers.cust_contact AS inv_contact, customers.cust_address AS inv_address, invoices.inv_total_amount from invoices, customers where invoices.inv_cust_id=customers.cust_id";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.get_invoice_by_id = function(inv_id, connection, callback) {
    var sql = "select invoices.inv_id, invoices.inv_date, invoices.inv_total_amount, customers.cust_id AS inv_cust_id, customers.cust_name AS inv_customer, customers.cust_address AS inv_address, customers.cust_contact AS inv_contact, customers.cust_contact_person AS inv_contact_person from customers, invoices WHERE customers.cust_id=invoices.inv_cust_id && inv_id = '" + inv_id + "'";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.Ws_set_invoice_detail = function(inv_date, inv_cust_id, inv_total, inv_products, connection, callback) {

    connection.beginTransaction(function(error) {
        if (error) {
            callback(error);
        } else {
            var sql = "INSERT INTO invoices VALUES (null,'" + inv_date + "','" + inv_cust_id + "','" + inv_total + "')";
            connection.query(sql, function(error, result) {
                if (error) {
                    return connection.rollback(function() {
                        callback(error);
                    })
                }
                var inv_id = result.insertId;
                for (var i = 0; i < inv_products.length; i++) {
                    var prod_id = inv_products[i].prod_id;
                    var chal_id = inv_products[i].chal_id;
                    var prod_qty = inv_products[i].prod_qty;
                    var prod_rate = inv_products[i].inv_prod_rate;
                    var prod_total = inv_products[i].prod_total_amount;

                    var sql1 = "INSERT INTO invoice_products VALUES (null,'" + prod_id + "','" + prod_qty + "','" + inv_id + "','" + chal_id + "','" + prod_total + "','" + prod_rate + "')";
                    connection.query(sql1, function(error, rows) {
                        if (error) {
                            return connection.rollback(function() {
                                callback(error);
                            })
                        } else {
                            connection.commit()
                            callback(rows);
                        }
                    })
                }
            })
        }
    })
}

getData.prototype.get_invoice_products_by_id = function(inv_id, connection, callback) {

    var sql = "SELECT invoice_products.chal_id, challans.chal_date, invoice_products.inv_prod_qty AS prod_qty, vehicles.veh_number, products.prod_name, products.prod_unit, invoice_products.inv_prod_rate AS prod_rate, gst.gst_hsn AS prod_hsn, invoice_products.prod_total_amount FROM gst, challans, vehicles, products, invoice_products WHERE invoice_products.chal_id = challans.chal_id && products.prod_id = invoice_products.prod_id && gst.gst_id = products.prod_gst_id && challans.chal_veh_id = vehicles.veh_id && inv_id = '" + inv_id + "'";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.get_cheque_entries = function(connection, callback) {

    var sql = "SELECT cheque_entries.cheque_entry_id, cheque_entries.cheque_date, cheque_entries.cheque_number, cheque_entries.cheque_amount, cheque_entries.account_no, cheque_entries.cheque_cust_id, customers.cust_name, customers.cust_contact FROM cheque_entries, customers WHERE cheque_entries.cheque_cust_id = customers.cust_id";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.get_cheque_entry_by_id = function(cheque_entry_id, connection, callback) {
    var sql = "SELECT cheque_entries.cheque_entry_id, cheque_entries.cheque_date, cheque_entries.cheque_number, cheque_entries.cheque_amount, cheque_entries.account_no, cheque_entries.cheque_cust_id, customers.cust_name, customers.cust_contact FROM cheque_entries, customers WHERE cheque_entries.cheque_cust_id = customers.cust_id && cheque_entry_id = '" + cheque_entry_id + "'";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.set_cheque_entry = function(cheque_date, cheque_number, cheque_amount, account_no, cheque_cust_id, connection, callback) {
    var sql = "INSERT INTO cheque_entries VALUES (null,'" + cheque_date + "','" + cheque_number + "','" + cheque_amount + "','" + account_no + "','" + cheque_cust_id + "')";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.update_cheque_entry = function(cheque_entry_id, cheque_date, cheque_number, cheque_amount, account_no, cheque_cust_id, connection, callback) {
    var sql = "UPDATE cheque_entries SET cheque_date='" + cheque_date + "', cheque_number='" + cheque_number + "',cheque_amount='" + cheque_amount + "', account_no='" + account_no + "', cheque_cust_id='" + cheque_cust_id + "' WHERE cheque_entry_id = '" + cheque_entry_id + "'";
    console.log("Cheque " + sql);
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.delete_cheque_entry = function(cheque_entry_id, connection, callback) {
    var sql = "DELETE FROM cheque_entries WHERE cheque_entry_id ='" + cheque_entry_id + "'";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

exports = module.exports = getData;