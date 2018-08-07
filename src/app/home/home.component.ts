import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { UserModel } from '../_models';
import { BarrierModel } from '../_models';
import { LightModel } from '../_models';
import { UserService } from '../_services';
import { BarrierService } from '../_services';
import { LightService } from '../_services';

@Component({
    templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
    users: UserModel[] = [];
    barriers: BarrierModel[] = [];
    lights: LightModel[] = [];

    constructor(
        private userService: UserService,
        private barrierService: BarrierService,
        private lightService: LightService,
    ) {}
    ngOnInit() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        });
        this.barrierService.getAll().pipe(first()).subscribe(barriers => {
            this.barriers = barriers;
        });
        this.lightService.getAll().pipe(first()).subscribe(lights => {
            this.lights = lights;
        });
    }
}
