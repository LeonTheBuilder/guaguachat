const loadContext = require('../../loadcontext');


it('copService.getLastTradeDays', async () => {
    const a = await loadContext();
    const models = a.models;
    const beans = a.beans;
    // -------------------------------------------------------
    const copService = beans.copService;
    const tradeDays = await copService.getLastTradeDays({
        pageSize: 3
    });
    console.log(tradeDays);
    // -------------------------------------------------------
    process.exit(0);
}).timeout(10 * 60 * 1000);


it('copService.getLastTradeDay', async () => {
    const a = await loadContext();
    const models = a.models;
    const beans = a.beans;
    // -------------------------------------------------------
    const copService = beans.copService;
    const lastTradeDay = await copService.getLastTradeDay({
        afterHour: 17
    });
    console.log(lastTradeDay);
    // -------------------------------------------------------
    process.exit(0);
}).timeout(10 * 60 * 1000);
