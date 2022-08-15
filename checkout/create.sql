drop table if exists ccca.order_projection;
drop table if exists ccca.order_item;
drop table if exists ccca.order;
drop table if exists ccca.coupon;

create table ccca.coupon (
	code text,
	percentage numeric,
	expire_date timestamp,
	primary key (code)
);

insert into ccca.coupon (code, percentage, expire_date) values ('VALE20', 20, '2022-10-10T10:00:00');
insert into ccca.coupon (code, percentage, expire_date) values ('VALE20_EXPIRED', 20, '2020-10-10T10:00:00');

create table ccca.order (
	id_order serial,
	guid text,
	coupon_code text,
	coupon_percentage numeric,
	code text,
	cpf text,
	issue_date timestamp,
	freight numeric,
	sequence integer,
	total numeric,
	primary key (id_order)
);

create table ccca.order_item (
	id_order integer references ccca.order (id_order),
	id_item integer,
	price numeric,
	quantity integer,
	primary key (id_order, id_item)
);

create table ccca.order_projection (
	guid text,
	data jsonb not null default '{}'
);
