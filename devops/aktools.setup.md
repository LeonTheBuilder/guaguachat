# 安装

cd /Users/chence/dev/tmp
mkdir aktools
cd aktools
python3 -m venv venv
source ./venv/bin/activate
source ./venv/bin/activate.fish
pip install aktools -i https://pypi.tuna.tsinghua.edu.cn/simple

# 启动

cd /Users/chence/dev/tmp
cd aktools
source ./venv/bin/activate.fish
python -m aktools

# 测试可用性

http://127.0.0.1:8080/api/public/stock_zh_a_hist

# 更新 aktools

pip install aktools --upgrade -i https://pypi.tuna.tsinghua.edu.cn/simple

# 参考资料

https://akshare.akfamily.xyz/index.html