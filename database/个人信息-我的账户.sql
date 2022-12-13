use bank;
-- 个人信息 真实姓名和性别都改成默认空
create table user_info(
    user_id VARCHAR(19) not null,
    user_tel VARCHAR(12) not null,
    user_real_name VARCHAR(100) null,
    address varchar(100) null,
    user_gender VARCHAR(8) null,
    PRIMARY KEY (user_id)
);
-- 注册时已知user_id和tel，在user_info中插入数据
insert into user_info(user_id,user_tel) values("320681200010166666","19549167703");
-- 查询个人信息（显示在个人信息界面）已知当前用户user_id为"320681200010166666"
select user.user_id, user_tel, user_real_name, address, user_gender,user.user_name
from user_info,user
where user.user_id = "320681200010166666" and user.user_id = user_info.user_id;

-- 修改个人信息（只有姓名、性别电话号可以修改）当前user_id已知
-- 修改真实姓名（输入）
update user_info set user_real_name = "孙喻" where  user_id= "320681200010166666";
-- 修改性别（输入）
update user_info set user_gender = "female" where  user_id= "320681200010166666";
-- 修改电话号（输入）(验证机制没有)
update user_info set user_tel = "13361312985" where  user_id= "320681200010166666";
-- 修改地址
update user_info set address = '江苏省徐州市铜山区大学路1号中国矿业大学'where user_id ="320681200010166666" ;


-- 最近五笔消费(出账)显示交易类型，出账卡号，收账卡号，交易金额，交易时间
select transactions_type,my_id,my_card_num,the_other_card_num,transactions_money,transactions_time 
from transactions_history
where my_id = "100"
order by transactions_time DESC;

-- 账户查询(已知user_id)
-- 显示所有银行卡和存款账户卡号
select card_num from user_card where user_id = "100";
select deposit_num from deposit where user_id = "12203722";
-- 查看指定银行卡或存款账户信息（此时已知卡号和存款账户号）
-- 银行卡
select card_money from user_card where card_num = "123"and user_id = '100';-- 余额
select user_real_name from user_info where user_id = "320681200010166666";-- 持卡人姓名
-- 存款账户
select deposit_type, deposit_money, due from deposit where deposit_num = "123456789123122037111";-- 存款类型、金额、期限一起返回吧
select user_real_name from user_info where user_id = "320681200010166666";-- 开户人姓名

select * from user_card;
INSERT INTO
    user_card (card_num, card_money, user_id)
VALUES
    (
        '234',
        '100000',
        '100'
    );
INSERT INTO
user_card (card_num, card_money)
VALUES
    (
        '456',
        100000
    );
INSERT INTO
    user_card (card_num, card_money)
VALUES
    (
        '567',
        100000
    );
    
update user_card set user_id= null where user_id like'1__';
