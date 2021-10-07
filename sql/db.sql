USE mysql;
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'PassSecret';
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'PassSecret';
SELECT plugin FROM mysql.user WHERE User = 'root';

CREATE DATABASE persons;
USE persons;

CREATE TABLE person(id INT AUTO_INCREMENT PRIMARY KEY, fullname VARCHAR(100), birth DATE);

INSERT INTO person(fullname, birth) VALUES ("Edwin Steven Caro Urrea", "1997-09-13");