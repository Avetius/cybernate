import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { LightModel } from '../_models';
import { LightService } from '../_services';

@Component({templateUrl: 'light.component.html'})
export class LightComponent implements OnInit {
    lights: LightModel[] = [];

    constructor(private lightService: LightService) {}

    ngOnInit() {
        this.lightService.getAll().pipe(first()).subscribe(lights => {
            this.lights = lights;
        });
    }
}
