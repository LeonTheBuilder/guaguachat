const loadContext = require('../../loadcontext');


it('akClient.call', async () => {
    const a = await loadContext();
    const models = a.models;
    const beans = a.beans;
    // -------------------------------------------------------
    const akClient = beans.akClient;
    const data = await akClient.call({
        api: "stock_margin_detail_sse",
        params: {
            date: 20250826
        }
    });

    console.log(data);

    // -------------------------------------------------------
    process.exit(0);
}).timeout(10 * 60 * 1000);



