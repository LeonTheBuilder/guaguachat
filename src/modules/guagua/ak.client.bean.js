class AkClient {
    async call(args) {
        const {
            api,
            params = {}
        } = args;
        //
        const response = await this.http.get({
            url: `http://127.0.0.1:8080/api/public/${api}`,
            headers: {
                'Accept': 'application/json',
            },
            params
        });
        const data = response.data;
        return data;
    }
}

module.exports = AkClient;