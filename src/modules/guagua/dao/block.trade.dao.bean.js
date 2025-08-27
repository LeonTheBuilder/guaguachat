class BlockTradeDao {

    async startWorkerForSync() {
        this.Sugar.schedule(
            async () => this.sync(),
            60 * 1000 * 30  //
        );
    }

    async sync() {
        const lastTradeDay = await this.copService.getLastTradeDay();
        //
        const mark = `${this.name}_${lastTradeDay}`;
        if (await this.copService.hasMark({
            mark
        })) {
            return;
        }
        //
        const currentHourInt = this.copService.currentHourInt();
        if (currentHourInt < 16) {
            return;
        }
        await this.fetch({
            startDate: lastTradeDay,
            endDate: lastTradeDay
        });
        //
        await this.copService.mark({
            mark
        });
    }

    async fetch(args) {
        const {
            startDate,
            endDate
        } = args;
        this.log.info(".");

        const data = await this.akClient.call({
            api: "stock_dzjy_mrmx",
            params: {
                symbol: 'A股',
                start_date: startDate,
                end_date: endDate
            }
        });
        for (const item of data) {
            const tradeDay = parseInt(this.Sugar.convertDateStringFormat(item['交易日期'], 'YYYY-MM-DD', 'YYYYMMDD'));
            item.tradeDay = tradeDay;
            const id = await this.idgen.next();
            const data = this.CopData.build({id});
            data.type = this.name;
            data.tradeDay = tradeDay;
            data.value = item;
            await data.save();
        }
        this.log.info("done");
    }


}

module.exports = BlockTradeDao;