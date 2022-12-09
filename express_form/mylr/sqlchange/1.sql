alter table user_info modify user_tel varchar(12) null;

alter table user_info modify user_real_name varchar(100) null;
alter table user_info modify user_gender varchar(8) null;
alter table user_info add column user_email varchar(200);
alter table user_info add column user_addr varchar(200);
desc user_info;