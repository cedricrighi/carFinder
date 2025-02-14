create table user (
  id int primary key auto_increment,
  first_name varchar(255) not null,
  last_name varchar(255) not null,
  email varchar(255) not null,
  password varchar(255) not null,
  phone_number varchar(255) not null
);

create table category (
  id int primary key auto_increment,
  name varchar(255) not null
);

create table vehicle (
  id int primary key auto_increment,
  image varchar(255),
  brand varchar(255) not null,
  model varchar(255) not null,
  year int,
  mileage int,
  consumption float,
  transmission varchar(255),
  price float,
  add_date timestamp default current_timestamp,
  category_id int not null,
  user_id int not null,
  foreign key (category_id) references category(id),
  foreign key (user_id) references user(id)
);

insert into category (name) values ('SUV');
insert into category (name) values ('Sport');
insert into category (name) values ('Luxe');
insert into category (name) values ('Compact');
insert into category (name) values ('Hybride');
insert into category (name) values ('Electrique');
insert into category (name) values ('Utilitaire');

insert into user (first_name, last_name, email, password, phone_number) values ('admin', 'admin', 'admin@gmail.com', 'adminpassword', '0611960918');
insert into user (first_name, last_name, email, password, phone_number) values ('Rémi', 'Zickenheiner', 'remi.zickenheiner@gmail.com', 'password', '0611461826');
insert into user (first_name, last_name, email, password, phone_number) values ('Flo', 'Monteil', 'flo.monteil@gmail.com', 'password', '0610371927');
insert into user (first_name, last_name, email, password, phone_number) values ('Charlotte', 'Albouy', 'charlotte.albouy@gmail.com', 'password', '0658574478');

insert into vehicle (image, brand, model, year, mileage, consumption, transmission, price, add_date, category_id, user_id) values ('/images/audi-q7.png', 'Audi', 'Q7', 2019, 10000, 7.5, "Automatique", 70000, "2022-03-27 12:30:10", 1, 2);
insert into vehicle (image, brand, model, year, mileage, consumption, transmission, price, add_date, category_id, user_id) values ('/images/audi-r8.png', 'Audi', 'R8', 2020, 5000, 10, "Automatique", 150000, "2021-10-17 14:11:33", 2, 1);
insert into vehicle (image, brand, model, year, mileage, consumption, transmission, price, add_date, category_id, user_id) values ('/images/maserati-ghibli.png', 'Maserati', 'Ghibli', 2018, 20000, 9, "Automatique", 80000, "2022-01-27 13:50:13", 3, 1);
insert into vehicle (image, brand, model, year, mileage, consumption, transmission, price, add_date, category_id, user_id) values ('/images/mercedes-amg-one.png', 'Mercedes', 'AMG One', 2019, 15000, 8, "Automatique", 90000, "2024-12-23 16:21:36", 2, 1);
insert into vehicle (image, brand, model, year, mileage, consumption, transmission, price, add_date, category_id, user_id) values ('/images/tesla-model-s.png', 'Tesla', 'Model S', 2020, 1000, 0, "Automatique", 100000, "2023-03-27 12:30:10", 6, 1);
insert into vehicle (image, brand, model, year, mileage, consumption, transmission, price, add_date, category_id, user_id) values ('/images/nissan-gtr35.jpg', 'Nissan', 'GT-R35', 2017, 35080, 12, "Automatique", 60000, "2022-03-27 12:30:10", 2, 3);
insert into vehicle (image, brand, model, year, mileage, consumption, transmission, price, add_date, category_id, user_id) values ('/images/hyundai-i10.jpg', 'Hyundai', 'i10', 2015, 21700, 5, "Manuelle", 10000, "2025-01-01 11:32:11", 4, 4);
insert into vehicle (image, brand, model, year, mileage, consumption, transmission, price, add_date, category_id, user_id) values ('/images/lambo-sto.jpg', 'Lamborghini', 'Huracan STO', 2021, 1000, 15, "Automatique", 300000, "2022-03-27 12:30:10", 2, 2);
insert into vehicle (image, brand, model, year, mileage, consumption, transmission, price, add_date, category_id, user_id) values ('/images/mercedes-a45.jpg', 'Mercedes', 'A45', 2020, 5000, 8, "Automatique", 60000, "2022-03-27 12:30:10", 2, 2);