# create databases
CREATE DATABASE IF NOT EXISTS `test_db`;

# create root user and grant rights
CREATE USER 'test_user'@'localhost' IDENTIFIED BY 'testpass';
GRANT ALL ON *.* TO 'test_user'@'%';
