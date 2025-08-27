class CopService {

    // --------------------------------------------------------------------------------------
    // 当前天的 int8
    currentDateInt() {
        return parseInt(this.Sugar.curDate2String("YYYYMMDD"));
    }


    currentHourInt() {
        return parseInt(this.Sugar.curDate2String("HH"));
    }


    async hasMark(args) {
        const {
            mark
        } = args;
        //
        const instance = await this.Mark.findByPk(mark);
        return instance != null;
    }

    async mark(args) {
        const {
            mark
        } = args;
        if (await this.hasMark(args)) {
            return;
        }
        const instance = await this.Mark.build({id: mark});
        await instance.save();
    }


    async getLastTradeDays(args) {
        const {
            pageSize = 3,
        } = args;
        //
        const curDateInt = this.currentDateInt();

        // 如果 TradeDay 表中没有数据，则抛出异常
        this.BizError.accidentIf(await this.TradeDay.count() <= 0, '没有交易日数据');
        //
        const tradeDays = await this.TradeDay.findAll({
            where: {
                id: {
                    [this.Sequelize.Op.lte]: curDateInt
                }
            },
            order: [
                ['id', 'DESC']
            ],
            limit: pageSize
        });
        // 返回 tradeDays 的每个 id
        return tradeDays.map(item => item.id);
    }

    async getLastTradeDay(args) {
        const tradeDays = await this.getLastTradeDays({
            pageSize: 1,
        });
        //
        return tradeDays[0];
    }

}

module.exports = CopService;