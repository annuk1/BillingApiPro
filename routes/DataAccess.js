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

getData.prototype.set_customer_detail = function(cust_name, cust_contact_person, cust_contact, cust_email, cust_address, cust_gst_no, connection, callback) {
    var sql = "INSERT INTO customers VALUES (null,'" + cust_name + "','" + cust_contact_person + "','" + cust_contact + "','" + cust_email + "','" + cust_address + "','" + cust_gst_no + "')";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.update_customer_detail = function(cust_id, cust_name, cust_contact_person, cust_contact, cust_email, cust_address, cust_gst_no, connection, callback) {
    var sql = "UPDATE customers SET cust_name='" + cust_name + "', cust_contact_person='" + cust_contact_person + "', cust_contact='" + cust_contact + "', cust_email='" + cust_email + "', cust_address='" + cust_address + "', cust_gst_no='" + cust_gst_no + "' WHERE cust_id = '" + cust_id + "'";
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
    var sql = "SELECT products.prod_id, products.prod_name, products.prod_desc, products.prod_unit, products.prod_rate, gst.gst_id AS prod_gst_id, gst.gst_hsn AS prod_hsn, gst.gst_percentage AS prod_percentage FROM products, gst WHERE products.prod_gst_id = gst.gst_id";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.get_products_by_id = function(prod_id, connection, callback) {
    var sql = "SELECT products.prod_name, products.prod_desc, products.prod_unit, products.prod_rate, gst.gst_id AS prod_hsn_id, gst.gst_hsn AS prod_hsn, gst.gst_percentage FROM products, gst WHERE products.prod_gst_id = gst.gst_id && products.prod_id = '" + prod_id + "'";
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
    var sql = "SELECT challans.chal_id, challans.chal_no, challans.chal_quantity, challans.chal_prod_rate, customers.cust_name AS chal_cust_name, customers.cust_address AS chal_cust_address, products.prod_name AS chal_prod_name, products.prod_unit AS chal_prod_unit, vehicles.veh_number AS chal_veh_no FROM challans, customers, products, vehicles WHERE challans.chal_cust_id=customers.cust_id && challans.chal_prod_id=products.prod_id && challans.chal_veh_id=vehicles.veh_id ORDER BY challans.chal_id DESC";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.get_challan_by_id = function(challanId, connection, callback) {
    var sql = "SELECT challans.chal_id, challans.chal_no, challans.chal_date, challans.chal_veh_id, challans.chal_prod_id, challans.chal_quantity, challans.chal_prod_rate, challans.chal_cust_id, customers.cust_name AS chal_cust_name, customers.cust_address AS chal_cust_address, vehicles.veh_number AS chal_veh_no, products.prod_name AS chal_prod_name, products.prod_unit AS chal_prod_unit FROM challans, customers, vehicles, products WHERE challans.chal_cust_id=customers.cust_id && challans.chal_veh_id = vehicles.veh_id && challans.chal_prod_id = products.prod_id && chal_id = '" + challanId + "'";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.set_challan_detail = function(chal_no, chal_date, chal_qty, cust_id, prod_id, prod_rate, veh_id, is_invoice_created, connection, callback) {
    var sql = "INSERT INTO challans VALUES (null,'" + chal_no + "'," + chal_date + ",'" + chal_qty + "','" + cust_id + "','" + prod_id + "','" + prod_rate + "','" + veh_id + "','" + is_invoice_created + "')";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.get_challans_by_customer_id = function(customerId, connection, callback) {
    var sql = "SELECT challans.chal_id, challans.chal_no, challans.chal_date, challans.chal_prod_id, challans.chal_veh_id, challans.chal_quantity, challans.chal_prod_rate, vehicles.veh_number, products.prod_name, products.prod_unit, gst.gst_id AS chal_gst_id, gst.gst_hsn, gst.gst_percentage FROM challans, vehicles, products, gst WHERE challans.chal_veh_id = vehicles.veh_id && challans.chal_prod_id = products.prod_id && products.prod_gst_id = gst.gst_id && chal_is_invoice_created = 0 && chal_cust_id = '" + customerId + "'";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.update_challan_detail = function(chal_id, chal_no, chal_date, chal_qty, chal_cust_id, chal_prod_id, chal_prod_rate, chal_veh_id, connection, callback) {
    var sql = "UPDATE challans SET chal_no='" + chal_no + "', chal_date='" + chal_date + "', chal_quantity = '" + chal_qty + "', chal_cust_id = '" + chal_cust_id + "', chal_prod_id = '" + chal_prod_id + "', chal_prod_rate = '" + chal_prod_rate + "', chal_veh_id = '" + chal_veh_id + "' WHERE chal_id = '" + chal_id + "'";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.get_quatations = function(connection, callback) {
    var sql = "select quatations.quat_id, quatations.quat_date, quatations.quat_cust_name AS quat_customer, quatations.quat_cust_address AS quat_address, quatations.quat_cont_no AS quat_contact, quatations.quat_cont_person AS quat_contact_person from quatations";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.get_quatation_by_id = function(quat_id, connection, callback) {
    var sql = "select quatations.quat_id, quatations.quat_date, quatations.quat_cust_name AS quat_customer, quatations.quat_cust_address AS quat_address, quatations.quat_cont_no AS quat_contact, quatations.quat_cont_person AS quat_contact_person from quatations WHERE quat_id = '" + quat_id + "'";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.set_quatation_detail = function(quat_date, cust_name, cust_address, cust_cont_person, cust_cont_no, quat_products, connection, callback) {

    connection.beginTransaction(function(error) {
        if (error) {
            callback(error);
        } else {
            var sql = "INSERT INTO quatations VALUES (null,'" + quat_date + "','" + cust_name + "','" + cust_address + "','" + cust_cont_person + "','" + cust_cont_no + "')";
            connection.query(sql, function(error, result) {
                if (error) {
                    return connection.rollback(function() {
                        callback(error);
                    })
                }
                var quat_id = result.insertId;
                for (var i = 0; i < quat_products.length; i++) {
                    var prod_id = quat_products[i].prod_id;
                    var prod_rate = quat_products[i].prod_rate;
                    var sql1 = "INSERT INTO quatation_products VALUES (null,'" + prod_id + "','" + prod_rate + "','" + quat_id + "')";
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

getData.prototype.update_quatation_detail = function(quat_id, quat_date, cust_name, cust_address, cust_cont_person, cust_cont_no, quat_products, connection, callback) {

    connection.beginTransaction(function(error) {
        if (error) {
            callback(error);
        } else {
            var sql = "UPDATE quatations SET quat_date='" + quat_date + "', quat_cust_name='" + cust_name + "', quat_cust_address='" + cust_address + "', quat_cont_person='" + cust_cont_person + "', quat_cont_no='" + cust_cont_no + "' WHERE quat_id= '" + quat_id + "'";
            connection.query(sql, function(error, result) {
                if (error) {
                    return connection.rollback(function() {
                        callback(error);
                    })
                }
                for (var i = 0; i < quat_products.length; i++) {
                    var quat_prod_id = quat_products[i].quat_prod_id;
                    var prod_id = quat_products[i].prod_id;
                    var prod_rate = quat_products[i].prod_rate;
                    var sql1 = "UPDATE quatation_products SET prod_id='" + prod_id + "', quat_prod_rate='" + prod_rate + "', quat_id'" + quat_id + "' WHERE quat_prod_id='" + quat_prod_id + "'";
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

    var sql = "select purchases.pur_id, purchases.pur_date, purchases.pur_product_total, purchases.pur_total_tax, purchases.pur_total_amount, purchases.pur_round_off, purchases.pur_without_tax, vendors.vend_id AS pur_vend_id, vendors.vend_name AS pur_vendor, vendors.vend_address AS pur_address, vendors.vend_contact AS pur_contact, vendors.vend_contact_person AS pur_contact_person from vendors, purchases where vendors.vend_id=purchases.pur_vendor_id";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.get_purchase_by_id = function(pur_id, connection, callback) {
    var sql = "SELECT purchases.pur_id, purchases.pur_date, purchases.pur_product_total, purchases.pur_total_tax, purchases.pur_total_amount, purchases.pur_round_off, purchases.pur_without_tax, vendors.vend_name AS pur_vendor, vendors.vend_address AS vend_address, vendors.vend_contact AS pur_contact, vendors.vend_contact_person AS pur_contact_person from vendors, purchases WHERE vendors.vend_id=purchases.pur_vendor_id && pur_id = '" + pur_id + "'";
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
                    var prod_rate = pur_products[i].pur_prod_rate;
                    var prod_qty = pur_products[i].pur_prod_qty;
                    var prod_subtotal = pur_products[i].pur_prod_subtotal;
                    var prod_tax = pur_products[i].pur_prod_tax;
                    var prod_total = pur_products[i].pur_prod_total;
                    var chal_no = pur_products[i].pur_chal_no;
                    var chal_date = pur_products[i].pur_chal_date;
                    var veh_no = pur_products[i].pur_veh_no;
                    var prod_hsn = pur_products[i].pur_prod_hsn;

                    var sql1 = "INSERT INTO purchase_products VALUES (null,'" + prod_id + "','" + prod_rate + "','" + prod_qty + "','" + pur_id + "','" + prod_subtotal + "','" + prod_tax + "','" + prod_total + "','" + chal_no + "','" + chal_date + "','" + veh_no + "','" + prod_hsn + "')";
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

    var sql = "SELECT products.prod_name AS pur_prod_name, products.prod_unit AS pur_prod_unit, purchase_products.pur_prod_rate, purchase_products.pur_prod_qty, purchase_products.pur_chal_no, purchase_products.pur_chal_date, purchase_products.pur_veh_no, purchase_products.pur_prod_hsn, purchase_products.pur_prod_subtotal, purchase_products.pur_prod_tax, purchase_products.pur_prod_total FROM products, purchase_products WHERE products.prod_id = purchase_products.prod_id && pur_id = '" + pur_id + "'";
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
    var sql = "select invoices.inv_id, invoices.inv_date, invoices.inv_cust_id, customers.cust_name AS inv_customer, customers.cust_contact_person AS inv_contact_person, customers.cust_contact AS inv_contact, customers.cust_address AS inv_address, customers.cust_email AS inv_email, invoices.inv_total_amount, invoices.inv_without_tax from invoices, customers where invoices.inv_cust_id=customers.cust_id";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.get_invoice_by_id = function(inv_id, connection, callback) {
    var sql = "select invoices.inv_id, invoices.inv_date, invoices.inv_product_total, invoices.inv_total_tax, invoices.inv_total_amount, invoices.inv_round_off, invoices.inv_without_tax, customers.cust_id AS inv_cust_id, customers.cust_name AS inv_customer, customers.cust_address AS inv_address, customers.cust_contact AS inv_contact, customers.cust_contact_person AS inv_contact_person, customers.cust_email AS inv_email from customers, invoices WHERE customers.cust_id=invoices.inv_cust_id && inv_id = '" + inv_id + "'";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.Ws_set_invoice_detail = function(inv_date, inv_cust_id, product_total, total_tax, inv_total, round_off, inv_without_tax, inv_products, connection, callback) {
    connection.beginTransaction(function(error) {
        if (error) {
            callback(error);
        } else {

            var sql = "INSERT INTO invoices VALUES (null,'" + inv_date + "','" + inv_cust_id + "','" + product_total + "','" + total_tax + "','" + inv_total + "','" + round_off + "','" + inv_without_tax + "')";
            console.log("Invoice " + sql);
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
                    var chal_no = inv_products[i].chal_no;
                    var prod_qty = inv_products[i].prod_qty;
                    var prod_rate = inv_products[i].prod_rate;
                    var prod_total = inv_products[i].prod_total_amount;
                    var prod_sub_total = inv_products[i].prod_sub_total;
                    var prod_tax = inv_products[i].prod_tax;

                    var sql1 = "INSERT INTO invoice_products VALUES (null,'" + prod_id + "','" + prod_qty + "','" + inv_id + "','" + chal_id + "','" + chal_no + "','" + prod_rate + "','" + prod_sub_total + "','" + prod_tax + "','" + prod_total + "')";
                    console.log("Invoice products " + sql1);
                    connection.query(sql1, function(error, rows) {
                        console.log("Invoice products error " + error);
                        if (error) {
                            return connection.rollback(function() {
                                callback(error);
                            })
                        }

                        var sql2 = "UPDATE challans SET chal_is_invoice_created = '1' WHERE chal_id = '" + chal_id + "'";
                        console.log("Challan " + sql2);
                        connection.query(sql2, function(error, rows) {
                            if (error) {
                                return connection.rollback(function() {
                                    callback(error);
                                })
                            } else {
                                connection.commit()
                                callback(rows);
                            }
                        })
                    })
                }
            })
        }
    })
}

getData.prototype.Ws_update_invoice_detail = function(inv_id, inv_date, inv_cust_id, product_total, total_tax, inv_total, round_off, inv_without_tax, inv_products, connection, callback) {
    connection.beginTransaction(function(error) {
        if (error) {
            callback(error);
        } else {

            var sql = "UPDATE invoices SET inv_date='" + inv_date + "', inv_cust_id = '" + inv_cust_id + "', inv_product_total ='" + product_total + "', inv_total_tax='" + total_tax + "', inv_total_amount='" + inv_total + "', inv_round_off='" + round_off + "', inv_without_tax='" + inv_without_tax + "' WHERE inv_id= '" + inv_id + "'";
            connection.query(sql, function(error, result) {
                if (error) {
                    return connection.rollback(function() {
                        callback(error);
                    })
                }

                var sql1 = "DELETE FROM invoice_products WHERE inv_id= '" + inv_id + "'";
                connection.query(sql1, function(error, result) {
                    if (error) {
                        return connection.rollback(function() {
                            callback(error);
                        })
                    }

                    for (var i = 0; i < inv_products.length; i++) {
                        var prod_id = inv_products[i].prod_id;
                        var chal_id = inv_products[i].chal_id;
                        var chal_no = inv_products[i].chal_no;
                        var prod_qty = inv_products[i].prod_qty;
                        var prod_rate = inv_products[i].prod_rate;
                        var prod_total = inv_products[i].prod_total_amount;
                        var prod_sub_total = inv_products[i].prod_sub_total;
                        var prod_tax = inv_products[i].prod_tax;

                        var sql2 = "INSERT INTO invoice_products VALUES (null,'" + prod_id + "','" + prod_qty + "','" + inv_id + "','" + chal_id + "','" + chal_no + "','" + prod_rate + "','" + prod_sub_total + "','" + prod_tax + "','" + prod_total + "')";
                        connection.query(sql2, function(error, rows) {
                            if (error) {
                                return connection.rollback(function() {
                                    callback(error);
                                })
                            }

                            var sql3 = "UPDATE challans SET chal_is_invoice_created = '1' WHERE chal_id = '" + chal_id + "'";
                            connection.query(sql3, function(error, rows) {
                                if (error) {
                                    return connection.rollback(function() {
                                        callback(error);
                                    })
                                } else {
                                    connection.commit()
                                    callback(rows);
                                }
                            })
                        })
                    }
                })
            })
        }
    })
}

getData.prototype.get_invoice_products_by_id = function(inv_id, connection, callback) {

    var sql = "SELECT invoice_products.chal_id, challans.chal_no, challans.chal_date, invoice_products.prod_id, invoice_products.inv_prod_qty AS prod_qty, vehicles.veh_number, products.prod_name, products.prod_unit, invoice_products.inv_prod_rate AS prod_rate, products.prod_gst_id, gst.gst_hsn AS prod_hsn, gst.gst_percentage AS prod_percentage, invoice_products.inv_prod_subtotal AS prod_sub_total, invoice_products.inv_prod_tax AS prod_tax, invoice_products.prod_total_amount FROM gst, challans, vehicles, products, invoice_products WHERE invoice_products.chal_id = challans.chal_id && products.prod_id = invoice_products.prod_id && gst.gst_id = products.prod_gst_id && challans.chal_veh_id = vehicles.veh_id && inv_id = '" + inv_id + "'";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.get_cheque_entries = function(connection, callback) {

    var sql = "SELECT cheque_entries.cheque_entry_id, cheque_entries.cheque_date, cheque_entries.cheque_number, cheque_entries.cheque_amount, cheque_entries.cheque_clearence_date, cheque_entries.cheque_cust_id, customers.cust_name, customers.cust_address, account_details.account_id, account_details.account_number, account_details.bank_name, account_details.bank_address FROM cheque_entries, customers, account_details WHERE cheque_entries.cheque_cust_id = customers.cust_id && cheque_entries.account_id = account_details.account_id";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.get_cheque_entry_by_id = function(cheque_entry_id, connection, callback) {
    var sql = "SELECT cheque_entries.cheque_entry_id, cheque_entries.cheque_date, cheque_entries.cheque_number, cheque_entries.cheque_amount, cheque_entries.cheque_clearence_date, cheque_entries.cheque_cust_id, customers.cust_name, customers.cust_address, account_details.account_id, account_details.account_number, account_details.bank_name, account_details.bank_address FROM cheque_entries, customers, account_details WHERE cheque_entries.cheque_cust_id = customers.cust_id && cheque_entries.account_id = account_details.account_id && cheque_entries.cheque_entry_id = '" + cheque_entry_id + "'";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.set_cheque_entry = function(cheque_date, cheque_number, cheque_amount, account_id, clearence_date, cheque_cust_id, connection, callback) {
    var sql = "INSERT INTO cheque_entries VALUES (null,'" + cheque_date + "','" + cheque_number + "','" + cheque_amount + "','" + account_id + "','" + clearence_date + "','" + cheque_cust_id + "')";
    connection.query(sql, function(error, rows) {
        if (error) {
            console.log("Cheque error" + error);
            callback(error);
        } else {
            console.log("Cheque row" + rows);
            callback(rows);
        }
    })
}

getData.prototype.update_cheque_entry = function(cheque_entry_id, cheque_date, cheque_number, cheque_amount, account_id, clearence_date, cheque_cust_id, connection, callback) {
    var sql = "UPDATE cheque_entries SET cheque_date='" + cheque_date + "', cheque_number='" + cheque_number + "',cheque_amount='" + cheque_amount + "', account_id='" + account_id + "', cheque_clearence_date='" + clearence_date + "', cheque_cust_id='" + cheque_cust_id + "' WHERE cheque_entry_id = '" + cheque_entry_id + "'";
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

// Employee transactions
getData.prototype.get_employees = function(connection, callback) {
    var sql = "SELECT * FROM employees";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.set_employee_detail = function(emp_name, emp_age, emp_contact, emp_address, date_of_joining, emp_adhar_no, emp_role, employment_type, connection, callback) {
    var sql = "INSERT INTO employees VALUES (null,'" + emp_name + "','" + emp_age + "','" + emp_contact + "','" + emp_address + "','" + date_of_joining + "','" + emp_adhar_no + "','" + emp_role + "','" + employment_type + "')";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.update_employee_detail = function(emp_id, emp_name, emp_age, emp_contact, emp_address, date_of_joining, emp_adhar_no, emp_role, employment_type, connection, callback) {
    var sql = "UPDATE employees SET emp_name='" + emp_name + "', emp_age='" + emp_age + "', emp_contact='" + emp_contact + "', emp_address='" + emp_address + "', date_of_joining='" + date_of_joining + "', emp_adhar_no='" + emp_adhar_no + "', emp_role='" + emp_role + "', employment_type='" + employment_type + "' WHERE emp_id = '" + emp_id + "'";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.delete_employee_detail = function(emp_id, connection, callback) {
    var sql = "DELETE FROM employees WHERE emp_id = '" + emp_id + "'";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.get_employee_by_id = function(emp_id, connection, callback) {
    var sql = "SELECT * FROM employees WHERE emp_id = '" + emp_id + "'";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

// Diesel Transactions
getData.prototype.get_diesel_entries = function(connection, callback) {

    var sql = "SELECT diesel_entries.diesel_entry_id, diesel_entries.diesel_filling_date, diesel_entries.diesel_qty, diesel_entries.diesel_amount, diesel_entries.pump_address, diesel_entries.emp_id, employees.emp_name FROM diesel_entries, employees WHERE diesel_entries.emp_id = employees.emp_id";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.get_diesel_entry_by_id = function(diesel_entry_id, connection, callback) {
    var sql = "SELECT diesel_entries.diesel_entry_id, diesel_entries.diesel_filling_date, diesel_entries.diesel_qty, diesel_entries.diesel_amount, diesel_entries.emp_id, diesel_entries.veh_id, diesel_entries.pump_address, employees.emp_name, vehicles.veh_number FROM diesel_entries, employees, vehicles WHERE diesel_entries.emp_id = employees.emp_id && diesel_entries.veh_id = vehicles.veh_id && diesel_entries.diesel_entry_id = '" + diesel_entry_id + "'";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.set_diesel_entry = function(diesel_filling_date, diesel_qty, diesel_amount, emp_id, veh_id, pump_address, connection, callback) {
    var sql = "INSERT INTO diesel_entries VALUES (null,'" + diesel_filling_date + "','" + diesel_qty + "','" + diesel_amount + "','" + emp_id + "','" + veh_id + "','" + pump_address + "')";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.update_diesel_entry = function(diesel_entry_id, diesel_filling_date, diesel_qty, diesel_amount, emp_id, veh_id, pump_address, connection, callback) {
    var sql = "UPDATE diesel_entries SET diesel_filling_date='" + diesel_filling_date + "', diesel_qty='" + diesel_qty + "',diesel_amount='" + diesel_amount + "', emp_id='" + emp_id + "', veh_id='" + veh_id + "', pump_address='" + pump_address + "' WHERE diesel_entry_id = '" + diesel_entry_id + "'";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.delete_diesel_entry = function(diesel_entry_id, connection, callback) {
    var sql = "DELETE FROM diesel_entries WHERE diesel_entry_id ='" + diesel_entry_id + "'";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

// Payment transactions
getData.prototype.get_payment_details = function(connection, callback) {
    var sql = "SELECT payment_details.payment_id, payment_details.payment_date, payment_details.payee_type, payment_details.payee_id, payment_details.payee_name, payment_details.payment_amount, payment_details.payment_mode, payment_details.payment_acc_id, payment_details.payment_desc, account_details.account_number, account_details.bank_name, account_details.bank_address FROM payment_details, account_details WHERE payment_details.payment_acc_id = account_details.account_id";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.set_payment_detail = function(payment_date, payee_type, payee_id, payee_name, payment_amount, payment_mode, payment_account_id, payment_desc, connection, callback) {
    var sql = "INSERT INTO payment_details VALUES (null,'" + payment_date + "','" + payee_type + "','" + payee_id + "','" + payee_name + "','" + payment_amount + "','" + payment_mode + "','" + payment_account_id + "','" + payment_desc + "')";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.update_payment_detail = function(payment_id, payment_date, payee_type, payee_id, payee_name, payment_amount, payment_mode, payment_account_id, payment_desc, connection, callback) {
    var sql = "UPDATE payment_details SET payment_date='" + payment_date + "', payee_type='" + payee_type + "', payee_id='" + payee_id + "', payee_name='" + payee_name + "', payment_amount='" + payment_amount + "', payment_mode='" + payment_mode + "', payment_acc_id='" + payment_account_id + "', payment_desc='" + payment_desc + "' WHERE payment_id = '" + payment_id + "'";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.delete_payment_detail = function(payment_id, connection, callback) {
    var sql = "DELETE FROM payment_details WHERE payment_id = '" + payment_id + "'";

    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.get_payment_detail_by_id = function(payment_id, connection, callback) {
    var sql = "SELECT payment_details.payment_id, payment_details.payment_date, payment_details.payee_type, payment_details.payee_id, payment_details.payee_name, payment_details.payment_amount, payment_details.payment_mode, payment_details.payment_acc_id, payment_details.payment_desc, account_details.account_number, account_details.bank_name, account_details.bank_address FROM payment_details, account_details WHERE payment_details.payment_acc_id = account_details.account_id && payment_id = '" + payment_id + "'";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

// Account transactions
getData.prototype.get_account_details = function(connection, callback) {
    var sql = "SELECT * FROM account_details";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.get_account_detail_by_id = function(account_id, connection, callback) {
    var sql = "SELECT * FROM account_details WHERE account_id = '" + account_id + "'";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.set_account_detail = function(account_no, bank_name, bank_address, account_type, connection, callback) {
    var sql = "INSERT INTO account_details VALUES (null,'" + account_no + "','" + bank_name + "','" + bank_address + "','" + account_type + "')";
    console.log("Account " + sql);
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.update_account_detail = function(account_id, account_no, bank_name, bank_address, account_type, connection, callback) {
    var sql = "UPDATE account_details SET account_number='" + account_no + "', bank_name='" + bank_name + "', bank_address='" + bank_address + "', account_type='" + account_type + "' WHERE account_id = '" + account_id + "'";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.delete_account_detail = function(account_id, connection, callback) {
    var sql = "DELETE FROM account_details WHERE account_id = '" + account_id + "'";

    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

// EMI transactions
getData.prototype.get_emi_details = function(connection, callback) {
    var sql = "SELECT emi_details.emi_id, emi_details.emi_date, emi_details.vehicle_id, emi_details.emi_month_year, emi_details.emi_amount, emi_details.payment_mode, emi_details.cheque_date, emi_details.cheque_no, emi_details.cheque_bank, vehicles.veh_number FROM emi_details, vehicles WHERE emi_details.vehicle_id = vehicles.veh_id";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.get_emi_detail_by_id = function(emi_id, connection, callback) {
    var sql = "SELECT emi_details.emi_id, emi_details.emi_date, emi_details.vehicle_id, emi_details.emi_month_year, emi_details.emi_amount, emi_details.payment_mode, emi_details.cheque_date, emi_details.cheque_no, emi_details.cheque_bank, vehicles.veh_number FROM emi_details, vehicles WHERE emi_details.vehicle_id = vehicles.veh_id && emi_details.emi_id = '" + emi_id + "'";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.set_emi_detail = function(emi_date, vehicle_id, emi_month_year, emi_amount, payment_mode, cheque_date, cheque_no, cheque_bank, connection, callback) {
    var sql = "INSERT INTO emi_details VALUES (null,'" + emi_date + "','" + vehicle_id + "','" + emi_month_year + "','" + emi_amount + "','" + payment_mode + "','" + cheque_date + "','" + cheque_no + "','" + cheque_bank + "')";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.update_emi_detail = function(emi_id, emi_date, vehicle_id, emi_month_year, emi_amount, payment_mode, cheque_date, cheque_no, cheque_bank, connection, callback) {
    var sql = "UPDATE emi_details SET emi_date='" + emi_date + "', vehicle_id='" + vehicle_id + "', emi_month_year='" + emi_month_year + "', emi_amount='" + emi_amount + "', payment_mode='" + payment_mode + "', cheque_date='" + cheque_date + "', cheque_no='" + cheque_no + "', cheque_bank='" + cheque_bank + "' WHERE emi_id = '" + emi_id + "'";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.delete_emi_detail = function(emi_id, connection, callback) {
    var sql = "DELETE FROM emi_details WHERE emi_id = '" + emi_id + "'";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

// Card transactions
getData.prototype.get_card_details = function(connection, callback) {
    var sql = "SELECT card_details.card_id, card_details.card_date, card_details.rto_pune_amount, card_details.rto_pcmc_amount, card_details.police_shirval_amount, card_details.police_chakan_amount, card_details.police_other_amount, vehicles.veh_id, vehicles.veh_number FROM card_details, vehicles where card_details.vehicle_id = vehicles.veh_id";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.get_card_detail_by_id = function(card_id, connection, callback) {
    var sql = "SELECT card_details.card_id, card_details.card_date, card_details.rto_pune_amount, card_details.rto_pcmc_amount, card_details.police_shirval_amount, card_details.police_chakan_amount, card_details.police_other_amount, vehicles.veh_id, vehicles.veh_number FROM card_details, vehicles WHERE card_details.vehicle_id = vehicles.veh_id && card_id = '" + card_id + "'";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.set_card_detail = function(card_date, vehicle_id, rto_pune_amount, rto_pcmc_amount, police_shirval_amount, police_chakan_amount, police_other_amount, connection, callback) {
    var sql = "INSERT INTO card_details VALUES (null,'" + card_date + "','" + vehicle_id + "','" + rto_pune_amount + "','" + rto_pcmc_amount + "','" + police_shirval_amount + "','" + police_chakan_amount + "','" + police_other_amount + "')";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.update_card_detail = function(card_id, card_date, vehicle_id, rto_pune_amount, rto_pcmc_amount, police_shirval_amount, police_chakan_amount, police_other_amount, connection, callback) {
    var sql = "UPDATE card_details SET card_date='" + card_date + "', vehicle_id='" + vehicle_id + "', rto_pune_amount='" + rto_pune_amount + "', rto_pcmc_amount='" + rto_pcmc_amount + "', police_shirval_amount='" + police_shirval_amount + "', police_chakan_amount='" + police_chakan_amount + "', police_other_amount='" + police_other_amount + "' WHERE card_id = '" + card_id + "'";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.delete_card_detail = function(card_id, connection, callback) {
    var sql = "DELETE FROM card_details WHERE card_id = '" + card_id + "'";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

// Trip transactions
getData.prototype.get_trip_details = function(connection, callback) {
    var sql = "SELECT trip_details.trip_id, trip_details.trip_date, trip_details.loading_place, trip_details.unloading_place, trip_details.material_qty, trip_details.driver_id, trip_details.driver_expenses_amount, trip_details.diesel_expenses_amount, trip_details.vehicle_id, vehicles.veh_number, employees.emp_name FROM trip_details, employees, vehicles WHERE trip_details.driver_id = employees.emp_id && trip_details.vehicle_id = vehicles.veh_id";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.get_trip_detail_by_id = function(trip_id, connection, callback) {
    var sql = "SELECT trip_details.trip_id, trip_details.trip_date, trip_details.loading_place, trip_details.unloading_place, trip_details.material_qty, trip_details.driver_id, trip_details.driver_expenses_amount, trip_details.diesel_expenses_amount, trip_details.toll_charges, trip_details.worker_charges, trip_details.washing_charges, trip_details.maintenance_charges, employees.emp_name, trip_details.vehicle_id, vehicles.veh_number FROM trip_details, employees, vehicles WHERE trip_details.driver_id = employees.emp_id && trip_details.vehicle_id = vehicles.veh_id && trip_id = '" + trip_id + "'";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.set_trip_detail = function(trip_date, vehicle_id, loading_place, unloading_place, material_qty, driver_id, driver_expenses_amount, diesel_expenses_amount, toll_charges, worker_charges, washing_charges, maintenance_charges, connection, callback) {
    var sql = "INSERT INTO trip_details VALUES (null,'" + trip_date + "','" + vehicle_id + "','" + loading_place + "','" + unloading_place + "','" + material_qty + "','" + driver_id + "','" + driver_expenses_amount + "','" + diesel_expenses_amount + "','" + toll_charges + "','" + worker_charges + "','" + washing_charges + "','" + maintenance_charges + "')";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.update_trip_detail = function(trip_id, trip_date, vehicle_id, loading_place, unloading_place, material_qty, driver_id, driver_expenses_amount, diesel_expenses_amount, toll_charges, worker_charges, washing_charges, maintenance_charges, connection, callback) {
    var sql = "UPDATE trip_details SET trip_date='" + trip_date + "', vehicle_id='" + vehicle_id + "', loading_place='" + loading_place + "', unloading_place='" + unloading_place + "', material_qty='" + material_qty + "', driver_id='" + driver_id + "', driver_expenses_amount='" + driver_expenses_amount + "', diesel_expenses_amount='" + diesel_expenses_amount + "', toll_charges='" + toll_charges + "', worker_charges='" + worker_charges + "', washing_charges='" + washing_charges + "', maintenance_charges='" + maintenance_charges + "'WHERE trip_id = '" + trip_id + "'";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.delete_trip_detail = function(trip_id, connection, callback) {
    var sql = "DELETE FROM trip_details WHERE trip_id = '" + trip_id + "'";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.get_invoice_total_with_tax = function(current_date, connection, callback) {
    connection.beginTransaction(function(error) {
        if (error) {
            callback(error);
        } else {

            var sql = "SELECT SUM(inv_total_amount) AS invoice_total FROM invoices WHERE inv_without_tax = '0'";

            connection.query(sql, function(error, result) {
                if (error) {
                    return connection.rollback(function() {
                        callback(error);
                    })
                }

                var sql1 = "SELECT SUM(inv_total_amount) AS current_month_total FROM invoices WHERE MONTH(inv_date) = MONTH('" + current_date + "') AND inv_without_tax = '0'";
                connection.query(sql1, function(error, result1) {
                    if (error) {
                        return connection.rollback(function() {
                            callback(error);
                        })
                    }

                    var sql2 = "SELECT SUM(inv_total_amount) AS todays_total FROM invoices WHERE inv_date = '" + current_date + "' AND inv_without_tax = '0'";
                    connection.query(sql2, function(error, result2) {
                        if (error) {
                            return connection.rollback(function() {
                                callback(error);
                            })
                        } else {
                            connection.commit()
                            var invoice_total = '{"invoice_total": 0 }';
                            if (result[0].invoice_total != null) {
                                invoice_total = JSON.stringify(result[0]);
                            }
                            invoice_total = invoice_total.substring(1, invoice_total.length - 1);

                            var current_month_total = '{ "current_month_total": 0 }';
                            if (result1[0].current_month_total != null) {
                                current_month_total = JSON.stringify(result1[0]);
                            }
                            current_month_total = current_month_total.substring(1, current_month_total.length - 1);

                            var todays_total = '{ "todays_total": 0 }';
                            if (result2[0].todays_total != null) {
                                todays_total = JSON.stringify(result2[0]);
                            }
                            todays_total = todays_total.substring(1, todays_total.length - 1);

                            var finalResult = invoice_total + "," + current_month_total + "," + todays_total;
                            callback(finalResult);
                        }
                    })
                })
            })
        }
    })
}

getData.prototype.get_invoice_total_without_tax = function(current_date, connection, callback) {
    connection.beginTransaction(function(error) {
        if (error) {
            callback(error);
        } else {

            var sql = "SELECT SUM(inv_total_amount) AS invoice_total FROM invoices WHERE inv_without_tax = '1'";

            connection.query(sql, function(error, result) {
                if (error) {
                    return connection.rollback(function() {
                        callback(error);
                    })
                }

                var sql1 = "SELECT SUM(inv_total_amount) AS current_month_total FROM invoices WHERE MONTH(inv_date) = MONTH('" + current_date + "') AND inv_without_tax = '1'";
                connection.query(sql1, function(error, result1) {
                    if (error) {
                        return connection.rollback(function() {
                            callback(error);
                        })
                    }

                    var sql2 = "SELECT SUM(inv_total_amount) AS todays_total FROM invoices WHERE inv_date = '" + current_date + "' AND inv_without_tax = '1'";

                    connection.query(sql2, function(error, result2) {
                        if (error) {
                            return connection.rollback(function() {
                                callback(error);
                            })
                        } else {
                            connection.commit()
                            var invoice_total = '{"invoice_total": 0 }';
                            if (result[0].invoice_total != null) {
                                invoice_total = JSON.stringify(result[0]);
                            }
                            invoice_total = invoice_total.substring(1, invoice_total.length - 1);

                            var current_month_total = '{ "current_month_total": 0 }';
                            if (result1[0].current_month_total != null) {
                                current_month_total = JSON.stringify(result1[0]);
                            }
                            current_month_total = current_month_total.substring(1, current_month_total.length - 1);

                            var todays_total = '{ "todays_total": 0 }';
                            if (result2[0].todays_total != null) {
                                todays_total = JSON.stringify(result2[0]);
                            }
                            todays_total = todays_total.substring(1, todays_total.length - 1);

                            var finalResult = invoice_total + "," + current_month_total + "," + todays_total;

                            callback(finalResult);
                        }
                    })
                })
            })
        }
    })
}

getData.prototype.get_purchase_total_with_tax = function(current_date, connection, callback) {
    connection.beginTransaction(function(error) {
        if (error) {
            callback(error);
        } else {

            var sql = "SELECT SUM(pur_total_amount) AS purchase_total FROM purchases";

            connection.query(sql, function(error, result) {
                if (error) {
                    return connection.rollback(function() {
                        callback(error);
                    })
                }

                var sql1 = "SELECT SUM(pur_total_amount) AS current_month_total FROM purchases WHERE MONTH(pur_date) = MONTH('" + current_date + "')";
                connection.query(sql1, function(error, result1) {
                    if (error) {
                        return connection.rollback(function() {
                            callback(error);
                        })
                    }

                    var sql2 = "SELECT SUM(pur_total_amount) AS todays_total FROM purchases WHERE pur_date = '" + current_date + "'";
                    connection.query(sql2, function(error, result2) {
                        if (error) {
                            return connection.rollback(function() {
                                callback(error);
                            })
                        } else {
                            connection.commit()
                            var purchase_total = '{"purchase_total": 0 }';
                            if (result[0].purchase_total != null) {
                                purchase_total = JSON.stringify(result[0]);
                            }
                            purchase_total = purchase_total.substring(1, purchase_total.length - 1);

                            var current_month_total = '{ "current_month_total": 0 }';
                            if (result1[0].current_month_total != null) {
                                current_month_total = JSON.stringify(result1[0]);
                            }
                            current_month_total = current_month_total.substring(1, current_month_total.length - 1);

                            var todays_total = '{ "todays_total": 0 }';
                            if (result2[0].todays_total != null) {
                                todays_total = JSON.stringify(result2[0]);
                            }
                            todays_total = todays_total.substring(1, todays_total.length - 1);

                            var finalResult = purchase_total + "," + current_month_total + "," + todays_total;
                            callback(finalResult);
                        }
                    })
                })
            })
        }
    })
}

getData.prototype.get_purchase_total_without_tax = function(current_date, connection, callback) {
    connection.beginTransaction(function(error) {
        if (error) {
            callback(error);
        } else {

            var sql = "SELECT SUM(pur_total_amount) AS purchase_total FROM purchases WHERE pur_without_tax = '1'";

            connection.query(sql, function(error, result) {
                if (error) {
                    return connection.rollback(function() {
                        callback(error);
                    })
                }

                var sql1 = "SELECT SUM(pur_total_amount) AS current_month_total FROM purchases WHERE MONTH(pur_date) = MONTH(" + current_date + ") AND pur_without_tax = '1'";
                connection.query(sql1, function(error, result1) {
                    if (error) {
                        return connection.rollback(function() {
                            callback(error);
                        })
                    }

                    var sql2 = "SELECT SUM(pur_total_amount) AS todays_total FROM purchases WHERE pur_date = " + current_date + " AND pur_without_tax = '1'";
                    connection.query(sql2, function(error, result2) {
                        if (error) {
                            return connection.rollback(function() {
                                callback(error);
                            })
                        } else {
                            connection.commit()
                            var purchase_total = '{"purchase_total": 0 }';
                            if (result[0].purchase_total != null) {
                                purchase_total = JSON.stringify(result[0]);
                            }
                            purchase_total = purchase_total.substring(1, purchase_total.length - 1);

                            var current_month_total = '{ "current_month_total": 0 }';
                            if (result1[0].current_month_total != null) {
                                current_month_total = JSON.stringify(result1[0]);
                            }
                            current_month_total = current_month_total.substring(1, current_month_total.length - 1);

                            var todays_total = '{ "todays_total": 0 }';
                            if (result2[0].todays_total != null) {
                                todays_total = JSON.stringify(result2[0]);
                            }
                            todays_total = todays_total.substring(1, todays_total.length - 1);

                            var finalResult = purchase_total + "," + current_month_total + "," + todays_total;
                            callback(finalResult);
                        }
                    })
                })
            })
        }
    })
}

// Get invoice
getData.prototype.get_selected_month_invoices = function(month, connection, callback) {
    var sql = "SELECT invoices.inv_id, invoices.inv_date, customers.cust_name AS inv_customer, customers.cust_contact_person AS inv_contact_person, customers.cust_contact AS inv_contact, customers.cust_address AS inv_address, invoices.inv_product_total, invoices.inv_total_tax, invoices.inv_total_amount, invoices.inv_without_tax from invoices, customers where invoices.inv_cust_id=customers.cust_id AND MONTH(inv_date)= '" + month + "'";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.get_insurance_details = function(connection, callback) {
    var sql = "SELECT insurance_details.insurance_id, insurance_details.policy_no, insurance_details.policy_issued_date, insurance_details.vehicle_id, insurance_details.premium_amount, insurance_details.insurance_company, insurance_details.nominee_name, insurance_details.additional_comments, vehicles.veh_number as vehicle_no FROM insurance_details, vehicles WHERE insurance_details.vehicle_id = vehicles.veh_id";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.set_insurance_detail = function(policy_no, issued_date, vehicle_id, premium_amount, insurance_company, nominee_name, additional_comments, connection, callback) {
    var sql = "INSERT INTO insurance_details VALUES (null,'" + policy_no + "','" + issued_date + "','" + vehicle_id + "','" + premium_amount + "','" + insurance_company + "','" + nominee_name + "','" + additional_comments + "')";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.update_insurance_detail = function(insurance_id, policy_no, issued_date, vehicle_id, premium_amount, insurance_company, nominee_name, additional_comments, connection, callback) {
    var sql = "UPDATE insurance_details SET policy_no='" + policy_no + "', policy_issued_date='" + issued_date + "', vehicle_id='" + vehicle_id + "', premium_amount='" + premium_amount + "', insurance_company='" + insurance_company + "', nominee_name='" + nominee_name + "', additional_comments='" + additional_comments + "' WHERE insurance_id = '" + insurance_id + "'";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.delete_insurance_detail = function(insurance_id, connection, callback) {
    var sql = "DELETE FROM insurance_details WHERE insurance_id = '" + insurance_id + "'";

    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.get_insurance_detail_by_id = function(insurance_id, connection, callback) {
    var sql = "SELECT insurance_details.insurance_id, insurance_details.policy_no, insurance_details.policy_issued_date, insurance_details.vehicle_id, insurance_details.premium_amount, insurance_details.insurance_company, insurance_details.nominee_name, insurance_details.additional_comments, vehicles.veh_number as vehicle_no FROM insurance_details, vehicles WHERE insurance_details.vehicle_id = vehicles.veh_id && insurance_id = '" + insurance_id + "'";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

// Get invoice without tax
getData.prototype.Ws_get_invoices_wt = function(connection, callback) {
    var sql = "select invoices_wt.inv_id, invoices_wt.inv_date, invoices_wt.inv_cust_id, customers.cust_name AS inv_customer, customers.cust_contact_person AS inv_contact_person, customers.cust_contact AS inv_contact, customers.cust_address AS inv_address, customers.cust_email AS inv_email, invoices_wt.inv_total_amount, invoices_wt.inv_without_tax from invoices_wt, customers where invoices_wt.inv_cust_id=customers.cust_id";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.get_invoice_wt_by_id = function(inv_id, connection, callback) {
    var sql = "select invoices_wt.inv_id, invoices_wt.inv_date, invoices_wt.inv_product_total, invoices_wt.inv_total_amount, invoices_wt.inv_round_off, invoices_wt.inv_without_tax, customers.cust_id AS inv_cust_id, customers.cust_name AS inv_customer, customers.cust_address AS inv_address, customers.cust_contact AS inv_contact, customers.cust_contact_person AS inv_contact_person, customers.cust_email AS inv_email from customers, invoices_wt WHERE customers.cust_id=invoices_wt.inv_cust_id && inv_id = '" + inv_id + "'";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}

getData.prototype.Ws_set_invoice_wt_detail = function(inv_date, inv_cust_id, product_total, inv_total, round_off, inv_without_tax, inv_products, connection, callback) {
    connection.beginTransaction(function(error) {
        if (error) {
            callback(error);
        } else {

            var sql = "INSERT INTO invoices_wt VALUES (null,'" + inv_date + "','" + inv_cust_id + "','" + product_total + "','" + inv_total + "','" + round_off + "','" + inv_without_tax + "')";
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
                    var chal_no = inv_products[i].chal_no;
                    var prod_qty = inv_products[i].prod_qty;
                    var prod_rate = inv_products[i].prod_rate;
                    var prod_total = inv_products[i].prod_total_amount;

                    var sql1 = "INSERT INTO invoice_products_wt VALUES (null,'" + prod_id + "','" + prod_qty + "','" + inv_id + "','" + chal_id + "','" + chal_no + "','" + prod_total + "','" + prod_rate + "')";
                    connection.query(sql1, function(error, rows) {
                        if (error) {
                            return connection.rollback(function() {
                                callback(error);
                            })
                        }

                        var sql2 = "UPDATE challans SET chal_is_invoice_created = '1' WHERE chal_id = '" + chal_id + "'";
                        connection.query(sql2, function(error, rows) {
                            if (error) {
                                return connection.rollback(function() {
                                    callback(error);
                                })
                            } else {
                                connection.commit()
                                callback(rows);
                            }
                        })
                    })
                }
            })
        }
    })
}

getData.prototype.Ws_update_invoice_wt_detail = function(inv_id, inv_date, inv_cust_id, product_total, inv_total, round_off, inv_without_tax, inv_products, connection, callback) {
    connection.beginTransaction(function(error) {
        if (error) {
            callback(error);
        } else {

            var sql = "UPDATE invoices_wt SET inv_date='" + inv_date + "', inv_cust_id = '" + inv_cust_id + "', inv_product_total ='" + product_total + "', inv_total_amount='" + inv_total + "', inv_round_off='" + round_off + "', inv_without_tax='" + inv_without_tax + "' WHERE inv_id= '" + inv_id + "'";
            connection.query(sql, function(error, result) {
                if (error) {
                    return connection.rollback(function() {
                        callback(error);
                    })
                }

                var sql1 = "DELETE FROM invoice_products_wt WHERE inv_id= '" + inv_id + "'";
                connection.query(sql1, function(error, result) {
                    if (error) {
                        return connection.rollback(function() {
                            callback(error);
                        })
                    }

                    for (var i = 0; i < inv_products.length; i++) {
                        var prod_id = inv_products[i].prod_id;
                        var chal_id = inv_products[i].chal_id;
                        var chal_no = inv_products[i].chal_no;
                        var prod_qty = inv_products[i].prod_qty;
                        var prod_rate = inv_products[i].prod_rate;
                        var prod_total = inv_products[i].prod_total_amount;

                        var sql2 = "INSERT INTO invoice_products_wt VALUES (null,'" + prod_id + "','" + prod_qty + "','" + inv_id + "','" + chal_id + "','" + chal_no + "','" + prod_total + "','" + prod_rate + "')";
                        connection.query(sql2, function(error, rows) {
                            if (error) {
                                return connection.rollback(function() {
                                    callback(error);
                                })
                            }

                            var sql3 = "UPDATE challans SET chal_is_invoice_created = '1' WHERE chal_id = '" + chal_id + "'";
                            connection.query(sql3, function(error, rows) {
                                if (error) {
                                    return connection.rollback(function() {
                                        callback(error);
                                    })
                                } else {
                                    connection.commit()
                                    callback(rows);
                                }
                            })
                        })
                    }
                })
            })
        }
    })
}

getData.prototype.get_invoice_products_wt_by_id = function(inv_id, connection, callback) {

    var sql = "SELECT invoice_products_wt.chal_id, challans.chal_no, challans.chal_date, invoice_products_wt.prod_id, invoice_products_wt.inv_prod_qty AS prod_qty, vehicles.veh_number, products.prod_name, products.prod_unit, invoice_products_wt.inv_prod_rate AS prod_rate, invoice_products_wt.inv_prod_subtotal AS prod_sub_total, invoice_products_wt.prod_total_amount FROM challans, vehicles, products, invoice_products_wt WHERE invoice_products_wt.chal_id = challans.chal_id && products.prod_id = invoice_products_wt.prod_id && challans.chal_veh_id = vehicles.veh_id && inv_id = '" + inv_id + "'";
    connection.query(sql, function(error, rows) {
        if (error) {
            callback(error);
        } else {
            callback(rows);
        }
    })
}


exports = module.exports = getData;