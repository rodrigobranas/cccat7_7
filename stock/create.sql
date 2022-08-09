create schema ccca_stock;

drop table if exists ccca_stock.stock_entry;

create table ccca_stock.stock_entry (
	id_stock_entry serial primary key,
	id_item integer,
	operation text,
	quantity integer
);

insert into ccca_stock.stock_entry (id_item, operation, quantity) values (1, 'in', 1000);
insert into ccca_stock.stock_entry (id_item, operation, quantity) values (2, 'in', 1000);
insert into ccca_stock.stock_entry (id_item, operation, quantity) values (3, 'in', 1000);