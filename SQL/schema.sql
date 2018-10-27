create database bamazon;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
-- FLUSH PRIVLIEGES;
use bamazon;

drop table if exists product;
drop trigger if exists before_insert_product;
drop trigger if exists before_update_product;

create table product (
	uuid char(36) not null Primary key,
    date_created timestamp(6) not null default current_timestamp(6),
    last_mod_date timestamp(6) not null,
	product_name varchar(255) not null,
    custom_id varchar(255),
	department_name varchar(255),
	price decimal(10,2),
	stock_quantity integer
);
alter table product add index(product_name);

DELIMITER ;;
CREATE TRIGGER before_insert_product
BEFORE INSERT ON product
FOR EACH ROW
BEGIN
    SET new.uuid = uuid();
    SET new.date_created=current_timestamp(6);
    SET new.last_mod_date=new.date_created;
END;

CREATE TRIGGER before_update_product
BEFORE UPDATE ON product
FOR EACH ROW
BEGIN
	SET new.uuid=OLD.uuid;
	SET new.date_created=OLD.date_created;
    SET new.last_mod_date=current_timestamp(6);
END;
;;

