var express = require('express');
var cors = require('cors'),
    routes = require('./routes'),
    user = require('./routes/user'),
    http = require('http'),
    path = require('path');

var mysql = require('mysql');
var myConnection = require('express-myconnection');

var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Body parser use JSON data

app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var dbhostname = "",
    dbusername = "",
    dbpassword = "",
    databasename = "";

if (process.env.VCAP_SERVICES) {
    var svcInfo = JSON.parse(process.env.VCAP_SERVICES);
    for (var label in svcInfo) {
        var svcs = svcInfo[label];
        for (var index in svcs) {
            var uri = svcs[index].credentials.uri;
            console.log("uri:" + uri);

            if (uri.indexOf("mysql") > -1) {
                console.log("mysql uri :" + uri);
                dbusername = svcs[index].credentials.username;
                dbpassword = svcs[index].credentials.password;
                dbhostname = svcs[index].credentials.hostname;
                databasename = svcs[index].credentials.name;
                dbjdbcurl = svcs[index].credentials.jdbcUrl;
                dburi = svcs[index].credentials.uri;
            }
        }
    }
}

app.use(myConnection(mysql, {
    connectionLimit: 25,
    waitForConnections: true,
    acquireTimeout: 10000,
    queueLimit: 0,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'Shubham_db',
    port: 3306

}, 'pool'));


var Wscall_Customer = require('./routes/CustomerWebService.js');
var Wscall_Vendor = require('./routes/VendorWebService.js');
var Wscall_Product = require('./routes/ProductWebService.js');
var Wscall_Challan = require('./routes/ChallanWebService.js');
var Wscall_Quatation = require('./routes/QuatationWebService.js');
var Wscall_Purchase = require('./routes/PurchaseWebService.js');
var Wscall_Invoice = require('./routes/InvoiceWebService.js');
var Wscall_Vehicle = require('./routes/VehicleWebService.js');
var Wscall_GST = require('./routes/GSTWebService.js');
var Wscall_Cheque = require('./routes/ChequeWebService.js');
var Wscall_Employee = require('./routes/EmployeeWebService.js');
var Wscall_Diesel = require('./routes/DieselEntryWebService.js');
var Wscall_Payment = require('./routes/PaymentWebService.js');
var Wscall_Account = require('./routes/AccountWebService.js');
var Wscall_Card = require('./routes/CardWebService.js');
var Wscall_Emi = require('./routes/EmiWebService.js');
var Wscall_Trip = require('./routes/TripWebService.js');
var Wscall_Insurance = require('./routes/InsuranceWebService.js');
var Wscall_Dashboard = require('./routes/DashboardWebService.js');

// Customer web services
app.post('/getCustomers', Wscall_Customer.Ws_get_customers);
app.post('/getCustomerById', Wscall_Customer.Ws_get_customer_by_id);
app.post('/addCustomer', Wscall_Customer.Ws_set_customer);
app.post('/updateCustomer', Wscall_Customer.Ws_update_customer);
app.post('/deleteCustomer', Wscall_Customer.Ws_delete_customer);

// Vendor web services
app.post('/getVendors', Wscall_Vendor.Ws_get_vendors);
app.post('/getVendorById', Wscall_Vendor.Ws_get_vendor_by_id);
app.post('/addVendor', Wscall_Vendor.Ws_set_vendor);
app.post('/updateVendor', Wscall_Vendor.Ws_update_vendor);
app.post('/deleteVendor', Wscall_Vendor.Ws_delete_vendor);

// Products web services
app.post('/getProducts', Wscall_Product.Ws_get_products);
app.post('/getProductById', Wscall_Product.Ws_get_products_by_id);
app.post('/addProduct', Wscall_Product.Ws_set_product);
app.post('/updateProduct', Wscall_Product.Ws_update_product);
app.post('/deleteProduct', Wscall_Product.Ws_delete_product);

// Challan web services
app.post('/getChallans', Wscall_Challan.Ws_get_challans);
app.post('/addChallan', Wscall_Challan.Ws_set_challan);
app.post('/updateChallan', Wscall_Challan.Ws_update_challan);
app.post('/getChallansByCustomerId', Wscall_Challan.Ws_get_challans_by_customer_id);
app.post('/getChallanById', Wscall_Challan.Ws_get_challan_by_id);

// Quatation web services
app.post('/getQuatations', Wscall_Quatation.Ws_get_quatations);
app.post('/addQuatation', Wscall_Quatation.Ws_set_quatation);
app.post('/updateQuatation', Wscall_Quatation.Ws_update_quatation);
app.post('/getQuatationProductsById', Wscall_Quatation.Ws_get_quatation_products_by_id);
app.post('/getQuatationById', Wscall_Quatation.Ws_get_quatation_by_id);

// Invoice web services
app.post('/getInvoices', Wscall_Invoice.Ws_get_invoices);
app.post('/addInvoice', Wscall_Invoice.Ws_set_invoice);
app.post('/getInvoiceProductsById', Wscall_Invoice.Ws_get_invoice_products_by_id);
app.post('/getInvoiceById', Wscall_Invoice.Ws_get_invoice_by_id);

// Purchase web services
app.post('/getPurchases', Wscall_Purchase.Ws_get_purchases);
app.post('/addPurchase', Wscall_Purchase.Ws_set_purchase);
app.post('/getPurchaseProductsById', Wscall_Purchase.Ws_get_purchase_products_by_id);
app.post('/getPurchaseById', Wscall_Purchase.Ws_get_purchase_by_id);

// Vehicle web services
app.post('/getVehicles', Wscall_Vehicle.Ws_get_vehicles);
app.post('/getVehicleById', Wscall_Vehicle.Ws_get_vehicle_by_id);
app.post('/addVehicle', Wscall_Vehicle.Ws_set_vehicle);
app.post('/updateVehicle', Wscall_Vehicle.Ws_update_vehicle);
app.post('/deleteVehicle', Wscall_Vehicle.Ws_delete_vehicle);

// GST web services
app.post('/getGSTDetails', Wscall_GST.Ws_get_gst_details);
app.post('/getGSTDetailById', Wscall_GST.Ws_get_gst_detail_by_id);
app.post('/addGSTDetail', Wscall_GST.Ws_set_gst_detail);
app.post('/updateGSTDetail', Wscall_GST.Ws_update_gst_detail);
app.post('/deleteGSTDetail', Wscall_GST.Ws_delete_gst_detail);

// Cheque Entry web services
app.post('/getChequeEntries', Wscall_Cheque.Ws_get_cheque_entries);
app.post('/getChequeEntryById', Wscall_Cheque.Ws_get_cheque_entry_by_id);
app.post('/addChequeEntry', Wscall_Cheque.Ws_set_cheque_entry);
app.post('/updateChequeEntry', Wscall_Cheque.Ws_update_cheque_entry);
app.post('/deleteChequeEntry', Wscall_Cheque.Ws_delete_cheque_entry);

// Employee web services
app.post('/getEmployees', Wscall_Employee.Ws_get_employees);
app.post('/getEmployeeById', Wscall_Employee.Ws_get_employee_by_id);
app.post('/addEmployee', Wscall_Employee.Ws_set_employee);
app.post('/updateEmployee', Wscall_Employee.Ws_update_employee);
app.post('/deleteEmployee', Wscall_Employee.Ws_delete_employee);

// Diesel Entry web services
app.post('/getDieselEntries', Wscall_Diesel.Ws_get_diesel_entries);
app.post('/getDieselEntryById', Wscall_Diesel.Ws_get_diesel_entry_by_id);
app.post('/addDieselEntry', Wscall_Diesel.Ws_set_diesel_entry);
app.post('/updateDieselEntry', Wscall_Diesel.Ws_update_diesel_entry);
app.post('/deleteDieselEntry', Wscall_Diesel.Ws_delete_diesel_entry);

// Payment Detail web services
app.post('/getPaymentDetails', Wscall_Payment.Ws_get_payment_details);
app.post('/getPaymentDetailById', Wscall_Payment.Ws_get_payment_detail_by_id);
app.post('/addPaymentDetail', Wscall_Payment.Ws_set_payment_detail);
app.post('/updatePaymentDetail', Wscall_Payment.Ws_update_payment_detail);
app.post('/deletePaymentDetail', Wscall_Payment.Ws_delete_payment_detail);

// Account Detail web services
app.post('/getAccounts', Wscall_Account.Ws_get_account_details);
app.post('/getAccountById', Wscall_Account.Ws_get_account_detail_by_id);
app.post('/addAccount', Wscall_Account.Ws_set_account_detail);
app.post('/updateAccount', Wscall_Account.Ws_update_account_detail);
app.post('/deleteAccount', Wscall_Account.Ws_delete_account_detail);

// Card Detail web services
app.post('/getCardDetails', Wscall_Card.Ws_get_card_details);
app.post('/getCardDetailById', Wscall_Card.Ws_get_card_detail_by_id);
app.post('/addCardDetail', Wscall_Card.Ws_set_card_detail);
app.post('/updateCardDetail', Wscall_Card.Ws_update_card_detail);
app.post('/deleteCardDetail', Wscall_Card.Ws_delete_card_detail);

// Emi Detail web services
app.post('/getEmiDetails', Wscall_Emi.Ws_get_emi_details);
app.post('/getEmiDetailById', Wscall_Emi.Ws_get_emi_detail_by_id);
app.post('/addEmiDetail', Wscall_Emi.Ws_set_emi_detail);
app.post('/updateEmiDetail', Wscall_Emi.Ws_update_emi_detail);
app.post('/deleteEmiDetail', Wscall_Emi.Ws_delete_emi_detail);

// Trip Detail web services
app.post('/getTripDetails', Wscall_Trip.Ws_get_trip_details);
app.post('/getTripDetailById', Wscall_Trip.Ws_get_trip_detail_by_id);
app.post('/addTripDetail', Wscall_Trip.Ws_set_trip_detail);
app.post('/updateTripDetail', Wscall_Trip.Ws_update_trip_detail);
app.post('/deleteTripDetail', Wscall_Trip.Ws_delete_trip_detail);

// Trip Detail web services
app.post('/getInsuranceDetails', Wscall_Insurance.Ws_get_insurance_details);
app.post('/getInsuranceDetailById', Wscall_Insurance.Ws_get_insurance_detail_by_id);
app.post('/addInsuranceDetail', Wscall_Insurance.Ws_set_insurance_detail);
app.post('/updateInsuranceDetail', Wscall_Insurance.Ws_update_insurance_detail);
app.post('/deleteInsuranceDetail', Wscall_Insurance.Ws_delete_insurance_detail);

// Dashboard Detail web services
app.post('/getInvoiceTotalWithTax', Wscall_Dashboard.Ws_get_invoice_total_with_tax);
app.post('/getPurchaseTotalWithTax', Wscall_Dashboard.Ws_get_purchase_total_with_tax);
app.post('/getInvoiceTotalWithoutTax', Wscall_Dashboard.Ws_get_invoice_total_without_tax);
app.post('/getPurchaseTotalWithoutTax', Wscall_Dashboard.Ws_get_purchase_total_without_tax);
app.post('/getSelectedMonthInvoices', Wscall_Dashboard.Ws_get_selected_month_invoices);

var port = process.env.PORT || 5000;
app.listen(port);
console.log('Listening on port ..' + port);;