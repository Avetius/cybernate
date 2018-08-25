import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { LightModel } from '../_models';

@Injectable({ providedIn: 'root' })
export class LightService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<LightModel[]>(`/api/lights`);
    }

    get(id:number) {
        return this.http.get<LightModel>(`/api/light/${id}`);
    }

    create(body:LightModel) {
        return this.http.post<LightModel>(`/api/light`,body);
    }

    update(id:number, body:LightModel) {
        return this.http.post<LightModel>(`/api/light/${id}`,body);
    }

    delete(id:number) {
        return this.http.delete<LightModel>(`/api/light/${id}`);
    }
}