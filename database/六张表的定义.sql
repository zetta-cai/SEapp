create database newbank;
-- 账号
create table user(
    user_id VARCHAR(19) NOT NULL,
    user_name VARCHAR(20) NOT NULL,
    user_password VARCHAR(20) NOT NULL,
    PRIMARY KEY (user_id)
);

-- 个人信息
create table user_info(
    user_id VARCHAR(19) not null,
    user_tel VARCHAR(12) not null,
    user_real_name VARCHAR(100) null,
    address varchar(100) null,
    user_gender VARCHAR(8) null,
    PRIMARY KEY (user_id)
);

-- 银行卡
create table user_card(
    card_num VARCHAR(20) primary key,
    card_money float not null,
    user_id VARCHAR(19) references user(id)
);

-- 交易记录
create table transactions_history(
    transactions_type VARCHAR(50) not null,
    my_id VARCHAR(19) not null,
    my_card_num VARCHAR(21) not null,
    the_other_id VARCHAR(19) not null,
    the_other_card_num VARCHAR(21) not null,
    transactions_money float not null,
    transactions_time datetime not null,
    primary key(my_card_num, the_other_card_num, transactions_time)
);

-- 校园卡
create table campus_card(
    student_num VARCHAR(8) primary key,
    account_num VARCHAR(20) references card(num),
    student_real_name VARCHAR(100) not null,
    remain_money float default 0
);
-- 存款单
create table saving
(
user_id VARCHAR(19) not null,
saving_num  int not null AUTO_INCREMENT,
saving_money float not null,
rate float not null,
saving_time date not null, -- 存款时间
due_time date not null, -- 到期时间
primary key(saving_num, user_id)
); 