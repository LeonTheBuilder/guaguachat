class StrategyService {

    _strategyMq = '_strategyMq';

    // ---------------------------------------------------------------------------------------------
    async runStrategy(args) {
        const {
            _uid, _verify,
            id
        } = args;
        const strategy = await this.getStrategy(args);
        //
        const reportId = await this.idgen.next();
        const strategyReport = this.StrategyReport.build({id: reportId});
        strategyReport.strategyId = strategy.id;
        strategyReport.sifStatus = this.SifStatus.i;
        await strategyReport.save();
        //
        await this.mq.send(this._strategyMq, reportId);
        return reportId;
    }


    async startWorkerForRunStrategy() {
        while (true) {
            try {
                const reportId = await this.mq.popblock(this._strategyMq);
                await this.generateReport({reportId});
            } catch (e) {
                this.log.error(e);
            }
        }
    }

    async generateReport(args) {
        const {
            reportId
        } = args;
        //
        const report = await this.StrategyReport.findByPk(reportId);
        const strategy = await this.getStrategy({id: report.strategyId});
        try {
            //
            const dataFetchConfig = strategy.dataFetchConfig;
            const dataFilePath = await this._generateDataFile(dataFetchConfig);
            //

            const llmArgs = {
                provider: 'bailian',
                params: {
                    model: 'qwen-turbo',
                    temperature: 0.3,
                    messages: [
                        {role: "user", content: strategy.prompts}
                    ],
                    enableSearch: false,
                    maxToken: 16384,
                    _filePath: dataFilePath
                }
            };
            const resp = await this.llmTextService.complete(llmArgs);
            const json = this.Sugar.extractJson(resp.content);
            report.content = JSON.stringify(json);
            report.sifStatus = this.SifStatus.s;
        } catch (e) {
            this.log.error(e);
            report.sifStatus = this.SifStatus.f;
        }
        //
        await report.save();
        //
    }


    async _generateDataFile(dataFetchConfig) {

        const strParts = [];

        for (const fetch of dataFetchConfig) {
            const {
                dataType,
                days
            } = fetch;
            //
            if (!days || days === 0) {
                continue;
            }
            //
            const lastTradeDays = await this.copService.getLastTradeDays({pageSize: days});
            const tradeDay = lastTradeDays[days - 1];
            const dataRows = await this.CopData.findAll({
                where: {
                    type: dataType,
                    tradeDay: {
                        [this.Sequelize.Op.gte]: tradeDay
                    },
                }
            });
            const rawDatas = dataRows.map(row => row.value);

            //
            let title = null;
            switch (dataType) {
                case 'bigDealDao':
                    title = '# 大单交易数据';
                    break;
                case 'blockTradeDao':
                    title = '# 大宗交易数据';
                    break;
            }
            //
            strParts.push(title);
            strParts.push("\n");
            strParts.push(JSON.stringify(rawDatas));
            strParts.push("\n");
        }
        const dataFileContent = strParts.join('\n');
        const fileId = await this.idgen.next();
        const filePath = `${this.pathFinder.appGenFolder()}/${fileId}.gen.md`;
        this.Sugar.writeFile(filePath, dataFileContent);
        return filePath;
    }

    // ---------------------------------------------------------------------------------------------
    async getReport(args) {
        const {
            id
        } = args;
        //
        const report = await this.StrategyReport.findByPk(id);
        return report;
    }

    // ---------------------------------------------------------------------------------------------

    async deleteStrategy(args) {
        const {
            _uid, _verify,
            id
        } = args;
        const strategy = await this.getStrategy({_uid, _verify, id});
        await strategy.destroy();
    }

    async createStrategy(args) {
        const {
            _uid, _verify,
            userId,
        } = args;
        const id = await this.idgen.next();
        const strategy = this.Strategy.build({id});
        strategy.userId = userId;
        await strategy.save();
        return id;
    }

    async getStrategies(args) {
        const {
            _uid, _verify,
            userId
        } = args;

        const strategies = await this.Strategy.findAll({
            where: {
                userId: userId,
            },
            order: [
                ['id', 'DESC']
            ]
        });
        return strategies;
    }

    async getStrategy(args) {
        const {
            _uid, _verify,
            id
        } = args;
        const strategy = await this.Strategy.findByPk(id);
        this.BizError.noAuthErrIf(_verify && strategy && strategy.userId !== _uid);
        return strategy;
    }

    async updateStrategy(args) {
        const {
            _uid, _verify,
            params
        } = args;
        //
        this.log.info(args);
        //
        const strategy = await this.getStrategy({_uid, _verify, id: params.id});
        strategy.set(params);
        await strategy.save();
    }


    apis = [
        [this.createStrategy, async (ctx) => {
            const args = await this.ah.ctx2args(ctx, true, true);
            args.userId = args._uid;
            ctx.body = await this.createStrategy(args);
        }],
        [this.updateStrategy, async (ctx) => {
            const args = await this.ah.ctx2args(ctx, true, true);
            await this.updateStrategy(args);
        }],
        [this.getStrategies, async (ctx) => {
            const args = await this.ah.ctx2args(ctx, true, true);
            args.userId = args._uid;
            ctx.body = await this.getStrategies(args);
        }],
        [this.deleteStrategy, async (ctx) => {
            const args = await this.ah.ctx2args(ctx, true, true);
            await this.deleteStrategy(args);
        }],
        [this.getStrategy, async (ctx) => {
            const args = await this.ah.ctx2args(ctx, true, true);
            ctx.body = await this.getStrategy(args);
        }],
        [this.runStrategy, async (ctx) => {
            const args = await this.ah.ctx2args(ctx, true, true);
            ctx.body = await this.runStrategy(args);
        }],
        [this.getReport, async (ctx) => {
            const args = await this.ah.ctx2args(ctx, true, true);
            ctx.body = await this.getReport(args);
        }],


    ];


}

module.exports = StrategyService;