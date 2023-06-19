import { Document } from 'mongoose';
import { ForecastPoint } from './IStormGlass';

export enum BeachPosition {
    S = 'S',
    E = 'E',
    W = 'W',
    N = 'N',
}

export interface Beach {
    _id?: string;
    name: string;
    position: BeachPosition;
    lat: number;
    lng: number;
    user: object | string;
}

export interface BeachForecast extends Omit<Beach, 'user'>, ForecastPoint {}

export interface BeachModel extends Omit<Beach, '_id'>, Document {}
