describe('Beaches functional tests', () => {
    describe('When creating a beach', () => {
        it('should create a beach with success', async () => {
            const newBeach = {
                lat: -1.6161877972406482,
                lng: -48.812844829117886,
                name: 'Beja',
                position: 'N',
            };

            const response = await global.testRequest
                .post('/beaches')
                .send(newBeach);

            // Esperamos que a resposta seja 201 e que o corpo da resposta seja igual ao newBeach
            expect(response.status).toBe(201);
            expect(response.body).toEqual(expect.objectContaining(newBeach));
        });
    });
});
