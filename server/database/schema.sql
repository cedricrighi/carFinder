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

insert into vehicle (image, brand, model, year, mileage, consumption, transmission, price, category_id, user_id) values ('/images/audi-q7.png', 'Audi', 'Q7', 2019, 10000, 7.5, "Automatique", 70000, 1, 1);
insert into vehicle (image, brand, model, year, mileage, consumption, transmission, price, category_id, user_id) values ('/images/audi-r8.png', 'Audi', 'R8', 2020, 5000, 10, "Automatique", 150000, 2, 1);
insert into vehicle (image, brand, model, year, mileage, consumption, transmission, price, category_id, user_id) values ('/images/maserati-ghibli.png', 'Maserati', 'Ghibli', 2018, 20000, 9, "Automatique", 80000, 3, 1);
insert into vehicle (image, brand, model, year, mileage, consumption, transmission, price, category_id, user_id) values ('/images/mercedes-amg-one.png', 'Mercedes', 'AMG One', 2019, 15000, 8, "Automatique", 90000, 2, 1);
insert into vehicle (image, brand, model, year, mileage, consumption, transmission, price, category_id, user_id) values ('/images/tesla-model-s.png', 'Tesla', 'Model S', 2020, 1000, 0, "Automatique", 100000, 6, 1);