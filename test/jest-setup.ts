import { SetupServer } from '@src/server';
import supertest from 'supertest';

let server: SetupServer;

// Antes de cada teste, vamos rodar essa função
beforeAll(async () => {
    // Iniciando o servidor
    server = new SetupServer();
    await server.init();

    // Inicializando o supertest
    global.testRequest = supertest(server.getApp());
});

// Responsável por configurar o ambiente de testes do Jest
