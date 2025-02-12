create table user (
  id int primary key auto_increment,
  username varchar(255) not null,
  first_name varchar(255) not null,
  last_name varchar(255) not null,
  email varchar(255) not null,
  password varchar(255) not null,
  birthday date not null,
  phone_number varchar(255) not null
);

create table category (
  id int primary key auto_increment,
  name varchar(255) not null
);

create table vehicle (
  id int primary key auto_increment,
  name varchar(255) not null,
  image varchar(255) not null,
  brand varchar(255) not null,
  model varchar(255) not null,
  category_id int not null,
  user_id int not null,
  foreign key (category_id) references category(id),
  foreign key (user_id) references user(id)
);