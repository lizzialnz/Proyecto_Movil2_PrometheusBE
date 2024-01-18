CREATE DATABASE  IF NOT EXISTS `proyectomovil2` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `proyectomovil2`;
-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: proyectomovil2
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `idcategorias` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) NOT NULL,
  PRIMARY KEY (`idcategorias`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (6,'Camisas'),(7,'Joggers'),(8,'Sneakers'),(9,'Accesorios');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalles_factura`
--

DROP TABLE IF EXISTS `detalles_factura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalles_factura` (
  `iddetalles_Factura` int NOT NULL AUTO_INCREMENT,
  `cantidad` int NOT NULL,
  `subtotal` double NOT NULL,
  `impuesto` double NOT NULL,
  `total` double NOT NULL,
  `idfacturas` int DEFAULT NULL,
  `idproductos` int NOT NULL,
  `nombre_producto` varchar(45) NOT NULL,
  `idusuario` int NOT NULL,
  `nombre_usuario` varchar(45) NOT NULL,
  PRIMARY KEY (`iddetalles_Factura`),
  KEY `fk_Detalles_Factura_Facturas1_idx` (`idfacturas`),
  KEY `fk_Detalles_Factura_Productos1_idx` (`idproductos`),
  KEY `fk_detalles_factura_usuarios1_idx` (`idusuario`),
  CONSTRAINT `fk_Detalles_Factura_Facturas1` FOREIGN KEY (`idfacturas`) REFERENCES `facturas` (`idfacturas`),
  CONSTRAINT `fk_Detalles_Factura_Productos1` FOREIGN KEY (`idproductos`) REFERENCES `productos` (`idproductos`),
  CONSTRAINT `fk_detalles_factura_usuarios1` FOREIGN KEY (`idusuario`) REFERENCES `usuarios` (`idusuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalles_factura`
--

LOCK TABLES `detalles_factura` WRITE;
/*!40000 ALTER TABLE `detalles_factura` DISABLE KEYS */;
/*!40000 ALTER TABLE `detalles_factura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empleados`
--

DROP TABLE IF EXISTS `empleados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empleados` (
  `idempleado` int NOT NULL AUTO_INCREMENT,
  `nombre_completo` varchar(255) DEFAULT NULL,
  `nombre_usuario` varchar(45) DEFAULT NULL,
  `correo` varchar(255) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `contrasena_encriptada` varchar(255) DEFAULT NULL,
  `direccion_usuario` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idempleado`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleados`
--

LOCK TABLES `empleados` WRITE;
/*!40000 ALTER TABLE `empleados` DISABLE KEYS */;
INSERT INTO `empleados` VALUES (2,'Bryan Samuel Martinez Zelaya','BryanRoot123','bryanmartz972@gmail.com','87321951','$2b$10$N3yRM6I9Q6NE4V5lMGunUemuWb0JgCR4384z5gYdr3Pjc3wbHKDEG','Residencial Centro America Este'),(3,'Lizzi Silva','LizziRoot123','lizzisilva@gmail.com','12345678','$2b$10$EDQ1v1bOINBSfmQboRDyg.v6Bb/8RVRqLfl6d6IbpSjurdKi9PxPi','Ojojona'),(4,'Otoniel Aguirre','OtonielRoot123','otonielaguirre@gmail.com','12345678','$2b$10$rUeffTDpF4t.9kJ7pBxMleoa7ama1iceY4xN0Y/sFGm0upZhEivJu','Residencial Centro America Este');
/*!40000 ALTER TABLE `empleados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `facturas`
--

DROP TABLE IF EXISTS `facturas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `facturas` (
  `idfacturas` int NOT NULL AUTO_INCREMENT,
  `fecha_factura` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `idusuario` int NOT NULL,
  PRIMARY KEY (`idfacturas`),
  KEY `fk_Facturas_Usuario1_idx` (`idusuario`),
  CONSTRAINT `fk_Facturas_Usuario1` FOREIGN KEY (`idusuario`) REFERENCES `usuarios` (`idusuario`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facturas`
--

LOCK TABLES `facturas` WRITE;
/*!40000 ALTER TABLE `facturas` DISABLE KEYS */;
/*!40000 ALTER TABLE `facturas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `idproductos` int NOT NULL AUTO_INCREMENT,
  `nombre_producto` varchar(45) NOT NULL,
  `cantidad_producto` int NOT NULL,
  `precio_producto` double NOT NULL,
  `marca_producto` varchar(45) NOT NULL,
  `idcategorias` int NOT NULL,
  `costo` double NOT NULL,
  `imagen_producto` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`idproductos`),
  KEY `fk_Productos_Categorias_idx` (`idcategorias`),
  CONSTRAINT `fk_Productos_Categorias` FOREIGN KEY (`idcategorias`) REFERENCES `categorias` (`idcategorias`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (42,'Camisa deportiva roja',150,300,'Adidas',6,400,NULL),(43,'Camisa manga larga negra',125,400,'Nike',6,500,NULL),(44,'Camisa deportiva azul',165,300,'Adidas',6,400,NULL),(45,'Camison blanco',180,450,'New Balance',6,550,NULL),(46,'Camison negro',190,450,'New Balance',6,550,NULL),(47,'Joggers slim negros',250,300,'Adidas',7,400,NULL),(48,'Joggers slim crema',250,300,'Adidas',7,400,NULL),(49,'Joggers sueltos rojos',300,325,'Nike',7,450,NULL),(50,'Joggers sueltos azules',275,300,'Nike',7,450,NULL),(51,'Joggers rayados',250,575,'Gucci',7,750,NULL),(52,'Yeezy Boost V2 Oreo',50,2000,'Adidas',8,2500,NULL),(53,'Jordan Point Lane ',30,2200,'Nike',8,3000,NULL),(54,'Air Force 1',100,1750,'Nike',8,2200,NULL),(55,'Fresh Foam Roav',150,1300,'New Balance',8,1900,NULL),(56,'DynaSoft Beaya',150,1400,'New Balance',8,1900,NULL),(57,'Gorra negra',300,250,'Adidas',9,350,NULL),(58,'Gorra roja',300,250,'Nike',9,350,NULL),(59,'Galaxy Fit e',20,1500,'Samsung',9,2000,NULL),(60,'Mi Band 5',20,1000,'Xiaomi',9,1500,NULL),(61,'Gorra azul',250,250,'Nike',9,350,NULL);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tarjetas`
--

DROP TABLE IF EXISTS `tarjetas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tarjetas` (
  `idtarjetas` int NOT NULL AUTO_INCREMENT,
  `num_tarjeta` varchar(45) NOT NULL,
  `fecha_vencimiento` date NOT NULL,
  `VIN` varchar(4) NOT NULL,
  `tipo_tarjeta` varchar(45) NOT NULL,
  `idusuario` int NOT NULL,
  PRIMARY KEY (`idtarjetas`),
  KEY `fk_tarjetas_Usuario1_idx` (`idusuario`),
  CONSTRAINT `fk_tarjetas_Usuario1` FOREIGN KEY (`idusuario`) REFERENCES `usuarios` (`idusuario`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tarjetas`
--

LOCK TABLES `tarjetas` WRITE;
/*!40000 ALTER TABLE `tarjetas` DISABLE KEYS */;
/*!40000 ALTER TABLE `tarjetas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `idusuario` int NOT NULL AUTO_INCREMENT,
  `nombre_completo` varchar(255) NOT NULL,
  `nombre_usuario` varchar(45) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `contrasena_encriptada` varchar(255) NOT NULL,
  `direccion_usuario` varchar(255) NOT NULL,
  PRIMARY KEY (`idusuario`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (19,'Bryan Martinez','Bryan123','bryanmartz972@gmail.com','87321951','$2b$10$zS.rfxv3z4xBf3D5AZxTte6Dah8RFTep8G6OokI6Mn0jtL3JnvACW','Residencial Centroamerica Oeste'),(23,'Lizzi Silva','Lizzi123','lizzisilva@gmail.com','12345678','$2b$10$9UiSV0x8C4/3x0NQVW/oxeZ2Yq7m1wqQp4GLJxTwbZuYVZrAksvbe','Ojojona'),(24,'Otoniel Aguirre','Otoniel123','otonielaguirre@gmail.com','12345678','$2b$10$KHbYifyKf0yBQlf3tmRP5uG05vhZfO5RvRKbeoC00JUziozLvNE2q','Residencial Centroamerica Este');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-06 22:48:18
