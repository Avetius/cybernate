import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserModel } from '../_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<UserModel[]>('/api/users');
    }

    get(id: number) {
        return this.http.get<UserModel>(`/api/user/${id}`);
    }

    create(body: UserModel) {
        return this.http.post<UserModel>(`/api/user`, body);
    }

    update(id: number, body: UserModel) {
        return this.http.post<UserModel>(`/api/user/${id}`, body);
    }

    delete(id: number) {
        return this.http.delete<UserModel>(`/api/user/${id}`);
    }
}
