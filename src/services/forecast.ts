import { StormGlass } from '@src/clients/stormGlass';
import { Beach, BeachForecast } from '@src/interfaces/IBeach';
import { ForecastPoint } from '@src/interfaces/IStormGlass';
import { TimeForecast } from '@src/interfaces/ITime';
import { InternalError } from '@src/utils/errors/internal-error';

export class ForecastProcessingInternalError extends InternalError {
    constructor(message: string) {
        super(`Unexpected error during the forecast processing: ${message}`);
    }
}

export class Forecast {
    constructor(protected stormGlass = new StormGlass()) {}

    public async processForecastForBeaches(
        beaches: Beach[]
    ): Promise<TimeForecast[]> {
        try {
            // Criando um array de BeachForecast
            const pointsWithCorrectSources = [];

            for (const beach of beaches) {
                // Buscando os dados de cada praia
                const points = await this.stormGlass.fetchPoints(
                    beach.lat,
                    beach.lng
                );

                // Preenchendo o array de BeachForecast com os dados de cada praia
                const enrichedBeachData = this.enrichBeachData(points, beach);

                // Adicionando os dados de cada praia ao array de BeachForecast
                pointsWithCorrectSources.push(...enrichedBeachData);
            }

            return this.mapForecastByTime(pointsWithCorrectSources);
        } catch (error) {
            throw new ForecastProcessingInternalError((error as Error).message);
        }
    }

    private enrichBeachData(
        points: ForecastPoint[],
        beach: Beach
    ): BeachForecast[] {
        return points.map((e) => ({
            ...{
                lat: beach.lat,
                lng: beach.lng,
                name: beach.name,
                position: beach.position,
                rating: 1,
            },
            ...e,
        }));
    }

    private mapForecastByTime(forecast: BeachForecast[]): TimeForecast[] {
        const forecastByTime: TimeForecast[] = [];

        for (const point of forecast) {
            const timePoint = forecastByTime.find((f) => f.time === point.time);

            // Se ja existir um timePoint, adiciona o point ao array de forecast, senão cria um novo timePoint
            timePoint
                ? timePoint.forecast.push(point)
                : forecastByTime.push({
                      time: point.time,
                      forecast: [point],
                  });
        }

        return forecastByTime;
    }
}
