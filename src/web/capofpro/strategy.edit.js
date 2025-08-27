createApp({
    data: {
        id: params.get("id"),
        strategy: {},
        confirm: "null",
        //
        bigDealDaoValue: 0,
        blockTradeDaoValue: 0,
    },
    methods: {
        init: async function () {
            let self = this;
            self.initListeners();
            EventOp.pub(CommonEventsDef.page_ready);
        },
        initListeners: function () {
            let self = this;
            EventOp.sub(CommonEventsDef.page_ready, [self.getStrategy]);
        },
        getStrategy: async function () {
            let self = this;
            //
            const res = await strategyService.getStrategy({id: self.id});
            errMsgIf(res);
            self.strategy = res.data;

            // ----
            if (self.strategy.dataFetchConfig) {
                for (const fetch of self.strategy.dataFetchConfig) {
                    const {
                        dataType,
                        days
                    } = fetch;
                    //
                    const str = `self.${dataType}Value = days;`;
                    eval(`self.${dataType}Value = days;`);
                }
            }

        },
        dataFetchChange: async function () {
            let self = this;
            console.log('-----dataFetchChange-----');

        },
        updateStrategy: async function () {
            let self = this;
            //
            const dataFetchConfig = [
                {
                    dataType: 'bigDealDao',
                    days: self.bigDealDaoValue
                },
                {
                    dataType: 'blockTradeDao',
                    days: self.blockTradeDaoValue
                },
            ];


            //
            self.strategy.dataFetchConfig = dataFetchConfig;
            const res = await strategyService.updateStrategy({params: self.strategy});
            errMsgIf(res);
            toastSuccess("操作成功");
        },
        confirmDeleteStrategy: async function () {
            let self = this;
            self.confirm = async function () {
                console.log('------------- confirm ');
                const res = await strategyService.deleteStrategy({id: self.id});
                errMsgIf(res);
                toastSuccess("操作成功");
                window.location.href = "/";
            }
            showConfirmModal();
        },
    }
});