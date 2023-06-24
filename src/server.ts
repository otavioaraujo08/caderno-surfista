import './utils/module-alias';
import bodyParser from 'body-parser';
import { Server } from '@overnightjs/core';
import { ForecastController } from './controllers/forecast';
import { Application } from 'express';
import expressPino from 'express-pino-logger';
import cors from 'cors';
import * as database from '@src/database';
import { BeachesController } from './controllers/beaches';
import { UsersController } from './controllers/users';
import logger from './logger';

// Definindo nosso servidor
export class SetupServer extends Server {
    // Definindo a porta do servidor
    constructor(private port = 3000) {
        super();
    }

    // Iniciando o servidor
    public async init(): Promise<void> {
        this.setupExpress();
        this.setupControllers();

        await this.databaseSetup();
    }

    // Definindo o express
    private setupExpress(): void {
        this.app.use(bodyParser.json());
        this.app.use(expressPino({ logger }));
        this.app.use(
            cors({
                origin: '*',
            })
        );
    }

    // Definindo os controllers
    private setupControllers(): void {
        const forecastController = new ForecastController();
        const beachesController = new BeachesController();
        const usersController = new UsersController();

        this.addControllers([
            forecastController,
            beachesController,
            usersController,
        ]);
    }

    // Definindo o método para iniciar o banco de dados
    private async databaseSetup(): Promise<void> {
        await database.connect();
    }

    // Definindo o método para fechar as funcionalidades do servidor
    public async close(): Promise<void> {
        await database.close();
    }

    // Tornando o App público
    public getApp(): Application {
        return this.app;
    }

    public start(): void {
        this.app.listen(this.port, () => {
            logger.info('******************************');
            logger.info(`        SERVER STARTED        `);
            logger.info(`    Listening on port ${this.port} `);
            logger.info('******************************');
        });
    }
}
