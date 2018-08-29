export enum LightState {
    ON = 1,
    OFF,
    UNKNOWN
}

export class LightModel {
    id: number;
    name: string;
    state: LightState;
    longitude: string;
    latitude: string;
    altitude: string;
}
