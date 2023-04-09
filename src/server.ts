import "./utils/module-alias";
import bodyParser from "body-parser";
import { Server } from "@overnightjs/core";
import { ForecastController } from "./controllers/forecast";
import { Application } from "express";

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
    }

    // Definindo o express
    private setupExpress(): void {
        this.app.use(bodyParser.json());
        this.setupControllers();
    }

    // Definindo os controllers
    private setupControllers(): void {
        const forecastController = new ForecastController();
        this.addControllers([forecastController]);
    }

    // Tornando o App público
    public getApp(): Application {
        return this.app;
    }
}
