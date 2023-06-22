import { ClassMiddleware, Controller, Get } from '@overnightjs/core';
import { authMiddleware } from '@src/middlewares/auth';
import { Beach } from '@src/models/beach';
import { Forecast } from '@src/services/forecast';
import { Request, Response } from 'express';
import logger from '@src/logger';

const forecast = new Forecast();

@Controller('forecast')
@ClassMiddleware(authMiddleware)
export class ForecastController {
    @Get('')
    public async getForecastLoggedUser(
        req: Request,
        response: Response
    ): Promise<void> {
        try {
            const beaches = await Beach.find({ user: req.decoded?.id });
            const forecastData = await forecast.processForecastForBeaches(
                beaches
            );
            response.status(200).send(forecastData);
        } catch (error) {
            logger.error(error);
            response.status(500).send({ error: 'Something went wrong' });
        }
    }
}
