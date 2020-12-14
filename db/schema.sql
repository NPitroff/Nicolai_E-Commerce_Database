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
    FOREIGN KEY(category_id) REFERENCES category(id) ON DELETE CASCADE,
    PRIMARY KEY(id)
);
--===========CREATE TABLE TO HOLD THE 'TAG' INFORMATION============--
CREATE TABLE tag (
    id INT NOT NULL AUTO_INCREMENT,
    tag_name VARCHAR(50),
    PRIMARY KEY(id)
);
--==============CREATE A TABLE TO HOLD THE 'PRODUCT_TAG' INFORMATION================--
CREATE TABLE product_tag (
    id INT NOT NULL AUTO_INCREMENT,
    FOREIGN KEY(tag_id) REFERENCES tag(id) ON DELETE CASCADE,
    FOREIGN KEY(product_id) REFERENCES product(id) ON DELETE CASCADE,
    PRIMARY KEY(id)
);
