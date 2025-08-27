createApp({
    data: {
        strategies: [],
    },
    methods: {
        init: async function () {
            let self = this;
            self.initListeners();
            EventOp.pub(CommonEventsDef.page_ready);
        },
        initListeners: function () {
            let self = this;
            EventOp.sub(CommonEventsDef.page_ready, [self.getStrategies]);
        },
        getStrategies: async function () {
            let self = this;
            //
            const res = await strategyService.getStrategies();
            errMsgIf(res);
            self.strategies = res.data;
            //
        },
        createStrategy: async function () {
            let self = this;
            //
            const res = await strategyService.createStrategy();
            errMsgIf(res);
            window.location.href = '/strategy/edit?id=' + res.data;
        },
        runStrategy: async function (strategy) {
            let self = this;
            //
            const res = await strategyService.runStrategy({id: strategy.id});
            errMsgIf(res);
            //
            const reportId = res.data;
            window.location.href = '/strategy/report?id=' + reportId;
        },
    }
});