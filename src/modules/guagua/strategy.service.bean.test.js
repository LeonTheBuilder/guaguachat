const loadContext = require('../../loadcontext');


it('strategyService._generateDataFile', async () => {
    const a = await loadContext();
    const models = a.models;
    const beans = a.beans;
    // -------------------------------------------------------
    const strategyService = beans.strategyService;
    const filePath = await strategyService._generateDataFile([
        {
            dataType: 'blockTradeDao',
            days: 3
        }
    ]);
    console.log(filePath);
    // -------------------------------------------------------
    process.exit(0);
}).timeout(10 * 60 * 1000);


it('sdfsfsdfsdfsdf', async () => {
    const a = await loadContext();
    const models = a.models;
    const beans = a.beans;
    // -------------------------------------------------------
    const report = await models.StrategyReport.findByPk('202508271249480000001fb3n');
    const jsonStr = models.Sugar.extractJson(report.content);
    console.log(jsonStr);
    // -------------------------------------------------------
    process.exit(0);
}).timeout(10 * 60 * 1000);

