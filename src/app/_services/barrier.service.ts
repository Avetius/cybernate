import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BarrierModel } from '../_models';

@Injectable({ providedIn: 'root' })
export class BarrierService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<BarrierModel[]>(`/api/barriers`);
    }

    get(id:number) {
        return this.http.get<BarrierModel>(`/api/barrier/${id}`);
    }

    create(body:BarrierModel) {
        return this.http.post<BarrierModel>(`/api/barrier`,body);
    }

    update(id:number, body:BarrierModel) {
        return this.http.post<BarrierModel>(`/api/barrier/${id}`,body);
    }

    delete(id:number) {
        return this.http.delete<BarrierModel>(`/api/barrier/${id}`);
    }
}