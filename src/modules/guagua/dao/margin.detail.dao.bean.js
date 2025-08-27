class MarginDetailDao {

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
            date: lastTradeDay,
        });
        //
        await this.copService.mark({
            mark
        });
    }

    async fetch(args) {
        const {
            date,
        } = args;
        this.log.info(`.${date}`);


        const data = await this.akClient.call({
            api: "stock_margin_detail_sse",
            params: {
                date: date
            }
        });
        for (const item of data) {
            const id = await this.idgen.next();
            const data = this.CopData.build({id});
            data.type = "blockTrade";
            data.value = item;
            data.tradeDay = parseInt(date);
            await data.save();
        }
        this.log.info("done");

    }


}

module.exports = MarginDetailDao;