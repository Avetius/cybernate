import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { BarrierModel } from '../_models';
import { BarrierService } from '../_services';

@Component({
    templateUrl: 'barrier.component.html',
    styleUrls: ['./barrier.component.css']
})
export class BarrierComponent implements OnInit {
    public barriers: BarrierModel[];

    constructor(private barrierService: BarrierService) {}

    ngOnInit() {
        this.barrierService.getAll().pipe(first()).subscribe(barriers => {
            this.barriers = barriers;
        });
    }
}
