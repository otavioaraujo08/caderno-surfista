import { StormGlass } from '@src/clients/stormGlass';
import axios from 'axios';
import stormGlassWeather3HoursFixture from '@test/fixtures/stormglass_weather_3_hours.json';
import stormGlassNormalized3HoursFixture from '@test/fixtures/stormglass_normalized_response_3_hours.json';

// Limpa o cache do módulo
jest.mock('axios');

describe('StormGlass client', () => {
    // Criando um mock do axios, com os tipos do axios, para forçar o typescript a inferir o tipo do meu dadod
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    // Definindo o mock da requisição
    const lat = -33.792726;
    const lng = 151.289824;

    it('should return the normalized forecast from the StormGlass service', async () => {
        // Quando o axios for chamado, retorne o objeto abaixo
        mockedAxios.get.mockResolvedValue({
            data: stormGlassWeather3HoursFixture,
        });

        // Definindo o mock da resposta
        const stormGlass = new StormGlass(mockedAxios);
        const response = await stormGlass.fetchPoints(lat, lng);

        // Definindo o mock da resposta
        expect(response).toEqual(stormGlassNormalized3HoursFixture);
    });

    // Dados que não possuem todas as chaves, devem ser excluidos
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
        mockedAxios.get.mockResolvedValue({ data: incompleteResponse });

        // Definindo o mock da resposta
        const stormGlass = new StormGlass(mockedAxios);
        const response = await stormGlass.fetchPoints(lat, lng);

        // Espero que a resposta seja um array vazio
        expect(response).toEqual([]);
    });
});
