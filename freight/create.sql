create schema ccca_freight;

drop table if exists ccca_freight.zipcode;
drop table if exists ccca_freight.city;

create table ccca_freight.city (
	id_city serial primary key,
	name text,
	lat numeric,
	long numeric
);

create table ccca_freight.zipcode (
	code text primary key,
	id_city integer references ccca_freight.city (id_city),
	street text,
	neighborhood text
);

insert into ccca_freight.city (name, lat, long) values ('Florianópolis', -27.5945, -48.5477);
insert into ccca_freight.city (name, lat, long) values ('Rio de Janeiro', -22.9129, -43.2003);
insert into ccca_freight.zipcode (code, id_city, street, neighborhood) values ('88015600', 1, 'Rua Almirante Lamego', 'Centro');
insert into ccca_freight.zipcode (code, id_city, street, neighborhood) values ('22060030', 2, 'Rua Aires Saldanha', 'Copacabana');
