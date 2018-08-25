import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { BarrierType, BarrierState } from '../_models/barrier';
import { LightState } from '../_models/light';
@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const testUser = [{ id: 1,
            username: 'Avet',
            password: '123',
            firstName: 'Avet',
            lastName: 'Sargsyan'
        },
        {
            id: 2,
            username: 'Sirius',
            password: '123',
            firstName: 'Sirius',
            lastName: 'Siriusyan'
        }];
        const testBarrier = [{ id: 1,
            name: 'Vardanants',
            address: 'Vardanants',
            state: BarrierState.UNKNOWN,
            online: true,
            switchType: BarrierType.ONOFF,
            longitude: '40.176858',
            latitude: '44.518365',
            altitude: '3',
        },
        {   id: 2,
            name: 'Hanrapetutyan',
            address: 'Hanrapetutyan',
            state: BarrierState.UNKNOWN,
            online: true,
            switchType: BarrierType.TOGGLE,
            longitude: 40.176857,
            latitude: 44.518363,
            altitude: 3,
        }];
        const testLight = [{ id: 1,
            name: 'padyezd',
            state: LightState.UNKNOWN,
            longitude: '40.176860',
            latitude: '44.518365',
            altitude: '3',
        },
        {   id: 2,
            name: 'hayat',
            state: LightState.UNKNOWN,
            longitude: '40.176861',
            latitude: '44.518366',
            altitude: '3',
        }];

        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {

            // authenticate
            if (request.url.endsWith('/api/authenticate') && request.method === 'POST') {
                if (request.body.username === testUser[0].username && request.body.password === testUser[0].password) {
                    // if login details are valid return 200 OK with a fake jwt token
                    return of(new HttpResponse({ status: 200, body: { token: 'fake-jwt-token' } }));
                } else {
                    // else return 400 bad request
                    return throwError({ error: { message: 'Username or password is incorrect' } });
                }
            }

            // get users
            if (request.url.endsWith('/api/users') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: [testUser] }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }

            // get barriers
            if (request.url.endsWith('/api/barriers') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: [testBarrier] }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }

            // get lights
            if (request.url.endsWith('/api/lights') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: [testLight] }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }

            // pass through any requests not handled above
            return next.handle(request);
        }))

        // call materialize and dematerialize to ensure delay even if an error is thrown
        // (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
