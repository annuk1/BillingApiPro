console.log("Starting Cloud Server...");
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
    database: 'test',
    port: 3306

}, 'pool'));


var Wscall_Connect = require('./routes/InvoiceWebService.js');
var Wscall_product = require('./routes/ProductWebService.js');


app.post('/getCustomer', Wscall_Connect.Ws_getCustomer);
app.post('/addCustomer', Wscall_Connect.Ws_set_customer);
app.post('/getVendors', Wscall_Connect.Ws_get_vendor);
app.post('/addVendor', Wscall_Connect.Ws_set_vendor);
app.post('/getProducts', Wscall_product.Ws_get_products)
app.post('/setProducts', Wscall_product.Ws_set_products)



var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on port ..' + port);;