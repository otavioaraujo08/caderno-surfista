// Criando os testes iniciais para a rota /forecast, esperando que o status seja 200 e que o body seja do tipo Forecast
describe("Beach forecast functional tests", () => {
    it("should return a forecast with just a few times", async () => {
        // Vamos testar a rota /forecast
        const { body, status } = await global.testRequest.get("/forecast");

        // Esperamos que o status da requisição seja 200
        expect(status).toBe(200);

        // Esperamos que o body seja do tipo Forecast
        expect(body).toEqual([
            {
                time: "2020-04-26T00:00:00+00:00",
                forecast: [
                    {
                        lat: -33.792726,
                        lng: 151.289824,
                        name: "Manly",
                        position: "E",
                        rating: 2,
                        swellDirection: 64.26,
                        swellHeight: 0.15,
                        swellPeriod: 3.89,
                        time: "2020-04-26T00:00:00+00:00",
                        waveDirection: 231.38,
                        waveHeight: 0.47,
                        windDirection: 299.45,
                    },
                ],
            },
            {
                time: "2020-04-26T01:00:00+00:00",
                forecast: [
                    {
                        lat: -33.792726,
                        lng: 151.289824,
                        name: "Manly",
                        position: "E",
                        rating: 2,
                        swellDirection: 123.41,
                        swellHeight: 0.21,
                        swellPeriod: 3.67,
                        time: "2020-04-26T01:00:00+00:00",
                        waveDirection: 232.12,
                        waveHeight: 0.46,
                        windDirection: 310.48,
                    },
                ],
            },
        ]);
    });
});
