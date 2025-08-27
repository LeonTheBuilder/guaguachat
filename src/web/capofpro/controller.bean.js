class CopController {

    index = async (ctx) => {
        await this.vr.render(ctx, __dirname, "index.ejs")
    };

    mappings = [
        ['', 'GET', this.index],
        ['/', 'GET', this.index],
        ['/strategy/report', 'GET', async (ctx) => {
            await this.vr.render(ctx, __dirname, "report.ejs")
        }],
        ['/strategy/edit', 'GET', async (ctx) => {
            await this.vr.render(ctx, __dirname, "strategy.edit.ejs")
        }],
    ];
}

module.exports = CopController;
