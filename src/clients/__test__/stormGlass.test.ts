import { StormGlass } from '@src/clients/stormGlass';

describe('StormGlass client', () => {
    it('should return the normalized forecast from the StormGlass service', async () => {
        // Definindo o mock da requisição
        const lat = -33.792726;
        const lng = 151.289824;

        // Definindo o mock da resposta
        const stormGlass = new StormGlass();
        const response = await stormGlass.fetchPoints(lat, lng);

        // Definindo o mock da resposta
        expect(response).toEqual({});
    });
});
