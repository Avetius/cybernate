import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { UserModel } from '../_models';
import { UserService } from '../_services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    templateUrl: 'profile.component.html',
})

export class ProfileComponent implements OnInit {
    public sidebarForm: FormGroup;
    public formHorizontal: FormGroup;
    public formHorizontal2: FormGroup;
    public tabPane: FormGroup;
    // public emailForm: FormGroup;
    public users: UserModel[] = [];
    public loading = false;
    public submitted = false;
    public returnUrl: string;
    public error = '';

    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService
    ) {}

    ngOnInit() {
        this.sidebarForm = this.formBuilder.group({
            search: ['', Validators.required]
        });

        this.formHorizontal = this.formBuilder.group({
            response: ['', Validators.required],
            submit: ['', Validators.required]
        });

        this.formHorizontal2 = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', Validators.required],
            submit: ['', Validators.required]
        });

        this.tabPane = this.formBuilder.group({
            checkbox1: ['', Validators.required],
            checkbox2: ['', Validators.required],
            checkbox3: ['', Validators.required],
            checkbox4: ['', Validators.required]
        });

        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
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
