-- create database jsweb;
create table test(
   user_id bigint NOT NULL AUTO_INCREMENT,
   user_name VARCHAR(100) NOT NULL,
   user_password VARCHAR(40) NOT NULL,
   PRIMARY KEY ( user_id )
);
INSERT INTO test (user_id, user_name, user_password) VALUES (14, 'root', '123123');
