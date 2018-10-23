insert into product (product_name, custom_id, department_name, price, stock_quantity)
	values 
    ('t shrit', '1234a', 'clothing', 15.50, 100), 
	('t shrit', '1234b', 'clothing', 23.30, 14), 
	('jeens', 'asd234a', 'clothing', 35.78, 34), 
	('jeens', 'asd234b', 'clothing', 456.87, 3456), 
	('phone', 'dfgh345', 'electronics', 23.65, 3), 
	('google phone', 'dfgh654', 'electronics', 987.76, 34567), 
	('hot cackes', '345fgh', 'coocking', 45.76, 567), 
	('pan', 'frghj7654', 'coocking', 345.67, 67), 
	('pot', 'ghjk765rfg', 'coocking', 345, 2), 
	('unbrella', 'we456yhg', 'life', 12, 6789), 
	('brown stick', '2345tgf', 'life', 67, 34);
select * from product;
-- update product set stock_quantity=100 where custom_id='1234b';
