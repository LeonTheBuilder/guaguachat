class PageEventsDef {
    static get_report_sig = 'get_report_sig';
}

createApp({
    data: {
        id: params.get("id"),
        report: {},
    },
    methods: {
        init: async function () {
            let self = this;
            self.initListeners();
            EventOp.pub(CommonEventsDef.page_ready);
        },
        initListeners: function () {
            let self = this;
            EventOp.sub(CommonEventsDef.page_ready, [self.syncReport]);
            EventOp.sub(PageEventsDef.get_report_sig, [self.getReport]);
        },
        syncReport: async function () {
            let self = this;
            while (!self.report.sifStatus || self.report.sifStatus === "i") {
                EventOp.pub(PageEventsDef.get_report_sig);
                await sleep(3000);
            }
        },
        getReport: async function () {
            let self = this;
            let res = await strategyService.getReport({id: self.id});
            errMsgIf(res);
            self.report = res.data;
            // 3秒钟一次
            const reportJson = JSON.parse(self.report.content);
            //
            document.getElementById('div1').innerHTML = marked.parse(reportJson['重点监控股票清单']);
            document.getElementById('div2').innerHTML = marked.parse(reportJson['机构动向摘要']);
            document.getElementById('div3').innerHTML = marked.parse(reportJson['明日交易策略建议']);

        },
        downloadImage: async function () {
            await captureAndDownload("dzjyListContainer");
        },
    }
});