const loadContext = require('../../../loadcontext');


it('copBigTradeReport.realtimeQuotes', async () => {
    const a = await loadContext();
    const models = a.models;
    const beans = a.beans;
    // -------------------------------------------------------
    const copBigTradeReport = beans.copBigTradeReport;
    const res = await copBigTradeReport.realtimeQuotes({});
    a.log.info(res);
    // -------------------------------------------------------
    process.exit(0);
}).timeout(10 * 60 * 1000);


it('copBigTradeReport.generateDataFile', async () => {
    const a = await loadContext();
    const models = a.models;
    const beans = a.beans;
    // -------------------------------------------------------
    const copBigTradeReport = beans.copBigTradeReport;
    await copBigTradeReport.generateDataFile({});
    // -------------------------------------------------------
    process.exit(0);
}).timeout(10 * 60 * 1000);


