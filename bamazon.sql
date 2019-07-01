DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Semi Picasso Clownfish", "Fish", 89.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Kaudern's Cardinalfish", "Fish", 18.99, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Flame Angelfish", "Fish", 53.99, 35);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Flame Angelfish", "Fish", 53.99, 35);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pajama Cardinalfish", "Fish", 11.29, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pink Spotted Watchman Goby", "Fish", 21.99, 55);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Clown Goby", "Fish", 27.99, 35);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Radiant Wrasse", "Fish", 69.99, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Banana Wrasse", "Fish", 59.99, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Natural Rock", "Rock", 149.99, 150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Shelf Rock", "Rock", 169.99, 125);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hammer Coral", "Coral", 33.49, 73);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Giant Green Polyp", "Coral", 22.49, 90);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Rose Stylophora Coral", "Coral", 22.99, 65);