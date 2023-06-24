import { ClassMiddleware, Controller, Get } from '@overnightjs/core';
import { authMiddleware } from '@src/middlewares/auth';
import { Beach } from '@src/models/beach';
import { Forecast } from '@src/services/forecast';
import { Request, Response } from 'express';
import logger from '@src/logger';
import { BaseController } from '.';

const forecast = new Forecast();

@Controller('forecast')
@ClassMiddleware(authMiddleware)
export class ForecastController extends BaseController {
    @Get('')
    public async getForecastLoggedUser(
        request: Request,
        response: Response
    ): Promise<void> {
        try {
            const beaches = await Beach.find({ user: request.decoded?.id });
            const forecastData = await forecast.processForecastForBeaches(
                beaches
            );
            response.status(200).send(forecastData);
        } catch (error) {
            logger.error(error);
            this.sendCreatedUpdateErrorResponse(response, {
                code: 500,
                error: 'Something went wrong!',
            });
        }
    }
}
