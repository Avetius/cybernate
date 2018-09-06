export enum BarrierType {
    TOGGLE = 'TOGGLE',
    ONOFF = 'ONOFF',
    ALL = 'ALL'
}

export enum BarrierState {
    OPEN,
    CLOSE,
    UNKNOWN
}

export class BarrierModel {
    id: number;
    name: string;
    address?: string;
    state?: BarrierState;
    online?: boolean;
    switchType?: BarrierType;
    longitude?: string;
    latitude?: string;
    altitude?: string;
}
