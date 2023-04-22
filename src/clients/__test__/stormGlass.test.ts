import { StormGlass } from '@src/clients/stormGlass';
import axios from 'axios';
import stormGlassWeather3HoursFixture from '@test/fixtures/stormglass_weather_3_hours.json';
import stormGlassNormalized3HoursFixture from '@test/fixtures/stormglass_normalized_response_3_hours.json';

// Limpa o cache do módulo
jest.mock('axios');

describe('StormGlass client', () => {
    // Criando um mock do axios, com os tipos do axios, para forçar o typescript a inferir o tipo do meu dadod
    const mockedAxios = axios as jest.Mocked<typeof axios>;

    it('should return the normalized forecast from the StormGlass service', async () => {
        // Definindo o mock da requisição
        const lat = -33.792726;
        const lng = 151.289824;

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
});
