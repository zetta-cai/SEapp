#!/bin/sh
cd ../logs        # 这里指向项目的logs文件夹
# 拷贝access.log文件到新的文件，新的文件命名是2021-10-27-19.access这种格式，具体可以搜shell脚本获取日期的方法
cp access.log $(date +%Y-%m-%d-%H).access.log    
echo "" > access.log            # 将空内容写入access.log，即清空access.log文件
