create database bank;

-- 账号
create table user(
    user_id VARCHAR(19) NOT NULL,
    user_name VARCHAR(20) NOT NULL,
    user_password VARCHAR(20) NOT NULL,
    PRIMARY KEY (user_id)
);

INSERT INTO
    user (user_id, user_name, user_password)
VALUES
    ('320681200010100033', 'root', '123123');

INSERT INTO
    user (user_id, user_name, user_password)
VALUES
    ('320681198410100033', 'test1', '132131');

-- 个人信息
create table user_info(
    user_id VARCHAR(19) not null,
    user_tel VARCHAR(12) not null,
    user_real_name VARCHAR(100) not null,
    user_gender VARCHAR(8) not null,
    PRIMARY KEY (user_id)
);

INSERT INTO
    user_info (user_id, user_tel, user_real_name, user_gender)
VALUES
    (
        '320681200010100033',
        '133133313333',
        '测试员1',
        'male'
    );

INSERT INTO
    user_info (user_id, user_tel, user_real_name, user_gender)
VALUES
    (
        '320681198410100033',
        '144144414444',
        '测试员2',
        'female'
    );

-- 银行卡
create table user_card(
    card_num VARCHAR(20) primary key,
    card_money float not null,
    user_id VARCHAR(19) references user(id)
);

INSERT INTO
    user_card (card_num, card_money, user_id)
VALUES
    (
        '12345678912345678912',
        '10000',
        '320681200010100033'
    );

INSERT INTO
    user_card (card_num, card_money, user_id)
VALUES
    (
        '98765432198765432121',
        '20000',
        '320681200010100033'
    );

-- 交易记录
create table transactions_history(
    transactions_type VARCHAR(50) not null,
    out__id VARCHAR(19) not null,
    out_card_num VARCHAR(20) primary key,
    in__id VARCHAR(19) not null,
    in_card_num VARCHAR(20) not null,
    transactions_money float not null,
    transactions_time datetime not null
);

INSERT INTO
    transactions_history (
        transactions_type,
        out__id,
        out_card_num,
        in__id,
        in_card_num,
        transactions_money,
        transactions_time
    )
VALUES
    (
        'in',
        '320681200010100033',
        '12345678912345678912',
        '320681200010100033',
        '98765432198765432121',
        '100',
        now()
    );

INSERT INTO
    transactions_history (
        transactions_type,
        out__id,
        out_card_num,
        in__id,
        in_card_num,
        transactions_money,
        transactions_time
    )
VALUES
    (
        'out',
        '320681200010100033',
        '98765432198765432121',
        '320681200010100033',
        '12345678912345678912',
        '100',
        now()
    );

-- 校园卡
create table campus_card(
    student_num VARCHAR(8) primary key,
    account_num VARCHAR(20) references card(num),
    student_real_name VARCHAR(100) not null,
    remain_money float not null
);