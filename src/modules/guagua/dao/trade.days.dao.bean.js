class TradeDaysDao {

    async startWorkerForSync() {
        this.Sugar.schedule(
            async () => this.sync(),
            60 * 1000 * 30  //
        );
    }


    async sync() {
        // 获得今天的 日期 int4
        const curDateInt = parseInt(this.Sugar.curDate2String("YYYY"));
        const maxTradeDay = await this.TradeDay.max("id");
        this.log.info(`maxTradeDay is ${maxTradeDay}`);
        const needSync = !maxTradeDay || maxTradeDay < curDateInt * 10000;
        if (!needSync) {
            this.log.info(`no need sync trade days`);
            return;
        }
        //
        await this.fetch();
    }

    async fetch() {
        this.log.info(".");
        //
        const data = await this.akClient.call({
            api: "tool_trade_date_hist_sina",
        });
        for (const item of data) {
            const dayInt = parseInt(this.Sugar.convertDateStringFormat(item.trade_date, "YYYY-MM-DD", "YYYYMMDD"))
            await this.TradeDay.upsert({
                id: dayInt,
            });
        }
        //
        this.log.info("done");
    }


}

module.exports = TradeDaysDao;