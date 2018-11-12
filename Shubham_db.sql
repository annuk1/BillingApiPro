CREATE DATABASE  IF NOT EXISTS `Shubham_db` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `Shubham_db`;
-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: localhost    Database: Shubham_db
-- ------------------------------------------------------
-- Server version	5.7.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `challans`
--

DROP TABLE IF EXISTS `challans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `challans` (
  `chal_id` int(12) NOT NULL AUTO_INCREMENT,
  `chal_date` date DEFAULT NULL,
  `chal_quantity` int(12) NOT NULL,
  `chal_cust_id` int(11) DEFAULT NULL,
  `chal_prod_id` int(11) DEFAULT NULL,
  `chal_veh_id` int(11) DEFAULT NULL,
  `chal_is_invoice_created` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`chal_id`),
  KEY `chal_cust_id` (`chal_cust_id`),
  KEY `chal_prod_id` (`chal_prod_id`),
  KEY `chal_veh_id` (`chal_veh_id`),
  CONSTRAINT `challans_ibfk_1` FOREIGN KEY (`chal_cust_id`) REFERENCES `customers` (`cust_id`),
  CONSTRAINT `challans_ibfk_2` FOREIGN KEY (`chal_prod_id`) REFERENCES `products` (`prod_id`),
  CONSTRAINT `challans_ibfk_3` FOREIGN KEY (`chal_veh_id`) REFERENCES `vehicles` (`veh_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `challans`
--

LOCK TABLES `challans` WRITE;
/*!40000 ALTER TABLE `challans` DISABLE KEYS */;
INSERT INTO `challans` VALUES (1,'2018-05-17',5,7,3,2,0),(2,'2018-05-17',3,1,1,1,1),(3,'2018-05-17',45,7,5,2,1),(4,'2018-07-15',7,18,7,1,1),(5,'2018-07-12',5,15,7,5,1),(7,'2018-09-15',50,35,1,1,0),(10,'2018-09-15',100,32,2,2,0),(11,'2018-09-18',8,15,3,5,0),(12,'2018-10-17',12,15,3,2,0);
/*!40000 ALTER TABLE `challans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cheque_entries`
--

DROP TABLE IF EXISTS `cheque_entries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cheque_entries` (
  `cheque_entry_id` int(12) NOT NULL AUTO_INCREMENT,
  `cheque_date` date DEFAULT NULL,
  `cheque_number` varchar(12) DEFAULT NULL,
  `cheque_amount` int(12) NOT NULL,
  `account_no` varchar(20) NOT NULL,
  `cheque_cust_id` int(12) NOT NULL,
  PRIMARY KEY (`cheque_entry_id`),
  KEY `cheque_cust_id` (`cheque_cust_id`),
  CONSTRAINT `cheque_entries_ibfk_1` FOREIGN KEY (`cheque_cust_id`) REFERENCES `customers` (`cust_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cheque_entries`
--

LOCK TABLES `cheque_entries` WRITE;
/*!40000 ALTER TABLE `cheque_entries` DISABLE KEYS */;
INSERT INTO `cheque_entries` VALUES (2,'2018-09-12','567546',12000,'345678909876',7),(3,'2018-09-18','345645',25000,'34564789',1);
/*!40000 ALTER TABLE `cheque_entries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customers` (
  `cust_id` int(12) NOT NULL AUTO_INCREMENT,
  `cust_name` varchar(56) NOT NULL,
  `cust_contact_person` varchar(56) DEFAULT NULL,
  `cust_contact` varchar(10) DEFAULT NULL,
  `cust_email` varchar(100) DEFAULT NULL,
  `cust_address` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`cust_id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'Nageshwar Properties','Sambhaji Borhade','9822987654','nageshwar-properties@gmail.com','Moshi, Pune'),(7,'Austin Enterprises','Austin Russel','8765432134','john','MG Road, Pune'),(15,'Kumar Builders','Rahul Kumar','897656778','kumar@mail.com','Kothrud'),(18,'Raje Enterprises','Varad Raje','8976567234','datta@mail.com','Dehugaon'),(32,'Mohan Developers','Mohan Desarda','985058876','mohan123@gmail.com','Sangvi, Pune'),(35,'Chetan Developers','Chetan Rathi','67890789','chetan@gmail.com','Rahatani, Pune'),(39,'Varad Constructions','Vighnesh','8795457623','varad@gmail.com','Nigdi, Pune'),(40,'Varad Building Solutions','Varad Raje','6789345678','varad.raje@gmail.com','Katraj, Pune');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diesel_entries`
--

DROP TABLE IF EXISTS `diesel_entries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `diesel_entries` (
  `diesel_entry_id` int(12) NOT NULL AUTO_INCREMENT,
  `diesel_filling_date` date NOT NULL,
  `diesel_qty` int(4) NOT NULL,
  `diesel_amount` int(20) NOT NULL,
  `emp_id` int(12) NOT NULL,
  PRIMARY KEY (`diesel_entry_id`),
  KEY `emp_id` (`emp_id`),
  CONSTRAINT `diesel_entries_ibfk_1` FOREIGN KEY (`emp_id`) REFERENCES `employees` (`emp_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diesel_entries`
--

LOCK TABLES `diesel_entries` WRITE;
/*!40000 ALTER TABLE `diesel_entries` DISABLE KEYS */;
INSERT INTO `diesel_entries` VALUES (2,'2018-10-05',5,400,2);
/*!40000 ALTER TABLE `diesel_entries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employees` (
  `emp_id` int(12) NOT NULL AUTO_INCREMENT,
  `emp_name` varchar(120) NOT NULL,
  `emp_age` int(2) DEFAULT NULL,
  `emp_contact` varchar(10) NOT NULL,
  `emp_address` varchar(200) NOT NULL,
  `date_of_joining` date DEFAULT NULL,
  `emp_adhar_no` varchar(20) NOT NULL,
  `emp_role` varchar(20) DEFAULT NULL,
  `employment_type` varchar(30) NOT NULL,
  PRIMARY KEY (`emp_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (2,'Datta',35,'9822687766','Dehugaon','2018-10-01','431145132515','Driver','Full Time');
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gst`
--

DROP TABLE IF EXISTS `gst`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gst` (
  `gst_id` int(12) NOT NULL AUTO_INCREMENT,
  `gst_hsn` varchar(24) NOT NULL,
  `gst_percentage` int(3) NOT NULL,
  `gst_desc` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`gst_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gst`
--

LOCK TABLES `gst` WRITE;
/*!40000 ALTER TABLE `gst` DISABLE KEYS */;
INSERT INTO `gst` VALUES (1,'996425',5,'As per government guidelines'),(2,'997890',12,'For small sized sand');
/*!40000 ALTER TABLE `gst` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice_products`
--

DROP TABLE IF EXISTS `invoice_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `invoice_products` (
  `inv_prod_id` int(12) NOT NULL AUTO_INCREMENT,
  `prod_id` int(12) NOT NULL,
  `inv_prod_qty` int(12) NOT NULL,
  `inv_id` int(12) NOT NULL,
  `chal_id` int(12) NOT NULL,
  `prod_total_amount` int(12) NOT NULL,
  `inv_prod_rate` int(12) NOT NULL,
  `inv_prod_subtotal` int(12) NOT NULL,
  `inv_prod_tax` int(12) NOT NULL,
  PRIMARY KEY (`inv_prod_id`),
  KEY `prod_id` (`prod_id`),
  KEY `inv_id` (`inv_id`),
  KEY `chal_id` (`chal_id`),
  CONSTRAINT `invoice_products_ibfk_1` FOREIGN KEY (`prod_id`) REFERENCES `products` (`prod_id`),
  CONSTRAINT `invoice_products_ibfk_2` FOREIGN KEY (`inv_id`) REFERENCES `invoices` (`inv_id`),
  CONSTRAINT `invoice_products_ibfk_3` FOREIGN KEY (`chal_id`) REFERENCES `challans` (`chal_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice_products`
--

LOCK TABLES `invoice_products` WRITE;
/*!40000 ALTER TABLE `invoice_products` DISABLE KEYS */;
INSERT INTO `invoice_products` VALUES (1,5,7,1,2,0,3500,0,0),(2,4,1,2,2,0,2500,0,0),(4,5,4,5,2,14000,3500,0,0),(5,5,2,7,2,7000,3500,0,0),(6,5,45,8,3,7000,3500,0,0),(7,4,5,9,5,7500,2500,0,0),(8,5,6,9,5,21000,3500,0,0),(9,7,7,10,4,6300,900,0,0),(10,1,3,10,4,13500,2500,0,0),(11,5,8,14,11,29400,3500,28000,1400);
/*!40000 ALTER TABLE `invoice_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoices`
--

DROP TABLE IF EXISTS `invoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `invoices` (
  `inv_id` int(12) NOT NULL AUTO_INCREMENT,
  `inv_date` date NOT NULL,
  `inv_cust_id` int(12) NOT NULL,
  `inv_total_amount` int(12) NOT NULL,
  `inv_without_tax` enum('false','true') NOT NULL DEFAULT 'false',
  PRIMARY KEY (`inv_id`),
  KEY `inv_cust_id` (`inv_cust_id`),
  CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`inv_cust_id`) REFERENCES `customers` (`cust_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoices`
--

LOCK TABLES `invoices` WRITE;
/*!40000 ALTER TABLE `invoices` DISABLE KEYS */;
INSERT INTO `invoices` VALUES (1,'2018-05-24',7,15000,'false'),(2,'2018-05-12',1,15000,'false'),(5,'2018-05-24',1,12000,'false'),(7,'2018-05-24',1,12000,'false'),(8,'2018-05-24',1,12000,'false'),(9,'2018-05-24',15,28500,'false'),(10,'2018-05-24',18,19800,'false'),(14,'2018-10-12',15,29400,'false');
/*!40000 ALTER TABLE `invoices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_details`
--

DROP TABLE IF EXISTS `payment_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payment_details` (
  `payment_id` int(12) NOT NULL AUTO_INCREMENT,
  `payment_date` date NOT NULL,
  `emp_id` int(12) NOT NULL,
  `payment_amount` int(8) NOT NULL,
  `payment_mode` varchar(60) DEFAULT NULL,
  `payment_type` varchar(60) NOT NULL,
  PRIMARY KEY (`payment_id`),
  KEY `emp_id` (`emp_id`),
  CONSTRAINT `payment_details_ibfk_1` FOREIGN KEY (`emp_id`) REFERENCES `employees` (`emp_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_details`
--

LOCK TABLES `payment_details` WRITE;
/*!40000 ALTER TABLE `payment_details` DISABLE KEYS */;
INSERT INTO `payment_details` VALUES (1,'2018-10-01',2,5000,'Cash','Advance');
/*!40000 ALTER TABLE `payment_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `prod_id` int(12) NOT NULL AUTO_INCREMENT,
  `prod_name` varchar(50) NOT NULL,
  `prod_desc` varchar(200) DEFAULT NULL,
  `prod_unit` varchar(56) NOT NULL,
  `prod_rate` float(10,2) NOT NULL,
  `prod_gst_id` int(12) DEFAULT NULL,
  PRIMARY KEY (`prod_id`),
  KEY `gst_id` (`prod_gst_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`prod_gst_id`) REFERENCES `gst` (`gst_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Crush Sand','Small sized sand','Brass',4500.00,2),(2,'Sand','River sand','Brass',5700.00,1),(3,'Dust','Small crushed sand','Brass',3200.00,1),(4,'Water','For commercial use','Litre',900.00,2),(5,'20 MM Metal','Small sized particles','Brass',3500.00,1),(6,'40 MM Metal','Large sized 40 mm particles','Brass',3500.00,2),(7,'JCB','Work done by JCB','Hours',900.00,1),(8,'test','test desc','test',4500.00,NULL),(9,'test','test desc','test',4500.00,NULL),(10,'Khadi','20MM','Brass',2500.00,1);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase_products`
--

DROP TABLE IF EXISTS `purchase_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `purchase_products` (
  `pur_prod_id` int(12) NOT NULL AUTO_INCREMENT,
  `prod_id` int(12) NOT NULL,
  `pur_prod_rate` int(12) NOT NULL,
  `pur_prod_qty` int(12) NOT NULL,
  `pur_id` int(12) NOT NULL,
  `pur_prod_total` int(12) NOT NULL,
  `pur_chal_no` int(12) NOT NULL,
  `pur_chal_date` date DEFAULT NULL,
  `pur_veh_no` varchar(12) NOT NULL,
  `pur_prod_hsn` int(12) NOT NULL,
  PRIMARY KEY (`pur_prod_id`),
  KEY `prod_id` (`prod_id`),
  KEY `pur_id` (`pur_id`),
  CONSTRAINT `purchase_products_ibfk_2` FOREIGN KEY (`prod_id`) REFERENCES `products` (`prod_id`),
  CONSTRAINT `purchase_products_ibfk_3` FOREIGN KEY (`pur_id`) REFERENCES `purchases` (`pur_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase_products`
--

LOCK TABLES `purchase_products` WRITE;
/*!40000 ALTER TABLE `purchase_products` DISABLE KEYS */;
INSERT INTO `purchase_products` VALUES (1,4,2500,5,4,0,123,'2018-08-05','MH14 DT 8286',123456),(2,3,3500,7,4,0,123,'2018-08-05','MH14 DT 8286',123456),(6,5,3500,4,13,14000,123,'2018-08-05','MH14 DT 8286',123456),(7,6,3000,3,14,9000,123,'2018-08-05','MH14 DT 8286',123456);
/*!40000 ALTER TABLE `purchase_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchases`
--

DROP TABLE IF EXISTS `purchases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `purchases` (
  `pur_id` int(12) NOT NULL AUTO_INCREMENT,
  `pur_date` date NOT NULL,
  `pur_total_amount` int(12) NOT NULL,
  `pur_vendor_id` int(12) NOT NULL,
  PRIMARY KEY (`pur_id`),
  KEY `pur_vendor_id` (`pur_vendor_id`),
  CONSTRAINT `purchases_ibfk_1` FOREIGN KEY (`pur_vendor_id`) REFERENCES `vendors` (`vend_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchases`
--

LOCK TABLES `purchases` WRITE;
/*!40000 ALTER TABLE `purchases` DISABLE KEYS */;
INSERT INTO `purchases` VALUES (3,'2018-05-15',25000,2),(4,'2018-05-25',12000,5),(11,'2018-05-24',14000,3),(13,'2018-05-24',14000,3),(14,'2018-05-24',14000,2);
/*!40000 ALTER TABLE `purchases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quatation_products`
--

DROP TABLE IF EXISTS `quatation_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `quatation_products` (
  `quat_prod_id` int(12) NOT NULL AUTO_INCREMENT,
  `prod_id` int(11) DEFAULT NULL,
  `quat_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`quat_prod_id`),
  KEY `prod_id` (`prod_id`),
  KEY `quat_id` (`quat_id`),
  CONSTRAINT `quatation_products_ibfk_1` FOREIGN KEY (`prod_id`) REFERENCES `products` (`prod_id`),
  CONSTRAINT `quatation_products_ibfk_2` FOREIGN KEY (`quat_id`) REFERENCES `quatations` (`quat_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quatation_products`
--

LOCK TABLES `quatation_products` WRITE;
/*!40000 ALTER TABLE `quatation_products` DISABLE KEYS */;
INSERT INTO `quatation_products` VALUES (1,1,1),(2,2,1),(3,4,8),(4,4,9),(5,6,13),(6,6,14),(8,6,24),(9,4,25),(10,4,26),(11,5,27),(12,5,28),(13,6,29),(14,6,30),(15,7,31),(16,2,31);
/*!40000 ALTER TABLE `quatation_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quatations`
--

DROP TABLE IF EXISTS `quatations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `quatations` (
  `quat_id` int(12) NOT NULL AUTO_INCREMENT,
  `quat_date` date NOT NULL,
  `quat_cust_id` int(12) NOT NULL,
  PRIMARY KEY (`quat_id`),
  KEY `quat_cust_id` (`quat_cust_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quatations`
--

LOCK TABLES `quatations` WRITE;
/*!40000 ALTER TABLE `quatations` DISABLE KEYS */;
INSERT INTO `quatations` VALUES (1,'2018-05-20',1),(2,'2018-05-14',1),(3,'2018-05-14',1),(4,'2018-05-14',1),(5,'2018-05-14',1),(6,'2018-05-14',1),(7,'2018-05-14',1),(8,'2018-05-14',1),(9,'2018-05-14',1),(13,'2018-05-18',2),(14,'2018-05-18',2),(24,'2018-05-18',2),(25,'2018-05-28',9),(26,'2018-05-28',9),(27,'2018-05-28',10),(28,'2018-05-28',10),(29,'2018-05-24',1),(30,'2018-05-24',1),(31,'2018-07-01',15);
/*!40000 ALTER TABLE `quatations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicles`
--

DROP TABLE IF EXISTS `vehicles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vehicles` (
  `veh_id` int(12) NOT NULL AUTO_INCREMENT,
  `veh_name` varchar(50) NOT NULL,
  `veh_number` varchar(12) NOT NULL,
  `veh_desc` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`veh_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicles`
--

LOCK TABLES `vehicles` WRITE;
/*!40000 ALTER TABLE `vehicles` DISABLE KEYS */;
INSERT INTO `vehicles` VALUES (1,'Tanker','MH14 DT 8558','Water supply tanker'),(2,'Dumper','MH14 FX 8286','For carrying stones'),(5,'Haiwa 2','MH14 SX 7990','6 brass volume');
/*!40000 ALTER TABLE `vehicles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendors`
--

DROP TABLE IF EXISTS `vendors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vendors` (
  `vend_id` int(12) NOT NULL AUTO_INCREMENT,
  `vend_name` varchar(56) NOT NULL,
  `vend_contact` varchar(10) DEFAULT NULL,
  `vend_email` varchar(100) DEFAULT NULL,
  `vend_address` varchar(200) DEFAULT NULL,
  `vend_contact_person` varchar(56) NOT NULL,
  PRIMARY KEY (`vend_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendors`
--

LOCK TABLES `vendors` WRITE;
/*!40000 ALTER TABLE `vendors` DISABLE KEYS */;
INSERT INTO `vendors` VALUES (2,'Dev Enterprises','9822905689','dev@yahoo.com','Talegaon Dabhade, Pune','Shubham Bodake'),(3,'Khandoba Stone Crusher','9876343536','khandoba@rediffmail.com','Talegaon Dabhade','Kiran Bodke'),(5,'Raghav Stone Crusher','9876343536','raghav@rediffmail.com','Talegaon, Pune','Shubham Bodke');
/*!40000 ALTER TABLE `vendors` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-10-31 20:39:07
