use bank;
-- 没被人绑过的银行卡
-- 1
INSERT INTO
    user_card (card_num, card_money)
VALUES
    (
        '6216630000000000060',
        '3000'
    );
-- 2
INSERT INTO
    user_card (card_num, card_money)
VALUES
    (
        '6216630000000000070',
        '5000'
    );
-- 3
INSERT INTO
    user_card (card_num, card_money)
VALUES
    (
        '6216630000000000080',
        '9000'
    );

-- 没有绑定银行卡的校园卡
-- 1
insert into campus_card
(	student_num ,
    student_real_name,
    remain_money)
values
(
	'12203602',
    '袁六',
    200
);
-- 2
insert into campus_card
(	student_num ,
    student_real_name,
    remain_money)
values
(
	'12205114',
    '李菲菲',
    500
);

