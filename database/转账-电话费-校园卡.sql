use bank;
-- 转账（暂时不考虑跨行转账哈）（假设指定转账卡号‘12345678912312203711'，转账200元）
-- 查询余额是否充足
-- select card_money from user_card where card_num = '12345678912312203711';
select count(card_num) from user_card where card_num = '123' and card_money >= 200 and user_id = '100';
-- 对方卡号是否存在（12345678912345678912）(可以根据count值判断也可以根据results.length是否为1判断)
select count(card_num) from user_card where card_num =  '12345678912345678912';
-- 修改自己的银行卡
-- 修改自己的银行卡金额
select * from user_card;
update user_card set card_money = card_money - 200 where user_id = '100' and card_num = '123' and card_money >=200;
update user_card set card_money = card_money - 200 where card_num = '12345678912312203711';
-- 修改接受方的银行卡
update user_card set card_money = card_money + 200 where card_num = '12345678912345678912';
-- 添加交易记录
select * from transactions_history;
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
        '100',
        '123',
        '101',
        '789',
        '200',
        now()
);
use bank;   
-- 新的交易记录
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
INSERT INTO transactions_history (
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
        '100',
        '123',
        '101',
        '789',
        '200',
        now()
);
delete from transactions_history where out__id = '100';

-- 电话卡充值（第三方接口不考虑）（充50）
-- 查询余额是否充足
select card_money from user_card where card_num = '12345678912312203711';
-- 修改自己的银行卡
update user_card set card_money = card_money - 50 where card_num = '12345678912312203711' and card_money >=50;
-- 添加交易记录（in_id写电话号，in_card_num就写电话卡第三方账户吧）
-- 添加交易记录
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
        '12203722',
        '12345678912312203711',
        '13361312985',
        '电话卡第三方账户',
        '50',
        now()
    );
    
-- 校园卡（第三方接口不考虑）
-- 校园卡将remain_money 改成默认值为0了，第三方提供校园卡除了银行卡号的信息，只要更新即可

-- 第一次要绑定校园卡(输入学号，银行卡号)
-- 输入卡号是否为本人银行卡
select count(*) from user_card where user_id = '12203722' and card_num = '12345678912312203711';
-- 校园卡是否已经被绑定以及校园卡是否和持卡人姓名一致
select account_num from campus_card where student_num = '12203722'; -- null 才能绑定
select count(*) from campus_card, user_info where user_id = '320681200010166666' and student_real_name = user_real_name; -- 1表示一致，可以绑定 
-- 校园卡表中更新数据
update campus_card set account_num = '12345678912312203711' where student_num = '12203722';

-- 1 有没有校园卡
select student_num 
from campus_card, user_card
where account_num = card_num and user_id = '100';
-- 2 钱够吗
select count(account_num) as usable from campus_card,user_card where account_num = card_num and user_id = '100' and card_money >= 200;
-- 3 扣银行卡钱
update user_card set card_money = card_money - 200 
where card_num in 
(select account_num from(select account_num from campus_card,user_card where account_num = card_num and user_id = '100')a);
-- 4 改校园卡 
update campus_card set remain_money = remain_money + 200 
where student_num in
(select student_num from(select student_num from campus_card,user_card where account_num = card_num and user_id = '100')a);

select * from campus_card;
select * from user_card;
update user_card set card_money = 400 where card_num = '123';
-- 充值200元
-- 查询银行卡余额是否充足
select card_money from user_card where card_num = '12345678912312203711';
-- 修改自己的银行卡
update user_card set card_money = card_money - 200 where card_num = '12345678912312203711';
update 
-- 添加交易记录（in_id写学号，in_card_num就写第三方账户吧）
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
        '12203722',
        '12345678912312203711',
        '12203722',
        '校园卡第三方账户',
        '200',
        now()
    );
    
-- 查询校园卡余额(绑定之后才可以查询余额，所以学号已知)
-- select remain_money from campus_card where student_num = '12203722';
select remain_money from campus_card, user_card where account_num = card_num and user_id = '100';
select *from campus_card;
select *from user_card;