import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { UserModel } from '../_models';
import { BarrierModel } from '../_models';
import { LightModel } from '../_models';
import { UserService } from '../_services';
import { BarrierService } from '../_services';
import { LightService } from '../_services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
    public sidebarForm: FormGroup;
    public emailForm: FormGroup;
    public sidebarHeadingForm: FormGroup;
    public users: UserModel[] = [];
    public barriers: BarrierModel[] = [];
    public lights: LightModel[] = [];
    public loading = false;
    public submitted = false;

    constructor(
        private userService: UserService,
        private barrierService: BarrierService,
        private lightService: LightService,
        private formBuilder: FormBuilder
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

        this.sidebarForm = this.formBuilder.group({
            search: ['', Validators.required]
        });

        this.emailForm = this.formBuilder.group({
            emailto: ['', Validators.required],
            subject: ['', Validators.required],
            message: ['', Validators.required]
        });

        this.sidebarHeadingForm = this.formBuilder.group({
            reportPanelUsage: ['', Validators.required],
            allowMailRedirect: ['', Validators.required],
            exposeAuthorNameInPOsts: ['', Validators.required],
            showMeAsOnline: ['', Validators.required],
            turnOffNotifications: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.sidebarForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.sidebarForm.invalid) {
            return;
        }

        this.loading = true;
    }
}
