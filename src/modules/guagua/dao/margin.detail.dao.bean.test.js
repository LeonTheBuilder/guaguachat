const loadContext = require('../../../loadcontext');


it('marginDetailDao.sync', async () => {
    const a = await loadContext();
    const models = a.models;
    const beans = a.beans;
    // -------------------------------------------------------
    const marginDetailDao = beans.marginDetailDao;
    await marginDetailDao.sync();
    // -------------------------------------------------------
    process.exit(0);
}).timeout(10 * 60 * 1000);

