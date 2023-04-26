import { StormGlass } from '@src/clients/stormGlass';
import stormGlassWeather3HoursFixture from '@test/fixtures/stormglass_weather_3_hours.json';
import stormGlassNormalized3HoursFixture from '@test/fixtures/stormglass_normalized_response_3_hours.json';
import * as HTTPUtil from '@src/utils/request';

jest.mock('@src/utils/request');

describe('StormGlass client', () => {
    const MockedRequestClass = HTTPUtil.Requets as jest.Mocked<
        typeof HTTPUtil.Requets
    >;

    const mockedRequest =
        new HTTPUtil.Requets() as jest.Mocked<HTTPUtil.Requets>;

    const lat = -33.792726;
    const lng = 151.289824;

    it('should return the normalized forecast from the StormGlass service', async () => {
        // Quando o axios for chamado, retorne o objeto abaixo
        mockedRequest.get.mockResolvedValue({
            data: stormGlassWeather3HoursFixture,
        } as HTTPUtil.Response);

        // Definindo o mock da resposta
        const stormGlass = new StormGlass(mockedRequest);
        const response = await stormGlass.fetchPoints(lat, lng);

        // Definindo o mock da resposta
        expect(response).toEqual(stormGlassNormalized3HoursFixture);
    });

    it('should exclude incomplete data points', async () => {
        const incompleteResponse = {
            hours: [
                {
                    winDirection: {
                        noaa: 300,
                    },

                    time: '2020-04-26T00:00:00+00:00',
                },
            ],
        };

        // Testando se a resposta está sendo filtrada
        mockedRequest.get.mockResolvedValue({
            data: incompleteResponse,
        } as HTTPUtil.Response);

        // Definindo o mock da resposta
        const stormGlass = new StormGlass(mockedRequest);
        const response = await stormGlass.fetchPoints(lat, lng);

        // Espero que a resposta seja um array vazio
        expect(response).toEqual([]);
    });

    it('should get a generic error from StormGlass service when the request fail before reaching the service', async () => {
        mockedRequest.get.mockRejectedValue({ message: 'Network Error' });

        const stormGlass = new StormGlass(mockedRequest);

        await expect(stormGlass.fetchPoints(lat, lng)).rejects.toThrow(
            'Unexpected error when trying to communicate to StormGlass: Network Error'
        );
    });

    it('should get an StormGlassResponseError when the StormGlass service responds with error', async () => {
        MockedRequestClass.isRequestError.mockReturnValue(true);

        mockedRequest.get.mockRejectedValue({
            response: {
                status: 429,
                data: { errors: ['Rate Limit reached'] },
            },
        });

        const stormGlass = new StormGlass(mockedRequest);

        await expect(stormGlass.fetchPoints(lat, lng)).rejects.toThrow(
            'Unexpected error returned by the StormGlass service: Error: {"errors":["Rate Limit reached"]} Code: 429'
        );
    });
});
