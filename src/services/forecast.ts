import { StormGlass } from '@src/clients/stormGlass';
import { Beach, BeachForecast } from '@src/interfaces/IBeach';
import { TimeForecast } from '@src/interfaces/ITime';

export class Forecast {
    constructor(protected stormGlass = new StormGlass()) {}

    public async processForecastForBeaches(
        beaches: Beach[]
    ): Promise<TimeForecast[]> {
        // Criando um array de BeachForecast
        const pointsWithCorrectSources = [];

        for (const beach of beaches) {
            // Buscando os dados de cada praia
            const points = await this.stormGlass.fetchPoints(
                beach.lat,
                beach.lng
            );

            // Preenchendo o array de BeachForecast com os dados de cada praia
            const enrichedBeachData = points.map((e) => ({
                ...{
                    lat: beach.lat,
                    lng: beach.lng,
                    name: beach.name,
                    position: beach.position,
                    rating: 1,
                },
                ...e,
            }));

            // Adicionando os dados de cada praia ao array de BeachForecast
            pointsWithCorrectSources.push(...enrichedBeachData);
        }

        return this.mapForecastByTime(pointsWithCorrectSources);
    }

    private mapForecastByTime(forecast: BeachForecast[]): TimeForecast[] {
        const forecastByTime: TimeForecast[] = [];

        for(const point of forecast) {
            const timePoint = forecastByTime.find((f) => f.time === point.time);

            // Se ja existir um timePoint, adiciona o point ao array de forecast, senão cria um novo timePoint
            timePoint ? timePoint.forecast.push(point) : forecastByTime.push({
                time: point.time,
                forecast: [point]
            })
        }

        return forecastByTime;
    }
}
