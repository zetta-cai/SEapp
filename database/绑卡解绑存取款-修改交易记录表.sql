use bank;
create table deposit(
	deposit_num VARCHAR(20) primary key,
    deposit_money float not null,
    user_id VARCHAR(19) references user(id),
	deposit_type varchar(50),
    due int
);
-- fixed定期 current活期 due期限单位是月
INSERT INTO
    deposit (deposit_num, deposit_money, user_id, deposit_type, due)
VALUES
    (
        '77777777777777777777',
        '10000',
        '12203722',
        'fixed',
        12
    );
    
-- 交易记录进行了修改，因为存款账户位数多一位，要是在原有数据库基础上进行修改的话用下面两句
-- alter table transactions_history modify out_card_num varchar(21);
-- alter table transactions_history modify in_card_num varchar(21);

-- 交易记录primary key只用out_card_num是不行的，用以下语句在原数据库基础上修改
-- ALTER TABLE `bank`.`transactions_history` 
-- DROP PRIMARY KEY,
-- ADD PRIMARY KEY (out_card_num, in_card_num, transactions_time);

-- 两项修改后如下
create table transactions_history(
    transactions_type VARCHAR(50) not null,
    out__id VARCHAR(19) not null,
    out_card_num VARCHAR(21) not null,
    in__id VARCHAR(19) not null,
    in_card_num VARCHAR(21) not null,
    transactions_money float not null,
    transactions_time datetime not null,
    primary key(out_card_num, in_card_num, transactions_time)
);

-- 绑银行卡 user_id是已知的，card_num是输入的
select user_id from user_card where card_num = '456'; -- null 可以修改，不是null判断是否是当前user_id,是提示已绑定，不是提示不可以绑定
update user_card set user_id ='100'  where card_num = '456';
-- 解绑指定银行卡 就简单改成空了不知道行不行
update user_card set user_id = null where card_num = '12345678912312203722';

-- 存款 已知user_id，给定转账卡号'12345678912312203711'，准备存入1000元,已经有存款账户就使用存款账户，没有就新建一个
-- 查找存款账户 返回1就是有
select count(deposit_num) from deposit where user_id = "12203722";
-- 查看余额是否充足
select card_money from user_card where card_num = '12345678912312203711';
-- 1已有存款账户,修改银行卡，修改存款账户
update user_card set card_money = card_money - 1000 where card_num = '12345678912312203711';
update deposit set deposit_money = deposit_money + 1000 where user_id = '12203722';
-- 没有存款账户存1年（换了一个没有存款账户的user_id），卡号'12345678912345678912',改卡，新建存款账户，deposit_num为卡号后加一个1
select count(deposit_num) from deposit where user_id = "320681200010100033";
update user_card set card_money = card_money - 1000 where card_num = '12345678912345678912';
insert into deposit (deposit_num, deposit_money, user_id, deposit_type, due) values('123456789123456789121',1000,"320681200010100033",'fixed',12);
--  存款交易记录out_id和in_id都是当前取款用户，type是out,out_card_num是user_card_num, in_card_num是deposit_num
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
        '12345678912345678912',
        '12203722',
        '123456789123456789121',
        '1000',
        now()
    );
    
-- 定期自动转活期（定时修改数据库还没写）
update deposit set deposit_type = 'current' where deposit_type = 'fixed' and due = 0;

-- 取款 2000 已知存款账户‘123456789123122037111’取出到指定银行卡号‘12345678912345678912’
-- 活期:先判断钱够不够,够就是直接改卡，改存款账户，添加交易记录，不够不能取。定期不能取，定期到时间自动改成活期
select deposit_type from deposit where deposit_num = '123456789123122037111';-- 存款定期还是活期
select deposit_money from deposit where deposit_num = '123456789123122037111';-- 查钱数
update deposit set deposit_money = deposit_money - 2000 where deposit_num = '123456789123122037111';
update user_card set card_money = card_money + -2000 where card_num = '12345678912345678912';
--  取款交易记录out_id和in_id都是当前取款用户,type是in,,out_card_num是deposit_num,in_card_num是user_card_num
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
        '12203722',
        '123456789123122037111',
        '12203722',
        '12345678912345678912',
        '2000',
        now()
    );