-- DROP DATABASE
DROP DATABASE IF EXISTS ecommerce_db;

-- CREATE DATABASE
CREATE DATABASE ecommerce_db;
-- ===========USE ECOMMERCE_DB===========--
USE ecommerce_db;
-- ===========CREATE A TABLE TO HOLD "CATEGORY"============ --
CREATE TABLE category (
    id INT NOT NULL AUTO_INCREMENT,
    cat_name VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);
--===========CREATE A TABLE TO HOLD THE PRODUCT==============--
CREATE TABLE product (
    id INT NOT NULL AUTO_INCREMENT,
    pro_name VARCHAR(50),
    price DECIMAL(10,4) NOT NULL,
    stock INT NOT NULL DEFAULT ISNUMERIC(10),
    FOREIGN KEY(category_id) REFERENCES category(id) ON DELETE CASCADE
    PRIMARY KEY(id)
);
--===========

