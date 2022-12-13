use bank;
-- user
-- 用户1
INSERT INTO
    user (user_id, user_name, user_password)
VALUES
    ('370611200208152032', 'user1', '123123');
-- 用户2
INSERT INTO
    user (user_id, user_name, user_password)
VALUES
    ('370611200109134031', 'user2', '456456');
    
-- 用户3
INSERT INTO
    user (user_id, user_name, user_password)
VALUES
    ('370611200003094042', 'user3', '789789');
    
-- user_card
-- user1的卡1
INSERT INTO
    user_card (card_num, card_money, user_id)
VALUES
    (
        '6216630000000000010',
        '10000',
        '370611200208152032'
    );
-- user1的卡2
INSERT INTO
    user_card (card_num, card_money, user_id)
VALUES
    (
        '6216630000000000020',
        '20000',
        '370611200208152032'
    );
-- user2的卡1
INSERT INTO
    user_card (card_num, card_money, user_id)
VALUES
    (
        '6216630000000000030',
        '1000',
        '370611200109134031'
    );
-- user2的卡2
INSERT INTO
    user_card (card_num, card_money, user_id)
VALUES
    (
        '6216630000000000040',
        '2000',
        '370611200109134031'
    );
-- user3的卡1 只有10块
INSERT INTO
    user_card (card_num, card_money, user_id)
VALUES
    (
        '6216630000000000050',
        '10',
        '370611200003094042'
    );
    
-- user_info
-- user1的信息
INSERT INTO
    user_info (user_id, user_tel, user_real_name, user_gender)
VALUES
    (
        '370611200208152032',
        '13336381925',
        '张三',
        'male'
    );
-- user2的信息
INSERT INTO
    user_info (user_id, user_tel, user_real_name, user_gender)
VALUES
    (
        '370611200109134031',
        '19549160003',
        '李四',
        'female'
    );
-- user3的信息
INSERT INTO
    user_info (user_id, user_tel, user_real_name, user_gender)
VALUES
    (
        '370611200003094042',
        '19530327703',
        '王五',
        'female'
    );
-- campus_card
-- user1的学生卡没绑银行卡
insert into campus_card
(	student_num ,
    student_real_name,
    remain_money)
values
(
	'12203722',
    '张三',
    200
);
-- user2的学生卡绑了银行卡
insert into campus_card
(	student_num ,
	account_num,
    student_real_name,
    remain_money)
values
(
	'12204202',
    '6216630000000000030',
    '李四',
    500
);
-- user3没有学生卡

-- 存款
-- user1的存款单1 定期1年没到期
insert into saving(user_id,saving_money,rate,saving_time,due_time) 
values('370611200208152032',2000,1.65,current_date(),date_add(current_date(),INTERVAL 1 YEAR));
-- user1的存款单2 定期一年已到期
insert into saving(user_id,saving_money,rate,saving_time,due_time) 
values('370611200208152032',2000,1.65,'2021-12-12','2022-12-12');
-- user2的存款单1 活期1年
insert into saving(user_id,saving_money,rate,saving_time,due_time) 
values('370611200109134031',2000,0.25,current_date(),current_date());
-- user2的存款单1 定期2年没到期
insert into saving(user_id,saving_money,rate,saving_time,due_time) 
values('370611200109134031',1000,2.15,current_date(),date_add(current_date(),INTERVAL 2 YEAR));
-- user3的存款单1 定期3年没到期
insert into saving(user_id,saving_money,rate,saving_time,due_time) 
values('370611200003094042',10000,2.60,current_date(),date_add(current_date(),INTERVAL 3 YEAR));

-- 交易记录
-- user1的卡1给卡2转200
INSERT INTO
    transactions_history (
        transactions_type,
        my_id,
		my_card_num,
        the_other_id,
        the_other_card_num,
        transactions_money,
        transactions_time
    )
VALUES
    (
        'out',
        '370611200208152032',
        '6216630000000000010',
        '370611200208152032',
        '6216630000000000010',
        200,
        now()
);

INSERT INTO
    transactions_history (
        transactions_type,
        my_id,
		my_card_num,
        the_other_id,
        the_other_card_num,
        transactions_money,
        transactions_time
    )
VALUES
    (
        'in',
        '370611200208152032',
        '6216630000000000010',
        '370611200208152032',
        '6216630000000000010',
        200,
        now()
);
-- user1的卡1给user2的卡1转300
INSERT INTO
    transactions_history (
        transactions_type,
        my_id,
		my_card_num,
        the_other_id,
        the_other_card_num,
        transactions_money,
        transactions_time
    )
VALUES
    (
        'out',
        '370611200208152032',
        '6216630000000000010',
        '370611200109134031',
        '6216630000000000030',
        300,
        now()
);
INSERT INTO
    transactions_history (
        transactions_type,
        my_id,
		my_card_num,
        the_other_id,
        the_other_card_num,
        transactions_money,
        transactions_time
    )
VALUES
    (
        'in',
        '370611200109134031',
        '6216630000000000030',
        '370611200208152032',
        '6216630000000000010',
        300,
        now()
);

-- user2的卡1给卡2转400
INSERT INTO
    transactions_history (
        transactions_type,
        my_id,
		my_card_num,
        the_other_id,
        the_other_card_num,
        transactions_money,
        transactions_time
    )
VALUES
    (
        'out',
        '370611200109134031',
        '6216630000000000030',
        '370611200109134031',
        '6216630000000000040',
        400,
        now()
);

INSERT INTO
    transactions_history (
        transactions_type,
        my_id,
		my_card_num,
        the_other_id,
        the_other_card_num,
        transactions_money,
        transactions_time
    )
VALUES
    (
        'in',
        '370611200109134031',
        '6216630000000000040',
        '370611200109134031',
        '6216630000000000030',
        400,
        now()
);
-- user3的卡给user1的卡1转1000
INSERT INTO
    transactions_history (
        transactions_type,
        my_id,
		my_card_num,
        the_other_id,
        the_other_card_num,
        transactions_money,
        transactions_time
    )
VALUES
    (
        'out',
        '370611200003094042',
        '6216630000000000050',
        '370611200208152032',
        '6216630000000000010',
        1000,
        now()
);
INSERT INTO
    transactions_history (
        transactions_type,
        my_id,
		my_card_num,
        the_other_id,
        the_other_card_num,
        transactions_money,
        transactions_time
    )
VALUES
    (
        'in',
        '370611200208152032',
        '6216630000000000010',
        '370611200003094042',
        '6216630000000000050',
        1000,
        now()
);