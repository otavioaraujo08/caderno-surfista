import {
    ForecastPoint,
    StormGlassForecastResponse,
    StormGlassPoint,
} from '@src/interfaces/IStormGlass';
import { InternalError } from '@src/utils/errors/internal-error';
import { AxiosError } from 'axios';
import config, { IConfig } from 'config';
import * as HTTPUtil from '@src/utils/request';

export class StormGlassUnexpectedResponseError extends InternalError {
    constructor(message: string) {
        super(message);
    }
}

export class ClientRequestError extends InternalError {
    constructor(message: string) {
        const internalMessage =
            'Unexpected error when trying to communicate to StormGlass';
        super(`${internalMessage}: ${message}`);
    }
}

export class StormGlassResponseError extends InternalError {
    constructor(message: string) {
        const internalMessage =
            'Unexpected error returned by the StormGlass service';
        super(`${internalMessage}: ${message}`);
    }
}

const stormglassResourceConfig: IConfig = config.get(
    'App.resources.StormGlass'
);

export class StormGlass {
    readonly stormGlassAPIParams =
        'swellDirection,swellHeight,swellPeriod,waveDirection,waveHeight,windDirection,windSpeed';
    readonly stormGlassAPISource = 'noaa';

    constructor(protected request = new HTTPUtil.Requets()) {}

    public async fetchPoints(
        lat: number,
        lng: number
    ): Promise<ForecastPoint[]> {
        try {
            const response = await this.request.get<StormGlassForecastResponse>(
                `${stormglassResourceConfig.get(
                    'apiUrl'
                )}/weather/point?lat=${lat}&lng=${lng}&params=${
                    this.stormGlassAPIParams
                }&source=${this.stormGlassAPISource}`,
                {
                    headers: {
                        Authorization: stormglassResourceConfig.get('apiToken'),
                    },
                }
            );
            return this.normalizeResponse(response.data);
        } catch (err) {
            const axiosError = err as AxiosError;
            if (
                axiosError instanceof Error &&
                axiosError.response &&
                axiosError.response.status
            ) {
                throw new StormGlassResponseError(
                    `Error: ${JSON.stringify(axiosError.response.data)} Code: ${
                        axiosError.response.status
                    }`
                );
            }
            throw new ClientRequestError((err as { message: any }).message);
        }
    }
    private normalizeResponse(
        points: StormGlassForecastResponse
    ): ForecastPoint[] {
        return points.hours
            .filter(this.isValidPoint.bind(this))
            .map((point) => ({
                swellDirection: point.swellDirection[this.stormGlassAPISource],
                swellHeight: point.swellHeight[this.stormGlassAPISource],
                swellPeriod: point.swellPeriod[this.stormGlassAPISource],
                time: point.time,
                waveDirection: point.waveDirection[this.stormGlassAPISource],
                waveHeight: point.waveHeight[this.stormGlassAPISource],
                windDirection: point.windDirection[this.stormGlassAPISource],
                windSpeed: point.windSpeed[this.stormGlassAPISource],
            }));
    }

    private isValidPoint(point: Partial<StormGlassPoint>): boolean {
        return !!(
            point.time &&
            point.swellDirection?.[this.stormGlassAPISource] &&
            point.swellHeight?.[this.stormGlassAPISource] &&
            point.swellPeriod?.[this.stormGlassAPISource] &&
            point.waveDirection?.[this.stormGlassAPISource] &&
            point.waveHeight?.[this.stormGlassAPISource] &&
            point.windDirection?.[this.stormGlassAPISource] &&
            point.windSpeed?.[this.stormGlassAPISource]
        );
    }
}
