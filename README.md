# 依赖组件安装

npm install account_service@git+https://github.com/LeonTheBuilder/account_service.git
npm install ai_service@git+https://github.com/LeonTheBuilder/ai_service.git
npm install web_resources@git+https://github.com/LeonTheBuilder/web_resources.git

验证 aktools 服务，使用浏览器访问
http://127.0.0.1:8080/api/public/stock_dzjy_mrmx?start_date=20250815&end_date=20250815&symbol=A%E8%82%A1

# 安装依赖

npm install
npm update aframework
npm update user_service
npm update ai_service
npm update message_service
npm run dev

# 设计

## 数据获取

数据获取采用能见到就抓取的原则，尽可能获取可见的全量数据。

数据的类型包括：交易数据、新闻数据。

对于多个网站存在相同数据（比如都有股票列表、股票基础信息）的处理原则：同一种数据可以有多个抓取器，但是同一时间只使用（生效）一个，避免重复抓取。

对于数据没有唯一标识（比如大宗交易列表，就无法确定一条数据是否重复抓取了）的处理原则：采用静止原则，等待数据静止了在抓取。比如15点之后大单交易列表就静止了，或者14点之后抓取14点之前的数据。同一份数据只抓取一次，如果重新抓取就将原有数据删除。

最小路径原则：就是按照一定的顺序打开页面，尝试打开最少的页面获取最多的数据。比如股票列表页是一个可以 loop
的页面，列表每一项都可以进入到股票明细页，而股票明细页可以获得大宗交易、融资融券、十大持股等信息。


