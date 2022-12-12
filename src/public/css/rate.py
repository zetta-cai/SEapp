import os

import requests
import re
from bs4 import BeautifulSoup
r = requests.get("https://www.bankofchina.com/fimarkets/lilv/fd31/202209/t20220915_21788988.html")
r.encoding = r.apparent_encoding
soup = BeautifulSoup(r.text, "html.parser")
# 活期存款利率
node1 = soup.find('td',string=re.compile('活期存款'))
current_rate = node1.find_next_sibling().string.split('\xa0')[0]
# 定期存款利率
# 一年
node2 = soup.find('td',string=re.compile('一年'))
oneY_rate = node2.find_next_sibling().string.split('\xa0')[0]
# 两年
node3 = soup.find('td',string=re.compile('二年'))
twoY_rate = node3.find_next_sibling().string.split('\xa0')[0]
# 三年
node4 = soup.find('td',string=re.compile('三年'))
threeY_rate = node4.find_next_sibling().string.split('\xa0')[0]

f = open('./rate.txt', 'a+')
f.write(current_rate + ' ')
f.write(oneY_rate + ' ')
f.write(twoY_rate + ' ')
f.write(threeY_rate)
f.close()
