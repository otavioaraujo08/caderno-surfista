import { StormGlass } from '@src/clients/stormGlass';
import { Beach, BeachPosition } from '@src/interfaces/IBeach';
import stormGlassNormalized3HoursFixture from '@test/fixtures/stormglass_normalized_response_3_hours.json';
import { Forecast, ForecastProcessingInternalError } from '../forecast';

jest.mock('@src/clients/stormGlass');

describe('Forecast Service', () => {
    const mockedStormGlassService = new StormGlass() as jest.Mocked<StormGlass>;
    const beaches: Beach[] = [
        {
            lat: -33.792726,
            lng: 151.289824,
            name: 'Manly',
            position: BeachPosition.E,
            user: 'some-id',
        },
    ];

    it('should return the forecast for a list of beaches', async () => {
        // Mockando a classe StormGlass, para que não seja feita a requisição para a API externa
        mockedStormGlassService.fetchPoints.mockResolvedValue(
            stormGlassNormalized3HoursFixture
        );

        const expectedResponse = [
            {
              time: '2020-04-26T00:00:00+00:00',
              forecast: [
                {
                  lat: -33.792726,
                  lng: 151.289824,
                  name: 'Manly',
                  position: 'E',
                  rating: 1,
                  swellDirection: 64.26,
                  swellHeight: 0.15,
                  swellPeriod: 3.89,
                  time: '2020-04-26T00:00:00+00:00',
                  waveDirection: 231.38,
                  waveHeight: 0.47,
                  windDirection: 299.45,
                  windSpeed: 100,
                },
              ],
            },
            {
              time: '2020-04-26T01:00:00+00:00',
              forecast: [
                {
                  lat: -33.792726,
                  lng: 151.289824,
                  name: 'Manly',
                  position: 'E',
                  rating: 1,
                  swellDirection: 123.41,
                  swellHeight: 0.21,
                  swellPeriod: 3.67,
                  time: '2020-04-26T01:00:00+00:00',
                  waveDirection: 232.12,
                  waveHeight: 0.46,
                  windDirection: 310.48,
                  windSpeed: 100,
                },
              ],
            },
            {
              time: '2020-04-26T02:00:00+00:00',
              forecast: [
                {
                  lat: -33.792726,
                  lng: 151.289824,
                  name: 'Manly',
                  position: 'E',
                  rating: 1,
                  swellDirection: 182.56,
                  swellHeight: 0.28,
                  swellPeriod: 3.44,
                  time: '2020-04-26T02:00:00+00:00',
                  waveDirection: 232.86,
                  waveHeight: 0.46,
                  windDirection: 321.5,
                  windSpeed: 100,
                },
              ],
            },
          ];

        const forecast = new Forecast(mockedStormGlassService);
        const beachesWithRating = await forecast.processForecastForBeaches(
            beaches
        );

        // Espera que o resultado seja igual ao esperado
        expect(beachesWithRating).toEqual(expectedResponse);
    });

    it("Should return an empty list when the beaches arrays is empty", async () => {
        const forecast =  new Forecast()
        const response = await forecast.processForecastForBeaches([])

        // Espera-se uma lista vazia
        expect(response).toEqual([])
    })

    it("Should throw internal processing error when something goes wrong during the rating process", async () => {
        // Retorno da função fetchPoints será um erro
        mockedStormGlassService.fetchPoints.mockRejectedValue(
            'Error fetching data'
        )

        const forecast = new Forecast(mockedStormGlassService)

        // Espera-se que a função processForecastForBeaches lance um erro
        await expect(forecast.processForecastForBeaches(beaches)).rejects.toThrow(ForecastProcessingInternalError)
    })
    });
