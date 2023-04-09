import { SetupServer } from "@src/server";
import supertest from "supertest";

// Antes de cada teste, vamos rodar essa função
beforeAll(() => {
    // Iniciando o servidor
    const server = new SetupServer();
    server.init();

    // Inicializando o supertest
    global.testRequest = supertest(server.getApp());
});

// Responsável por configurar o ambiente de testes do Jest
