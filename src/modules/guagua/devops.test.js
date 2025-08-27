const loadContext = require('../../loadcontext');


it('cop.手动更新交易日数据', async () => {
    const a = await loadContext();
    const models = a.models;
    const beans = a.beans;
    // -------------------------------------------------------
    const copTradeDaysService = beans.copTradeDaysService;
    await copTradeDaysService.syncTradeDays();
    // -------------------------------------------------------
    process.exit(0);
}).timeout(10 * 60 * 1000);

